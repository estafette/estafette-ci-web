(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[535],{5193:function(t,e,n){"use strict";n.d(e,{N:function(){return w},T:function(){return U}});var r=n(538),a=n(9558),i=n(4689),o=n(3663),u=n(2299),s=n(1572),c=n(6410),l=n(8415),d=n(3284),f=n(7040),p=n(451),b=n(488),v=n(7347);function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){m(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var y=(0,f.CE)(v.NQ,["event","routerTag"]);delete y.href.default,delete y.to.default;var w=(0,p.y2)((0,f.GE)(g(g({},y),{},{block:(0,p.pi)(u.U5,!1),disabled:(0,p.pi)(u.U5,!1),pill:(0,p.pi)(u.U5,!1),pressed:(0,p.pi)(u.U5,null),size:(0,p.pi)(u.N0),squared:(0,p.pi)(u.U5,!1),tag:(0,p.pi)(u.N0,"button"),type:(0,p.pi)(u.N0,"button"),variant:(0,p.pi)(u.N0,"secondary")})),i.MZ),_=function(t){"focusin"===t.type?(0,c.cn)(t.target,"focus"):"focusout"===t.type&&(0,c.IV)(t.target,"focus")},O=function(t){return(0,b.u$)(t)||(0,c.YR)(t.tag,"a")},j=function(t){return(0,d.jn)(t.pressed)},C=function(t){return!(O(t)||t.tag&&!(0,c.YR)(t.tag,"button"))},k=function(t){return!O(t)&&!C(t)},x=function(t){var e;return["btn-".concat(t.variant||"secondary"),(e={},m(e,"btn-".concat(t.size),t.size),m(e,"btn-block",t.block),m(e,"rounded-pill",t.pill),m(e,"rounded-0",t.squared&&!t.pill),m(e,"disabled",t.disabled),m(e,"active",t.pressed),e)]},N=function(t){return O(t)?(0,p.uj)(y,t):{}},P=function(t,e){var n=C(t),r=O(t),a=j(t),i=k(t),o=r&&"#"===t.href,u=e.attrs&&e.attrs.role?e.attrs.role:null,s=e.attrs?e.attrs.tabindex:null;return(i||o)&&(s="0"),{type:n&&!r?t.type:null,disabled:n?t.disabled:null,role:i||o?"button":u,"aria-disabled":i?String(t.disabled):null,"aria-pressed":a?String(t.pressed):null,autocomplete:a?"off":null,tabindex:t.disabled&&!n?"-1":s}},U=r.Z.extend({name:i.MZ,functional:!0,props:w,render:function(t,e){var n=e.props,r=e.data,i=e.listeners,u=e.children,c=j(n),f=O(n),p=k(n),b=f&&"#"===n.href,h={keydown:function(t){if(!n.disabled&&(p||b)){var e=t.keyCode;if(e===o.m5||e===o.K2&&p){var r=t.currentTarget||t.target;(0,l.p7)(t,{propagation:!1}),r.click()}}},click:function(t){n.disabled&&(0,d.cO)(t)?(0,l.p7)(t):c&&i&&i["update:pressed"]&&(0,s.zo)(i["update:pressed"]).forEach((function(t){(0,d.mf)(t)&&t(!n.pressed)}))}};c&&(h.focusin=_,h.focusout=_);var g={staticClass:"btn",class:x(n),props:N(n),attrs:P(n,r),on:h};return t(f?v.we:n.tag,(0,a.b)(r,g),u)}})},9406:function(t,e,n){"use strict";n.d(e,{M:function(){return v}});var r=n(538),a=n(9558),i=n(4689),o=n(2299),u=n(494),s=n(8735),c=n(2345),l=n(451);var d=(0,l.y2)({fluid:(0,l.pi)(o.gL,!1),tag:(0,l.pi)(o.N0,"div")},i.aU),f=r.Z.extend({name:i.aU,functional:!0,props:d,render:function(t,e){var n,r,i,o=e.props,u=e.data,s=e.children,c=o.fluid;return t(o.tag,(0,a.b)(u,{class:(n={container:!(c||""===c),"container-fluid":!0===c||""===c},r="container-".concat(c),i=c&&!0!==c,r in n?Object.defineProperty(n,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[r]=i,n)}),s)}});function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b=(0,l.y2)({bgVariant:(0,l.pi)(o.N0),borderVariant:(0,l.pi)(o.N0),containerFluid:(0,l.pi)(o.gL,!1),fluid:(0,l.pi)(o.U5,!1),header:(0,l.pi)(o.N0),headerHtml:(0,l.pi)(o.N0),headerLevel:(0,l.pi)(o.fE,3),headerTag:(0,l.pi)(o.N0,"h1"),lead:(0,l.pi)(o.N0),leadHtml:(0,l.pi)(o.N0),leadTag:(0,l.pi)(o.N0,"p"),tag:(0,l.pi)(o.N0,"div"),textVariant:(0,l.pi)(o.N0)},i.Qf),v=r.Z.extend({name:i.Qf,functional:!0,props:b,render:function(t,e){var n,r=e.props,i=e.data,o=e.slots,l=e.scopedSlots,d=r.header,b=r.headerHtml,v=r.lead,h=r.leadHtml,g=r.textVariant,m=r.bgVariant,y=r.borderVariant,w=l||{},_=o(),O={},j=t(),C=(0,c.Q)(u._0,w,_);if(C||d||b){var k=r.headerLevel;j=t(r.headerTag,{class:p({},"display-".concat(k),k),domProps:C?{}:(0,s.U)(b,d)},(0,c.O)(u._0,O,w,_))}var x=t(),N=(0,c.Q)(u.WU,w,_);(N||v||h)&&(x=t(r.leadTag,{staticClass:"lead",domProps:N?{}:(0,s.U)(h,v)},(0,c.O)(u.WU,O,w,_)));var P=[j,x,(0,c.O)(u.Pq,O,w,_)];return r.fluid&&(P=[t(f,{props:{fluid:r.containerFluid}},P)]),t(r.tag,(0,a.b)(i,{staticClass:"jumbotron",class:(n={"jumbotron-fluid":r.fluid},p(n,"text-".concat(g),g),p(n,"bg-".concat(m),m),p(n,"border-".concat(y),y),p(n,"border",y),n)}),P)}})},3663:function(t,e,n){"use strict";n.d(e,{d1:function(){return r},oD:function(){return a},RV:function(){return i},bt:function(){return o},K2:function(){return u},RZ:function(){return s},QI:function(){return c},Cq:function(){return l},YO:function(){return d},m5:function(){return f},XS:function(){return p}});var r=8,a=46,i=40,o=35,u=13,s=27,c=36,l=37,d=39,f=32,p=38},8735:function(t,e,n){"use strict";n.d(e,{o:function(){return a},U:function(){return i}});var r=n(824),a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return String(t).replace(r.ny,"")},i=function(t,e){return t?{innerHTML:t}:e?{textContent:e}:{}}},947:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return d}});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-jumbotron",{staticClass:"section-header",attrs:{header:"Estafette","bg-variant":"dark","text-variant":"success","header-level":"4","container-fluid":"",fluid:""}}),t._v(" "),n("div",{staticClass:"row mr-0 ml-0"},[n("div",{staticClass:"col-12"},[n("b-jumbotron",{staticClass:"mb-3 pl-4 pt-4 pr-4 pb-5 rounded border",attrs:{lead:"Your portal to application development & management","bg-variant":"white","text-variant":"dark","header-level":"3","container-fluid":"",fluid:""},scopedSlots:t._u([{key:"header",fn:function(){return[n("span",{staticClass:"text-success font-italic"},[t._v("\n            Estafette\n          ")])]},proxy:!0}])},[t._v(" "),n("p",[t._v("For more information visit the public website.")]),t._v(" "),n("b-button",{attrs:{variant:"success",href:"https://estafette.io/",target:"_blank"}},[t._v("\n          Learn more\n        ")])],1)],1)]),t._v(" "),n("div",{staticClass:"row justify-content-center ml-3 mr-3 border rounded bg-white pt-5 pb-5"},[n("div",{staticClass:"col-12 col-md-6 col-xl-3 text-center"},[n("h1",{staticClass:"display-4"},[t._v("\n        Login\n      ")]),t._v(" "),n("p",[t._v("Please log in with one of the following providers:")]),t._v(" "),t._l(t.providers,(function(e){return n("b-button",{key:e.id,staticClass:"mt-3 mb-3",attrs:{href:t.path(e),variant:"success",block:""}},[n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:["fab",e.id]}}),t._v("\n        "+t._s(e.name)+"\n      ")],1)}))],2)])],1)};r._withStripped=!0;var a=n(9406),i=n(5193),o=n(8947),u=n(1417),s=n(7810);o.vI.add(u.xYR,u.hVS,u.neY,u.zhw,u.KOC,u.JE);var c={components:{BJumbotron:a.M,BButton:i.T,FontAwesomeIcon:s.GN},data:function(){return{providers:[]}},created:function(){this.loadProviders()},methods:{path:function(t){var e=t.path,n=!1,r=this.$route.query.returnURL;return r&&(e+="?returnURL="+r,n=!0),t.organization&&(e+=n?"&":"?",e+="organization="+t.organization),e},loadProviders:function(){var t=this;this.axios.get("/api/auth/providers").then((function(e){t.providers=e.data})).catch((function(t){console.warn(t)}))}}},l=(0,n(1900).Z)(c,r,[],!1,null,null,null);l.options.__file="src/views/Login.vue";var d=l.exports}}]);