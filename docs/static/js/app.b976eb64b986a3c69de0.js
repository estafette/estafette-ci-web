(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{L1Pe:function(e,t,n){},Vtdi:function(e,t,n){"use strict";n.r(t);var r=n("oCYn"),i=n("vDqi"),a=n.n(i),o=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("side-navigation-bar"),this._v(" "),t("div",{attrs:{id:"main"}},[t("router-view")],1)],1)};o._withStripped=!0;var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-nav",{staticClass:"main-sidebar-nav",attrs:{vertical:""}},[n("b-nav-item",{staticClass:"logo",attrs:{to:{name:"Home"},exact:""}},[n("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:"shipping-fast"}}),e._v(" "),n("span",[e._v("\n      Estafette\n    ")])],1),e._v(" "),e._l(e.routes,(function(t){return n("b-nav-item",{key:t.name,class:t.meta&&t.meta.class?t.meta.class:"",attrs:{to:{name:t.name},exact:!!t.meta&&t.meta.exact}},[n("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:t.meta?t.meta.icon:""}}),e._v(" "),n("span",[e._v("\n      "+e._s(t.meta&&t.meta.text?t.meta.text:t.name)+"\n    ")])],1)}))],2)};s._withStripped=!0;var l=n("L2JU"),u=n("Wfsh"),c=n("RxEo"),m=n("7O5W"),p=n("wHSu"),d=n("rT2p");function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}m.c.add(p.L,p.Q,p.d,p.B,p.F,p.n,p.p,p.T,p.y,p.V,p.N);var f={components:{BNav:u.a,BNavItem:c.a,FontAwesomeIcon:d.a},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){h(e,t,n[t])}))}return e}({},Object(l.b)("user",{user:"me"}),{routes:function(){var e=this,t=!1;return this.$router.options.routes.filter((function(t){return(!t.meta||!t.meta.hide)&&(!!(e.user&&e.user.active||t.meta&&t.meta.allowedWithoutAuth)&&!(t.meta&&t.meta.requiredRole&&!(e.user&&e.user.active&&e.user.roles&&e.user.roles.includes(t.meta.requiredRole))))})).map((function(n){return n.meta&&n.meta.textFunction&&e.isFunction(n.meta.textFunction)&&(n.meta.text=n.meta.textFunction(e.user)),n.meta&&n.meta.position&&"bottom"===n.meta.position&&!t&&(n.meta.class="mt-auto",t=!0),n}))}})},g=n("KHd+"),b=Object(g.a)(f,s,[],!1,null,null,null);b.options.__file="src/components/SideNavigationBar.vue";var v={components:{SideNavigationBar:b.exports}},P=(n("XAuw"),Object(g.a)(v,o,[],!1,null,null,null));P.options.__file="src/App.vue";var w=P.exports,y=n("jE9Z");r.a.use(y.a);var x=new y.a({mode:"history",linkActiveClass:"active",routes:[{path:"/",name:"Home",component:function(){return Promise.all([n.e(20),n.e(9)]).then(n.bind(null,"u1G+"))},meta:{icon:"home",exact:!0}},{path:"/login",name:"Login",component:function(){return Promise.all([n.e(22),n.e(11)]).then(n.bind(null,"pVsz"))},meta:{allowedWithoutAuth:!0,hide:!0}},{path:"/pipelines",name:"Pipelines",component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"K4Xp"))},props:function(e){return{query:e.query}},meta:{text:"Builds & releases",icon:"tools",banner:!0,lead:"View and release applications",variant:"success"}},{path:"/pipelines/:repoSource/:repoOwner/:repoName",name:"PipelineDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"HECz"))},redirect:{name:"PipelineOverview"},children:[{path:"overview",name:"PipelineOverview",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"bvzo"))},meta:{text:"Overview",icon:"industry"}},{path:"builds",name:"PipelineBuilds",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"LMxC"))},meta:{text:"Builds",icon:"tools"}},{path:"releases",name:"PipelineReleases",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"Ukwp"))},meta:{text:"Releases",icon:"upload"}},{path:"triggers",name:"PipelineTriggers",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"iOe7"))},meta:{text:"Trigger",icon:"project-diagram"}},{path:"statistics",name:"PipelineStatistics",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"ze2c"))},meta:{text:"Insights",icon:"lightbulb"}},{path:"encrypt",name:"PipelineSecretEncrypter",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"sv8Y"))},meta:{text:"Secrets",icon:"user-secret"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/builds/:id",name:"PipelineBuildDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"gP8g"))},children:[{path:"logs",name:"PipelineBuildLogs",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"Wo8F"))},meta:{text:"Logs",icon:"poll-h"}},{path:"manifest",name:"PipelineBuildManifest",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"14Sm"))},meta:{text:"Manifest",icon:"book"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/releases/:releaseID",name:"PipelineReleaseDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"zrtL"))},children:[{path:"logs",name:"PipelineReleaseLogs",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"OOkl"))},meta:{text:"Logs",icon:"poll-h"}}]},{path:"/catalog",name:"Catalog",component:function(){return Promise.all([n.e(0),n.e(2),n.e(19),n.e(6)]).then(n.bind(null,"JH23"))},props:function(e){return{query:e.query}},meta:{icon:"book-open",banner:!0,lead:"View ownership, performance and more",variant:"info"}},{path:"/catalog/:repoSource/:repoOwner/:repoName",name:"CatalogItemDetails",meta:{hide:!0},component:function(){return Promise.all([n.e(0),n.e(2),n.e(19),n.e(6)]).then(n.bind(null,"mMhM"))},props:!0,redirect:{name:"CatalogItemOverview"},children:[{path:"overview",name:"CatalogItemOverview",props:!0,component:function(){return Promise.all([n.e(0),n.e(2),n.e(19),n.e(6)]).then(n.bind(null,"yDV2"))},meta:{text:"Overview",icon:"industry"}}]},{path:"/insights",name:"Insights",component:function(){return Promise.all([n.e(2),n.e(27)]).then(n.bind(null,"1Xn/"))},meta:{icon:"lightbulb",banner:!0,lead:"See stats, rankings and trends",variant:"primary"},props:!0,redirect:{name:"InsightsCounters"},children:[{path:"counters",name:"InsightsCounters",props:!0,component:function(){return Promise.all([n.e(21),n.e(10)]).then(n.bind(null,"nAZy"))},meta:{text:"Counters",icon:"chart-pie"}},{path:"rankings",name:"InsightsRankings",props:!0,component:function(){return Promise.all([n.e(21),n.e(10)]).then(n.bind(null,"ZDmJ"))},meta:{text:"Rankings",icon:"list-ol"}},{path:"trends",name:"InsightsTrends",props:!0,component:function(){return Promise.all([n.e(21),n.e(10)]).then(n.bind(null,"b28C"))},meta:{text:"Trends",icon:"chart-line"}}]},{path:"/create",name:"Create",component:function(){return Promise.all([n.e(2),n.e(27)]).then(n.bind(null,"1Xn/"))},meta:{icon:"plus-circle",banner:!0,lead:"Generate and validate manifests",variant:"warning"},props:!0,redirect:{name:"ManifestGenerator"},children:[{path:"generate",name:"ManifestGenerator",props:!0,meta:{icon:"hammer",text:"Generate"},component:function(){return Promise.all([n.e(1),n.e(8)]).then(n.bind(null,"XB7O"))}},{path:"validate",name:"ManifestValidator",props:!0,meta:{text:"Validate",icon:"clipboard-check"},component:function(){return Promise.all([n.e(1),n.e(8)]).then(n.bind(null,"wcEu"))}}]},{path:"/configuration",name:"Configuration",props:!0,component:function(){return Promise.all([n.e(2),n.e(27)]).then(n.bind(null,"1Xn/"))},meta:{icon:"cogs",position:"bottom"},redirect:{name:"ConfigurationCredentials"},children:[{path:"credentials",name:"ConfigurationCredentials",props:!0,component:function(){return n.e(7).then(n.bind(null,"03/4"))},meta:{text:"Credentials",icon:"key"}},{path:"trusted-images",name:"ConfigurationTrustedImages",props:!0,component:function(){return n.e(7).then(n.bind(null,"G8Jt"))},meta:{requiredRole:"administrator",text:"Trusted Images",icon:"shield-alt"}}]},{path:"/admin",name:"Admin",props:!0,component:function(){return Promise.all([n.e(2),n.e(27)]).then(n.bind(null,"1Xn/"))},meta:{icon:"sliders-h",position:"bottom",requiredRole:"administrator"},redirect:{name:"AdminUsers"},children:[{path:"users",name:"AdminUsers",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"YTVD"))},meta:{requiredRole:"administrator",text:"Users",icon:"user"}},{path:"groups",name:"AdminGroups",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"h0kL"))},meta:{requiredRole:"administrator",text:"Groups",icon:"users"}},{path:"groups/create",name:"AdminGroupCreate",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"iUgf"))},meta:{requiredRole:"administrator",hide:!0}},{path:"groups/:id/edit",name:"AdminGroupUpdate",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"s3SF"))},meta:{requiredRole:"administrator",hide:!0}},{path:"organizations",name:"AdminOrganizations",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"nyiG"))},meta:{requiredRole:"administrator",text:"Organizations",icon:"sitemap"}},{path:"organizations/create",name:"AdminOrganizationCreate",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"i/Bd"))},meta:{requiredRole:"administrator",hide:!0}},{path:"organizations/:id/edit",name:"AdminOrganizationUpdate",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"bDDd"))},meta:{requiredRole:"administrator",hide:!0}},{path:"clients",name:"AdminClients",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"KqDH"))},meta:{requiredRole:"administrator",text:"Clients",icon:"mobile-alt"}},{path:"clients/create",name:"AdminClientCreate",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"0QF3"))},meta:{requiredRole:"administrator",hide:!0}},{path:"clients/:id/edit",name:"AdminClientUpdate",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(17),n.e(4)]).then(n.bind(null,"GaE+"))},meta:{requiredRole:"administrator",hide:!0}},{path:"encrypt",name:"AdminSecretEncrypter",props:!0,component:function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(24),n.e(13)]).then(n.bind(null,"sv8Y"))},meta:{requiredRole:"administrator",text:"Secrets",icon:"user-secret"}}]},{path:"/user",name:"User",props:!0,component:function(){return Promise.all([n.e(2),n.e(27)]).then(n.bind(null,"1Xn/"))},redirect:{name:"UserDetails"},meta:{textFunction:function(e){if(e&&e.identities&&e.identities.length>0){var t=e.identities.find((function(e){return e.name}));if(t&&t.name)return t.name}return e&&e.email?e.email:""},icon:"user-circle",position:"bottom"},children:[{path:"details",name:"UserDetails",props:!0,component:function(){return Promise.all([n.e(3),n.e(14)]).then(n.bind(null,"fIft"))},meta:{text:"Details",icon:"passport"}},{path:"preferences",name:"UserPreferences",props:!0,component:function(){return Promise.all([n.e(2),n.e(27)]).then(n.bind(null,"IVmu"))},meta:{text:"Preferences",icon:"heart"}}]},{path:"/logs/:repoSource/:repoOwner/:repoName/:repoBranch/:id",name:"LegacyLogs",redirect:{name:"PipelineBuildLogs"},meta:{hide:!0}},{path:"/statistics",redirect:{name:"Insights"},meta:{hide:!0},children:[{path:"counters",redirect:{name:"InsightsCounters"}},{path:"rankings",redirect:{name:"InsightsRankings"}},{path:"trends",redirect:{name:"InsightsTrends"}}]},{path:"/config",redirect:{name:"Configuration"},meta:{hide:!0}},{path:"/manifest",redirect:{name:"Create"},meta:{hide:!0},children:[{path:"generate",redirect:{name:"ManifestGenerator"}},{path:"validate",redirect:{name:"ManifestValidator"}}]}]}),M=function(){return a.a.get("/api/me")},C={namespaced:!0,state:function(){return{me:null,loaded:!1}},mutations:{set:function(e,t){e.me=t,e.loaded=!0},reset:function(e){e.me=null}},actions:{load:function(e){var t=e.commit;return M().then((function(e){t("set",e.data)})).catch((function(e){console.warn(e)}))},logout:function(e){(0,e.commit)("reset")}}},R=function(e,t){var n="";e&&e.labels&&e.labels.length>0&&(n=e.labels.split(",").join("&filter[labels]="));var r="filter[status]=".concat(e.status);return"running"===e.status&&(r+="&filter[status]=pending&filter[status]=canceling"),a.a.get("/api/pipelines?".concat(r,"&filter[since]=").concat(e.since,"&filter[search]=").concat(e.search,"&filter[labels]=").concat(n,"&page[number]=").concat(t.page,"&page[size]=").concat(t.size))},O=function(e,t,n){e("cancelTimeouts");var r=1e3*n*.75,i=1e3*n*1.25,a=Math.floor(Math.random()*(r-i+1)+i);e("setTimeout",setTimeout(t,a))},q={namespaced:!0,state:function(){return{pipelines:[],pagination:{page:1,size:12,totalPages:0,totalItems:0},timeouts:[]}},mutations:{set:function(e,t){e.pipelines=t.pipelines,e.pagination=t.pagination},reset:function(e){e.pipelines=[]},setTimeout:function(e,t){e.timeouts.push(t)},cancelTimeouts:function(e){var t=!0,n=!1,r=void 0;try{for(var i,a=e.timeouts[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var o=i.value;clearTimeout(o)}}catch(e){n=!0,r=e}finally{try{t||null==a.return||a.return()}finally{if(n)throw r}}e.timeouts=[]}},actions:{loadPipelines:function(e,t){var n=e.dispatch,r=e.commit,i=e.state;R(t,i.pagination).then((function(e){r("set",{pipelines:e.data.items,pagination:e.data.pagination}),O(r,(function(){return n("loadPipelines")}),30)})).catch((function(e){O(r,(function(){return n("loadPipelines")}),60)}))},destroy:function(e){var t=e.commit;t("cancelTimeouts"),t("reset")}}};r.a.use(l.a);var S=new l.a.Store({modules:{user:C,pipeline:q}}),A=!1,L=n("wd/R"),D=n.n(L);n("czMo");D.a.locale("en-il");D.a.locale("en-il");r.a.filter("gitHash",(function(e){return e?40!==(e=e.toString()).length?e:e.substring(0,6):""})),r.a.filter("bootstrapClass",(function(e,t){return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?t+"-success":"running"===e||"warning"===e?t+"-warning":"failed"===e||"danger"===e?t+"-danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?t+"-secondary":"pending"===e?t+"-info":"all"===e||"primary"===e?t+"-primary":t+"-light":t+"-light"})),r.a.filter("bootstrapVariant",(function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?"outline-":"";return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?n+"success":"running"===e||"warning"===e?n+"warning":"failed"===e||"danger"===e?n+"danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?n+"secondary":"pending"===e?n+"info":"all"===e||"primary"===e?n+"primary":n+"light":n+"light"})),r.a.filter("animatedProgressBar",(function(e){return!!e&&("pending"===(e=e.toString().toLowerCase())||"running"===e||"canceling"===e)})),r.a.filter("defaultValue",(function(e,t){return e||t})),r.a.filter("capitalize",(function(e){return e?(e=e.toString()).charAt(0).toUpperCase()+e.slice(1):""})),r.a.filter("colorDurationClass",(function(e){if(null===e)return"";if(e<=0)return"";var t=Math.floor(e/Math.pow(10,9));return t>300?"text-danger":t>120?"text-warning":"text-success"})),r.a.filter("formatDatetime",(function(e){return null===e?"":D()(e).isSame(D()(),"year")?D()(e).isSame(D()(),"day")?D()(e).format("[today] [at] H:mm"):D()(e).format("D MMM [at] H:mm"):D()(e).format("D MMM YYYY [at] H:mm")})),r.a.filter("moment",(function(e,t){return D()(e).format(t)})),r.a.filter("formatDuration",(function(e){if(null===e)return"";if(e<0)return"";var t=Math.floor(e/(86400*Math.pow(10,9))),n=e%(86400*Math.pow(10,9)),r=Math.floor(n/(3600*Math.pow(10,9))),i=n%(3600*Math.pow(10,9)),a=Math.floor(i/(60*Math.pow(10,9))),o=i%(60*Math.pow(10,9)),s=Math.floor(o/Math.pow(10,9)),l=o%Math.pow(10,9),u=Math.floor(l/Math.pow(10,8)),c="";return t>0&&(c+="".concat(t,"d")),(r>0||t>0)&&(c+="".concat(r,"h")),(a>0||r>0||t>0)&&(c+="".concat(a,"m")),(u>0||s>0)&&0===a&&0===r?c+="".concat(s,".").concat(u,"s"):(s>0||a>0||r>0||t>0)&&(c+="".concat(s,"s")),""===c&&(c="-"),c})),r.a.filter("formatBytes",(function(e){if(!e)return"";if(e<=0)return"";var t=Math.floor(e/Math.pow(2,30)),n=e%Math.pow(2,30),r=Math.floor(n/Math.pow(2,20)),i="";if(t>0){var a=Math.floor(10*n/Math.pow(2,30));i+="".concat(t,".").concat(a,"GB")}return r>0&&0===t&&(i+="".concat(r,"MB")),i})),r.a.filter("formatNumber",(function(e){return null===e?"":new Intl.NumberFormat("de-DE").format(e)})),r.a.filter("splitCamelcase",(function(e){return e?e.replace(/([a-z])([A-Z])/g,"$1 $2"):""}));var I=n("JhbM");r.a.directive("b-tooltip",I.a),r.a.axios=a.a,r.a.$http=a.a,r.a.prototype.axios=a.a,r.a.prototype.$http=a.a,r.a.axios.interceptors.request.use((function(e){if(A){var t=e.url.split("?");t.length>0&&"/"!==t[0][t[0].length-1]&&(t[0]+="/",e.url=t.join("?"))}return e.headers={"X-Requested-With":"XMLHttpRequest"},e}),(function(e){return Promise.reject(e)})),r.a.axios.interceptors.response.use((function(e){return e}),(function(e){if(e.response)switch(e.response.status){case 401:S.dispatch("user/logout")}return Promise.reject(new Error(e.response.data.error||e.message))})),S.watch((function(e){return e.user.me}),(function(e,t){!e&&t&&(t.currentProvider?window.location.href="/api/auth/login/"+t.currentProvider+"?returnURL="+x.currentRoute.fullPath:x.replace({name:"Login",query:{returnURL:x.currentRoute.fullPath}}))}));var k=function(e,t){var n=S.state.user.me,r=n&&n.active;!e.meta||!e.meta.requiredRole||n&&n.active&&n.roles&&n.roles.includes(e.meta.requiredRole)?e.matched.some((function(e){return!e.meta.allowedWithoutAuth}))&&!r?t({name:"Login",query:{returnURL:e.fullPath}}):t():t(!1)};x.beforeEach((function(e,t,n){"Login"!==e.name?S.state.user.loaded?k(e,n):S.dispatch("user/load").then((function(){k(e,n)})):n()})),r.a.config.productionTip=!1,new r.a({el:"#app",router:x,store:S,components:{App:w},template:"<App/>"})},XAuw:function(e,t,n){"use strict";var r=n("L1Pe");n.n(r).a}},[["Vtdi",15,18]]]);