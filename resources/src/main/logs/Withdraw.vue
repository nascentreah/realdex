<template>
  <div>
    <div
      class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
    >
      <div class="font-medium">{{ $t("Withdraw History") }}</div>
      <Filter>
        <input
          v-model="filters.trx.value"
          type="text"
          class="filter-input"
          placeholder="Transaction ID"
      /></Filter>
    </div>
    <div class="card relative overflow-x-auto">
      <VTable
        :key="logStore.logs.withdraw.length"
        v-model:current-page="currentPage"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="logStore.logs.withdraw"
        :filters="filters"
        :page-size="10"
        :hide-sort-icons="true"
        @totalPagesChanged="totalPages = $event"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <VTh sort-key="created_at" scope="col" class="py-3 px-6">
              <Col text="Date" />
            </VTh>
            <VTh sort-key="trx" scope="col" class="py-3 px-6">
              <Col text="Transaction ID" />
            </VTh>
            <VTh sort-key="gateway.name" scope="col" class="py-3 px-6">
              <Col text="Gateway" />
            </VTh>
            <th scope="col" class="py-3 px-6">
              {{ $t("Details") }}
            </th>
            <VTh sort-key="status" scope="col" class="py-3 px-6">
              <Col text="Status" />
            </VTh>
          </tr>
        </template>
        <template #body="{ rows }">
          <template v-if="logStore.logs.withdraw.length > 0">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td data-label="Date" class="py-4 px-6">
                <toDate v-if="row.created_at" :time="row.created_at" />
                <span v-else>N/A</span>
              </td>
              <td data-label="trx" class="py-4 px-6">
                {{ row.trx }}
              </td>
              <td class="py-3 px-6" data-label="Gateway">
                {{ row.gateway ? row.gateway.name : "" }}
              </td>

              <td class="py-3 px-6" data-label="Details">
                <div>
                  <span class="fw-bold">{{ $t("Amount") }}</span>
                  <toMoney :num="row.amount" decimals="2" />
                  {{ cur_symbol }}
                </div>
                <div>
                  <span class="fw-bold">{{ $t("Charge") }}</span>
                  <toMoney :num="row.charge" decimals="2" />
                  {{ cur_symbol }}
                </div>
                <div>
                  <span class="fw-bold">{{ $t("After Charge") }}</span>
                  <toMoney :num="row.after_charge" decimals="2" />
                  {{ cur_symbol }}
                </div>
                <div>
                  <span class="fw-bold">{{ $t("Rate") }}</span>
                  <toMoney :num="row.rate" decimals="2" />
                  {{ row.symbol }}
                </div>
                <div>
                  <span class="fw-bold">{{ $t("Receivable") }}</span>
                  <toMoney :num="row.final_amount" decimals="2" />
                  {{ row.symbol }}
                </div>
              </td>
              <td class="py-3 px-6" data-label="Status">
                <span v-if="row.status == 1" class="badge bg-success">{{
                  $t("Complete")
                }}</span>
                <span v-else-if="row.status == 2" class="badge bg-warning">{{
                  $t("Pending")
                }}</span>
                <span v-else-if="row.status == 3" class="badge bg-danger">{{
                  $t("Canceled")
                }}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              scope="row"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td colspan="100%" class="py-4 px-6">
                {{ $t("No results found!") }}
              </td>
            </tr>
          </template>
        </template>
      </VTable>
    </div>

    <VTPagination
      v-model:currentPage="currentPage"
      class="float-right flex items-center justify-between pt-4"
      aria-label="Table navigation"
      :total-pages="totalPages"
      :max-page-links="3"
      :boundary-links="true"
    >
      <template #firstPage> {{ $t("First") }} </template>

      <template #lastPage> {{ $t("Last") }} </template>

      <template #next
        ><span class="sr-only">{{ $t("Next") }}</span>
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </template>

      <template #previous>
        <span class="sr-only">{{ $t("Previous") }}</span>
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </template>
    </VTPagination>
  </div>
</template>

<script>
  import toMoney from "@/partials/toMoney.vue";
  import toDate from "@/partials/toDate.vue";
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  import { useLogStore } from "@/store/log";
  export default {
    components: { toDate, toMoney, Filter, Col },
    setup() {
      const logStore = useLogStore();
      return { logStore };
    },
    data() {
      return {
        cur_rate: cur_rate,
        cur_symbol: cur_symbol,
        filters: {
          trx: { value: "", keys: ["trx"] },
        },
        currentPage: 1,
        totalPages: 0,
      };
    },
    created() {
      if (this.logStore.logs.withdraw.length == 0) {
        this.logStore.fetch("withdraw");
      }
    },
  };
</script>
