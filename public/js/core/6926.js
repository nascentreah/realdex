"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6926],{6926:(t,s,a)=>{a.r(s),a.d(s,{default:()=>r});const e={props:["user"],components:{},data:function(){return{contracts:[],datas:[],filters:{symbol:{value:"",keys:["symbol"]}},currentPage:1,totalPages:0}},methods:{goBack:function(){window.history.length>1?this.$router.go(-1):this.$router.push("/")},fetchData:function(){var t=this;this.$http.post("/user/fetch/binary/practice/contracts").then((function(s){t.contracts=s.data.contracts,t.datas=s.data.datas}))}},created:function(){this.fetchData()},mounted:function(){},destroyed:function(){}};const r=(0,a(1900).Z)(e,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"row",attrs:{id:"table-hover-row"}},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("h4",{staticClass:"card-title"},[t._v("\n                        "+t._s(t.$t("Binary Practice Contracts Log"))+"\n                    ")]),t._v(" "),a("div",{staticClass:"input-group w-50"},[a("span",{staticClass:"input-group-text",attrs:{id:"symbol-search"}},[t._v(t._s(t.$t("Symbol")))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filters.symbol.value,expression:"filters.symbol.value"}],staticClass:"form-control",domProps:{value:t.filters.symbol.value},on:{input:function(s){s.target.composing||t.$set(t.filters.symbol,"value",s.target.value)}}})])]),t._v(" "),a("div",{staticClass:"table-responsive"},[a("v-table",{staticClass:"table table-hover",attrs:{data:t.contracts,filters:t.filters,hideSortIcons:!0,currentPage:t.currentPage,pageSize:10},on:{"update:currentPage":function(s){t.currentPage=s},"update:current-page":function(s){t.currentPage=s},totalPagesChanged:function(s){t.totalPages=s}},scopedSlots:t._u([{key:"body",fn:function(s){var e=s.displayData;return a("tbody",{},[null!=t.contracts?t._l(e,(function(s){return a("tr",{key:s.id},[a("td",{attrs:{"data-label":"Symbol"}},[t._v("\n                                        "+t._s(s.symbol)+"/"+t._s(s.pair)+"\n                                    ")]),t._v(" "),a("td",{attrs:{"data-label":"Amount"}},[t._v("\n                                        "+t._s(t._f("toMoney")(s.amount))+"\n                                        "+t._s(s.pair)+"\n                                    ")]),t._v(" "),a("td",{attrs:{"data-label":"Profit"}},[1==s.result?a("span",{staticClass:"badge bg-success"},[t._v(t._s(t._f("toMoney")(s.margin))+"\n                                            "+t._s(s.pair))]):2==s.result?a("span",{staticClass:"badge bg-danger"},[t._v("-\n                                            "+t._s(t._f("toMoney")(s.amount))+"\n                                            "+t._s(s.pair))]):3==s.result?a("span",{staticClass:"badge bg-warning"},[t._v("0")]):a("span",{staticClass:"badge bg-warning"},[t._v(t._s(t.$t("Pending")))])]),t._v(" "),a("td",{attrs:{"data-label":"High/Low"}},[1==s.hilow?a("span",{staticClass:"badge bg-success"},[t._v(t._s(t.$t("Rise")))]):2==s.hilow?a("span",{staticClass:"badge bg-danger"},[t._v(t._s(t.$t("Fall")))]):t._e()]),t._v(" "),a("td",{attrs:{"data-label":"Result"}},[1==s.result?a("span",{staticClass:"badge bg-success"},[t._v(t._s(t.$t("Win")))]):2==s.result?a("span",{staticClass:"badge bg-danger"},[t._v(t._s(t.$t("Lose")))]):3==s.result?a("span",{staticClass:"badge bg-warning"},[t._v(t._s(t.$t("Draw")))]):a("span",{staticClass:"badge bg-warning"},[t._v(t._s(t.$t("Pending")))])]),t._v(" "),a("td",{attrs:{"data-label":"Status"}},[0==s.status?a("span",{staticClass:"badge bg-primary"},[t._v(t._s(t.$t("Running")))]):1==s.status?a("span",{staticClass:"badge bg-success"},[t._v(t._s(t.$t("Complete")))]):t._e()]),t._v(" "),a("td",{attrs:{"data-label":"Date"}},[t._v("\n                                        "+t._s(t._f("moment")(s.created_at,"dddd, MMMM Do YYYY"))+"\n                                    ")]),t._v(" "),null!=s.result?[t.datas[t.user.id][s.id]?a("td",[a("router-link",{staticClass:"btn btn-icon btn-sm btn-outline-info",attrs:{to:"/binary/contract/view/practice/"+s.id}},[a("i",{staticClass:"bi bi-info-lg"})])],1):a("td",[a("span",{staticClass:"badge bg-danger",attrs:{"data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Contract chart data was lost because you closed the trade page before it complete"}},[t._v(t._s(t.$t("Not Data Recorded")))])])]:t._e()],2)})):[a("tr",[a("td",{attrs:{colspan:"100%"}},[t._v("\n                                        "+t._s(t.$t("No results found!"))+"\n                                    ")])])]],2)}}])},[a("thead",{attrs:{slot:"head"},slot:"head"},[a("tr",[a("v-th",{attrs:{sortKey:"symbol",scope:"col"}},[t._v(t._s(t.$t("Symbol")))]),t._v(" "),a("v-th",{attrs:{sortKey:"amount",scope:"col"}},[t._v(t._s(t.$t("Amount")))]),t._v(" "),a("v-th",{attrs:{sortKey:"margin",scope:"col"}},[t._v(t._s(t.$t("Profit")))]),t._v(" "),a("v-th",{attrs:{sortKey:"hilow",scope:"col"}},[t._v(t._s(t.$t("Rise/Fall")))]),t._v(" "),a("v-th",{attrs:{sortKey:"result",scope:"col"}},[t._v(t._s(t.$t("Result")))]),t._v(" "),a("v-th",{attrs:{sortKey:"status",scope:"col"}},[t._v(t._s(t.$t("Status")))]),t._v(" "),a("v-th",{attrs:{sortKey:"created_at",scope:"col"}},[t._v(t._s(t.$t("Date")))]),t._v(" "),a("th",{attrs:{scope:"col"}},[t._v(t._s(t.$t("Action")))])],1)])])],1),t._v(" "),a("div",{staticClass:"card-footer ms-auto pb-0"},[a("smart-pagination",{attrs:{currentPage:t.currentPage,totalPages:t.totalPages},on:{"update:currentPage":function(s){t.currentPage=s},"update:current-page":function(s){t.currentPage=s}}})],1)])])])])}),[],!1,null,null,null).exports}}]);