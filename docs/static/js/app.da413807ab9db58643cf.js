(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{L1Pe:function(e,n,t){},Vtdi:function(e,n,t){"use strict";t.r(n);var r=t("oCYn"),i=t("vDqi"),a=t.n(i),o=t("p/7L"),s=t.n(o),l=function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("side-navigation-bar"),this._v(" "),n("div",{attrs:{id:"main"}},[n("router-view")],1)],1)};l._withStripped=!0;var u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("b-nav",{staticClass:"main-sidebar-nav",attrs:{vertical:""}},[t("b-nav-item",{staticClass:"logo",attrs:{to:{name:"Home"},exact:""}},[t("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:"shipping-fast"}}),e._v(" "),t("span",[e._v("\n      Estafette\n    ")])],1),e._v(" "),e._l(e.routes,(function(n){return t("b-nav-item",{key:n.name,class:n.meta&&n.meta.class?n.meta.class:"",attrs:{to:{name:n.name},exact:!!n.meta&&n.meta.exact}},[t("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:n.meta?n.meta.icon:""}}),e._v(" "),t("span",[e._v("\n      "+e._s(n.meta&&n.meta.text?n.meta.text:n.name)+"\n    ")])],1)}))],2)};u._withStripped=!0;var c=t("L2JU"),m=t("Wfsh"),p=t("RxEo"),d=t("7O5W"),h=t("wHSu"),f=t("rT2p");function g(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}d.c.add(h.L,h.Q,h.d,h.B,h.F,h.n,h.p,h.T,h.y,h.V,h.N);var b={components:{BNav:m.a,BNavItem:p.a,FontAwesomeIcon:f.a},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){g(e,n,t[n])}))}return e}({},Object(c.b)("user",{user:"me"}),{routes:function(){var e=this,n=!1;return this.$router.options.routes.filter((function(n){return(!n.meta||!n.meta.hide)&&(!!(e.user&&e.user.active||n.meta&&n.meta.allowedWithoutAuth)&&!(n.meta&&n.meta.requiredRole&&!(e.user&&e.user.active&&e.user.roles&&e.user.roles.includes(n.meta.requiredRole))))})).map((function(t){return t.meta&&t.meta.textFunction&&e.isFunction(t.meta.textFunction)&&(t.meta.text=t.meta.textFunction(e.user)),t.meta&&t.meta.position&&"bottom"===t.meta.position&&!n&&(t.meta.class="mt-auto",n=!0),t}))}})},v=t("KHd+"),P=Object(v.a)(b,u,[],!1,null,null,null);P.options.__file="src/components/SideNavigationBar.vue";var w={components:{SideNavigationBar:P.exports}},y=(t("XAuw"),Object(v.a)(w,l,[],!1,null,null,null));y.options.__file="src/App.vue";var x=y.exports,M=t("jE9Z");r.a.use(M.a);var C=new M.a({mode:"history",linkActiveClass:"active",routes:[{path:"/",name:"Home",component:function(){return Promise.all([t.e(20),t.e(9)]).then(t.bind(null,"u1G+"))},meta:{icon:"home",exact:!0}},{path:"/login",name:"Login",component:function(){return Promise.all([t.e(22),t.e(11)]).then(t.bind(null,"pVsz"))},meta:{allowedWithoutAuth:!0,hide:!0}},{path:"/pipelines",name:"Pipelines",component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"K4Xp"))},props:function(e){return{query:e.query}},meta:{text:"Builds & releases",icon:"tools",banner:!0,lead:"View and release applications",variant:"success"}},{path:"/pipelines/:repoSource/:repoOwner/:repoName",name:"PipelineDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"HECz"))},redirect:{name:"PipelineOverview"},children:[{path:"overview",name:"PipelineOverview",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"bvzo"))},meta:{text:"Overview",icon:"industry"}},{path:"builds",name:"PipelineBuilds",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"LMxC"))},meta:{text:"Builds",icon:"tools"}},{path:"releases",name:"PipelineReleases",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"Ukwp"))},meta:{text:"Releases",icon:"upload"}},{path:"triggers",name:"PipelineTriggers",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"iOe7"))},meta:{text:"Trigger",icon:"project-diagram"}},{path:"statistics",name:"PipelineStatistics",props:function(e){return{query:e.query}},component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"ze2c"))},meta:{text:"Insights",icon:"lightbulb"}},{path:"encrypt",name:"PipelineSecretEncrypter",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"sv8Y"))},meta:{text:"Secrets",icon:"user-secret"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/builds/:id",name:"PipelineBuildDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"gP8g"))},children:[{path:"logs",name:"PipelineBuildLogs",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"Wo8F"))},meta:{text:"Logs",icon:"poll-h"}},{path:"manifest",name:"PipelineBuildManifest",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"14Sm"))},meta:{text:"Manifest",icon:"book"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/releases/:releaseID",name:"PipelineReleaseDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"zrtL"))},children:[{path:"logs",name:"PipelineReleaseLogs",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"OOkl"))},meta:{text:"Logs",icon:"poll-h"}}]},{path:"/catalog",name:"Catalog",component:function(){return Promise.all([t.e(0),t.e(2),t.e(19),t.e(6)]).then(t.bind(null,"JH23"))},props:function(e){return{query:e.query}},meta:{icon:"book-open",banner:!0,lead:"View ownership, performance and more",variant:"info"}},{path:"/catalog/:repoSource/:repoOwner/:repoName",name:"CatalogItemDetails",meta:{hide:!0},component:function(){return Promise.all([t.e(0),t.e(2),t.e(19),t.e(6)]).then(t.bind(null,"mMhM"))},props:!0,redirect:{name:"CatalogItemOverview"},children:[{path:"overview",name:"CatalogItemOverview",props:!0,component:function(){return Promise.all([t.e(0),t.e(2),t.e(19),t.e(6)]).then(t.bind(null,"yDV2"))},meta:{text:"Overview",icon:"industry"}}]},{path:"/insights",name:"Insights",component:function(){return Promise.all([t.e(2),t.e(27)]).then(t.bind(null,"1Xn/"))},meta:{icon:"lightbulb",banner:!0,lead:"See stats, rankings and trends",variant:"primary"},props:!0,redirect:{name:"InsightsCounters"},children:[{path:"counters",name:"InsightsCounters",props:!0,component:function(){return Promise.all([t.e(21),t.e(10)]).then(t.bind(null,"nAZy"))},meta:{text:"Counters",icon:"chart-pie"}},{path:"rankings",name:"InsightsRankings",props:!0,component:function(){return Promise.all([t.e(21),t.e(10)]).then(t.bind(null,"ZDmJ"))},meta:{text:"Rankings",icon:"list-ol"}},{path:"trends",name:"InsightsTrends",props:!0,component:function(){return Promise.all([t.e(21),t.e(10)]).then(t.bind(null,"b28C"))},meta:{text:"Trends",icon:"chart-line"}}]},{path:"/create",name:"Create",component:function(){return Promise.all([t.e(2),t.e(27)]).then(t.bind(null,"1Xn/"))},meta:{icon:"plus-circle",banner:!0,lead:"Generate and validate manifests",variant:"warning"},props:!0,redirect:{name:"ManifestGenerator"},children:[{path:"generate",name:"ManifestGenerator",props:!0,meta:{icon:"hammer",text:"Generate"},component:function(){return Promise.all([t.e(1),t.e(8)]).then(t.bind(null,"XB7O"))}},{path:"validate",name:"ManifestValidator",props:!0,meta:{text:"Validate",icon:"clipboard-check"},component:function(){return Promise.all([t.e(1),t.e(8)]).then(t.bind(null,"wcEu"))}}]},{path:"/configuration",name:"Configuration",props:!0,component:function(){return Promise.all([t.e(2),t.e(27)]).then(t.bind(null,"1Xn/"))},meta:{icon:"cogs",position:"bottom"},redirect:{name:"ConfigurationCredentials"},children:[{path:"credentials",name:"ConfigurationCredentials",props:!0,component:function(){return t.e(7).then(t.bind(null,"03/4"))},meta:{text:"Credentials",icon:"key"}},{path:"trusted-images",name:"ConfigurationTrustedImages",props:!0,component:function(){return t.e(7).then(t.bind(null,"G8Jt"))},meta:{requiredRole:"administrator",text:"Trusted Images",icon:"shield-alt"}}]},{path:"/admin",name:"Admin",props:!0,component:function(){return Promise.all([t.e(2),t.e(27)]).then(t.bind(null,"1Xn/"))},meta:{icon:"sliders-h",position:"bottom",requiredRole:"administrator"},redirect:{name:"AdminUsers"},children:[{path:"users",name:"AdminUsers",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"YTVD"))},meta:{requiredRole:"administrator",text:"Users",icon:"user"}},{path:"groups",name:"AdminGroups",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"h0kL"))},meta:{requiredRole:"administrator",text:"Groups",icon:"users"}},{path:"groups/create",name:"AdminGroupCreate",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"iUgf"))},meta:{requiredRole:"administrator",hide:!0}},{path:"groups/:id/edit",name:"AdminGroupUpdate",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"s3SF"))},meta:{requiredRole:"administrator",hide:!0}},{path:"organizations",name:"AdminOrganizations",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"nyiG"))},meta:{requiredRole:"administrator",text:"Organizations",icon:"sitemap"}},{path:"organizations/create",name:"AdminOrganizationCreate",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"i/Bd"))},meta:{requiredRole:"administrator",hide:!0}},{path:"organizations/:id/edit",name:"AdminOrganizationUpdate",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"bDDd"))},meta:{requiredRole:"administrator",hide:!0}},{path:"clients",name:"AdminClients",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"KqDH"))},meta:{requiredRole:"administrator",text:"Clients",icon:"mobile-alt"}},{path:"clients/create",name:"AdminClientCreate",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"0QF3"))},meta:{requiredRole:"administrator",hide:!0}},{path:"clients/:id/edit",name:"AdminClientUpdate",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(3),t.e(17),t.e(4)]).then(t.bind(null,"GaE+"))},meta:{requiredRole:"administrator",hide:!0}},{path:"encrypt",name:"AdminSecretEncrypter",props:!0,component:function(){return Promise.all([t.e(1),t.e(0),t.e(2),t.e(24),t.e(13)]).then(t.bind(null,"sv8Y"))},meta:{requiredRole:"administrator",text:"Secrets",icon:"user-secret"}}]},{path:"/user",name:"User",props:!0,component:function(){return Promise.all([t.e(2),t.e(27)]).then(t.bind(null,"1Xn/"))},redirect:{name:"UserDetails"},meta:{textFunction:function(e){if(e&&e.identities&&e.identities.length>0){var n=e.identities.find((function(e){return e.name}));if(n&&n.name)return n.name}return e&&e.email?e.email:""},icon:"user-circle",position:"bottom"},children:[{path:"details",name:"UserDetails",props:!0,component:function(){return Promise.all([t.e(3),t.e(14)]).then(t.bind(null,"fIft"))},meta:{text:"Details",icon:"passport"}},{path:"preferences",name:"UserPreferences",props:!0,component:function(){return Promise.all([t.e(2),t.e(27)]).then(t.bind(null,"IVmu"))},meta:{text:"Preferences",icon:"heart"}}]},{path:"/logs/:repoSource/:repoOwner/:repoName/:repoBranch/:id",name:"LegacyLogs",redirect:{name:"PipelineBuildLogs"},meta:{hide:!0}},{path:"/statistics",redirect:{name:"Insights"},meta:{hide:!0},children:[{path:"counters",redirect:{name:"InsightsCounters"}},{path:"rankings",redirect:{name:"InsightsRankings"}},{path:"trends",redirect:{name:"InsightsTrends"}}]},{path:"/config",redirect:{name:"Configuration"},meta:{hide:!0}},{path:"/manifest",redirect:{name:"Create"},meta:{hide:!0},children:[{path:"generate",redirect:{name:"ManifestGenerator"}},{path:"validate",redirect:{name:"ManifestValidator"}}]}]}),R=function(){return a.a.get("/api/me/")},O={namespaced:!0,state:function(){return{me:null,loaded:!1}},mutations:{set:function(e,n){e.me=n,e.loaded=!0},reset:function(e){e.me=null}},actions:{load:function(e){var n=e.commit;return R().then((function(e){n("set",e.data)})).catch((function(e){console.warn(e)}))},logout:function(e){(0,e.commit)("reset")}}},q=function(e,n){var t="";e&&e.labels&&e.labels.length>0&&(t=e.labels.split(",").join("&filter[labels]="));var r="filter[status]=".concat(e.status);return"running"===e.status&&(r+="&filter[status]=pending&filter[status]=canceling"),a.a.get("/api/pipelines/?".concat(r,"&filter[since]=").concat(e.since,"&filter[search]=").concat(e.search,"&filter[labels]=").concat(t,"&page[number]=").concat(n.page,"&page[size]=").concat(n.size))},S=function(e,n,t){e("cancelTimeouts");var r=1e3*t*.75,i=1e3*t*1.25,a=Math.floor(Math.random()*(r-i+1)+i);e("setTimeout",setTimeout(n,a))},A={namespaced:!0,state:function(){return{pipelines:[],pagination:{page:1,size:12,totalPages:0,totalItems:0},timeouts:[]}},mutations:{set:function(e,n){e.pipelines=n.pipelines,e.pagination=n.pagination},reset:function(e){e.pipelines=[]},setTimeout:function(e,n){e.timeouts.push(n)},cancelTimeouts:function(e){var n=!0,t=!1,r=void 0;try{for(var i,a=e.timeouts[Symbol.iterator]();!(n=(i=a.next()).done);n=!0){var o=i.value;clearTimeout(o)}}catch(e){t=!0,r=e}finally{try{n||null==a.return||a.return()}finally{if(t)throw r}}e.timeouts=[]}},actions:{loadPipelines:function(e,n){var t=e.dispatch,r=e.commit,i=e.state;q(n,i.pagination).then((function(e){r("set",{pipelines:e.data.items,pagination:e.data.pagination}),S(r,(function(){return t("loadPipelines")}),30)})).catch((function(e){S(r,(function(){return t("loadPipelines")}),60)}))},destroy:function(e){var n=e.commit;n("cancelTimeouts"),n("reset")}}};r.a.use(c.a);var L=new c.a.Store({modules:{user:O,pipeline:A}}),D=t("wd/R"),I=t.n(D);t("czMo");I.a.locale("en-il");I.a.locale("en-il");r.a.filter("gitHash",(function(e){return e?40!==(e=e.toString()).length?e:e.substring(0,6):""})),r.a.filter("bootstrapClass",(function(e,n){return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?n+"-success":"running"===e||"warning"===e?n+"-warning":"failed"===e||"danger"===e?n+"-danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?n+"-secondary":"pending"===e?n+"-info":"all"===e||"primary"===e?n+"-primary":n+"-light":n+"-light"})),r.a.filter("bootstrapVariant",(function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=n?"outline-":"";return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?t+"success":"running"===e||"warning"===e?t+"warning":"failed"===e||"danger"===e?t+"danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?t+"secondary":"pending"===e?t+"info":"all"===e||"primary"===e?t+"primary":t+"light":t+"light"})),r.a.filter("animatedProgressBar",(function(e){return!!e&&("pending"===(e=e.toString().toLowerCase())||"running"===e||"canceling"===e)})),r.a.filter("defaultValue",(function(e,n){return e||n})),r.a.filter("capitalize",(function(e){return e?(e=e.toString()).charAt(0).toUpperCase()+e.slice(1):""})),r.a.filter("colorDurationClass",(function(e){if(null===e)return"";if(e<=0)return"";var n=Math.floor(e/Math.pow(10,9));return n>300?"text-danger":n>120?"text-warning":"text-success"})),r.a.filter("formatDatetime",(function(e){return null===e?"":I()(e).isSame(I()(),"year")?I()(e).isSame(I()(),"day")?I()(e).format("[today] [at] H:mm"):I()(e).format("D MMM [at] H:mm"):I()(e).format("D MMM YYYY [at] H:mm")})),r.a.filter("moment",(function(e,n){return I()(e).format(n)})),r.a.filter("formatDuration",(function(e){if(null===e)return"";if(e<0)return"";var n=Math.floor(e/(86400*Math.pow(10,9))),t=e%(86400*Math.pow(10,9)),r=Math.floor(t/(3600*Math.pow(10,9))),i=t%(3600*Math.pow(10,9)),a=Math.floor(i/(60*Math.pow(10,9))),o=i%(60*Math.pow(10,9)),s=Math.floor(o/Math.pow(10,9)),l=o%Math.pow(10,9),u=Math.floor(l/Math.pow(10,8)),c="";return n>0&&(c+="".concat(n,"d")),(r>0||n>0)&&(c+="".concat(r,"h")),(a>0||r>0||n>0)&&(c+="".concat(a,"m")),(u>0||s>0)&&0===a&&0===r?c+="".concat(s,".").concat(u,"s"):(s>0||a>0||r>0||n>0)&&(c+="".concat(s,"s")),""===c&&(c="-"),c})),r.a.filter("formatBytes",(function(e){if(!e)return"";if(e<=0)return"";var n=Math.floor(e/Math.pow(2,30)),t=e%Math.pow(2,30),r=Math.floor(t/Math.pow(2,20)),i="";if(n>0){var a=Math.floor(10*t/Math.pow(2,30));i+="".concat(n,".").concat(a,"GB")}return r>0&&0===n&&(i+="".concat(r,"MB")),i})),r.a.filter("formatNumber",(function(e){return null===e?"":new Intl.NumberFormat("de-DE").format(e)})),r.a.filter("splitCamelcase",(function(e){return e?e.replace(/([a-z])([A-Z])/g,"$1 $2"):""}));var k=t("JhbM");r.a.directive("b-tooltip",k.a),r.a.use(s.a,a.a),r.a.axios.interceptors.request.use((function(e){return e.headers={"X-Requested-With":"XMLHttpRequest"},e}),(function(e){return Promise.reject(e)})),r.a.axios.interceptors.response.use((function(e){return e}),(function(e){if(e.response)switch(e.response.status){case 401:L.dispatch("user/logout")}return Promise.reject(new Error(e.response.data.error||e.message))})),L.watch((function(e){return e.user.me}),(function(e,n){!e&&n&&(n.currentProvider?window.location.href="/api/auth/login/"+n.currentProvider+"/?returnURL="+C.currentRoute.fullPath:C.replace({name:"Login",query:{returnURL:C.currentRoute.fullPath}}))}));var B=function(e,n){var t=L.state.user.me,r=t&&t.active;!e.meta||!e.meta.requiredRole||t&&t.active&&t.roles&&t.roles.includes(e.meta.requiredRole)?e.matched.some((function(e){return!e.meta.allowedWithoutAuth}))&&!r?n({name:"Login",query:{returnURL:e.fullPath}}):n():n(!1)};C.beforeEach((function(e,n,t){"Login"!==e.name?L.state.user.loaded?B(e,t):L.dispatch("user/load").then((function(){B(e,t)})):t()})),r.a.config.productionTip=!1,new r.a({el:"#app",router:C,store:L,components:{App:x},template:"<App/>"})},XAuw:function(e,n,t){"use strict";var r=t("L1Pe");t.n(r).a}},[["Vtdi",15,18]]]);