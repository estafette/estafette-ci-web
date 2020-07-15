(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"+jG/":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{attrs:{title:e.repo.repoSource+"/"+e.repo.repoOwner+"/"+e.repo.repoName}},[i("span",{staticClass:"repo-source-and-owner"},[e._v(e._s(e.repo.repoSource)+"/"+e._s(e.repo.repoOwner)+"/")]),i("span",{staticClass:"repo-name"},[e._v(e._s(e.repo.repoName))])])};n._withStripped=!0;var r={props:{repo:{type:Object,default:null}}},a=i("KHd+"),s=Object(a.a)(r,n,[],!1,null,null,null);s.options.__file="src/components/RepositoryTitle.vue";t.a=s.exports},"3/MV":function(e,t,i){"use strict";var n=function(){var e=this.$createElement;return(this._self._c||e)("a",{class:["text-body"],attrs:{href:this.commitURL(),target:"_blank"},on:{click:function(e){e.stopPropagation()}}},[this._v("\n  "+this._s(this._f("gitHash")(this.build.repoRevision))+"\n")])};n._withStripped=!0;var r={props:{build:{type:Object,default:null}},methods:{commitURL:function(){switch(this.build.repoSource){case"github.com":return"https://github.com/".concat(this.build.repoOwner,"/").concat(this.build.repoName,"/commit/").concat(this.build.repoRevision);case"bitbucket.org":return"https://bitbucket.org/".concat(this.build.repoOwner,"/").concat(this.build.repoName,"/commits/").concat(this.build.repoRevision)}return"#"}}},a=i("KHd+"),s=Object(a.a)(r,n,[],!1,null,null,null);s.options.__file="src/components/CommitLink.vue";t.a=s.exports},CUMe:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",e._l(e.limitCommits,(function(t){return i("div",{key:t.message,staticClass:"text-truncate"},[e._v("\n    "+e._s(t.message)+" / "+e._s(t.author.name)+"\n  ")])})),0)};n._withStripped=!0;var r={props:{commits:{type:Array,default:null},limit:{type:Number,default:3}},computed:{limitCommits:function(){return this.commits?this.commits.length<=this.limit?this.commits:this.commits.slice(0,this.limit):[]}}},a=i("KHd+"),s=Object(a.a)(r,n,[],!1,null,null,null);s.options.__file="src/components/Commits.vue";t.a=s.exports},D8w6:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.duration&&e.duration>0?i("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"d-none d-sm-inline",attrs:{title:e.title}},[e._v("\n  in "),i("span",{class:e.$options.filters.colorDurationClass(e.duration)},[e._v(e._s(e._f("formatDuration")(e.duration)))])]):e._e()};n._withStripped=!0;var r={props:{duration:{type:Number,default:null},pendingDuration:{type:Number,default:null}},computed:{title:function(){return this.pendingDuration>0?"Started after ".concat(this.$options.filters.formatDuration(this.pendingDuration)):""}}},a=i("KHd+"),s=Object(a.a)(r,n,[],!1,null,null,null);s.options.__file="src/components/DurationLabel.vue";t.a=s.exports},JWTo:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:e.cssClass},[i("property-label",{class:e.labelCssClass,attrs:{text:e.label}}),e._v(" "),i("property-value",{class:e.valueCssClass},[e._t("default",[e._v(e._s(e.value))])],2)],1)};n._withStripped=!0;var r=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"property-label"},[this._v("\n  "+this._s(this.text)+"\n")])};r._withStripped=!0;var a={props:{text:{type:String,default:""}}},s=i("KHd+"),o=Object(s.a)(a,r,[],!1,null,null,null);o.options.__file="src/components/PropertyLabel.vue";var l=o.exports,p=function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"property-value"},[this._t("default",[this._v(this._s(this.text))])],2)};p._withStripped=!0;var c={props:{text:{type:String,default:""}}},u=Object(s.a)(c,p,[],!1,null,null,null);u.options.__file="src/components/PropertyValue.vue";var m={components:{PropertyLabel:l,PropertyValue:u.exports},props:{label:{type:String,default:""},value:{type:String,default:""},variant:{type:String,default:"primary",validator:function(e){return-1!==["primary","secondary","success","danger","warning","info","light","dark"].indexOf(e)}},labelCssClass:{type:String,default:""},valueCssClass:{type:String,default:""},title:{type:Boolean,default:!1},wide:{type:Boolean,default:!1},noTruncate:{type:Boolean,default:!1}},computed:{cssClass:function(){return this.title?"property-block-title variant-".concat(this.variant):this.wide?"property-block-wide":this.noTruncate?"property-block-no-truncate":"property-block"}}},d=Object(s.a)(m,n,[],!1,null,null,null);d.options.__file="src/components/PropertyBlock.vue";t.a=d.exports},sSrk:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.releaseTarget?i("span",[e.releaseTarget.activeReleases&&e.releaseTarget.activeReleases.length>0?i("div",{staticClass:"btn-light btn btn-sm mr-1 mb-1"},[e._v("\n    "+e._s(e.releaseTarget.name)),e._l(e.mergedActionsAndActiveReleases(e.releaseTarget),(function(t,n){return i("router-link",{key:n,class:[e.$options.filters.bootstrapClass(t.releaseStatus,"badge"),"badge ml-1 mb-1 d-block d-md-inline-block"],attrs:{to:{name:"PipelineReleaseLogs",params:{repoSource:t.repoSource,repoOwner:t.repoOwner,repoName:t.repoName,releaseID:t.id}},exact:"",tag:"span",title:t.action}},[t.action?i("span",[e._v("\n        "+e._s(t.action)+":\n      ")]):e._e(),e._v(e._s(e._f("defaultValue")(t.releaseVersion,"-"))+"\n\n      "),e.releaseIsUpToDate(t)?i("font-awesome-icon",{attrs:{icon:"fire"}}):e._e()],1)}))],2):i("div",{class:["btn-light","btn btn-sm mr-1 mb-1"]},[e._v("\n    "+e._s(e.releaseTarget.name)),i("span",{class:["badge ml-1"]},[e._v("\n      -\n    ")])])]):e._e()};n._withStripped=!0;var r=i("7O5W"),a=i("wHSu"),s=i("rT2p");r.c.add(a.t);var o={components:{FontAwesomeIcon:s.a},props:{releaseTarget:{type:Object,default:null},pipeline:{type:Object,default:null}},methods:{releaseIsUpToDate:function(e){return this.pipeline&&this.pipeline.buildStatus&&"succeeded"===this.pipeline.buildStatus&&this.pipeline.buildVersion&&e&&e.releaseStatus&&"succeeded"===e.releaseStatus&&this.pipeline.buildVersion===e.releaseVersion},getActiveRelease:function(e,t){if(e)return e.find((function(e){return e.action===t}))}},computed:{mergedActionsAndActiveReleases:function(){var e=this;return function(t){if(!(t.actions&&0!==t.actions.length||t.activeReleases&&0!==t.activeReleases.length))return[{name:t.name,repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName}];if(!t.actions||0===t.actions.length)return t.activeReleases;var i=[];return t.actions.filter((function(e){return!e.hideBadge})).forEach((function(n){var r=e.getActiveRelease(t.activeReleases,n.name);void 0!==r?i.push(r):i.push({name:t.name,action:n.name,repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName})})),i}}}},l=i("KHd+"),p=Object(l.a)(o,n,[],!1,null,null,null);p.options.__file="src/components/ReleaseBadge.vue";t.a=p.exports},"u1G+":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"m-3"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-12"},[i("b-jumbotron",{staticClass:"mb-3 pl-4 pt-4 pr-4 pb-5 rounded border",attrs:{lead:"Your portal to application development & management","bg-variant":"white","text-variant":"dark","header-level":"3","container-fluid":"",fluid:""},scopedSlots:e._u([{key:"header",fn:function(){return[i("span",{staticClass:"text-success font-italic"},[e._v("\n            Estafette\n          ")])]},proxy:!0}])},[e._v(" "),i("p",[e._v("For more information visit the public website.")]),e._v(" "),i("b-button",{attrs:{variant:"success",href:"https://estafette.io/",target:"_blank"}},[e._v("\n          Learn more\n        ")])],1)],1),e._v(" "),e._l(e.sections,(function(e){return i("section-banner",{key:e.name,attrs:{section:e}})}))],2),e._v(" "),i("div",{staticClass:"row"},[i("my-pipelines",{staticClass:"col-12 col-md-6",attrs:{title:"Pipelines you recently committed to",filter:"recent-committer",type:"build"}}),e._v(" "),i("my-pipelines",{staticClass:"col-12 col-md-6",attrs:{title:"Pipelines you recently released",filter:"recent-releaser",type:"release"}})],1)])};n._withStripped=!0;var r=i("L2JU"),a=i("+N68"),s=i("GUe+"),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.section?i("div",{staticClass:"col-12 col-md-6 col-xxxl-3"},[i("b-jumbotron",{staticClass:"mb-3 p-3 rounded border",attrs:{header:e.header,lead:e.lead,"bg-variant":e.bgVariant,"text-variant":e.textVariant,"header-level":"4","container-fluid":"",fluid:""}},[i("b-button",{attrs:{variant:"light",to:{name:e.section.name}}},[e._v("\n      See more\n    ")])],1)],1):e._e()};function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}o._withStripped=!0;var p={components:{BJumbotron:a.a,BButton:s.a},props:{section:{type:Object,default:null}},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){l(e,t,i[t])}))}return e}({},Object(r.b)("user",{user:"me"}),{header:function(){var e=this.section;return e?e.meta&&e.meta.text?e.meta.text:e.name:""},lead:function(){var e=this.section;return e&&e.meta&&e.meta.lead?e.meta.lead:""},bgVariant:function(){var e=this.section;return e&&e.meta&&e.meta.variant?e.meta.variant:"secondary"},textVariant:function(){var e=this.section;if(!e)return"white";if(e.meta&&e.meta.variant)switch(e.meta.variant){case"warning":return"dark"}return"white"}})},c=i("KHd+"),u=Object(c.a)(p,o,[],!1,null,null,null);u.options.__file="src/components/SectionBanner.vue";var m=u.exports,d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.user&&e.user.active&&e.pipelines.length>0?i("div",[i("div",{staticClass:"row m-0 mt-3 mb-3 ml-3 justify-content-center"},[i("div",{staticClass:"h5 text-center mt-3 mb-3 text-secondary"},[e._v("\n      "+e._s(e.title)+"\n    ")])]),e._v(" "),i("transition-group",{attrs:{name:"list-complete",tag:"div"}},e._l(e.pipelines,(function(t){return i("pipeline-compact",{key:t.repoSource+"/"+t.repoOwner+"/"+t.repoName,attrs:{pipeline:t,filter:e.filter,type:e.type}})})),1),e._v(" "),i("div",{staticClass:"row m-0"},[i("div",{staticClass:"col-12 text-right"},[i("div",{staticClass:"d-inline-flex mr-2"},[e._v("\n        "+e._s(e.firstPageItem)+"-"+e._s(e.lastPageItem)+" of "+e._s(e.pagination.totalItems)+"\n      ")]),e._v(" "),i("b-pagination",{staticClass:"d-inline-flex",attrs:{"total-rows":e.pagination.totalItems,"per-page":e.pagination.size,limit:"3","hide-goto-end-buttons":"","hide-ellipsis":"",small:""},model:{value:e.pagination.page,callback:function(t){e.$set(e.pagination,"page",t)},expression:"pagination.page"}})],1)])],1):e._e()};d._withStripped=!0;var f=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("router-link",{staticClass:"compact-block list-complete-item",attrs:{to:{name:"PipelineOverview",params:{repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName}},tag:"div"}},[i("property-block",{attrs:{label:"Pipeline"}},[i("repository-title",{attrs:{repo:e.pipeline}})],1),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Version",value:e.pipeline.buildVersion}}):e._e(),e._v(" "),""===e.type||"build"===e.type?i("property-block",{attrs:{label:"Status"}},[i("router-link",{attrs:{to:{name:"PipelineBuildLogs",params:{repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName,id:e.pipeline.id}}}},[i("b-progress",[i("b-progress-bar",{attrs:{value:e.$options.filters.buildProgressBarValue(e.pipeline,e.pipeline,e.now),label:e.$options.filters.buildProgressBarLabel(e.pipeline,e.pipeline,e.now),variant:e.$options.filters.bootstrapVariant(e.pipeline.buildStatus),animated:e.$options.filters.animatedProgressBar(e.pipeline.buildStatus)}})],1)],1)],1):e._e(),e._v(" "),""===e.type||"build"===e.type?i("property-block",{attrs:{label:"Built at"}},[e._v("\n    "+e._s(e._f("formatDatetime")(e.pipeline.insertedAt))+"\n    "),i("duration-label",{attrs:{duration:e.pipeline.duration,"pending-duration":e.pipeline.pendingDuration}})],1):e._e(),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Branch",value:e.pipeline.repoBranch}}):e._e(),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Revision"}},[i("commit-link",{attrs:{build:e.pipeline}})],1):e._e(),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Commit(s)"}},[i("commits",{attrs:{commits:e.pipeline.commits,limit:1}})],1):e._e(),e._v(" "),e.showReleases?i("div",{staticClass:"block-divider"},[i("div")]):e._e(),e._v(" "),e.showReleases?i("property-block",{attrs:{label:"Releases",wide:""}},e._l(e.pipeline.releaseTargets,(function(t){return i("release-badge",{key:t.name,attrs:{"release-target":t,pipeline:e.pipeline}})})),1):e._e()],1)};f._withStripped=!0;var h=i("SfWM"),b=i("zwfp"),v=i("3/MV"),_=i("sSrk"),g=i("JWTo"),y=i("+jG/"),w=i("D8w6"),S=i("CUMe"),O=i("pDaz"),P={components:{BProgress:h.a,BProgressBar:b.a,CommitLink:v.a,ReleaseBadge:_.a,PropertyBlock:g.a,RepositoryTitle:y.a,DurationLabel:w.a,Commits:S.a},props:{pipeline:{type:Object,default:null},type:{type:String,default:""}},data:function(){return{now:Date.now()}},created:function(){this.updateNow()},methods:{updateNow:function(){this.now=Date.now(),!this.pipeline||"pending"!==this.pipeline.buildStatus&&"running"!==this.pipeline.buildStatus||O.a.timeout(this.timeout,this.updateNow,1)}},beforeDestroy:function(){clearTimeout(this.timeout)},computed:{showReleases:function(){return(""===this.type||"release"===this.type)&&this.pipeline.releaseTargets&&this.pipeline.releaseTargets.length>0}}},C=Object(c.a)(P,f,[],!1,null,null,null);function k(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}C.options.__file="src/components/PipelineCompact.vue";var j={components:{PipelineCompact:C.exports,BPagination:i("JtJI").a},props:{filter:{type:String,default:"recent-committer"},title:{type:String,default:""},type:{type:String,default:""}},data:function(){return{pipelines:[],pagination:{page:1,size:4,totalPages:0,totalItems:0},refresh:!0}},created:function(){this.loadPipelines()},methods:{loadPipelines:function(){var e=this;this.user&&this.user.active?this.axios.get("/api/pipelines?filter[since]=1w&filter[since]=1w&filter[".concat(this.filter,"]=").concat(this.user.email,"&page[number]=").concat(this.pagination.page,"&page[size]=").concat(this.pagination.size,"&sort=-last_updated_at,repo_source,repo_owner,repo_name")).then((function(t){e.pipelines=t.data.items,e.pagination=t.data.pagination,e.periodicallyRefreshPipelines(5)})).catch((function(t){e.periodicallyRefreshPipelines(30)})):this.periodicallyRefreshPipelines(30)},periodicallyRefreshPipelines:function(e){this.refreshTimeout&&clearTimeout(this.refreshTimeout);var t=1e3*e*.75,i=1e3*e*1.25,n=Math.floor(Math.random()*(t-i+1)+i);this.refresh&&(this.refreshTimeout=setTimeout(this.loadPipelines,n))}},watch:{user:{handler:function(e,t){this.loadPipelines()},deep:!0},pagination:{handler:function(e,t){t.page!==e.page&&this.loadPipelines()},deep:!0}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){k(e,t,i[t])}))}return e}({},Object(r.b)("user",{user:"me"}),{firstPageItem:function(){return 1+(this.pagination.page-1)*this.pagination.size},lastPageItem:function(){return this.pagination.page*this.pagination.size<this.pagination.totalItems?this.pagination.page*this.pagination.size:this.pagination.totalItems}}),beforeDestroy:function(){this.refresh=!1,this.refreshTimeout&&clearTimeout(this.refreshTimeout)}},x=Object(c.a)(j,d,[],!1,null,null,null);x.options.__file="src/components/MyPipelines.vue";var R=x.exports;function T(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var B={components:{BJumbotron:a.a,BButton:s.a,SectionBanner:m,MyPipelines:R},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),n.forEach((function(t){T(e,t,i[t])}))}return e}({},Object(r.b)("user",{user:"me"}),{sections:function(){var e=this;return this.$router.options.routes.filter((function(t){return(!t.meta||!t.meta.hide)&&(!(!t.meta||!t.meta.banner)&&(!!(e.user&&e.user.active||t.meta&&t.meta.allowedWithoutAuth)&&!(t.meta&&t.meta.requiredRole&&!(e.user&&e.user.active&&e.user.roles&&e.user.roles.includes(t.meta.requiredRole)))))}))}})},D=Object(c.a)(B,n,[],!1,null,null,null);D.options.__file="src/views/Home.vue";t.default=D.exports}}]);