(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[535],{947:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return d}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-jumbotron",{staticClass:"section-header",attrs:{header:"Estafette","bg-variant":"dark","text-variant":"success","header-level":"4","container-fluid":"",fluid:""}}),t._v(" "),n("div",{staticClass:"row mr-0 ml-0"},[n("div",{staticClass:"col-12"},[n("b-jumbotron",{staticClass:"mb-3 pl-4 pt-4 pr-4 pb-5 rounded border",attrs:{lead:"Your portal to application development & management","bg-variant":"white","text-variant":"dark","header-level":"3","container-fluid":"",fluid:""},scopedSlots:t._u([{key:"header",fn:function(){return[n("span",{staticClass:"text-success font-italic"},[t._v("\n            Estafette\n          ")])]},proxy:!0}])},[t._v(" "),n("p",[t._v("For more information visit the public website.")]),t._v(" "),n("b-button",{attrs:{variant:"success",href:"https://estafette.io/",target:"_blank"}},[t._v("\n          Learn more\n        ")])],1)],1)]),t._v(" "),n("div",{staticClass:"row justify-content-center ml-3 mr-3 border rounded bg-white pt-5 pb-5"},[n("div",{staticClass:"col-12 col-md-6 col-xl-3 text-center"},[n("h1",{staticClass:"display-4"},[t._v("\n        Login\n      ")]),t._v(" "),n("p",[t._v("Please log in with one of the following providers:")]),t._v(" "),t._l(t.providers,(function(e){return n("b-button",{key:e.id,staticClass:"mt-3 mb-3",attrs:{href:t.path(e),variant:"success",block:""}},[n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:["fab",e.id]}}),t._v("\n        "+t._s(e.name)+"\n      ")],1)}))],2)])],1)};a._withStripped=!0;var r=n(9406),i=n(5193),s=n(8947),o=n(1417),c=n(7810);s.vI.add(o.xYR,o.hVS,o.neY,o.zhw,o.KOC,o.JE);var l={components:{BJumbotron:r.M,BButton:i.T,FontAwesomeIcon:c.GN},data:function(){return{providers:[]}},created:function(){this.loadProviders()},methods:{path:function(t){var e=t.path,n=!1,a=this.$route.query.returnURL;return a&&(e+="?returnURL="+a,n=!0),t.organization&&(e+=n?"&":"?",e+="organization="+t.organization),e},loadProviders:function(){var t=this;this.axios.get("/api/auth/providers").then((function(e){t.providers=e.data})).catch((function(t){console.warn(t)}))}}},u=(0,n(1900).Z)(l,a,[],!1,null,null,null);u.options.__file="src/views/Login.vue";var d=u.exports}}]);