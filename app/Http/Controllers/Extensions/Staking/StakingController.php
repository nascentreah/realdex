<?php

namespace App\Http\Controllers\Extensions\Staking;

use App\Http\Controllers\Controller;
use App\Models\Extension;
use App\Models\Staking\StakingCurrency;
use App\Models\Staking\StakingLog;
use App\Models\Wallet;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\MLM\MLMBV;
use App\Models\MLM\MLMDaily;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StakingController extends Controller
{


    public function fetch_info()
    {
        $user = Auth::user();
        if (isWallet($user->id, 'funding', 'USDT', 'funding') == true) {
            $wallet = getWallet($user->id, 'funding', 'USDT', 'funding');
        } else {
            $wallet = new Wallet();
            $wallet->user_id = $user->id;
            $wallet->symbol = 'USDT';
            $wallet->address = grs(34);
            $wallet->type = 'funding';
            $wallet->provider = 'funding';
            $wallet->save();
        }
        $coins = (new StakingCurrency)->getCache();
        $logs = (new StakingLog)->getCachedStaking($user->id);
        $coinlogs = [];
        foreach ($coins as $coin) {
            $coinlogs[$coin->id] = $logs->where('coin_id', $coin->id)->whereIn('status', [1, 2])->reverse()->first();
        }
        return response()->json([
            'coins' => $coins,
            'logs' => $logs,
            'coinlogs' => $coinlogs,
            'assets' => $logs->whereIn('status', [1, 2])->sum('cost'),
            'last_profit' => $logs->whereIn('status', [1, 2])->sum('last_profit'),
            'total_profit' => $logs->whereIn('status', [1, 2])->sum('total_profit'),
            'wallet' => $wallet,
        ]);
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors());
        }
        $user = Auth::user();
        $wallet = getWallet($user->id, 'funding', 'USDT', 'funding');
        $stakeCoin = (new StakingCurrency)->getCacheCurrency($request->coin_id);
        if ($stakeCoin->price == null) {
            try {
                $price = getCoinRate($request->symbol);
            } catch (Exception $e) {
            }
        } else {
            $price = $stakeCoin->price;
        }
        if (($request->amount * $price) > $wallet->balance) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'warning',
                    'message' => 'Your Account Balance ' . getAmount($wallet->balance) . ' ' . $wallet->symbol . ' Not Enough! Please Deposit Money'
                ]
            );
        }
        if ($request->amount < $stakeCoin->min_stake) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'warning',
                    'message' => 'Your Stake Amount Lower Than The Minimum Stack Allowed!'
                ]
            );
        }
        if ($request->amount > ($stakeCoin->max_stake - $stakeCoin->staked)) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'warning',
                    'message' => 'Your Stake Amount Higher Than The Maximum Stack Allowed!'
                ]
            );
        }

        if (StakingLog::where('coin_id', $request->coin_id)->where('user_id', $user->id)->where('status', 1)->exists()) {
            $stakeLog = StakingLog::where('coin_id', $request->coin_id)->where('user_id', $user->id)->where('status', 1)->first();
            $stakeLog->cost += $request->amount * $price;
            $stakeLog->staked += $request->amount;
            $stakeLog->status = 1;
            $stakeLog->save();
        } else {
            $stakeLog = new StakingLog();
            $stakeLog->coin_id = $request->coin_id;
            $stakeLog->user_id = $user->id;
            $stakeLog->symbol = $request->symbol;
            $stakeLog->cost = $request->amount * $price;
            $stakeLog->staked = $request->amount;
            $stakeLog->start_date = Carbon::now();
            $stakeLog->end_date = Carbon::now()->addDays($stakeCoin->period);
            $stakeLog->last_stake_date = Carbon::now()->addDays(1);
            $stakeLog->status = 1;
            $stakeLog->save();
        }
        $stakeLog->clearCache();

        $wallet->balance -= $request->amount * $price;
        $wallet->save();

        $stakeCoin->staked += $request->amount;
        $stakeCoin->save();
        $stakeCoin->clearCache();

        if (Extension::where('id', 3)->first()->status == 1 && getPlatform('mlm')->staking == 1 && getPlatform('mlm')->commission_type == 'daily' && $user->ref_by != null) {
            BVstore($user, 9, $stakeLog->cost, $stakeLog->id, $stakeCoin->period, getPlatform('mlm')->commission_type == 'daily' ? true : false);
        }

        return response()->json(
            [
                'success' => true,
                'type' => 'success',
                'message' => 'Your Staked ' . $request->amount . ' ' . $request->symbol . ' Successfully'
            ]
        );
    }
    public function cancel(Request $request)
    {
        $user = Auth::user();
        $stakeLog = StakingLog::where('coin_id', $request->coin_id)->where('user_id', $user->id)->where('status', 1)->first();
        if (Extension::where('id', 3)->first()->status == 1 && getPlatform('mlm')->staking == 1 && getPlatform('mlm')->commission_type == 'daily') {
            if (MLMDaily::where('log_id', $stakeLog->id)->where('type', 9)->exists()) {
                $mlm_dailies = MLMDaily::where('log_id', $stakeLog->id)->where('type', 9)->get();
                foreach ($mlm_dailies as $mlm_daily) {
                    if (MLMBV::where('daily_id', $mlm_daily->id)->where('type', 9)->exists()) {
                        $mlm_bvs = MLMBV::where('daily_id', $mlm_daily->id)->where('type', 9)->get();
                        foreach ($mlm_bvs as $mlm_bv) {
                            if ($mlm_bv->status == 1) {
                                $mlm_bv->status = 2;
                                $mlm_bv->save();
                            } else if ($mlm_bv->status == 0) {
                                $mlm_bv->delete();
                            }
                        }
                    }
                    $mlm_daily->delete();
                }
            }
        }
        $stakeCoin = (new StakingCurrency)->getCacheCurrency($request->coin_id);
        $stakeCoin->staked -= $stakeLog->staked;
        $stakeCoin->save();
        $stakeCoin->clearCache();

        $wallet = getWallet($user->id, 'funding', 'USDT', 'funding');
        $wallet->balance += $stakeLog->cost;
        $wallet->save();

        $stakeLog->status = 0;
        $stakeLog->save();
        $stakeLog->clearCache();

        return response()->json(
            [
                'success' => true,
                'type' => 'success',
                'message' => 'All Stakes Canceled Successfully'
            ]
        );
    }
    public function claim(Request $request)
    {
        $user = Auth::user();
        $stakeLog = StakingLog::where('coin_id', $request->coin_id)->where('user_id', $user->id)->where('status', 2)->first();

        $wallet = getWallet($user->id, 'funding', 'USDT', 'funding');
        $wallet->balance += $stakeLog->cost + $stakeLog->total_profit;
        $wallet->save();

        $stakeLog->status = 3;
        $stakeLog->save();
        $stakeLog->clearCache();

        if (Extension::where('id', 3)->first()->status == 1 && getPlatform('mlm')->staking == 1 && getPlatform('mlm')->commission_type == 'direct' && $user->ref_by != null) {
            BVstore($user, 9, $stakeLog->cost);
        }

        return response()->json(
            [
                'success' => true,
                'type' => 'success',
                'message' => 'All Stakes Claimed Successfully'
            ]
        );
    }

    public function staking_profit()
    {
        $nullLogs = StakingLog::whereIn('status', [1, 2])->where('coin_id', null)->get();
        $nullLogs->whereIn('status', [1, 2])->each(function ($log) {
            $wallet = getWallet($log->user_id, 'funding', 'USDT', 'funding');
            $wallet->balance += $log->cost;
            $wallet->save();
            $log->delete();
        });
        $nullLogs->whereIn('status', [0, 3])->each(function ($log) {
            $log->delete();
        });
        $stakeLogs = StakingLog::where('coin_id', '!=', null)->where('status', 1)->get();
        $date = Carbon::now();
        foreach ($stakeLogs as $log) {
            $coin = StakingCurrency::where('id', $log->coin_id)->firstOrFail();
            if ($date > $log->end_date) {
                $log->status = 2;
            } else {
                if ($log->last_stake_date != null) {
                    if ($log->status == 1 && $date >= $log->last_stake_date && $log->end_date >= $log->last_stake_date) {
                        $log->last_profit = $log->cost * ($coin->daily_profit / 100);
                        $log->total_profit += $log->last_profit;
                        $log->last_stake_date = $log->updated_at->addDays(1);
                    }
                } else {
                    if ($log->status == 1 && $date < $log->end_date) {
                        $log->last_profit = $log->cost * ($coin->daily_profit / 100);
                        $log->total_profit += $log->last_profit;
                        $log->last_stake_date = $date->addDays(1);
                    }
                }
            }
            $log->save();
        }
        (new StakingLog)->clearCache();

        cronLastRun('staking_returns');
    }
}
