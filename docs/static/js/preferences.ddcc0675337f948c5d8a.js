(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"6Ytq":function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var r=n("3LMw"),i=n("tC49"),a=n("Io6r"),s=n("qZlm"),o=n("qlm0");function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=Object(o.b)();delete f.href.default,delete f.to.default;var d=c(c({},f),{},{tag:{type:String,default:"span"},variant:{type:String,default:function(){return Object(a.b)("BBadge","variant")}},pill:{type:Boolean,default:!1}}),p=r.a.extend({name:"BBadge",functional:!0,props:d,render:function(t,e){var n=e.props,r=e.data,a=e.children,u=n.href||n.to,c=u?o.a:n.tag,l={staticClass:"badge",class:[n.variant?"badge-".concat(n.variant):"badge-secondary",{"badge-pill":n.pill,active:n.active,disabled:n.disabled}],props:u?Object(s.a)(f,n):{}};return t(c,Object(i.a)(r,l),a)}})},Aecu:function(t,e,n){"use strict";var r=n("2C+6"),i=Object(r.g)({SPACE:32,ENTER:13,ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,PAGEUP:33,PAGEDOWN:34,HOME:36,END:35,TAB:9,SHIFT:16,CTRL:17,BACKSPACE:8,ALT:18,PAUSE:19,BREAK:19,INSERT:45,INS:45,DELETE:46});e.a=i},fIft:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-lg-6 col-xxxl-3"},[t.user?n("b-table",{attrs:{items:[t.user],fields:t.fields,"sort-icon-left":"","no-provider-sorting":"",borderless:"",stacked:""},scopedSlots:t._u([{key:"cell(roles)",fn:function(e){return t._l(e.item.roles,(function(e){return n("b-badge",{key:e,staticClass:"mr-1",attrs:{variant:"info"}},[t._v("\n            "+t._s(e)+"\n          ")])}))}},{key:"cell(groups)",fn:function(e){return t._l(e.item.groups,(function(e){return n("b-badge",{key:e.name,staticClass:"mr-1",attrs:{variant:"warning"}},[t._v("\n            "+t._s(e.name)+"\n          ")])}))}},{key:"cell(organizations)",fn:function(e){return t._l(e.item.organizations,(function(e){return n("b-badge",{key:e.name,staticClass:"mr-1",attrs:{variant:"success"}},[t._v("\n            "+t._s(e.name)+"\n          ")])}))}},{key:"cell(actions)",fn:function(){return[n("b-button",{attrs:{href:"/api/auth/logout/",variant:"danger"}},[t._v("\n            Log out\n          ")])]},proxy:!0}],null,!1,2263174779)}):t._e()],1)])])};r._withStripped=!0;var i=n("L2JU"),a=n("KaE5"),s=n("GUe+"),o=n("6Ytq");function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={components:{BTable:a.a,BButton:s.a,BBadge:o.a},data:function(){var t=this;return{refresh:!0,fields:[{key:"name"},{key:"email"},{key:"roles"},{key:"groups"},{key:"organizations"},{key:"firstVisit",formatter:function(e,n,r){return t.$options.filters.formatDatetime(e)}},{key:"lastVisit",formatter:function(e,n,r){return t.$options.filters.formatDatetime(e)}},{key:"actions"}]}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){u(t,e,n[e])}))}return t}({},Object(i.b)("user",{user:"me"}),{avatar:function(){if(this.user&&this.user.identities&&this.user.identities.length>0){var t=this.user.identities.find((function(t){return t.avatar}));if(t&&t.avatar)return t.avatar}return""},name:function(){if(this.user&&this.user.identities&&this.user.identities.length>0){var t=this.user.identities.find((function(t){return t.name}));if(t&&t.name)return t.name}return""},email:function(){if(this.user&&this.user.identities&&this.user.identities.length>0){var t=this.user.identities.find((function(t){return t.email}));if(t&&t.email)return t.email}return""}})},l=n("KHd+"),f=Object(l.a)(c,r,[],!1,null,null,null);f.options.__file="src/views/UserDetails.vue";e.default=f.exports},hpAl:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return a}));var r=/(<([^>]+)>)/gi,i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return String(t).replace(r,"")},a=function(t,e){return t?{innerHTML:t}:e?{textContent:e}:{}}},"kO/s":function(t,e,n){"use strict";e.a={props:{id:{type:String}},data:function(){return{localId_:null}},computed:{safeId:function(){var t=this.id||this.localId_;return function(e){return t?(e=String(e||"").replace(/\s+/g,"_"))?t+"_"+e:t:null}}},mounted:function(){var t=this;this.$nextTick((function(){t.localId_="__BVID__".concat(t._uid)}))}}},vOgQ:function(t,e,n){"use strict";e.a=function(t){return Array.apply(null,{length:t})}}}]);