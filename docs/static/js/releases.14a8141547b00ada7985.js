(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[474],{5969:function(e,t,r){"use strict";r.d(t,{a:function(){return o}});var s=r(2989),a=r(9558),n=r(7023);var i={vertical:{type:Boolean,default:!1},size:{type:String,default:function(){return(0,n.wJ)("BButton","size")}},tag:{type:String,default:"div"},ariaRole:{type:String,default:"group"}},o=s.Z.extend({name:"BButtonGroup",functional:!0,props:i,render:function(e,t){var r,s,n,i=t.props,o=t.data,l=t.children;return e(i.tag,(0,a.b)(o,{class:(r={"btn-group":!i.vertical,"btn-group-vertical":i.vertical},s="btn-group-".concat(i.size),n=i.size,s in r?Object.defineProperty(r,s,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[s]=n,r),attrs:{role:i.ariaRole}}),l)}})},5193:function(e,t,r){"use strict";r.d(t,{T:function(){return N}});var s=r(2989),a=r(9558),n=r(356),i=r(9340),o=r(1572),l=r(7023),u=r(6410),c=r(3284),p=r(7040),h=r(6595),d=r(7347);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var v="BButton",b={block:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,default:function(){return(0,l.wJ)(v,"size")}},variant:{type:String,default:function(){return(0,l.wJ)(v,"variant")}},type:{type:String,default:"button"},tag:{type:String,default:"button"},pill:{type:Boolean,default:!1},squared:{type:Boolean,default:!1},pressed:{type:Boolean,default:null}},y=(0,d.U4)();delete y.href.default,delete y.to.default;var P=(0,p.XP)(y),w=g(g({},y),b),_=function(e,t){return(0,h.BB)(e).toLowerCase()===(0,h.BB)(t).toLowerCase()},x=function(e){"focusin"===e.type?(0,u.cn)(e.target,"focus"):"focusout"===e.type&&(0,u.IV)(e.target,"focus")},S=function(e){return e.href||e.to||_(e.tag,"a")},k=function(e){return(0,c.jn)(e.pressed)},O=function(e){return!(S(e)||e.tag&&!_(e.tag,"button"))},B=function(e){return!S(e)&&!O(e)},C=function(e){var t;return["btn-".concat(e.variant||(0,l.wJ)(v,"variant")),(t={},m(t,"btn-".concat(e.size),e.size),m(t,"btn-block",e.block),m(t,"rounded-pill",e.pill),m(t,"rounded-0",e.squared&&!e.pill),m(t,"disabled",e.disabled),m(t,"active",e.pressed),t)]},j=function(e){return S(e)?(0,i.Z)(P,e):null},Z=function(e,t){var r=O(e),s=S(e),a=k(e),n=B(e),i=s&&"#"===e.href,o=t.attrs&&t.attrs.role?t.attrs.role:null,l=t.attrs?t.attrs.tabindex:null;return(n||i)&&(l="0"),{type:r&&!s?e.type:null,disabled:r?e.disabled:null,role:n||i?"button":o,"aria-disabled":n?String(e.disabled):null,"aria-pressed":a?String(e.pressed):null,autocomplete:a?"off":null,tabindex:e.disabled&&!r?"-1":l}},N=s.Z.extend({name:v,functional:!0,props:w,render:function(e,t){var r=t.props,s=t.data,i=t.listeners,l=t.children,u=k(r),p=S(r),h=B(r),f=p&&"#"===r.href,g={keydown:function(e){if(!r.disabled&&(h||f)){var t=e.keyCode;if(t===n.Z.SPACE||t===n.Z.ENTER&&h){var s=e.currentTarget||e.target;e.preventDefault(),s.click()}}},click:function(e){r.disabled&&(0,c.cO)(e)?(e.stopPropagation(),e.preventDefault()):u&&i&&i["update:pressed"]&&(0,o.zo)(i["update:pressed"]).forEach((function(e){(0,c.mf)(e)&&e(!r.pressed)}))}};u&&(g.focusin=x,g.focusout=x);var m={staticClass:"btn",class:C(r),props:j(r),attrs:Z(r,s),on:g};return e(p?d.we:r.tag,(0,a.b)(s,m),l)}})},6918:function(e,t,r){"use strict";r.d(t,{a:function(){return y}});var s=r(2989),a=r(3058),n=r(7023),i=r(6410),o=r(8077),l=r(1572),u=r(3284),c=r(7040),p=r(1578),h=r(3954),d=r(488),f=r(6595),g=r(7568),m=r(9878),v="BPaginationNav",b={size:{type:String,default:function(){return(0,n.wJ)(v,"size")}},numberOfPages:{type:[Number,String],default:1,validator:function(e){return!((0,h.Z3)(e,0)<1)||((0,g.ZK)('Prop "number-of-pages" must be a number greater than "0"',v),!1)}},baseUrl:{type:String,default:"/"},useRouter:{type:Boolean,default:!1},linkGen:{type:Function},pageGen:{type:Function},pages:{type:Array},noPageDetect:{type:Boolean,default:!1},activeClass:{type:String},exact:{type:Boolean,default:!1},exactActiveClass:{type:String},noPrefetch:{type:Boolean,default:!1}},y=s.Z.extend({name:v,mixins:[m.Z],props:b,computed:{isNav:function(){return!0},computedValue:function(){var e=(0,h.Z3)(this.value,0);return e<1?null:e}},watch:{numberOfPages:function(){var e=this;this.$nextTick((function(){e.setNumberOfPages()}))},pages:function(){var e=this;this.$nextTick((function(){e.setNumberOfPages()}))}},created:function(){this.setNumberOfPages()},mounted:function(){var e=this;this.$router&&this.$watch("$route",(function(){e.$nextTick((function(){(0,i.bz)((function(){e.guessCurrentPage()}))}))}))},methods:{setNumberOfPages:function(){var e,t=this;(0,l.kJ)(this.pages)&&this.pages.length>0?this.localNumberOfPages=this.pages.length:this.localNumberOfPages=(e=this.numberOfPages,(0,p.nP)((0,h.Z3)(e,0),1)),this.$nextTick((function(){t.guessCurrentPage()}))},onClick:function(e,t){var r=this;e!==this.currentPage&&((0,i.bz)((function(){r.currentPage=e,r.$emit("change",e)})),this.$nextTick((function(){var e=t.currentTarget||t.target;(0,i.Cx)(e)})))},getPageInfo:function(e){if(!(0,l.kJ)(this.pages)||0===this.pages.length||(0,u.o8)(this.pages[e-1])){var t="".concat(this.baseUrl).concat(e);return{link:this.useRouter?{path:t}:t,text:(0,f.BB)(e)}}var r=this.pages[e-1];if((0,c.Kn)(r)){var s=r.link;return{link:(0,c.Kn)(s)?s:this.useRouter?{path:s}:s,text:(0,f.BB)(r.text||e)}}return{link:(0,f.BB)(r),text:(0,f.BB)(e)}},makePage:function(e){var t=this.getPageInfo(e);return this.pageGen&&(0,u.mf)(this.pageGen)?this.pageGen(e,t):t.text},makeLink:function(e){var t=this.getPageInfo(e);return this.linkGen&&(0,u.mf)(this.linkGen)?this.linkGen(e,t):t.link},linkProps:function(e){var t=this.makeLink(e),r={target:this.target||null,rel:this.rel||null,disabled:this.disabled,exact:this.exact,activeClass:this.activeClass,exactActiveClass:this.exactActiveClass,append:this.append,replace:this.replace,noPrefetch:this.noPrefetch};return this.useRouter||(0,c.Kn)(t)?r.to=t:r.href=t,r},resolveLink:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";try{(e=document.createElement("a")).href=(0,d.tN)({to:t},"a","/","/"),document.body.appendChild(e);var r=e,s=r.pathname,a=r.hash,n=r.search;return document.body.removeChild(e),{path:s,hash:a,query:(0,d.mB)(n)}}catch(t){try{e&&e.parentNode&&e.parentNode.removeChild(e)}catch(e){}return{}}},resolveRoute:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";try{var t=this.$router.resolve(e,this.$route).route;return{path:t.path,hash:t.hash,query:t.query}}catch(e){return{}}},guessCurrentPage:function(){var e=this.computedValue,t=this.$router,r=this.$route;if(!this.noPageDetect&&!e&&(o.jU||!o.jU&&t))for(var s=t&&r?{path:r.path,hash:r.hash,query:r.query}:{},n=o.jU?window.location||document.location:null,i=n?{path:n.pathname,hash:n.hash,query:(0,d.mB)(n.search)}:{},l=1;!e&&l<=this.localNumberOfPages;l++){var u=this.makeLink(l);e=t&&((0,c.Kn)(u)||this.useRouter)?(0,a.Z)(this.resolveRoute(u),s)?l:null:o.jU?(0,a.Z)(this.resolveLink(u),i)?l:null:-1}this.currentPage=e>0?e:0}}})},2981:function(e,t,r){"use strict";r.d(t,{Q:function(){return h}});var s=r(2989),a=r(7023),n=r(8735),i=r(3284),o=r(1578),l=r(3954),u=r(6595),c=r(8280),p="BProgressBar",h=s.Z.extend({name:p,mixins:[c.Z],inject:{bvProgress:{default:function(){return{}}}},props:{value:{type:[Number,String],default:0},label:{type:String},labelHtml:{type:String},max:{type:[Number,String],default:null},precision:{type:[Number,String],default:null},variant:{type:String,default:function(){return(0,a.wJ)(p,"variant")}},striped:{type:Boolean,default:null},animated:{type:Boolean,default:null},showProgress:{type:Boolean,default:null},showValue:{type:Boolean,default:null}},computed:{progressBarClasses:function(){return[this.computedVariant?"bg-".concat(this.computedVariant):"",this.computedStriped||this.computedAnimated?"progress-bar-striped":"",this.computedAnimated?"progress-bar-animated":""]},progressBarStyles:function(){return{width:this.computedValue/this.computedMax*100+"%"}},computedValue:function(){return(0,l.f_)(this.value,0)},computedMax:function(){var e=(0,l.f_)(this.max)||(0,l.f_)(this.bvProgress.max,0);return e>0?e:100},computedPrecision:function(){return(0,o.nP)((0,l.Z3)(this.precision,(0,l.Z3)(this.bvProgress.precision,0)),0)},computedProgress:function(){var e=this.computedPrecision,t=(0,o.Fq)(10,e);return(0,l.FH)(100*t*this.computedValue/this.computedMax/t,e)},computedVariant:function(){return this.variant||this.bvProgress.variant},computedStriped:function(){return(0,i.jn)(this.striped)?this.striped:this.bvProgress.striped||!1},computedAnimated:function(){return(0,i.jn)(this.animated)?this.animated:this.bvProgress.animated||!1},computedShowProgress:function(){return(0,i.jn)(this.showProgress)?this.showProgress:this.bvProgress.showProgress||!1},computedShowValue:function(){return(0,i.jn)(this.showValue)?this.showValue:this.bvProgress.showValue||!1}},render:function(e){var t=e();return this.hasNormalizedSlot("default")?t=this.normalizeSlot("default"):this.label||this.labelHtml?t=e("span",{domProps:(0,n.U)(this.labelHtml,this.label)}):this.computedShowProgress?t=this.computedProgress:this.computedShowValue&&(t=(0,l.FH)(this.computedValue,this.computedPrecision)),e("div",{staticClass:"progress-bar",class:this.progressBarClasses,style:this.progressBarStyles,attrs:{role:"progressbar","aria-valuemin":"0","aria-valuemax":(0,u.BB)(this.computedMax),"aria-valuenow":(0,l.FH)(this.computedValue,this.computedPrecision)}},[t])}})},5752:function(e,t,r){"use strict";r.d(t,{D:function(){return l}});var s=r(2989),a=r(7023),n=r(8280),i=r(2981),o="BProgress",l=s.Z.extend({name:o,mixins:[n.Z],provide:function(){return{bvProgress:this}},props:{variant:{type:String,default:function(){return(0,a.wJ)(o,"variant")}},striped:{type:Boolean,default:!1},animated:{type:Boolean,default:!1},height:{type:String},precision:{type:[Number,String],default:0},showProgress:{type:Boolean,default:!1},showValue:{type:Boolean,default:!1},max:{type:[Number,String],default:100},value:{type:[Number,String],default:0}},computed:{progressHeight:function(){return{height:this.height||null}}},render:function(e){var t=this.normalizeSlot("default");return t||(t=e(i.Q,{props:{value:this.value,max:this.max,precision:this.precision,variant:this.variant,animated:this.animated,striped:this.striped,showProgress:this.showProgress,showValue:this.showValue}})),e("div",{class:["progress"],style:this.progressHeight},[t])}})},9340:function(e,t,r){"use strict";var s=r(8265),a=r(1572),n=r(7040);t.Z=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s.Z;return((0,a.kJ)(e)?e.slice():(0,n.XP)(e)).reduce((function(e,s){return e[r(s)]=t[s],e}),{})}},9818:function(e,t,r){"use strict";r.d(t,{Z:function(){return m}});var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("router-link",{staticClass:"row-block list-complete-item",attrs:{to:{name:"PipelineReleaseLogs",params:{repoSource:e.release.repoSource,repoOwner:e.release.repoOwner,repoName:e.release.repoName,releaseID:e.release.id}},tag:"div"}},[e.allReleasesMode?r("property-block",{staticClass:"col-xxxl-2",attrs:{label:"Pipeline"}},[r("repository-title",{attrs:{repo:e.release}})],1):e._e(),e._v(" "),r("property-block",{staticClass:"col-xxxl-2",attrs:{label:e.release.action?"Target + action":"Target",value:e.release.action?e.release.name+" / "+e.release.action:e.release.name}},[e._v("\n    "+e._s(e.release.name)),e.release.action?r("span",[e._v("\n      / "+e._s(e.release.action)+"\n    ")]):e._e()]),e._v(" "),r("property-block",{staticClass:"col-xxxl-2",attrs:{label:"Version",value:e.release.releaseVersion}}),e._v(" "),r("property-block",{staticClass:"col-xxxl-2",attrs:{label:"Status",value:e.release.releaseStatus}},[r("b-progress",[r("b-progress-bar",{attrs:{value:e.$options.filters.releaseProgressBarValue(e.pipeline,e.release,e.now),label:e.$options.filters.releaseProgressBarLabel(e.pipeline,e.release,e.now),variant:e.$options.filters.bootstrapVariant(e.release.releaseStatus),animated:e.$options.filters.animatedProgressBar(e.release.releaseStatus)}})],1)],1),e._v(" "),r("property-block",{staticClass:"col-xxxl-2",attrs:{label:"Released at"}},[e._v("\n    "+e._s(e._f("formatDatetime")(e.release.insertedAt))+"\n    "),r("duration-label",{attrs:{duration:e.release.duration,"pending-duration":e.release.pendingDuration}})],1),e._v(" "),r("property-block",{staticClass:"col-xxxl-2",attrs:{label:"Triggered by"}},[r("triggered-by",{attrs:{events:e.release.triggerEvents}})],1),e._v(" "),e.showActions?r("property-block",{staticClass:"col-xxxl-2",attrs:{label:"Actions"}},[r("cancel-button",{attrs:{release:e.release}})],1):e._e()],1)};s._withStripped=!0;var a=r(629),n=r(5752),i=r(2981),o=r(8418),l=r(9325),u=r(5322),c=r(6342),p=r(8714),h=r(3900);function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f={components:{BProgress:n.D,BProgressBar:i.Q,CancelButton:o.Z,TriggeredBy:l.Z,PropertyBlock:u.Z,DurationLabel:c.Z,RepositoryTitle:p.Z},props:{release:{type:Object,default:null},pipeline:{type:Object,default:null},allReleasesMode:{type:Boolean,default:!1}},data:function(){return{now:Date.now()}},created:function(){this.updateNow()},methods:{updateNow:function(){this.now=Date.now(),!this.release||"pending"!==this.release.releaseStatus&&"running"!==this.release.releaseStatus||h.Z.timeout(this.timeout,this.updateNow,1)}},beforeDestroy:function(){clearTimeout(this.timeout)},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},s=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),s.forEach((function(t){d(e,t,r[t])}))}return e}({},(0,a.rn)("user",{user:"me"}),{showActions:function(){return!this.allReleasesMode&&this.user&&this.user.active&&this.release&&("pending"===this.release.releaseStatus||"running"===this.release.releaseStatus||"canceling"===this.release.releaseStatus)}})},g=(0,r(1900).Z)(f,s,[],!1,null,null,null);g.options.__file="src/components/ReleaseRow.vue";var m=g.exports},9325:function(e,t,r){"use strict";r.d(t,{Z:function(){return u}});var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.events&&e.events.length>0?r("div",e._l(e.events,(function(t,s){return r("div",{key:s},[t.pipeline?r("div",{attrs:{title:t.pipeline.repoSource+" / "+t.pipeline.repoOwner+" / "+t.pipeline.repoName}},[r("font-awesome-icon",{staticClass:"triggered-by-icon",attrs:{icon:"tools"}}),e._v(" "),r("router-link",{staticClass:"text-body",attrs:{to:{name:"PipelineOverview",params:{repoSource:t.pipeline.repoSource,repoOwner:t.pipeline.repoOwner,repoName:t.pipeline.repoName}}}},[e._v("\n        "+e._s(t.pipeline.repoSource)+"/"+e._s(t.pipeline.repoOwner)+"/"+e._s(t.pipeline.repoName)+"\n      ")])],1):e._e(),e._v(" "),t.release?r("div",{attrs:{title:t.release.repoSource+" / "+t.release.repoOwner+" / "+t.release.repoName}},[r("font-awesome-icon",{staticClass:"triggered-by-icon",attrs:{icon:"upload"}}),e._v(" "),r("router-link",{staticClass:"text-body",attrs:{to:{name:"PipelineReleases",params:{repoSource:t.release.repoSource,repoOwner:t.release.repoOwner,repoName:t.release.repoName}}}},[e._v("\n        "+e._s(t.release.repoSource)+"/"+e._s(t.release.repoOwner)+"/"+e._s(t.release.repoName)+"\n      ")])],1):e._e(),e._v(" "),t.git?r("div",{attrs:{title:t.git.repository}},[r("font-awesome-icon",{staticClass:"triggered-by-icon",attrs:{icon:"code-branch"}}),e._v(" "),r("a",{staticClass:"text-body",attrs:{href:"https://"+t.git.repository,target:"_blank"},on:{click:function(e){e.stopPropagation()}}},[e._v("\n        "+e._s(t.git.repository)+"\n      ")])],1):e._e(),e._v(" "),t.pubsub?r("div",{attrs:{title:"projects/"+t.pubsub.project+"/topics/"+t.pubsub.topic}},[r("h6",[r("font-awesome-icon",{staticClass:"triggered-by-icon",attrs:{icon:"bezier-curve"}}),e._v("\n        projects/"+e._s(t.pubsub.project)+"/topics/"+e._s(t.pubsub.topic)+"\n      ")],1)]):e._e(),e._v(" "),t.docker?r("div"):e._e(),e._v(" "),t.cron?r("div",{attrs:{title:t.cron.time}},[r("font-awesome-icon",{staticClass:"triggered-by-icon",attrs:{icon:"clock"}}),e._v("\n      "+e._s(t.cron.time)+"\n    ")],1):e._e(),e._v(" "),t.manual?r("div",{attrs:{title:t.manual.userID}},[r("font-awesome-icon",{staticClass:"triggered-by-icon",attrs:{icon:"user-circle"}}),e._v("\n      "+e._s(t.manual.userID)+"\n    ")],1):e._e()])})),0):e._e()};s._withStripped=!0;var a=r(8947),n=r(1436),i=r(7810);a.vI.add(n.CgH,n.cf$,n.m08,n.SZw,n.mh3,n.izv);var o={components:{FontAwesomeIcon:i.GN},props:{events:{type:Array,default:null}}},l=(0,r(1900).Z)(o,s,[],!1,null,null,null);l.options.__file="src/components/TriggeredBy.vue";var u=l.exports},5246:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"row m-0"},[r("div",{staticClass:"col-12 col-lg-6 col-xxl-4"},[r("status-filter",{attrs:{filter:e.filter}})],1),e._v(" "),r("div",{staticClass:"col-12 col-lg-6 col-xxl-2"}),e._v(" "),r("div",{staticClass:"col-12 col-lg-6 col-xxl-2"}),e._v(" "),r("div",{staticClass:"col-12 col-lg-6 col-xxl-2"}),e._v(" "),r("div",{staticClass:"col-12 col-lg-6 col-xxl-2 text-right"},[r("since-selector",{attrs:{model:e.filter.since,"on-change":e.setSince}})],1)]),e._v(" "),r("div",{staticClass:"row m-0"},[r("div",{staticClass:"col-12 col-lg-9"}),e._v(" "),r("div",{staticClass:"d-none d-lg-block col-12 col-lg-3 text-right"},[r("pagination-compact",{staticClass:"float-right",attrs:{pagination:e.pagination,"link-generator":e.paginationLinkGenerator}})],1)]),e._v(" "),r("transition-group-header",{staticClass:"ml-3 mr-3",attrs:{fields:e.fields}}),e._v(" "),e.releases.length>0?r("transition-group",{staticClass:"ml-3 mr-3",attrs:{name:"list-complete",tag:"div"}},e._l(e.releases,(function(e){return r("release-row",{key:e.id,attrs:{release:e,"all-releases-mode":!0}})})),1):e.loaded?r("div",{staticClass:"alert alert-warning text-center p-5"},[e._v("\n    There are no releases for the current filters. Please change your filters!\n  ")]):r("div",[r("spinner",{attrs:{color:"primary"}})],1),e._v(" "),e.releases.length>0?r("pagination",{attrs:{pagination:e.pagination,"link-generator":e.paginationLinkGenerator}}):e._e()],1)};s._withStripped=!0;var a=r(629),n=r(7817),i=r(9090),o=r(1826),l=r(3897),u=r(9818),c=r(2352),p=r(9271);function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},s=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),s.forEach((function(t){d(e,t,r[t])}))}return e}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f={components:{Spinner:n.Z,Pagination:i.Z,StatusFilter:o.Z,SinceSelector:l.Z,ReleaseRow:u.Z,PaginationCompact:c.Z,TransitionGroupHeader:p.Z},props:{query:{type:Object,default:null}},data:function(){return{releases:[],pagination:{page:1,size:10,totalPages:0,totalItems:0},filter:{status:"all",since:"1d"},sort:"-updated_at",fields:[{name:"Pipeline",class:"col-2",isSortable:!0,sortingQueryParams:{sort:"repo_source,repo_owner,repo_name"}},{name:"Target",class:"col-2"},{name:"Version",class:"col-2"},{name:"Status",class:"col-2"},{name:"Released",class:"col-2",isSortable:!0,sortingQueryParams:{sort:"-updated_at"}},{name:"Triggered by",class:"col-2"}],loaded:!1,refresh:!0}},created:function(){this.filterDefaults=h({},this.filter),this.sortDefaults=this.sort,this.setDataFromQueryParams(this.query),this.$router.replace({query:this.getQueryParams()}).catch((function(){})),this.loadReleases()},methods:{paginationLinkGenerator:function(e){var t=this.getQueryParams();return e>0?t.page=e:t.page&&delete t.page,{query:t}},getQueryParams:function(){var e=h({},this.$route.query);return this.filter&&this.filter.status&&""!==this.filter.status?e.status=this.filter.status:e.status&&delete e.status,this.filter&&this.filter.since&&""!==this.filter.since?e.since=this.filter.since:e.since&&delete e.since,this.pagination&&this.pagination.page&&this.pagination.page>0?e.page=this.pagination.page:e.page&&delete e.page,this.sort?e.sort=this.sort:e.sort&&delete e.sort,e},setDataFromQueryParams:function(e){this.pagination.page=e&&e.page?Number.parseInt(e.page,10):1,this.filter.status=e&&e.status?e.status:this.filterDefaults.status,this.filter.since=e&&e.since?e.since:this.filterDefaults.since,this.sort=e&&e.sort?e.sort:this.sortDefaults},updateQueryParams:function(){this.$router.push({query:this.getQueryParams()})},loadReleases:function(){var e=this,t="filter[status]=".concat(this.filter.status);"running"===this.filter.status&&(t+="&filter[status]=pending&filter[status]=canceling"),this.axios.get("/api/releases?".concat(t,"&filter[since]=").concat(this.filter.since,"&page[number]=").concat(this.pagination.page,"&page[size]=").concat(this.pagination.size,"&sort=").concat(this.sort)).then((function(t){e.releases=t.data.items,e.pagination=t.data.pagination,e.loaded=!0,e.periodicallyRefreshRelease(15)})).catch((function(t){e.periodicallyRefreshRelease(15)}))},periodicallyRefreshRelease:function(e){this.refreshTimeout&&clearTimeout(this.refreshTimeout);var t=1e3*e*.75,r=1e3*e*1.25,s=Math.floor(Math.random()*(t-r+1)+r);this.refresh&&(this.refreshTimeout=setTimeout(this.loadReleases,s))},setSince:function(e){this.filter.since=e,this.pagination.page=1,this.updateQueryParams()}},computed:h({},(0,a.rn)("user",{user:"me"})),watch:{$route:function(e,t){this.setDataFromQueryParams(e.query),this.loadReleases()},pipeline:{handler:function(e,t){this.loadReleases()},deep:!0}},beforeDestroy:function(){this.refresh=!1,this.refreshTimeout&&clearTimeout(this.refreshTimeout)}},g=(0,r(1900).Z)(f,s,[],!1,null,"cd3e617a",null);g.options.__file="src/views/AllReleases.vue";var m=g.exports}}]);