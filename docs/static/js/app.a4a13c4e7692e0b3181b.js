(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{L1Pe:function(e,t,n){},Vtdi:function(e,t,n){"use strict";n.r(t);var r=n("oCYn"),i=n("vDqi"),a=n.n(i),o=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("side-navigation-bar"),this._v(" "),t("div",{attrs:{id:"main"}},[t("router-view")],1)],1)};o._withStripped=!0;var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-nav",{staticClass:"main-sidebar-nav",attrs:{vertical:""}},[n("b-nav-item",{staticClass:"logo",attrs:{to:{name:"Home"},exact:""}},[n("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:"shipping-fast"}}),e._v(" "),n("span",[e._v("\n      Estafette\n    ")])],1),e._v(" "),e._l(e.routes,(function(t){return n("b-nav-item",{key:t.name,class:t.meta&&t.meta.class?t.meta.class:"",attrs:{to:{name:t.name},exact:!!t.meta&&t.meta.exact}},[n("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:t.meta?t.meta.icon:""}}),e._v(" "),n("span",[e._v("\n      "+e._s(t.meta&&t.meta.text?t.meta.text:t.name)+"\n    ")])],1)}))],2)};s._withStripped=!0;var u=n("L2JU"),l=n("Wfsh"),c=n("RxEo"),p=n("7O5W"),m=n("wHSu"),d=n("rT2p");function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}p.c.add(m.N,m.S,m.d,m.B,m.F,m.n,m.q,m.V,m.y,m.X,m.P);var h={components:{BNav:l.a,BNavItem:c.a,FontAwesomeIcon:d.a},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){f(e,t,n[t])}))}return e}({},Object(u.b)("user",{user:"me"}),{routes:function(){var e=this,t=!1;return this.$router.options.routes.filter((function(t){return(!t.meta||!t.meta.hide)&&(!!(e.user&&e.user.active||t.meta&&t.meta.allowedWithoutAuth)&&!(t.meta&&t.meta.requiredRole&&!(e.user&&e.user.active&&e.user.roles&&e.user.roles.includes(t.meta.requiredRole))))})).map((function(n){return n.meta&&n.meta.textFunction&&e.isFunction(n.meta.textFunction)&&(n.meta.text=n.meta.textFunction(e.user)),n.meta&&n.meta.position&&"bottom"===n.meta.position&&!t&&(n.meta.class="mt-auto",t=!0),n}))}})},g=n("KHd+"),v=Object(g.a)(h,s,[],!1,null,null,null);v.options.__file="src/components/SideNavigationBar.vue";var b={components:{SideNavigationBar:v.exports}},w=(n("XAuw"),Object(g.a)(b,o,[],!1,null,null,null));w.options.__file="src/App.vue";var P=w.exports,x=n("jE9Z");r.a.use(x.a);var M=new x.a({mode:"history",linkActiveClass:"active",routes:[{path:"/",name:"Home",component:function(){return Promise.all([n.e(20),n.e(10)]).then(n.bind(null,"u1G+"))},meta:{icon:"home",exact:!0}},{path:"/login",name:"Login",component:function(){return Promise.all([n.e(21),n.e(12)]).then(n.bind(null,"pVsz"))},meta:{allowedWithoutAuth:!0,hide:!0}},{path:"/pipelines",name:"Pipelines",component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"K4Xp"))},props:function(e){return{query:e.query}},meta:{text:"Builds & releases",icon:"tools",banner:!0,lead:"View and release applications",variant:"success"}},{path:"/pipelines/:repoSource/:repoOwner/:repoName",name:"PipelineDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"HECz"))},redirect:{name:"PipelineOverview"},children:[{path:"overview",name:"PipelineOverview",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"bvzo"))},meta:{text:"Overview",icon:"industry"}},{path:"builds",name:"PipelineBuilds",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"LMxC"))},meta:{text:"Builds",icon:"tools"}},{path:"releases",name:"PipelineReleases",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"Ukwp"))},meta:{text:"Releases",icon:"upload"}},{path:"triggers",name:"PipelineTriggers",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"iOe7"))},meta:{text:"Trigger",icon:"project-diagram"}},{path:"statistics",name:"PipelineStatistics",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"ze2c"))},meta:{text:"Insights",icon:"lightbulb"}},{path:"encrypt",name:"PipelineSecretEncrypter",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"sv8Y"))},meta:{text:"Secrets",icon:"user-secret"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/builds/:id",name:"PipelineBuildDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"gP8g"))},children:[{path:"logs",name:"PipelineBuildLogs",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"Wo8F"))},meta:{text:"Logs",icon:"poll-h"}},{path:"manifest",name:"PipelineBuildManifest",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"14Sm"))},meta:{text:"Manifest",icon:"book"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/releases/:releaseID",name:"PipelineReleaseDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"zrtL"))},children:[{path:"logs",name:"PipelineReleaseLogs",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"OOkl"))},meta:{text:"Logs",icon:"poll-h"}}]},{path:"/catalog",name:"Catalog",component:function(){return Promise.all([n.e(1),n.e(25)]).then(n.bind(null,"1Xn/"))},props:function(e){return{query:e.query}},meta:{icon:"book-open",banner:!0,lead:"View ownership, performance and more",variant:"info"},redirect:{name:"CatalogGroups"},children:[{path:"groups",name:"CatalogGroups",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(7)]).then(n.bind(null,"zyFH"))},meta:{text:"Groups",icon:"users"}},{path:"groups/:id",name:"CatalogGroupDetails",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"1YrP"))},meta:{hide:!0}},{path:"services",name:"CatalogServices",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(7)]).then(n.bind(null,"EpG2"))},meta:{text:"Services",icon:"shapes"}},{path:"entities",name:"CatalogEntities",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(7)]).then(n.bind(null,"FUpF"))},meta:{text:"Entities",icon:"cubes"}}]},{path:"/catalog/services/:repoSource/:repoOwner/:repoName",name:"CatalogItemDetails",meta:{hide:!0},component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(7)]).then(n.bind(null,"mMhM"))},props:!0,redirect:{name:"CatalogItemOverview"},children:[{path:"overview",name:"CatalogItemOverview",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(7)]).then(n.bind(null,"yDV2"))},meta:{text:"Overview",icon:"industry"}}]},{path:"/insights",name:"Insights",component:function(){return Promise.all([n.e(1),n.e(25)]).then(n.bind(null,"1Xn/"))},meta:{icon:"lightbulb",banner:!0,lead:"See stats, rankings and trends",variant:"primary"},props:!0,redirect:{name:"InsightsCounters"},children:[{path:"counters",name:"InsightsCounters",props:!0,component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"nAZy"))},meta:{text:"Counters",icon:"chart-pie"}},{path:"rankings",name:"InsightsRankings",props:!0,component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"ZDmJ"))},meta:{text:"Rankings",icon:"list-ol"}},{path:"trends",name:"InsightsTrends",props:!0,component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"b28C"))},meta:{text:"Trends",icon:"chart-line"}}]},{path:"/create",name:"Create",component:function(){return Promise.all([n.e(1),n.e(25)]).then(n.bind(null,"1Xn/"))},meta:{icon:"plus-circle",banner:!0,lead:"Generate and validate manifests",variant:"warning"},props:!0,redirect:{name:"ManifestGenerator"},children:[{path:"generate",name:"ManifestGenerator",props:!0,meta:{icon:"hammer",text:"Generate"},component:function(){return Promise.all([n.e(3),n.e(19),n.e(9)]).then(n.bind(null,"XB7O"))}},{path:"validate",name:"ManifestValidator",props:!0,meta:{text:"Validate",icon:"clipboard-check"},component:function(){return Promise.all([n.e(3),n.e(19),n.e(9)]).then(n.bind(null,"wcEu"))}}]},{path:"/configuration",name:"Configuration",props:!0,component:function(){return Promise.all([n.e(1),n.e(25)]).then(n.bind(null,"1Xn/"))},meta:{icon:"cogs",position:"bottom"},redirect:{name:"ConfigurationCredentials"},children:[{path:"credentials",name:"ConfigurationCredentials",props:!0,component:function(){return n.e(8).then(n.bind(null,"03/4"))},meta:{text:"Credentials",icon:"key"}},{path:"trusted-images",name:"ConfigurationTrustedImages",props:!0,component:function(){return n.e(8).then(n.bind(null,"G8Jt"))},meta:{requiredRole:"administrator",text:"Trusted Images",icon:"shield-alt"}}]},{path:"/admin",name:"Admin",props:!0,component:function(){return Promise.all([n.e(1),n.e(25)]).then(n.bind(null,"1Xn/"))},meta:{icon:"sliders-h",position:"bottom",requiredRole:"administrator"},redirect:{name:"AdminUsers"},children:[{path:"users",name:"AdminUsers",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"YTVD"))},meta:{requiredRole:"administrator",text:"Users",icon:"user"}},{path:"users/:id/edit",name:"AdminUserUpdate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"AkVi"))},meta:{requiredRole:"administrator",hide:!0}},{path:"groups",name:"AdminGroups",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"h0kL"))},meta:{requiredRole:"administrator",text:"Groups",icon:"users"}},{path:"groups/create",name:"AdminGroupCreate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"iUgf"))},meta:{requiredRole:"administrator",hide:!0}},{path:"groups/:id/edit",name:"AdminGroupUpdate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"s3SF"))},meta:{requiredRole:"administrator",hide:!0}},{path:"organizations",name:"AdminOrganizations",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"nyiG"))},meta:{requiredRole:"administrator",text:"Organizations",icon:"sitemap"}},{path:"organizations/create",name:"AdminOrganizationCreate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"i/Bd"))},meta:{requiredRole:"administrator",hide:!0}},{path:"organizations/:id/edit",name:"AdminOrganizationUpdate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"bDDd"))},meta:{requiredRole:"administrator",hide:!0}},{path:"clients",name:"AdminClients",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"KqDH"))},meta:{requiredRole:"administrator",text:"Clients",icon:"mobile-alt"}},{path:"clients/create",name:"AdminClientCreate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"0QF3"))},meta:{requiredRole:"administrator",hide:!0}},{path:"clients/:id/edit",name:"AdminClientUpdate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"GaE+"))},meta:{requiredRole:"administrator",hide:!0}},{path:"pipelines",name:"AdminPipelines",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"3Vr0"))},meta:{requiredRole:"administrator",text:"Pipelines",icon:"tools"}},{path:"pipelines/:repoSource/:repoOwner/:repoName/edit",name:"AdminPipelineUpdate",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(5)]).then(n.bind(null,"BB3h"))},meta:{requiredRole:"administrator",hide:!0}},{path:"encrypt",name:"AdminSecretEncrypter",props:!0,component:function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(14)]).then(n.bind(null,"sv8Y"))},meta:{requiredRole:"administrator",text:"Secrets",icon:"user-secret"}}]},{path:"/user",name:"User",props:!0,component:function(){return Promise.all([n.e(1),n.e(25)]).then(n.bind(null,"1Xn/"))},redirect:{name:"UserDetails"},meta:{textFunction:function(e){if(e&&e.identities&&e.identities.length>0){var t=e.identities.find((function(e){return e.name}));if(t&&t.name)return t.name}return e&&e.email?e.email:""},icon:"user-circle",position:"bottom"},children:[{path:"details",name:"UserDetails",props:!0,component:function(){return Promise.all([n.e(2),n.e(15)]).then(n.bind(null,"fIft"))},meta:{text:"Details",icon:"passport"}}]},{path:"/logs/:repoSource/:repoOwner/:repoName/:repoBranch/:id",name:"LegacyLogs",redirect:{name:"PipelineBuildLogs"},meta:{hide:!0}},{path:"/statistics",redirect:{name:"Insights"},meta:{hide:!0},children:[{path:"counters",redirect:{name:"InsightsCounters"}},{path:"rankings",redirect:{name:"InsightsRankings"}},{path:"trends",redirect:{name:"InsightsTrends"}}]},{path:"/config",redirect:{name:"Configuration"},meta:{hide:!0}},{path:"/manifest",redirect:{name:"Create"},meta:{hide:!0},children:[{path:"generate",redirect:{name:"ManifestGenerator"}},{path:"validate",redirect:{name:"ManifestValidator"}}]}]}),y=function(){return a.a.get("/api/me")},C={namespaced:!0,state:function(){return{me:null,loaded:!1}},mutations:{set:function(e,t){e.me=t,e.loaded=!0},reset:function(e){e.me=null}},actions:{load:function(e){var t=e.commit;return y().then((function(e){t("set",e.data)})).catch((function(e){console.warn(e)}))},logout:function(e){(0,e.commit)("reset")}}},D=function(e,t){var n="";e&&e.labels&&e.labels.length>0&&(n=e.labels.split(",").join("&filter[labels]="));var r="filter[status]=".concat(e.status);return"running"===e.status&&(r+="&filter[status]=pending&filter[status]=canceling"),a.a.get("/api/pipelines?".concat(r,"&filter[since]=").concat(e.since,"&filter[search]=").concat(e.search,"&filter[labels]=").concat(n,"&page[number]=").concat(t.page,"&page[size]=").concat(t.size))},A=n("pDaz"),S={namespaced:!0,state:function(){return{pipelines:[],pagination:{page:1,size:12,totalPages:0,totalItems:0},timeouts:[]}},mutations:{set:function(e,t){e.pipelines=t.pipelines,e.pagination=t.pagination},reset:function(e){e.pipelines=[]},setTimeout:function(e,t){e.timeouts.push(t)},cancelTimeouts:function(e){var t=!0,n=!1,r=void 0;try{for(var i,a=e.timeouts[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var o=i.value;clearTimeout(o)}}catch(e){n=!0,r=e}finally{try{t||null==a.return||a.return()}finally{if(n)throw r}}e.timeouts=[]}},actions:{loadPipelines:function(e,t){var n=e.dispatch,r=e.commit,i=e.state;D(t,i.pagination).then((function(e){r("set",{pipelines:e.data.items,pagination:e.data.pagination}),A.a.setTimeoutWithJitter(r,(function(){return n("loadPipelines")}),30)})).catch((function(e){A.a.setTimeoutWithJitter(r,(function(){return n("loadPipelines")}),60)}))},destroy:function(e){var t=e.commit;t("cancelTimeouts"),t("reset")}}};r.a.use(u.a);var I=new u.a.Store({modules:{user:C,pipeline:S}}),q=function(e,t){if(null===e)return"";if(e<0)return"";null===t&&(t=1);var n=Math.floor(e/(86400*Math.pow(10,9))),r=e%(86400*Math.pow(10,9)),i=Math.floor(r/(3600*Math.pow(10,9))),a=r%(3600*Math.pow(10,9)),o=Math.floor(a/(60*Math.pow(10,9))),s=a%(60*Math.pow(10,9)),u=Math.floor(s/Math.pow(10,9)),l=s%Math.pow(10,9),c=Math.floor(l/Math.pow(10,8)),p="";return n>0&&(p+="".concat(n,"d")),(i>0||n>0)&&(p+="".concat(i,"h")),(o>0||i>0||n>0)&&(p+="".concat(o,"m")),(c>0||u>0)&&0===o&&0===i&&t>0?p+="".concat(u,".").concat(c,"s"):(u>0||o>0||i>0||n>0)&&(p+="".concat(u,"s")),""===p&&(p="-"),p},R=n("wd/R"),O=n.n(R);n("czMo");O.a.locale("en-il");O.a.locale("en-il");r.a.filter("gitHash",(function(e){return e?40!==(e=e.toString()).length?e:e.substring(0,6):""})),r.a.filter("bootstrapClass",(function(e,t){return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?t+"-success":"running"===e||"warning"===e?t+"-warning":"failed"===e||"danger"===e?t+"-danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?t+"-secondary":"pending"===e?t+"-info":"all"===e||"primary"===e?t+"-primary":t+"-light":t+"-light"})),r.a.filter("bootstrapVariant",(function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?"outline-":"";return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?n+"success":"running"===e||"warning"===e?n+"warning":"failed"===e||"danger"===e?n+"danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?n+"secondary":"pending"===e?n+"info":"all"===e||"primary"===e?n+"primary":n+"light":n+"light"})),r.a.filter("animatedProgressBar",(function(e){return!!e&&("pending"===(e=e.toString().toLowerCase())||"running"===e||"canceling"===e)})),r.a.filter("buildProgressBarValue",(function(e,t,n){if(!(e&&e.extraInfo&&t&&t.buildStatus))return 100;var r=t.buildStatus.toString().toLowerCase();if("pending"===r){if(e.extraInfo.medianPendingDuration>0&&t.insertedAt){var i=n-new Date(t.insertedAt),a=e.extraInfo.medianPendingDuration/Math.pow(10,6),o=Math.round(100*i/a);if(o>=0&&o<=100)return o}return 100}if("running"===r){if(e.extraInfo.medianDuration>0&&t.startedAt){var s=n-new Date(t.startedAt),u=e.extraInfo.medianDuration/Math.pow(10,6),l=Math.round(100*s/u);if(l>=0&&l<=100)return l}return 100}return 100})),r.a.filter("buildProgressBarLabel",(function(e,t,n){if(!(e&&e.extraInfo&&t&&t.buildStatus))return"";var r=t.buildStatus.toString().toLowerCase();if("pending"===r){if(e.extraInfo.medianPendingDuration>0&&t.insertedAt){var i=Math.pow(10,6)*(n-new Date(t.insertedAt)),a=e.extraInfo.medianPendingDuration;if(i/a>=.25){var o=a-i;if(o>=Math.pow(10,9))return q(o,0)+" left";if(o<=-1*Math.pow(10,9))return q(-1*o,0)+" over"}}return""}if("running"===r){if(e.extraInfo.medianDuration>0&&t.startedAt){var s=Math.pow(10,6)*(n-new Date(t.startedAt)),u=e.extraInfo.medianDuration;if(s/u>=.25){var l=u-s;if(l>=Math.pow(10,9))return q(l,0)+" left";if(l<=-1*Math.pow(10,9))return q(-1*l,0)+" over"}}return""}return""})),r.a.filter("releaseProgressBarValue",(function(e,t,n){if(!(e&&e.releaseTargets&&t&&t.releaseStatus))return 100;var r=t.releaseStatus.toString().toLowerCase(),i=e.releaseTargets.find((function(e){return e.name===t.name}));if(!i||!i.activeReleases)return 100;var a=i.activeReleases.find((function(e){return e.action===t.action}));if(!a||!a.extraInfo)return 100;if("pending"===r){if(a.extraInfo.medianPendingDuration>0&&t.insertedAt){var o=n-new Date(t.insertedAt),s=a.extraInfo.medianPendingDuration/Math.pow(10,6),u=Math.round(100*o/s);if(u>=0&&u<=100)return u}return 100}if("running"===r){if(a.extraInfo.medianDuration>0&&t.startedAt){var l=n-new Date(t.startedAt),c=a.extraInfo.medianDuration/Math.pow(10,6),p=Math.round(100*l/c);if(p>=0&&p<=100)return p}return 100}return 100})),r.a.filter("releaseProgressBarLabel",(function(e,t,n){if(!(e&&e.releaseTargets&&t&&t.releaseStatus))return"";var r=t.releaseStatus.toString().toLowerCase(),i=e.releaseTargets.find((function(e){return e.name===t.name}));if(!i||!i.activeReleases)return"";var a=i.activeReleases.find((function(e){return e.action===t.action}));if(!a||!a.extraInfo)return"";if("pending"===r){if(a.extraInfo.medianPendingDuration>0&&t.insertedAt){var o=Math.pow(10,6)*(n-new Date(t.insertedAt)),s=a.extraInfo.medianPendingDuration;if(o/s>=.25){var u=s-o;if(u>=Math.pow(10,9))return q(u,0)+" left";if(u<=-1*Math.pow(10,9))return q(-1*u,0)+" over"}}return""}if("running"===r){if(a.extraInfo.medianDuration>0&&t.startedAt){var l=Math.pow(10,6)*(n-new Date(t.startedAt)),c=a.extraInfo.medianDuration;if(l/c>=.25){var p=c-l;if(p>=Math.pow(10,9))return q(p,0)+" left";if(p<=-1*Math.pow(10,9))return q(-1*p,0)+" over"}}return""}return""})),r.a.filter("defaultValue",(function(e,t){return e||t})),r.a.filter("capitalize",(function(e){return e?(e=e.toString()).charAt(0).toUpperCase()+e.slice(1):""})),r.a.filter("colorDurationClass",(function(e){if(null===e)return"";if(e<=0)return"";var t=Math.floor(e/Math.pow(10,9));return t>300?"text-danger":t>120?"text-warning":"text-success"})),r.a.filter("formatDatetime",(function(e){return null===e?"":O()(e).isSame(O()(),"year")?O()(e).isSame(O()(),"day")?O()(e).format("[today] [at] H:mm"):O()(e).format("D MMM [at] H:mm"):O()(e).format("D MMM YYYY [at] H:mm")})),r.a.filter("moment",(function(e,t){return O()(e).format(t)})),r.a.filter("formatDuration",q),r.a.filter("formatBytes",(function(e){if(!e)return"";if(e<=0)return"";var t=Math.floor(e/Math.pow(2,30)),n=e%Math.pow(2,30),r=Math.floor(n/Math.pow(2,20)),i="";if(t>0){var a=Math.floor(10*n/Math.pow(2,30));i+="".concat(t,".").concat(a,"GB")}return r>0&&0===t&&(i+="".concat(r,"MB")),i})),r.a.filter("formatNumber",(function(e){return null===e?"":new Intl.NumberFormat("de-DE").format(e)})),r.a.filter("splitCamelcase",(function(e){return e?e.replace(/([a-z])([A-Z])/g,"$1 $2"):""}));var L=n("JhbM");r.a.directive("b-tooltip",L.a),r.a.axios=a.a,r.a.$http=a.a,r.a.prototype.axios=a.a,r.a.prototype.$http=a.a,r.a.axios.interceptors.request.use((function(e){var t=e.url.split("?");return t.length>0&&"/"!==t[0][t[0].length-1]&&(t[0]+="/",e.url=t.join("?")),e.headers={"X-Requested-With":"XMLHttpRequest"},e}),(function(e){return Promise.reject(e)})),r.a.axios.interceptors.response.use((function(e){return e}),(function(e){if(e.response)switch(e.response.status){case 401:I.dispatch("user/logout")}return Promise.reject(new Error(e.response&&e.response.data?e.response.data.error:e.message))})),I.watch((function(e){return e.user.me}),(function(e,t){if(!e&&t)if(t.currentProvider){var n="/api/auth/login/"+t.currentProvider+"?returnURL="+M.currentRoute.fullPath;t.currentOrganization&&(n+="&organization="+t.currentOrganization),window.location.href=n}else M.replace({name:"Login",query:{returnURL:M.currentRoute.fullPath}})}));var T=function(e,t){var n=I.state.user.me,r=n&&n.active;!e.meta||!e.meta.requiredRole||n&&n.active&&n.roles&&n.roles.includes(e.meta.requiredRole)?e.matched.some((function(e){return!e.meta.allowedWithoutAuth}))&&!r?t({name:"Login",query:{returnURL:e.fullPath}}):t():t(!1)};M.beforeEach((function(e,t,n){"Login"!==e.name?I.state.user.loaded?T(e,n):I.dispatch("user/load").then((function(){T(e,n)})):n()})),r.a.config.productionTip=!1,new r.a({el:"#app",router:M,store:I,components:{App:P},template:"<App/>"})},XAuw:function(e,t,n){"use strict";var r=n("L1Pe");n.n(r).a},pDaz:function(e,t,n){"use strict";t.a={setTimeoutWithJitter:function(e,t,n){e("cancelTimeouts");var r=1e3*n*.75,i=1e3*n*1.25,a=Math.floor(Math.random()*(r-i+1)+i);e("setTimeout",setTimeout(t,a))},timeoutWithJitter:function(e,t,n){clearTimeout(e);var r=1e3*n*.75,i=1e3*n*1.25,a=Math.floor(Math.random()*(r-i+1)+i);e=setTimeout(t,a)},timeout:function(e,t,n){clearTimeout(e),e=setTimeout(t,1e3*n)}}}},[["Vtdi",16,18]]]);