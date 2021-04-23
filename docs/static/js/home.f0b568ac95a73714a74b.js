(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[177],{1006:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("a",{class:["text-body"],attrs:{href:e.commitURL(),target:"_blank",title:e._f("gitHash")(e.build.repoRevision)},on:{click:function(e){e.stopPropagation()}}},[e._v("\n  "+e._s(e._f("gitHash")(e.build.repoRevision))+"\n")])};r._withStripped=!0;var n={props:{build:{type:Object,default:null}},methods:{commitURL:function(){switch(this.build.repoSource){case"github.com":return"https://github.com/".concat(this.build.repoOwner,"/").concat(this.build.repoName,"/commit/").concat(this.build.repoRevision);case"bitbucket.org":return"https://bitbucket.org/".concat(this.build.repoOwner,"/").concat(this.build.repoName,"/commits/").concat(this.build.repoRevision)}return"#"}}},a=(0,i(1900).Z)(n,r,[],!1,null,null,null);a.options.__file="src/components/CommitLink.vue";var s=a.exports},7322:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",e._l(e.limitCommits,(function(t){return i("div",{key:t.message,staticClass:"text-truncate",attrs:{title:t.message+" / "+t.author.name}},[e._v("\n    "+e._s(t.message)+" / "+e._s(t.author.name)+"\n  ")])})),0)};r._withStripped=!0;var n={props:{commits:{type:Array,default:null},limit:{type:Number,default:3}},computed:{limitCommits:function(){return this.commits?this.commits.length<=this.limit?this.commits:this.commits.slice(0,this.limit):[]}}},a=(0,i(1900).Z)(n,r,[],!1,null,null,null);a.options.__file="src/components/Commits.vue";var s=a.exports},6342:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.duration&&e.duration>0?i("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"d-none d-sm-inline",attrs:{title:e.title}},[e._v("\n  in "),i("span",{class:e.$options.filters.colorDurationClass(e.duration)},[e._v(e._s(e._f("formatDuration")(e.duration)))])]):e._e()};r._withStripped=!0;var n={props:{duration:{type:Number,default:null},pendingDuration:{type:Number,default:null}},computed:{title:function(){return this.pendingDuration>0?"Started after ".concat(this.$options.filters.formatDuration(this.pendingDuration)):""}}},a=(0,i(1900).Z)(n,r,[],!1,null,null,null);a.options.__file="src/components/DurationLabel.vue";var s=a.exports},5322:function(e,t,i){"use strict";i.d(t,{Z:function(){return f}});var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:e.cssClass},[i("property-label",{class:e.labelCssClass,attrs:{text:e.label}}),e._v(" "),i("property-value",{class:e.valueCssClass,attrs:{title:e.value}},[e._t("default",[e._v(e._s(e.value))])],2)],1)};r._withStripped=!0;var n=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"property-label"},[e._v("\n  "+e._s(e.text)+"\n")])};n._withStripped=!0;var a={props:{text:{type:String,default:""}}},s=i(1900),o=(0,s.Z)(a,n,[],!1,null,null,null);o.options.__file="src/components/PropertyLabel.vue";var l=o.exports,p=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"property-value"},[e._t("default",[e._v(e._s(e.text))])],2)};p._withStripped=!0;var u={props:{text:{type:String,default:""}}},c=(0,s.Z)(u,p,[],!1,null,null,null);c.options.__file="src/components/PropertyValue.vue";var m={components:{PropertyLabel:l,PropertyValue:c.exports},props:{label:{type:String,default:""},value:{type:String,default:""},titleValue:{type:String,default:""},variant:{type:String,default:"primary",validator:function(e){return-1!==["primary","secondary","success","danger","warning","info","light","dark"].indexOf(e)}},labelCssClass:{type:String,default:""},valueCssClass:{type:String,default:""},title:{type:Boolean,default:!1},wide:{type:Boolean,default:!1},noTruncate:{type:Boolean,default:!1}},computed:{cssClass:function(){return this.title?"property-block-title variant-".concat(this.variant):this.wide?"property-block-wide":this.noTruncate?"property-block-no-truncate":"property-block"}}},d=(0,s.Z)(m,r,[],!1,null,null,null);d.options.__file="src/components/PropertyBlock.vue";var f=d.exports},3385:function(e,t,i){"use strict";i.d(t,{Z:function(){return p}});var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.releaseTarget?i("span",[e.releaseTarget.activeReleases&&e.releaseTarget.activeReleases.length>0?i("div",{staticClass:"btn-light btn btn-sm mr-1 mb-1"},[e._v("\n    "+e._s(e.releaseTarget.name)),e._l(e.mergedActionsAndActiveReleases(e.releaseTarget),(function(t,r){return i("router-link",{key:r,class:[e.$options.filters.bootstrapClass(t.releaseStatus,"badge"),"badge ml-1 mb-1 d-block d-md-inline-block"],attrs:{to:{name:"PipelineReleaseLogs",params:{repoSource:t.repoSource,repoOwner:t.repoOwner,repoName:t.repoName,releaseID:t.id}},exact:"",tag:"span",title:t.action}},[t.action?i("span",[e._v("\n        "+e._s(t.action)+":\n      ")]):e._e(),e._v(e._s(e._f("defaultValue")(t.releaseVersion,"-"))+"\n\n      "),e.releaseIsUpToDate(t)?i("font-awesome-icon",{attrs:{icon:"fire"}}):e._e()],1)}))],2):i("div",{class:["btn-light","btn btn-sm mr-1 mb-1"]},[e._v("\n    "+e._s(e.releaseTarget.name)),i("span",{class:["badge ml-1"]},[e._v("\n      -\n    ")])])]):e._e()};r._withStripped=!0;var n=i(8947),a=i(1436),s=i(7810);n.vI.add(a.Rpv);var o={components:{FontAwesomeIcon:s.GN},props:{releaseTarget:{type:Object,default:null},pipeline:{type:Object,default:null}},methods:{releaseIsUpToDate:function(e){return this.pipeline&&this.pipeline.buildStatus&&"succeeded"===this.pipeline.buildStatus&&this.pipeline.buildVersion&&e&&e.releaseStatus&&"succeeded"===e.releaseStatus&&this.pipeline.buildVersion===e.releaseVersion},getActiveRelease:function(e,t){if(e)return e.find((function(e){return e.action===t}))}},computed:{mergedActionsAndActiveReleases:function(){var e=this;return function(t){if(!(t.actions&&0!==t.actions.length||t.activeReleases&&0!==t.activeReleases.length))return[{name:t.name,repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName}];if(!t.actions||0===t.actions.length)return t.activeReleases;var i=[];return t.actions.filter((function(e){return!e.hideBadge})).forEach((function(r){var n=e.getActiveRelease(t.activeReleases,r.name);void 0!==n?i.push(n):i.push({name:t.name,action:r.name,repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName})})),i}}}},l=(0,i(1900).Z)(o,r,[],!1,null,null,null);l.options.__file="src/components/ReleaseBadge.vue";var p=l.exports},8714:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("span",{attrs:{title:e.repo.repoSource+"/"+e.repo.repoOwner+"/"+e.repo.repoName}},[i("span",{staticClass:"repo-source-and-owner"},[e._v(e._s(e.repo.repoSource)+"/"+e._s(e.repo.repoOwner)+"/")]),i("span",{staticClass:"repo-name"},[e._v(e._s(e.repo.repoName))])])};r._withStripped=!0;var n={props:{repo:{type:Object,default:null}}},a=(0,i(1900).Z)(n,r,[],!1,null,null,null);a.options.__file="src/components/RepositoryTitle.vue";var s=a.exports},4826:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return B}});var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("b-jumbotron",{staticClass:"section-header",attrs:{header:"Estafette","bg-variant":"dark","text-variant":"success","header-level":"4","container-fluid":"",fluid:""}}),e._v(" "),i("div",{staticClass:"row mr-0 ml-0"},e._l(e.sections,(function(e){return i("section-banner",{key:e.name,attrs:{section:e}})})),1),e._v(" "),i("div",{staticClass:"row mr-0 ml-0"},[i("my-pipelines",{staticClass:"col-12 col-md-6",attrs:{title:"Pipelines you recently committed to",filter:"recent-committer",type:"build"}}),e._v(" "),i("my-pipelines",{staticClass:"col-12 col-md-6",attrs:{title:"Pipelines you recently released",filter:"recent-releaser",type:"release"}})],1)],1)};r._withStripped=!0;var n=i(629),a=i(9406),s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.section?i("div",{staticClass:"col-12 col-md-6 col-xxxl-3"},[i("router-link",{attrs:{to:{name:e.section.name},tag:"div"}},[i("b-jumbotron",{staticClass:"section-banner clickable",attrs:{header:e.header,lead:e.lead,"bg-variant":e.bgVariant,"text-variant":e.textVariant,"header-level":"4","container-fluid":"",fluid:""}})],1)],1):e._e()};function o(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}s._withStripped=!0;var l={components:{BJumbotron:a.M},props:{section:{type:Object,default:null}},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},r=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),r.forEach((function(t){o(e,t,i[t])}))}return e}({},(0,n.rn)("user",{user:"me"}),{header:function(){var e=this.section;return e?e.meta&&e.meta.text?e.meta.text:e.name:""},lead:function(){var e=this.section;return e&&e.meta&&e.meta.lead?e.meta.lead:""},bgVariant:function(){var e=this.section;if(!e)return"secondary";if(e.meta&&e.meta.variant){switch(e.meta.variant){case"light":return"dark"}return e.meta.variant}return"secondary"},textVariant:function(){var e=this.section;if(!e)return"white";if(e.meta&&e.meta.variant)switch(e.meta.variant){case"warning":return"dark"}return"white"}})},p=i(1900),u=(0,p.Z)(l,s,[],!1,null,null,null);u.options.__file="src/components/SectionBanner.vue";var c=u.exports,m=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.user&&e.user.active&&e.pipelines.length>0?i("div",[i("div",{staticClass:"row m-0 mt-3 mb-3 ml-3 justify-content-center"},[i("div",{staticClass:"h5 text-center mt-3 mb-3 text-secondary"},[e._v("\n      "+e._s(e.title)+"\n    ")])]),e._v(" "),i("transition-group",{attrs:{name:"list-complete",tag:"div"}},e._l(e.pipelines,(function(t){return i("pipeline-compact",{key:t.repoSource+"/"+t.repoOwner+"/"+t.repoName,attrs:{pipeline:t,filter:e.filter,type:e.type}})})),1),e._v(" "),i("div",{staticClass:"row m-0"},[i("div",{staticClass:"col-12 text-right pr-0"},["recent-committer"==e.filter?i("b-button",{attrs:{variant:"success",to:{name:"Pipelines",query:{recentCommitter:"true"}}}},[e._v("\n        See more\n      ")]):e._e(),e._v(" "),"recent-releaser"==e.filter?i("b-button",{attrs:{variant:"success",to:{name:"Pipelines",query:{recentReleaser:"true"}}}},[e._v("\n        See more\n      ")]):e._e()],1)])],1):e._e()};m._withStripped=!0;var d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("router-link",{staticClass:"compact-block list-complete-item",attrs:{to:{name:"PipelineOverview",params:{repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName}},tag:"div"}},[i("property-block",{attrs:{label:"Pipeline"}},[i("repository-title",{attrs:{repo:e.pipeline}})],1),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Version",value:e.pipeline.buildVersion}}):e._e(),e._v(" "),""===e.type||"build"===e.type?i("property-block",{attrs:{label:"Status",value:e.pipeline.buildStatus}},[i("router-link",{attrs:{to:{name:"PipelineBuildLogs",params:{repoSource:e.pipeline.repoSource,repoOwner:e.pipeline.repoOwner,repoName:e.pipeline.repoName,id:e.pipeline.id}}}},[i("b-progress",[i("b-progress-bar",{attrs:{value:e.$options.filters.buildProgressBarValue(e.pipeline,e.pipeline,e.now),label:e.$options.filters.buildProgressBarLabel(e.pipeline,e.pipeline,e.now),variant:e.$options.filters.bootstrapVariant(e.pipeline.buildStatus),animated:e.$options.filters.animatedProgressBar(e.pipeline.buildStatus)}})],1)],1)],1):e._e(),e._v(" "),""===e.type||"build"===e.type?i("property-block",{attrs:{label:"Built at",value:e._f("formatDatetime")(e.pipeline.insertedAt)}},[e._v("\n    "+e._s(e._f("formatDatetime")(e.pipeline.insertedAt))+"\n    "),i("duration-label",{attrs:{duration:e.pipeline.duration,"pending-duration":e.pipeline.pendingDuration}})],1):e._e(),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Branch",value:e.pipeline.repoBranch}}):e._e(),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Revision"}},[i("commit-link",{attrs:{build:e.pipeline}})],1):e._e(),e._v(" "),""===e.type?i("property-block",{attrs:{label:"Commit(s)"}},[i("commits",{attrs:{commits:e.pipeline.commits,limit:1}})],1):e._e(),e._v(" "),e.showReleases?i("div",{staticClass:"block-divider"},[i("div")]):e._e(),e._v(" "),e.showReleases?i("property-block",{attrs:{label:"Releases",wide:""}},e._l(e.pipeline.releaseTargets,(function(t){return i("release-badge",{key:t.name,attrs:{"release-target":t,pipeline:e.pipeline}})})),1):e._e()],1)};d._withStripped=!0;var f=i(5752),v=i(2981),h=i(1006),b=i(3385),_=i(5322),g=i(8714),y=i(6342),w=i(7322),S=i(3900),P={components:{BProgress:f.D,BProgressBar:v.Q,CommitLink:h.Z,ReleaseBadge:b.Z,PropertyBlock:_.Z,RepositoryTitle:g.Z,DurationLabel:y.Z,Commits:w.Z},props:{pipeline:{type:Object,default:null},type:{type:String,default:""}},data:function(){return{now:Date.now()}},created:function(){this.updateNow()},methods:{updateNow:function(){this.now=Date.now(),!this.pipeline||"pending"!==this.pipeline.buildStatus&&"running"!==this.pipeline.buildStatus||S.Z.timeout(this.timeout,this.updateNow,1)}},beforeDestroy:function(){clearTimeout(this.timeout)},computed:{showReleases:function(){return(""===this.type||"release"===this.type)&&this.pipeline.releaseTargets&&this.pipeline.releaseTargets.length>0}}},O=(0,p.Z)(P,d,[],!1,null,null,null);function k(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}O.options.__file="src/components/PipelineCompact.vue";var C={components:{PipelineCompact:O.exports,BButton:i(5193).T},props:{filter:{type:String,default:"recent-committer"},title:{type:String,default:""},type:{type:String,default:""}},data:function(){return{pipelines:[],pagination:{page:1,size:4,totalPages:0,totalItems:0},refresh:!0}},created:function(){this.loadPipelines()},methods:{loadPipelines:function(){var e=this;this.user&&this.user.active?this.axios.get("/api/pipelines?filter[since]=1w&filter[since]=1w&filter[".concat(this.filter,"]=").concat(this.user.email,"&page[number]=").concat(this.pagination.page,"&page[size]=").concat(this.pagination.size,"&sort=-last_updated_at,repo_source,repo_owner,repo_name")).then((function(t){e.pipelines=t.data.items,e.pagination=t.data.pagination,e.periodicallyRefreshPipelines(5)})).catch((function(t){e.periodicallyRefreshPipelines(30)})):this.periodicallyRefreshPipelines(30)},periodicallyRefreshPipelines:function(e){this.refreshTimeout&&clearTimeout(this.refreshTimeout);var t=1e3*e*.75,i=1e3*e*1.25,r=Math.floor(Math.random()*(t-i+1)+i);this.refresh&&(this.refreshTimeout=setTimeout(this.loadPipelines,r))}},watch:{user:{handler:function(e,t){this.loadPipelines()},deep:!0},pagination:{handler:function(e,t){t.page!==e.page&&this.loadPipelines()},deep:!0}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},r=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),r.forEach((function(t){k(e,t,i[t])}))}return e}({},(0,n.rn)("user",{user:"me"}),{firstPageItem:function(){return 1+(this.pagination.page-1)*this.pagination.size},lastPageItem:function(){return this.pagination.page*this.pagination.size<this.pagination.totalItems?this.pagination.page*this.pagination.size:this.pagination.totalItems}}),beforeDestroy:function(){this.refresh=!1,this.refreshTimeout&&clearTimeout(this.refreshTimeout)}},x=(0,p.Z)(C,m,[],!1,null,null,null);x.options.__file="src/components/MyPipelines.vue";var R=x.exports;function j(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var T={components:{BJumbotron:a.M,SectionBanner:c,MyPipelines:R},methods:{isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},r=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),r.forEach((function(t){j(e,t,i[t])}))}return e}({},(0,n.rn)("user",{user:"me"}),{sections:function(){var e=this;return this.$router.options.routes.filter((function(t){return(!t.meta||!t.meta.hide)&&(!(!t.meta||!t.meta.banner)&&(!!(e.user&&e.user.active||t.meta&&t.meta.allowedWithoutAuth)&&!(t.meta&&t.meta.requiredRole&&!(e.user&&e.user.active&&e.user.roles&&e.user.roles.includes(t.meta.requiredRole)))))}))}})},Z=(0,p.Z)(T,r,[],!1,null,null,null);Z.options.__file="src/views/Home.vue";var B=Z.exports}}]);