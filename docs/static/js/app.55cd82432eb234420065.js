(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[143],{3900:function(e,t){"use strict";t.Z={setTimeoutWithJitter:function(e,t,n){e("cancelTimeouts");var r=1e3*n*.75,i=1e3*n*1.25,a=Math.floor(Math.random()*(r-i+1)+i);e("setTimeout",setTimeout(t,a))},timeoutWithJitter:function(e,t,n){clearTimeout(e);var r=1e3*n*.75,i=1e3*n*1.25,a=Math.floor(Math.random()*(r-i+1)+i);e=setTimeout(t,a)},timeout:function(e,t,n){clearTimeout(e),e=setTimeout(t,1e3*n)}}},6291:function(e,t,n){"use strict";var r=n(538),i=n(9669),a=n.n(i),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{authenticated:e.user&&e.user.active},attrs:{id:"app"}},[n("side-navigation-bar"),e._v(" "),n("div",{attrs:{id:"main"}},[n("router-view")],1)],1)};o._withStripped=!0;var s=n(629),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-nav",{staticClass:"main-sidebar-nav",attrs:{vertical:""}},[n("b-nav-item",{staticClass:"logo",attrs:{to:{name:"Home"},exact:""}},[n("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:"shipping-fast"}}),e._v(" "),n("span",[e._v("\n      Estafette\n    ")])],1),e._v(" "),e._l(e.routes,(function(t){return n("b-nav-item",{key:t.name,class:t.meta&&t.meta.class?t.meta.class:"",attrs:{to:{name:t.name},exact:!!t.meta&&t.meta.exact}},[n("font-awesome-icon",{staticClass:"sidebar-icon",attrs:{icon:t.meta?t.meta.icon:""}}),e._v(" "),n("span",[e._v("\n      "+e._s(t.meta&&t.meta.text?t.meta.text:t.name)+"\n    ")])],1)}))],2)};u._withStripped=!0;var l=n(9027),c=n(2450),m=n(8947),p=n(1436),d=n(7810);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}m.vI.add(p.x0v,p.CgH,p.cnt,p.X8G,p.KtF,p.Kb6,p.Xjp,p.m08,p.J9Y,p.FVb,p.MUh);var b={components:{BNav:l.O,BNavItem:c.r,FontAwesomeIcon:d.GN},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:h(h({},(0,s.rn)("user",{user:"me"})),{},{routes:function(){var e=this,t=!1;return this.$router.options.routes.filter((function(t){return(!t.meta||!t.meta.hide)&&(!!(e.user&&e.user.active||t.meta&&t.meta.allowedWithoutAuth)&&!(t.meta&&t.meta.requiredRole&&!(e.user&&e.user.active&&e.user.roles&&e.user.roles.includes(t.meta.requiredRole))))})).map((function(n){return n.meta&&n.meta.textFunction&&e.isFunction(n.meta.textFunction)&&(n.meta.text=n.meta.textFunction(e.user)),n.meta&&n.meta.position&&"bottom"===n.meta.position&&!t&&(n.meta.class="mt-auto",t=!0),n}))}})},j=n(1900),v=(0,j.Z)(b,u,[],!1,null,null,null);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}v.options.__file="src/components/SideNavigationBar.vue";var y={components:{SideNavigationBar:v.exports},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){w(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},(0,s.rn)("user",{user:"me"}))},x=(0,j.Z)(y,o,[],!1,null,null,null);x.options.__file="src/App.vue";var O=x.exports,A=n(8345);function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}r.Z.use(A.Z);var S=new A.Z({mode:"history",linkActiveClass:"active",routes:[{path:"/",name:"Home",component:function(){return Promise.all([n.e(156),n.e(177)]).then(n.bind(n,4826))},meta:{title:"Home",icon:"home",exact:!0}},{path:"/login",name:"Login",component:function(){return Promise.all([n.e(417),n.e(535)]).then(n.bind(n,947))},meta:{allowedWithoutAuth:!0,hide:!0}},{path:"/pipelines",name:"Pipelines",component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,8152))},redirect:{name:"AllPipelines"},meta:{text:"Builds & releases",icon:"tools",banner:!0,lead:"View and release applications",variant:"success"},children:[{path:"all",name:"AllPipelines",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,4137))},meta:{title:"All pipelines",text:"Pipelines",icon:"industry"}},{path:"builds",name:"AllBuilds",component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,9236))},props:function(e){return{query:e.query}},meta:{title:"All builds",text:"Builds",icon:"tools"}},{path:"releases",name:"AllReleases",component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,5246))},props:function(e){return{query:e.query}},meta:{title:"All releases",text:"Releases",icon:"upload"}},{path:"bots",name:"AllBots",component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,651))},props:function(e){return{query:e.query}},meta:{title:"All bots",text:"Bots",icon:"robot"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName",name:"PipelineDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,9703))},redirect:{name:"PipelineOverview"},children:[{path:"overview",name:"PipelineOverview",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,1756))},meta:{title:"Pipeline > Overview",text:"Overview",icon:"industry"}},{path:"builds",name:"PipelineBuilds",props:function(e){return D({query:e.query},e.params)},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,7628))},meta:{title:"Pipeline > Builds",text:"Builds",icon:"tools"}},{path:"releases",name:"PipelineReleases",props:function(e){return D({query:e.query},e.params)},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,5529))},meta:{title:"Pipeline > Releases",text:"Releases",icon:"upload"}},{path:"bots",name:"PipelineBots",props:function(e){return D({query:e.query},e.params)},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,7499))},meta:{title:"Pipeline > Bots",text:"Bots",icon:"robot"}},{path:"triggers",name:"PipelineTriggers",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,3840))},meta:{title:"Pipeline > Triggers",text:"Trigger",icon:"project-diagram"}},{path:"statistics",name:"PipelineStatistics",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,7707))},meta:{title:"Pipeline > Insights",text:"Insights",icon:"lightbulb"}},{path:"encrypt",name:"PipelineSecretEncrypter",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,3521))},meta:{title:"Pipeline > Secrets",text:"Secrets",icon:"user-secret"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/builds/:id",name:"PipelineBuildDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,7670))},children:[{path:"logs/:logid?",name:"PipelineBuildLogs",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,3394))},meta:{title:"Pipeline > Build logs",text:"Logs",icon:"poll-h"}},{path:"manifest",name:"PipelineBuildManifest",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,724))},meta:{title:"Pipeline > Build manifest",text:"Manifest",icon:"book"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/releases/:releaseID",name:"PipelineReleaseDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,6281))},children:[{path:"logs/:logid?",name:"PipelineReleaseLogs",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,6684))},meta:{title:"Pipeline > Release logs",text:"Logs",icon:"poll-h"}}]},{path:"/pipelines/:repoSource/:repoOwner/:repoName/bots/:botID",name:"PipelineBotDetails",props:!0,meta:{hide:!0},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,1243))},children:[{path:"logs/:logid?",name:"PipelineBotLogs",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,430))},meta:{title:"Pipeline > Bot logs",text:"Logs",icon:"poll-h"}}]},{path:"/catalog",name:"Catalog",component:function(){return Promise.all([n.e(941),n.e(199)]).then(n.bind(n,7501))},props:function(e){return{query:e.query}},meta:{icon:"book-open",banner:!0,lead:"View ownership, performance and more",variant:"info"},redirect:{name:"CatalogGroups"},children:[{path:"groups",name:"CatalogGroups",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(449),n.e(22),n.e(701)]).then(n.bind(n,3458))},meta:{title:"Catalog > Groups",text:"Groups",icon:"users"}},{path:"services",name:"CatalogServices",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(449),n.e(22),n.e(701)]).then(n.bind(n,3335))},meta:{title:"Catalog > Services",text:"Services",icon:"shapes"}},{path:"entities",name:"CatalogEntities",props:function(e){return{query:e.query}},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(449),n.e(22),n.e(701)]).then(n.bind(n,1494))},meta:{title:"Catalog > Entities",text:"Entities",icon:"cubes"}}]},{path:"/catalog/groups/:id",name:"CatalogGroupDetails",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,4174))},meta:{title:"Catalog > Groups",hide:!0}},{path:"/catalog/services/:repoSource/:repoOwner/:repoName",name:"CatalogItemDetails",meta:{hide:!0},component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(449),n.e(22),n.e(701)]).then(n.bind(n,3277))},props:!0,redirect:{name:"CatalogItemOverview"},children:[{path:"overview",name:"CatalogItemOverview",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(449),n.e(22),n.e(701)]).then(n.bind(n,219))},meta:{title:"Catalog > Services",text:"Overview",icon:"industry"}}]},{path:"/insights",name:"Insights",component:function(){return Promise.all([n.e(941),n.e(199)]).then(n.bind(n,7501))},meta:{icon:"lightbulb",banner:!0,lead:"See stats, rankings and trends",variant:"primary"},props:!0,redirect:{name:"InsightsCounters"},children:[{path:"counters",name:"InsightsCounters",props:!0,component:function(){return Promise.all([n.e(976),n.e(60),n.e(242)]).then(n.bind(n,3137))},meta:{title:"Insights > Counters",text:"Counters",icon:"chart-pie"}},{path:"rankings",name:"InsightsRankings",props:!0,component:function(){return Promise.all([n.e(976),n.e(60),n.e(242)]).then(n.bind(n,8796))},meta:{title:"Insights > Rankings",text:"Rankings",icon:"list-ol"}},{path:"trends",name:"InsightsTrends",props:!0,component:function(){return Promise.all([n.e(976),n.e(60),n.e(242)]).then(n.bind(n,1610))},meta:{title:"Insights > Trends",text:"Trends",icon:"chart-line"}}]},{path:"/create",name:"Create",component:function(){return Promise.all([n.e(941),n.e(199)]).then(n.bind(n,7501))},meta:{icon:"plus-circle",banner:!0,lead:"Generate and validate manifests",variant:"warning"},props:!0,redirect:{name:"ManifestGenerator"},children:[{path:"generate",name:"ManifestGenerator",props:!0,meta:{title:"Create > Generate",icon:"hammer",text:"Generate"},component:function(){return Promise.all([n.e(976),n.e(218),n.e(448),n.e(886)]).then(n.bind(n,335))}},{path:"validate",name:"ManifestValidator",props:!0,meta:{title:"Create > Validate",text:"Validate",icon:"clipboard-check"},component:function(){return Promise.all([n.e(976),n.e(218),n.e(448),n.e(886)]).then(n.bind(n,5640))}}]},{path:"/configuration",name:"Configuration",props:!0,component:function(){return Promise.all([n.e(941),n.e(199)]).then(n.bind(n,7501))},meta:{icon:"cogs",position:"bottom"},redirect:{name:"ConfigurationCredentials"},children:[{path:"credentials",name:"ConfigurationCredentials",props:!0,component:function(){return n.e(639).then(n.bind(n,1247))},meta:{title:"Configuration > Credentials",text:"Credentials",icon:"key"}},{path:"trusted-images",name:"ConfigurationTrustedImages",props:!0,component:function(){return n.e(639).then(n.bind(n,8101))},meta:{requiredRole:"administrator",title:"Configuration > Trusted Images",text:"Trusted Images",icon:"shield-alt"}}]},{path:"/admin",name:"Admin",props:!0,component:function(){return Promise.all([n.e(941),n.e(199)]).then(n.bind(n,7501))},meta:{icon:"sliders-h",position:"bottom",requiredRole:"administrator"},redirect:{name:"AdminUsers"},children:[{path:"users",name:"AdminUsers",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,9854))},meta:{requiredRole:"administrator",title:"Admin > Users",text:"Users",icon:"user"}},{path:"users/:id/edit",name:"AdminUserUpdate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,6352))},meta:{requiredRole:"administrator",title:"Admin > Users",hide:!0}},{path:"groups",name:"AdminGroups",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,2040))},meta:{requiredRole:"administrator",title:"Admin > Groups",text:"Groups",icon:"users"}},{path:"groups/create",name:"AdminGroupCreate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,9536))},meta:{requiredRole:"administrator",title:"Admin > Groups",hide:!0}},{path:"groups/:id/edit",name:"AdminGroupUpdate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,6681))},meta:{requiredRole:"administrator",title:"Admin > Groups",hide:!0}},{path:"organizations",name:"AdminOrganizations",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,2371))},meta:{requiredRole:"administrator",title:"Admin > Organizations",text:"Organizations",icon:"sitemap"}},{path:"organizations/create",name:"AdminOrganizationCreate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,9386))},meta:{requiredRole:"administrator",title:"Admin > Organizations",hide:!0}},{path:"organizations/:id/edit",name:"AdminOrganizationUpdate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,9201))},meta:{requiredRole:"administrator",title:"Admin > Organizations",hide:!0}},{path:"clients",name:"AdminClients",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,4617))},meta:{requiredRole:"administrator",title:"Admin > Clients",text:"Clients",icon:"mobile-alt"}},{path:"clients/create",name:"AdminClientCreate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,6856))},meta:{requiredRole:"administrator",title:"Admin > Clients",hide:!0}},{path:"clients/:id/edit",name:"AdminClientUpdate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,4919))},meta:{requiredRole:"administrator",title:"Admin > Clients",hide:!0}},{path:"pipelines",name:"AdminPipelines",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,3128))},meta:{requiredRole:"administrator",title:"Admin > Pipelines",text:"Pipelines",icon:"tools"}},{path:"pipelines/:repoSource/:repoOwner/:repoName/edit",name:"AdminPipelineUpdate",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(525),n.e(218),n.e(449),n.e(479),n.e(185),n.e(22),n.e(829),n.e(328)]).then(n.bind(n,9323))},meta:{requiredRole:"administrator",title:"Admin > Pipelines",hide:!0}},{path:"encrypt",name:"AdminSecretEncrypter",props:!0,component:function(){return Promise.all([n.e(976),n.e(941),n.e(60),n.e(218),n.e(449),n.e(417),n.e(479),n.e(448),n.e(61),n.e(22),n.e(829),n.e(640)]).then(n.bind(n,3521))},meta:{requiredRole:"administrator",title:"Admin > Secrets",text:"Secrets",icon:"user-secret"}}]},{path:"/user",name:"User",props:!0,component:function(){return Promise.all([n.e(941),n.e(199)]).then(n.bind(n,7501))},redirect:{name:"UserDetails"},meta:{textFunction:function(e){if(e&&e.identities&&e.identities.length>0){var t=e.identities.find((function(e){return e.name}));if(t&&t.name)return t.name}return e&&e.email?e.email:""},icon:"user-circle",position:"bottom"},children:[{path:"details",name:"UserDetails",props:!0,component:function(){return Promise.all([n.e(525),n.e(544)]).then(n.bind(n,8276))},meta:{title:"User > Details",text:"Details",icon:"passport"}}]},{path:"/logs/:repoSource/:repoOwner/:repoName/:repoBranch/:id",name:"LegacyLogs",redirect:{name:"PipelineBuildLogs"},meta:{hide:!0}},{path:"/statistics",redirect:{name:"Insights"},meta:{hide:!0},children:[{path:"counters",redirect:{name:"InsightsCounters"}},{path:"rankings",redirect:{name:"InsightsRankings"}},{path:"trends",redirect:{name:"InsightsTrends"}}]},{path:"/config",redirect:{name:"Configuration"},meta:{hide:!0}},{path:"/manifest",redirect:{name:"Create"},meta:{hide:!0},children:[{path:"generate",redirect:{name:"ManifestGenerator"}},{path:"validate",redirect:{name:"ManifestValidator"}}]}]}),I=function(){return a().get("/api/me")},k={namespaced:!0,state:function(){return{me:null,loaded:!1}},mutations:{set:function(e,t){e.me=t,e.loaded=!0},reset:function(e){e.me=null}},actions:{load:function(e){var t=e.commit;return I().then((function(e){t("set",e.data)})).catch((function(e){console.warn(e)}))},logout:function(e){(0,e.commit)("reset")}}},q=function(e,t){var n="";e&&e.labels&&e.labels.length>0&&(n=e.labels.split(",").join("&filter[labels]="));var r="filter[status]=".concat(e.status);return"running"===e.status&&(r+="&filter[status]=pending&filter[status]=canceling"),a().get("/api/pipelines?".concat(r,"&filter[since]=").concat(e.since,"&filter[search]=").concat(e.search,"&filter[labels]=").concat(n,"&page[number]=").concat(t.page,"&page[size]=").concat(t.size))},R=n(3900);function z(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Z(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(s)throw a}}}}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B={namespaced:!0,state:function(){return{pipelines:[],pagination:{page:1,size:12,totalPages:0,totalItems:0},timeouts:[]}},mutations:{set:function(e,t){e.pipelines=t.pipelines,e.pagination=t.pagination},reset:function(e){e.pipelines=[]},setTimeout:function(e,t){e.timeouts.push(t)},cancelTimeouts:function(e){var t,n=z(e.timeouts);try{for(n.s();!(t=n.n()).done;){var r=t.value;clearTimeout(r)}}catch(e){n.e(e)}finally{n.f()}e.timeouts=[]}},actions:{loadPipelines:function(e,t){var n=e.dispatch,r=e.commit,i=e.state;q(t,i.pagination).then((function(e){r("set",{pipelines:e.data.items,pagination:e.data.pagination}),R.Z.setTimeoutWithJitter(r,(function(){return n("loadPipelines")}),30)})).catch((function(e){R.Z.setTimeoutWithJitter(r,(function(){return n("loadPipelines")}),60)}))},destroy:function(e){var t=e.commit;t("cancelTimeouts"),t("reset")}}};r.Z.use(s.ZP);var T=new s.ZP.Store({modules:{user:k,pipeline:B}});function L(e,t){if(null===e)return"";if(e<0)return"";null===t&&(t=1);var n=Math.floor(e/(86400*Math.pow(10,9))),r=e%(86400*Math.pow(10,9)),i=Math.floor(r/(3600*Math.pow(10,9))),a=r%(3600*Math.pow(10,9)),o=Math.floor(a/(60*Math.pow(10,9))),s=a%(60*Math.pow(10,9)),u=Math.floor(s/Math.pow(10,9)),l=s%Math.pow(10,9),c=Math.floor(l/Math.pow(10,8)),m="";return n>0&&(m+="".concat(n,"d")),(i>0||n>0)&&(m+="".concat(i,"h")),(o>0||i>0||n>0)&&(m+="".concat(o,"m")),(c>0||u>0)&&0===o&&0===i&&t>0?m+="".concat(u,".").concat(c,"s"):(u>0||o>0||i>0||n>0)&&(m+="".concat(u,"s")),""===m&&(m="-"),m}var _=n(381),E=n.n(_);n(7207);E().locale("en-il"),E().locale("en-il"),r.Z.filter("gitHash",(function(e){return e?40!==(e=e.toString()).length?e:e.substring(0,7):""})),r.Z.filter("bootstrapClass",(function(e,t){return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?t+"-success":"running"===e||"warning"===e?t+"-warning":"failed"===e||"danger"===e?t+"-danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?t+"-secondary":"pending"===e?t+"-info":"all"===e||"primary"===e?t+"-primary":t+"-light":t+"-light"})),r.Z.filter("bootstrapVariant",(function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?"outline-":"";return e?"succeeded"===(e=e.toString().toLowerCase())||"success"===e?n+"success":"running"===e||"warning"===e?n+"warning":"failed"===e||"danger"===e?n+"danger":"skipped"===e||"secondary"===e||"canceling"===e||"canceled"===e?n+"secondary":"pending"===e?n+"info":"all"===e||"primary"===e?n+"primary":n+"light":n+"light"})),r.Z.filter("animatedProgressBar",(function(e){return!!e&&("pending"===(e=e.toString().toLowerCase())||"running"===e||"canceling"===e)})),r.Z.filter("buildProgressBarValue",(function(e,t,n){if(!(e&&e.extraInfo&&t&&t.buildStatus))return 100;var r=t.buildStatus.toString().toLowerCase();if("pending"===r){if(e.extraInfo.medianPendingDuration>0&&t.insertedAt){var i=n-new Date(t.insertedAt),a=e.extraInfo.medianPendingDuration/Math.pow(10,6),o=Math.round(100*i/a);if(o>=0&&o<=100)return o}return 100}if("running"===r){if(e.extraInfo.medianDuration>0&&t.startedAt){var s=n-new Date(t.startedAt),u=e.extraInfo.medianDuration/Math.pow(10,6),l=Math.round(100*s/u);if(l>=0&&l<=100)return l}return 100}return 100})),r.Z.filter("buildProgressBarLabel",(function(e,t,n){if(!(e&&e.extraInfo&&t&&t.buildStatus))return"";var r=t.buildStatus.toString().toLowerCase();if("pending"===r){if(e.extraInfo.medianPendingDuration>0&&t.insertedAt){var i=Math.pow(10,6)*(n-new Date(t.insertedAt)),a=e.extraInfo.medianPendingDuration;if(i/a>=.25){var o=a-i;if(o>=Math.pow(10,9))return L(o,0)+" left";if(o<=-1*Math.pow(10,9))return L(-1*o,0)+" over"}}return""}if("running"===r){if(e.extraInfo.medianDuration>0&&t.startedAt){var s=Math.pow(10,6)*(n-new Date(t.startedAt)),u=e.extraInfo.medianDuration;if(s/u>=.25){var l=u-s;if(l>=Math.pow(10,9))return L(l,0)+" left";if(l<=-1*Math.pow(10,9))return L(-1*l,0)+" over"}}return""}return""})),r.Z.filter("releaseProgressBarValue",(function(e,t,n){if(!(e&&e.releaseTargets&&t&&t.releaseStatus))return 100;var r=t.releaseStatus.toString().toLowerCase(),i=e.releaseTargets.find((function(e){return e.name===t.name}));if(!i||!i.activeReleases)return 100;var a=i.activeReleases.find((function(e){return e.action===t.action}));if(!a||!a.extraInfo)return 100;if("pending"===r){if(a.extraInfo.medianPendingDuration>0&&t.insertedAt){var o=n-new Date(t.insertedAt),s=a.extraInfo.medianPendingDuration/Math.pow(10,6),u=Math.round(100*o/s);if(u>=0&&u<=100)return u}return 100}if("running"===r){if(a.extraInfo.medianDuration>0&&t.startedAt){var l=n-new Date(t.startedAt),c=a.extraInfo.medianDuration/Math.pow(10,6),m=Math.round(100*l/c);if(m>=0&&m<=100)return m}return 100}return 100})),r.Z.filter("releaseProgressBarLabel",(function(e,t,n){if(!(e&&e.releaseTargets&&t&&t.releaseStatus))return"";var r=t.releaseStatus.toString().toLowerCase(),i=e.releaseTargets.find((function(e){return e.name===t.name}));if(!i||!i.activeReleases)return"";var a=i.activeReleases.find((function(e){return e.action===t.action}));if(!a||!a.extraInfo)return"";if("pending"===r){if(a.extraInfo.medianPendingDuration>0&&t.insertedAt){var o=Math.pow(10,6)*(n-new Date(t.insertedAt)),s=a.extraInfo.medianPendingDuration;if(o/s>=.25){var u=s-o;if(u>=Math.pow(10,9))return L(u,0)+" left";if(u<=-1*Math.pow(10,9))return L(-1*u,0)+" over"}}return""}if("running"===r){if(a.extraInfo.medianDuration>0&&t.startedAt){var l=Math.pow(10,6)*(n-new Date(t.startedAt)),c=a.extraInfo.medianDuration;if(l/c>=.25){var m=c-l;if(m>=Math.pow(10,9))return L(m,0)+" left";if(m<=-1*Math.pow(10,9))return L(-1*m,0)+" over"}}return""}return""})),r.Z.filter("botProgressBarValue",(function(e,t,n){if(!(e&&e.botTargets&&t&&t.botStatus))return 100;var r=t.botStatus.toString().toLowerCase(),i=e.botTargets.find((function(e){return e.name===t.name}));if(!i||!i.activebots)return 100;var a=i.activebots.find((function(e){return e.action===t.action}));if(!a||!a.extraInfo)return 100;if("pending"===r){if(a.extraInfo.medianPendingDuration>0&&t.insertedAt){var o=n-new Date(t.insertedAt),s=a.extraInfo.medianPendingDuration/Math.pow(10,6),u=Math.round(100*o/s);if(u>=0&&u<=100)return u}return 100}if("running"===r){if(a.extraInfo.medianDuration>0&&t.startedAt){var l=n-new Date(t.startedAt),c=a.extraInfo.medianDuration/Math.pow(10,6),m=Math.round(100*l/c);if(m>=0&&m<=100)return m}return 100}return 100})),r.Z.filter("botProgressBarLabel",(function(e,t,n){if(!(e&&e.botTargets&&t&&t.botStatus))return"";var r=t.botStatus.toString().toLowerCase(),i=e.botTargets.find((function(e){return e.name===t.name}));if(!i||!i.activebots)return"";var a=i.activebots.find((function(e){return e.action===t.action}));if(!a||!a.extraInfo)return"";if("pending"===r){if(a.extraInfo.medianPendingDuration>0&&t.insertedAt){var o=Math.pow(10,6)*(n-new Date(t.insertedAt)),s=a.extraInfo.medianPendingDuration;if(o/s>=.25){var u=s-o;if(u>=Math.pow(10,9))return L(u,0)+" left";if(u<=-1*Math.pow(10,9))return L(-1*u,0)+" over"}}return""}if("running"===r){if(a.extraInfo.medianDuration>0&&t.startedAt){var l=Math.pow(10,6)*(n-new Date(t.startedAt)),c=a.extraInfo.medianDuration;if(l/c>=.25){var m=c-l;if(m>=Math.pow(10,9))return L(m,0)+" left";if(m<=-1*Math.pow(10,9))return L(-1*m,0)+" over"}}return""}return""})),r.Z.filter("defaultValue",(function(e,t){return e||t})),r.Z.filter("capitalize",(function(e){return e?(e=e.toString()).charAt(0).toUpperCase()+e.slice(1):""})),r.Z.filter("colorDurationClass",(function(e){if(null===e)return"";if(e<=0)return"";var t=Math.floor(e/Math.pow(10,9));return t>300?"text-danger":t>120?"text-warning":"text-success"})),r.Z.filter("formatDatetime",(function(e){return null===e?"":E()(e).isSame(E()(),"year")?E()(e).isSame(E()(),"day")?E()(e).format("[today] [at] H:mm"):E()(e).format("D MMM [at] H:mm"):E()(e).format("D MMM YYYY [at] H:mm")})),r.Z.filter("moment",(function(e,t){return e?E()(e).format(t):""})),r.Z.filter("formatDuration",L),r.Z.filter("formatBytes",(function(e){if(!e)return"";if(e<=0)return"";var t=Math.floor(e/Math.pow(2,30)),n=e%Math.pow(2,30),r=Math.floor(n/Math.pow(2,20)),i="";if(t>0){var a=Math.floor(10*n/Math.pow(2,30));i+="".concat(t,".").concat(a,"GB")}return r>0&&0===t&&(i+="".concat(r,"MB")),i})),r.Z.filter("formatNumber",(function(e){return null===e?"":new Intl.NumberFormat("de-DE").format(e)})),r.Z.filter("splitCamelcase",(function(e){return e?e.replace(/([a-z])([A-Z])/g,"$1 $2"):""}));var U=n(5870);r.Z.directive("b-tooltip",U.o),r.Z.axios=a(),r.Z.$http=a(),r.Z.prototype.axios=a(),r.Z.prototype.$http=a(),r.Z.axios.interceptors.request.use((function(e){var t=e.url.split("?");return t.length>0&&"/"!==t[0][t[0].length-1]&&(t[0]+="/",e.url=t.join("?")),e.headers={"X-Requested-With":"XMLHttpRequest"},e}),(function(e){return Promise.reject(e)})),r.Z.axios.interceptors.response.use((function(e){return e}),(function(e){if(e.response)switch(e.response.status){case 401:T.dispatch("user/logout")}return Promise.reject(new Error(e.response&&e.response.data?e.response.data.error:e.message))})),T.watch((function(e){return e.user.me}),(function(e,t){if(!e&&t)if(t.currentProvider){var n="/api/auth/login/"+t.currentProvider+"?returnURL="+S.currentRoute.fullPath;t.currentOrganization&&(n+="&organization="+t.currentOrganization),window.location.href=n}else S.replace({name:"Login",query:{returnURL:S.currentRoute.fullPath}})}));var G=function(e,t){var n=T.state.user.me,r=n&&n.active;!e.meta||!e.meta.requiredRole||n&&n.active&&n.roles&&n.roles.includes(e.meta.requiredRole)?e.matched.some((function(e){return!e.meta.allowedWithoutAuth}))&&!r?t({name:"Login",query:{returnURL:e.fullPath}}):t():t(!1)};S.beforeEach((function(e,t,n){e&&e.meta&&e.meta.title&&""!==e.meta.title?document.title="Estafette | "+e.meta.title:e&&e.meta&&e.meta.text&&""!==e.meta.text?document.title="Estafette | "+e.meta.text:document.title="Estafette","Login"!==e.name?T.state.user.loaded?G(e,n):T.dispatch("user/load").then((function(){G(e,n)})):n()})),r.Z.config.productionTip=!1,new r.Z({el:"#app",router:S,store:T,components:{App:O},template:"<App/>"})},6700:function(e,t,n){var r={"./af":2786,"./af.js":2786,"./ar":867,"./ar-dz":4130,"./ar-dz.js":4130,"./ar-kw":6135,"./ar-kw.js":6135,"./ar-ly":6440,"./ar-ly.js":6440,"./ar-ma":7702,"./ar-ma.js":7702,"./ar-sa":6040,"./ar-sa.js":6040,"./ar-tn":7100,"./ar-tn.js":7100,"./ar.js":867,"./az":1083,"./az.js":1083,"./be":9808,"./be.js":9808,"./bg":8338,"./bg.js":8338,"./bm":7438,"./bm.js":7438,"./bn":8905,"./bn-bd":6225,"./bn-bd.js":6225,"./bn.js":8905,"./bo":1560,"./bo.js":1560,"./br":1278,"./br.js":1278,"./bs":622,"./bs.js":622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":877,"./cv.js":877,"./cy":7373,"./cy.js":7373,"./da":4780,"./da.js":4780,"./de":9740,"./de-at":217,"./de-at.js":217,"./de-ch":894,"./de-ch.js":894,"./de.js":9740,"./dv":5300,"./dv.js":5300,"./el":837,"./el.js":837,"./en-au":8348,"./en-au.js":8348,"./en-ca":7925,"./en-ca.js":7925,"./en-gb":2243,"./en-gb.js":2243,"./en-ie":6436,"./en-ie.js":6436,"./en-il":7207,"./en-il.js":7207,"./en-in":4175,"./en-in.js":4175,"./en-nz":6319,"./en-nz.js":6319,"./en-sg":1662,"./en-sg.js":1662,"./eo":2915,"./eo.js":2915,"./es":7093,"./es-do":5251,"./es-do.js":5251,"./es-mx":6112,"./es-mx.js":6112,"./es-us":1146,"./es-us.js":1146,"./es.js":7093,"./et":5603,"./et.js":5603,"./eu":7763,"./eu.js":7763,"./fa":6959,"./fa.js":6959,"./fi":1897,"./fi.js":1897,"./fil":2549,"./fil.js":2549,"./fo":4694,"./fo.js":4694,"./fr":4470,"./fr-ca":3049,"./fr-ca.js":3049,"./fr-ch":2330,"./fr-ch.js":2330,"./fr.js":4470,"./fy":5044,"./fy.js":5044,"./ga":9295,"./ga.js":9295,"./gd":2101,"./gd.js":2101,"./gl":8794,"./gl.js":8794,"./gom-deva":7884,"./gom-deva.js":7884,"./gom-latn":3168,"./gom-latn.js":3168,"./gu":5349,"./gu.js":5349,"./he":4206,"./he.js":4206,"./hi":94,"./hi.js":94,"./hr":316,"./hr.js":316,"./hu":2138,"./hu.js":2138,"./hy-am":1423,"./hy-am.js":1423,"./id":9218,"./id.js":9218,"./is":135,"./is.js":135,"./it":626,"./it-ch":150,"./it-ch.js":150,"./it.js":626,"./ja":9183,"./ja.js":9183,"./jv":4286,"./jv.js":4286,"./ka":2105,"./ka.js":2105,"./kk":7772,"./kk.js":7772,"./km":8758,"./km.js":8758,"./kn":9282,"./kn.js":9282,"./ko":3730,"./ko.js":3730,"./ku":1408,"./ku.js":1408,"./ky":3291,"./ky.js":3291,"./lb":6841,"./lb.js":6841,"./lo":5466,"./lo.js":5466,"./lt":7010,"./lt.js":7010,"./lv":7595,"./lv.js":7595,"./me":9861,"./me.js":9861,"./mi":5493,"./mi.js":5493,"./mk":5966,"./mk.js":5966,"./ml":7341,"./ml.js":7341,"./mn":5115,"./mn.js":5115,"./mr":370,"./mr.js":370,"./ms":9847,"./ms-my":1237,"./ms-my.js":1237,"./ms.js":9847,"./mt":2126,"./mt.js":2126,"./my":6165,"./my.js":6165,"./nb":4924,"./nb.js":4924,"./ne":6744,"./ne.js":6744,"./nl":3901,"./nl-be":9814,"./nl-be.js":9814,"./nl.js":3901,"./nn":3877,"./nn.js":3877,"./oc-lnc":2135,"./oc-lnc.js":2135,"./pa-in":5858,"./pa-in.js":5858,"./pl":4495,"./pl.js":4495,"./pt":9520,"./pt-br":7971,"./pt-br.js":7971,"./pt.js":9520,"./ro":6459,"./ro.js":6459,"./ru":238,"./ru.js":238,"./sd":950,"./sd.js":950,"./se":490,"./se.js":490,"./si":124,"./si.js":124,"./sk":4249,"./sk.js":4249,"./sl":4985,"./sl.js":4985,"./sq":1104,"./sq.js":1104,"./sr":9131,"./sr-cyrl":9915,"./sr-cyrl.js":9915,"./sr.js":9131,"./ss":5893,"./ss.js":5893,"./sv":8760,"./sv.js":8760,"./sw":1172,"./sw.js":1172,"./ta":7333,"./ta.js":7333,"./te":3110,"./te.js":3110,"./tet":2095,"./tet.js":2095,"./tg":7321,"./tg.js":7321,"./th":9041,"./th.js":9041,"./tk":9005,"./tk.js":9005,"./tl-ph":5768,"./tl-ph.js":5768,"./tlh":9444,"./tlh.js":9444,"./tr":2397,"./tr.js":2397,"./tzl":8254,"./tzl.js":8254,"./tzm":1106,"./tzm-latn":699,"./tzm-latn.js":699,"./tzm.js":1106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":7691,"./uk.js":7691,"./ur":3795,"./ur.js":3795,"./uz":6791,"./uz-latn":588,"./uz-latn.js":588,"./uz.js":6791,"./vi":5666,"./vi.js":5666,"./x-pseudo":4378,"./x-pseudo.js":4378,"./yo":5805,"./yo.js":5805,"./zh-cn":3839,"./zh-cn.js":3839,"./zh-hk":5726,"./zh-hk.js":5726,"./zh-mo":9807,"./zh-mo.js":9807,"./zh-tw":4152,"./zh-tw.js":4152};function i(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}i.keys=function(){return Object.keys(r)},i.resolve=a,e.exports=i,i.id=6700}},function(e){"use strict";e.O(0,[289],(function(){return t=6291,e(e.s=t);var t}));e.O()}]);