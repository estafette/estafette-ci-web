(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"1Xn/":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("section-header"),this._v(" "),e("inner-navigation-tabs"),this._v(" "),e("div",{staticClass:"m-3"},[e("router-view")],1)],1)};r._withStripped=!0;var a=n("Qg33"),o=n("TXNy"),i={components:{InnerNavigationTabs:a.a,SectionHeader:o.a}},u=n("KHd+"),c=Object(u.a)(i,r,[],!1,null,null,null);c.options.__file="src/views/ViewWithNav.vue";e.default=c.exports},Aecu:function(t,e,n){"use strict";var r=n("2C+6"),a=Object(r.g)({SPACE:32,ENTER:13,ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,PAGEUP:33,PAGEDOWN:34,HOME:36,END:35,TAB:9,SHIFT:16,CTRL:17,BACKSPACE:8,ALT:18,PAUSE:19,BREAK:19,INSERT:45,INS:45,DELETE:46});e.a=a},"GUe+":function(t,e,n){"use strict";n.d(e,"a",(function(){return N}));var r=n("3LMw"),a=n("tC49"),o=n("Aecu"),i=n("qZlm"),u=n("Iyau"),c=n("Io6r"),s=n("kGy3"),l=n("ex6f"),f=n("2C+6"),d=n("+nMp"),m=n("qlm0");function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){v(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function v(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h="BButton",O={block:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,default:function(){return Object(c.b)(h,"size")}},variant:{type:String,default:function(){return Object(c.b)(h,"variant")}},type:{type:String,default:"button"},tag:{type:String,default:"button"},pill:{type:Boolean,default:!1},squared:{type:Boolean,default:!1},pressed:{type:Boolean,default:null}},y=Object(m.b)();delete y.href.default,delete y.to.default;var g=Object(f.k)(y),j=b(b({},y),O),w=function(t,e){return Object(d.f)(t).toLowerCase()===Object(d.f)(e).toLowerCase()},_=function(t){"focusin"===t.type?Object(s.a)(t.target,"focus"):"focusout"===t.type&&Object(s.u)(t.target,"focus")},S=function(t){return t.href||t.to||w(t.tag,"a")},x=function(t){return Object(l.a)(t.pressed)},E=function(t){return!(S(t)||t.tag&&!w(t.tag,"button"))},P=function(t){return!S(t)&&!E(t)},k=function(t){var e;return["btn-".concat(t.variant||Object(c.b)(h,"variant")),(e={},v(e,"btn-".concat(t.size),t.size),v(e,"btn-block",t.block),v(e,"rounded-pill",t.pill),v(e,"rounded-0",t.squared&&!t.pill),v(e,"disabled",t.disabled),v(e,"active",t.pressed),e)]},C=function(t){return S(t)?Object(i.a)(g,t):null},I=function(t,e){var n=E(t),r=S(t),a=x(t),o=P(t),i=r&&"#"===t.href,u=e.attrs&&e.attrs.role?e.attrs.role:null,c=e.attrs?e.attrs.tabindex:null;return(o||i)&&(c="0"),{type:n&&!r?t.type:null,disabled:n?t.disabled:null,role:o||i?"button":u,"aria-disabled":o?String(t.disabled):null,"aria-pressed":a?String(t.pressed):null,autocomplete:a?"off":null,tabindex:t.disabled&&!n?"-1":c}},N=r.a.extend({name:h,functional:!0,props:j,render:function(t,e){var n=e.props,r=e.data,i=e.listeners,c=e.children,s=x(n),f=S(n),d=P(n),p=f&&"#"===n.href,b={keydown:function(t){if(!n.disabled&&(d||p)){var e=t.keyCode;if(e===o.a.SPACE||e===o.a.ENTER&&d){var r=t.currentTarget||t.target;t.preventDefault(),r.click()}}},click:function(t){n.disabled&&Object(l.c)(t)?(t.stopPropagation(),t.preventDefault()):s&&i&&i["update:pressed"]&&Object(u.b)(i["update:pressed"]).forEach((function(t){Object(l.d)(t)&&t(!n.pressed)}))}};s&&(b.focusin=_,b.focusout=_);var v={staticClass:"btn",class:k(n),props:C(n),attrs:I(n,r),on:b};return t(f?m.a:n.tag,Object(a.a)(r,v),c)}})},Qg33:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-nav",{staticClass:"m-3 d-none d-lg-flex",attrs:{tabs:""}},t._l(t.routes,(function(e){return n("b-nav-item",{key:e.name,class:e.meta&&e.meta.class?e.meta.class:"",attrs:{to:{name:e.name},exact:!!e.meta&&e.meta.exact}},[e.meta&&e.meta.icon?n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:e.meta?e.meta.icon:""}}):t._e(),t._v(" "),n("span",[t._v("\n        "+t._s(e.meta&&e.meta.text?e.meta.text:e.name)+"\n      ")])],1)})),1),t._v(" "),n("b-dropdown",{staticClass:"m-3 d-lg-none",attrs:{variant:t.variant,block:"","menu-class":"w-100"},scopedSlots:t._u([{key:"button-content",fn:function(){return[t.activeRouteIcon?n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:t.activeRouteIcon}}):t._e(),t._v("\n      "+t._s(t.activeRouteText)+"\n    ")]},proxy:!0}])},[t._v(" "),t._l(t.routes,(function(e){return n("b-dropdown-item",{key:e.name,class:e.meta&&e.meta.class?e.meta.class:"",attrs:{to:{name:e.name},exact:!!e.meta&&e.meta.exact}},[e.meta&&e.meta.icon?n("font-awesome-icon",{staticClass:"dropdown-icon",attrs:{icon:e.meta?e.meta.icon:""}}):t._e(),t._v(" "),n("span",[t._v("\n        "+t._s(e.meta&&e.meta.text?e.meta.text:e.name)+"\n      ")])],1)}))],2)],1)};r._withStripped=!0;var a=n("L2JU"),o=n("Wfsh"),i=n("RxEo"),u=n("3Zo4"),c=n("nqqA"),s=n("7O5W"),l=n("wHSu"),f=n("rT2p");function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}s.c.add(l.B,l.M,l.U,l.X,l.O,l.L,l.o,l.v,l.W,l.k,l.f,l.D,l.e,l.w,l.F,l.A,l.S,l.T,l.I,l.C,l.W,l.H,l.c,l.E);var m={components:{BNav:o.a,BNavItem:i.a,BDropdown:u.a,BDropdownItem:c.a,FontAwesomeIcon:f.a},props:{sectionRouteName:{type:String,default:null}},methods:{isFunction:function(t){return t&&"[object Function]"==={}.toString.call(t)}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){d(t,e,n[e])}))}return t}({},Object(a.b)("user",{user:"me"}),{routes:function(){var t=this,e=this.$route.matched[0].name,n=this.$router.options.routes.find((function(t){return t.name===e}));return n&&n.children?n.children.filter((function(e){return(!e.meta||!e.meta.hide)&&(!!(t.user&&t.user.active||e.meta&&e.meta.allowedWithoutAuth)&&!(e.meta&&e.meta.requiredRole&&!(t.user&&t.user.active&&t.user.roles&&t.user.roles.includes(e.meta.requiredRole))))})):[]},activeRouteText:function(){return this.$route.meta&&this.$route.meta.text?this.$route.meta.text:this.$route.name},activeRouteIcon:function(){if(this.$route.meta&&this.$route.meta.icon)return this.$route.meta.icon},section:function(){var t=this.$route.matched[0].name;return this.sectionRouteName&&(t=this.sectionRouteName),this.$router.options.routes.find((function(e){return e.name===t}))},variant:function(){var t=this.section;return t&&t.meta&&t.meta.variant?t.meta.variant:"secondary"}})},p=n("KHd+"),b=Object(p.a)(m,r,[],!1,null,null,null);b.options.__file="src/components/InnerNavigationTabs.vue";e.a=b.exports},TXNy:function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return this.section?e("b-jumbotron",{staticClass:"section-header",attrs:{header:this.header,"bg-variant":this.bgVariant,"text-variant":this.textVariant,"header-level":"5","container-fluid":"",fluid:""}}):this._e()};r._withStripped=!0;var a=n("L2JU");function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var i={components:{BJumbotron:n("+N68").a},props:{sectionRouteName:{type:String,default:null}},methods:{isFunction:function(t){return t&&"[object Function]"==={}.toString.call(t)}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){o(t,e,n[e])}))}return t}({},Object(a.b)("user",{user:"me"}),{section:function(){var t=this.$route.matched[0].name;return this.sectionRouteName&&(t=this.sectionRouteName),this.$router.options.routes.find((function(e){return e.name===t}))},header:function(){var t=this.section;return t?t.meta&&t.meta.text?t.meta.text:t.name:""},bgVariant:function(){var t=this.section;return t&&t.meta&&t.meta.variant?t.meta.variant:"secondary"},textVariant:function(){var t=this.section;if(!t)return"white";if(t.meta&&t.meta.variant)switch(t.meta.variant){case"warning":return"dark"}return"white"}})},u=n("KHd+"),c=Object(u.a)(i,r,[],!1,null,null,null);c.options.__file="src/components/SectionHeader.vue";e.a=c.exports},hpAl:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return o}));var r=/(<([^>]+)>)/gi,a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return String(t).replace(r,"")},o=function(t,e){return t?{innerHTML:t}:e?{textContent:e}:{}}},"kO/s":function(t,e,n){"use strict";e.a={props:{id:{type:String}},data:function(){return{localId_:null}},computed:{safeId:function(){var t=this.id||this.localId_;return function(e){return t?(e=String(e||"").replace(/\s+/g,"_"))?t+"_"+e:t:null}}},mounted:function(){var t=this;this.$nextTick((function(){t.localId_="__BVID__".concat(t._uid)}))}}},qZlm:function(t,e,n){"use strict";var r=n("bAY6"),a=n("Iyau"),o=n("2C+6");e.a=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:r.a;return(Object(a.d)(t)?t.slice():Object(o.k)(t)).reduce((function(t,r){return t[n(r)]=e[r],t}),{})}}}]);