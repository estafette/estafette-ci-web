(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{pVsz:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"m-3"},[e("div",{staticClass:"row justify-content-center m-0"},[e("div",{staticClass:"col-12 col-md-6 col-xl-3 text-center"},[e("h1",[t._v("Login")]),t._v(" "),e("p",[t._v("Please log in with one of the following providers:")]),t._v(" "),t._l(t.providers,(function(n){return e("b-button",{key:n.id,staticClass:"mt-3 mb-3",attrs:{href:t.path(n),variant:"success",block:""}},[e("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:["fab",n.id]}}),t._v("\n        "+t._s(n.name)+"\n      ")],1)}))],2)])])};o._withStripped=!0;var s=e("GUe+"),r=e("7O5W"),i=e("8tEE"),a=e("rT2p");r.c.add(i.e,i.f,i.b,i.c,i.a,i.d);var c={components:{BButton:s.a,FontAwesomeIcon:a.a},data:function(){return{providers:[]}},created:function(){this.loadProviders()},methods:{path:function(t){var n=t.path,e=this.$route.query.returnURL;return e&&(n+="?returnURL="+e),n},loadProviders:function(){var t=this;this.axios.get("/api/auth/providers/").then((function(n){t.providers=n.data})).catch((function(t){console.warn(t)}))}}},u=e("KHd+"),l=Object(u.a)(c,o,[],!1,null,null,null);l.options.__file="src/views/Login.vue";n.default=l.exports}}]);