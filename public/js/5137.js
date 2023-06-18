"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5137],{5137:(t,e,n)=>{n.r(e),n.d(e,{default:()=>a});var s=n(4165),o=n(5861);n(2222),n(2772),n(9653);const r={components:{},data:function(){return{currentUser:{},currentTrade:{},currentSelectSide:{},tokens:{},address:{},amount:{}}},methods:{goBack:function(){window.history.length>1?this.$router.go(-1):this.$router.push("/")},init:function(){var t=this;return(0,o.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Moralis.start({serverUrl:"https://t6cacka4pekq.usemoralis.com:2053/server",appId:"R8897AYP30KpXaJSrGuvtpqZGo5gUzmCHR0ydxUu"});case 2:return e.next=4,Moralis.enableWeb3();case 4:return e.next=6,t.listAvailableTokens();case 6:t.currentUser=Moralis.User.current(),t.currentUser?(document.getElementById("swap_button").disabled=!1,document.getElementById("swap_button").innerText="Swap"):document.getElementById("swap_button").innerText="Connect Wallet First";case 8:case"end":return e.stop()}}),e)})))()},listAvailableTokens:function(){var t=this;return(0,o.Z)((0,s.Z)().mark((function e(){var n,o,r,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Moralis.Plugins.oneInch.getSupportedTokens({chain:"eth"});case 2:for(a in n=e.sent,o=document.getElementById("token_list"),t.tokens=n.tokens,r=function(e){var n=t.tokens[e];if("BTC++"!=n.symbol){var s=document.createElement("div");s.setAttribute("data-address",e),s.className="token_row";var r='\n            <a class="dropdown-item" ><img class="token_list_img me-1" height="36px" width="36px" src="../../assets/images/cryptoCurrency/'.concat(n.symbol,'.png"  loading="lazy">\n            <span class="token_list_text">').concat(n.symbol,"</span></a>\n            ");s.innerHTML=r,s.onclick=function(){t.selectToken(e)},o.appendChild(s)}},t.tokens)r(a);case 7:case"end":return e.stop()}}),e)})))()},filterFunction:function(){var t,e,n;for(t=document.getElementById("myInput").value.toUpperCase(),div=document.getElementById("myDropdown"),e=div.getElementsByTagName("a"),n=0;n<e.length;n++)txtValue=e[n].textContent||e[n].innerText,txtValue.toUpperCase().indexOf(t)>-1?e[n].style.display="":e[n].style.display="none"},selectToken:function(t){this.closeModal(),console.log(this.tokens),this.currentTrade[this.currentSelectSide]=this.tokens[t],this.renderInterface(),console.log(this.currentTrade),this.getQuote()},renderInterface:function(){this.currentTrade.from&&(document.getElementById("from_token_img").src=this.currentTrade.from.logoURI,document.getElementById("from_token_img").classList.remove("hidden"),document.getElementById("from_token_text").innerHTML=this.currentTrade.from.symbol),this.currentTrade.to&&(document.getElementById("to_token_img").src=this.currentTrade.to.logoURI,document.getElementById("to_token_img").classList.remove("hidden"),document.getElementById("to_token_text").innerHTML=this.currentTrade.to.symbol)},openModal:function(t){this.currentSelectSide=t,document.getElementById("token_modal").style.display="block"},closeModal:function(){document.getElementById("token_modal").style.display="none"},getQuote:function(){var t=this;return(0,o.Z)((0,s.Z)().mark((function e(){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.currentTrade.from&&t.currentTrade.to&&document.getElementById("from_amount").value){e.next=2;break}return e.abrupt("return");case 2:return t.amount=Number(document.getElementById("from_amount").value*Math.pow(10,t.currentTrade.from.decimals)),e.next=5,Moralis.Plugins.oneInch.quote({chain:"eth",fromTokenAddress:t.currentTrade.from.address,toTokenAddress:t.currentTrade.to.address,amount});case 5:n=e.sent,document.getElementById("gas_estimate").innerHTML=n.estimatedGas,document.getElementById("to_amount").value=n.toTokenAmount/Math.pow(10,n.toToken.decimals);case 8:case"end":return e.stop()}}),e)})))()},trySwap:function(){var t=this;return(0,o.Z)((0,s.Z)().mark((function e(){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.address=Moralis.User.current().get("ethAddress"),t.amount=Number(document.getElementById("from_amount").value*Math.pow(10,t.currentTrade.from.decimals)),"ETH"===t.currentTrade.from.symbol){e.next=10;break}return e.next=5,Moralis.Plugins.oneInch.hasAllowance({chain:"eth",fromTokenAddress:t.currentTrade.from.address,fromAddress:t.address,amount:t.amount});case 5:if(n=e.sent,console.log(n),n){e.next=10;break}return e.next=10,Moralis.Plugins.oneInch.approve({chain:"eth",tokenAddress:t.currentTrade.from.address,fromAddress:t.address});case 10:return e.prev=10,e.next=13,t.doSwap(t.address,t.amount);case 13:e.sent,notify("success","Swap Completed Successfully"),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(10),notify("warning","Swap Failed"),console.log(e.t0);case 21:case"end":return e.stop()}}),e,null,[[10,17]])})))()},doSwap:function(t,e){return Moralis.Plugins.oneInch.swap({chain:"eth",fromTokenAddress:this.currentTrade.from.address,toTokenAddress:this.currentTrade.to.address,amount:e,fromAddress:t,slippage:1})}},created:function(){this.init()},mounted:function(){},destroyed:function(){}};const a=(0,n(1900).Z)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-7 col-md-6 col-sm-12 col-12"}),t._v(" "),n("div",{staticClass:"col-lg-5 col-md-6 col-sm-12 col-12"},[n("div",{staticClass:"card"},[t._m(0),t._v(" "),n("div",{attrs:{id:"form"}},[n("div",{staticClass:"card-body"},[n("div",{staticClass:"d-flex justify-content-between align-items-center rounded shadow darked"},[n("button",{staticClass:"btn btn-flat-info dropdown-toggle ms-1 w-50 d-flex justify-content-between align-items-center",attrs:{type:"button",id:"from_token_select"},on:{click:function(e){return t.openModal("from")}}},[n("img",{staticClass:"token_image hidden",attrs:{height:"36px",width:"36px",id:"from_token_img"}}),t._v(" "),n("span",{attrs:{id:"from_token_text"}},[t._v("Select Coin")])]),t._v(" "),n("div",{staticClass:"swapbox_select w-50 m-1"},[n("input",{staticClass:"number form-control",attrs:{placeholder:"amount",id:"from_amount"},on:{click:t.getQuote}})])]),t._v(" "),n("div",{staticClass:"d-flex justify-content-between align-items-center my-1 rounded shadow darked"},[n("button",{staticClass:"btn btn-flat-info dropdown-toggle ms-1 w-50 d-flex justify-content-between align-items-center",attrs:{type:"button",id:"to_token_select"},on:{click:function(e){return t.openModal("to")}}},[n("img",{staticClass:"token_image hidden",attrs:{height:"36px",width:"36px",id:"to_token_img"}}),t._v(" "),n("span",{attrs:{id:"to_token_text"}},[t._v("Select Coin")])]),t._v(" "),t._m(1)]),t._v(" "),t._m(2)]),t._v(" "),n("div",{staticClass:"card-footer"},[n("button",{staticClass:"btn btn-primary w-100",attrs:{disabled:"",id:"swap_button"},on:{click:t.trySwap}},[t._v("\n                            Connecting\n                        ")])])])])])]),t._v(" "),n("div",{staticClass:"modal",attrs:{id:"token_modal",tabindex:"-1",role:"dialog"}},[n("div",{staticClass:"modal-dialog modal-sm",attrs:{role:"document"}},[n("div",{staticClass:"modal-content"},[n("div",{staticClass:"modal-header"},[n("h5",{staticClass:"modal-title"},[t._v("Select token")]),t._v(" "),n("button",{staticClass:"close btn-close",attrs:{id:"modal_close",type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:t.closeModal}})]),t._v(" "),n("div",{staticClass:"modal-body modal-swap",attrs:{id:"myDropdown"}},[n("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Search..",id:"myInput",autocomplete:"off"},on:{click:function(e){return t.filterFunction()}}}),t._v(" "),n("div",{staticStyle:{"max-height":"600px","overflow-y":"auto"},attrs:{id:"token_list"}})])])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-header"},[n("h4",[t._v("Swap")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swapbox_select w-50 m-1"},[e("input",{staticClass:"number form-control",attrs:{placeholder:"calculating..",id:"to_amount",disabled:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"rounded shadow p-1 darked"},[t._v("\n                            Estimated Gas:\n                            "),n("span",{staticClass:"text-warning",attrs:{id:"gas_estimate"}})])}],!1,null,null,null).exports}}]);