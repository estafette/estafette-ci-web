(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[701],{648:function(t,e){"use strict";function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.Z={methods:{queryGenerator:function(t){var e=function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable})))),r.forEach((function(e){n(t,e,a[e])}))}return t}({},this.$route.query,t);for(var a in e)e[a]&&""!==e[a]||delete e[a];return e}}}},7391:function(t,e,n){"use strict";n.d(e,{j:function(){return o}});var a=n(2989),r=n(9558),i={textTag:{type:String,default:"p"}},o=a.Z.extend({name:"BCardText",functional:!0,props:i,render:function(t,e){var n=e.props,a=e.data,i=e.children;return t(n.textTag,(0,r.b)(a,{staticClass:"card-text"}),i)}})},7379:function(t,e,n){"use strict";n.d(e,{E:function(){return f}});var a=n(2989),r=n(6410),i=n(8492),o=n(8280),s=n(7347);function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p=(0,s.U4)(),f=a.Z.extend({name:"BDropdownItem",mixins:[i.Z,o.Z],inheritAttrs:!1,inject:{bvDropdown:{default:null}},props:c(c({},p),{},{linkClass:{type:[String,Array,Object],default:null},variant:{type:String,default:null}}),computed:{computedAttrs:function(){return c(c({},this.bvAttrs),{},{role:"menuitem"})}},methods:{closeDropdown:function(){var t=this;(0,r.bz)((function(){t.bvDropdown&&t.bvDropdown.hide(!0)}))},onClick:function(t){this.$emit("click",t),this.closeDropdown()}},render:function(t){return t("li",{attrs:{role:"presentation"}},[t(s.we,{props:this.$props,staticClass:"dropdown-item",class:[this.linkClass,u({},"text-".concat(this.variant),this.variant&&!(this.active||this.disabled))],attrs:this.computedAttrs,on:{click:this.onClick},ref:"item"},this.normalizeSlot("default"))])}})},6253:function(t,e,n){"use strict";n.d(e,{T:function(){return g}});var a=n(9558),r=n(8265),i=n(1051),o=n(3762),s=n(1572),l=n(7023),c=n(7040),u=n(6595);function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m=["start","end","center"],h=(0,i.Z)((function(t,e){return(e=(0,u.fy)((0,u.BB)(e)))?(0,u.vl)(["row-cols",t,e].filter(r.Z).join("-")):null})),d=(0,i.Z)((function(t){return(0,u.vl)(t.replace("cols",""))})),v=[],y=function(){var t=(0,l.QC)().reduce((function(t,e){return t[(0,o.Z)(e,"cols")]={type:[String,Number],default:null},t}),(0,c.Ue)(null));return v=(0,c.XP)(t),function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({tag:{type:String,default:"div"},noGutters:{type:Boolean,default:!1},alignV:{type:String,default:null,validator:function(t){return(0,s.kI)((0,s.zo)(m,"baseline","stretch"),t)}},alignH:{type:String,default:null,validator:function(t){return(0,s.kI)((0,s.zo)(m,"between","around"),t)}},alignContent:{type:String,default:null,validator:function(t){return(0,s.kI)((0,s.zo)(m,"between","around","stretch"),t)}}},t)},g={name:"BRow",functional:!0,get props(){return delete this.props,this.props=y(),this.props},render:function(t,e){var n,r=e.props,i=e.data,o=e.children,s=[];return v.forEach((function(t){var e=h(d(t),r[t]);e&&s.push(e)})),s.push((f(n={"no-gutters":r.noGutters},"align-items-".concat(r.alignV),r.alignV),f(n,"justify-content-".concat(r.alignH),r.alignH),f(n,"align-content-".concat(r.alignContent),r.alignContent),n)),t(r.tag,(0,a.b)(i,{staticClass:"row",class:s}),o)}}},9708:function(t,e,n){"use strict";n.d(e,{Z:function(){return d}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-nav",{staticClass:"m-3 d-none d-lg-flex",attrs:{tabs:""}},t._l(t.routes,(function(e){return n("b-nav-item",{key:e.name,class:e.meta&&e.meta.class?e.meta.class:"",attrs:{to:{name:e.name},exact:!!e.meta&&e.meta.exact}},[e.meta&&e.meta.icon?n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:e.meta?e.meta.icon:""}}):t._e(),t._v(" "),n("span",[t._v("\n        "+t._s(e.meta&&e.meta.text?e.meta.text:e.name)+"\n      ")])],1)})),1),t._v(" "),n("b-dropdown",{staticClass:"m-3 d-lg-none",attrs:{variant:t.variant,block:"","menu-class":"w-100"},scopedSlots:t._u([{key:"button-content",fn:function(){return[t.activeRouteIcon?n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:t.activeRouteIcon}}):t._e(),t._v("\n      "+t._s(t.activeRouteText)+"\n    ")]},proxy:!0}])},[t._v(" "),t._l(t.routes,(function(e){return n("b-dropdown-item",{key:e.name,class:e.meta&&e.meta.class?e.meta.class:"",attrs:{to:{name:e.name},exact:!!e.meta&&e.meta.exact}},[e.meta&&e.meta.icon?n("font-awesome-icon",{staticClass:"dropdown-icon",attrs:{icon:e.meta?e.meta.icon:""}}):t._e(),t._v(" "),n("span",[t._v("\n        "+t._s(e.meta&&e.meta.text?e.meta.text:e.name)+"\n      ")])],1)}))],2)],1)};a._withStripped=!0;var r=n(629),i=n(9027),o=n(2450),s=n(5835),l=n(7379),c=n(8947),u=n(1436),p=n(7810);function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}c.vI.add(u.DD4,u.U7t,u.ILF,u.FVb,u.Hw7,u.Kak,u.NkB,u.neB,u.BC0,u.E9T,u.OS1,u.nFo,u.Stf,u.m6i,u.Gg,u.jPh,u.CgH,u.cf$,u.o4t,u.X8G,u.BC0,u.Mm7,u.FL8,u.bJI);var m={components:{BNav:i.O,BNavItem:o.r,BDropdown:s.R,BDropdownItem:l.E,FontAwesomeIcon:p.GN},props:{sectionRouteName:{type:String,default:null}},methods:{isFunction:function(t){return t&&"[object Function]"==={}.toString.call(t)}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),a.forEach((function(e){f(t,e,n[e])}))}return t}({},(0,r.rn)("user",{user:"me"}),{routes:function(){var t=this,e=this.$route.matched[0].name,n=this.$router.options.routes.find((function(t){return t.name===e}));return n&&n.children?n.children.filter((function(e){return(!e.meta||!e.meta.hide)&&(!!(t.user&&t.user.active||e.meta&&e.meta.allowedWithoutAuth)&&!(e.meta&&e.meta.requiredRole&&!(t.user&&t.user.active&&t.user.roles&&t.user.roles.includes(e.meta.requiredRole))))})):[]},activeRouteText:function(){return this.$route.meta&&this.$route.meta.text?this.$route.meta.text:this.$route.name},activeRouteIcon:function(){if(this.$route.meta&&this.$route.meta.icon)return this.$route.meta.icon},section:function(){var t=this.$route.matched[0].name;return this.sectionRouteName&&(t=this.sectionRouteName),this.$router.options.routes.find((function(e){return e.name===t}))},variant:function(){var t=this.section;return t&&t.meta&&t.meta.variant?t.meta.variant:"secondary"}})},h=(0,n(1900).Z)(m,a,[],!1,null,null,null);h.options.__file="src/components/InnerNavigationTabs.vue";var d=h.exports},5212:function(t,e,n){"use strict";n.d(e,{Z:function(){return s}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",t._l(t.sortedLabels,(function(e){return n("router-link",{key:e.key,staticClass:"label btn btn-light btn-sm mr-1 mb-1",attrs:{to:{name:t.routeName?t.routeName:"Pipelines",query:t.queryGenerator({labels:e.key+"="+e.value})},exact:""}},[t._v("\n    "+t._s(e.key)+"="+t._s(e.value)+"\n  ")])})),1)};a._withStripped=!0;var r=n(648),i={props:{labels:{type:Array,default:function(){return[]}},routeName:{type:String,default:null}},mixins:[r.Z],computed:{sortedLabels:function(){return this.labels?this.labels.slice().sort((function(t,e){return t.key>e.key})):[]}}},o=(0,n(1900).Z)(i,a,[],!1,null,null,null);o.options.__file="src/components/Labels.vue";var s=o.exports},9090:function(t,e,n){"use strict";n.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.linkGenerator?n("b-pagination-nav",{attrs:{"number-of-pages":t.pagination.totalPages>0?t.pagination.totalPages:1,"link-gen":t.linkGenerator,"use-router":"",size:"md","hide-goto-end-buttons":"",align:"center"}}):n("b-pagination",{attrs:{"total-rows":t.pagination.totalItems,"per-page":t.pagination.size,size:"md","hide-goto-end-buttons":"",align:"center"},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)};a._withStripped=!0;var r=n(6918),i=n(962),o={components:{BPaginationNav:r.a,BPagination:i.c},props:{pagination:{type:Object,default:null},linkGenerator:{type:Function,default:null}}},s=(0,n(1900).Z)(o,a,[],!1,null,null,null);s.options.__file="src/components/Pagination.vue";var l=s.exports},2352:function(t,e,n){"use strict";n.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mb-3 compact-navigation"},[t.pagination.totalItems>0?n("span",{staticClass:"mr-2"},[t._v("\n    "+t._s(t.firstPageItem)+"-"+t._s(t.lastPageItem)+" of "+t._s(t.pagination.totalItems)+"\n  ")]):t._e(),t._v(" "),t.linkGenerator?n("b-pagination-nav",{staticClass:"d-inline-flex",attrs:{"number-of-pages":t.pagination.totalPages>0?t.pagination.totalPages:1,"link-gen":t.linkGenerator,"use-router":"",limit:"3",size:"md","hide-goto-end-buttons":"",align:"right"}}):n("b-pagination",{staticClass:"d-inline-flex",attrs:{"total-rows":t.pagination.totalItems,"per-page":t.pagination.size,limit:"3",size:"md","hide-goto-end-buttons":"",align:"right"},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)};a._withStripped=!0;var r=n(6918),i=n(962),o={components:{BPaginationNav:r.a,BPagination:i.c},props:{pagination:{type:Object,default:null},linkGenerator:{type:Function,default:null}},computed:{firstPageItem:function(){return 1+(this.pagination.page-1)*this.pagination.size},lastPageItem:function(){return this.pagination.page*this.pagination.size<this.pagination.totalItems?this.pagination.page*this.pagination.size:this.pagination.totalItems}}},s=(0,n(1900).Z)(o,a,[],!1,null,null,null);s.options.__file="src/components/PaginationCompact.vue";var l=s.exports},5322:function(t,e,n){"use strict";n.d(e,{Z:function(){return h}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.cssClass},[n("property-label",{class:t.labelCssClass,attrs:{text:t.label}}),t._v(" "),n("property-value",{class:t.valueCssClass,attrs:{title:t.value}},[t._t("default",[t._v(t._s(t.value))])],2)],1)};a._withStripped=!0;var r=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"property-label"},[t._v("\n  "+t._s(t.text)+"\n")])};r._withStripped=!0;var i={props:{text:{type:String,default:""}}},o=n(1900),s=(0,o.Z)(i,r,[],!1,null,null,null);s.options.__file="src/components/PropertyLabel.vue";var l=s.exports,c=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"property-value"},[t._t("default",[t._v(t._s(t.text))])],2)};c._withStripped=!0;var u={props:{text:{type:String,default:""}}},p=(0,o.Z)(u,c,[],!1,null,null,null);p.options.__file="src/components/PropertyValue.vue";var f={components:{PropertyLabel:l,PropertyValue:p.exports},props:{label:{type:String,default:""},value:{type:String,default:""},titleValue:{type:String,default:""},variant:{type:String,default:"primary",validator:function(t){return-1!==["primary","secondary","success","danger","warning","info","light","dark"].indexOf(t)}},labelCssClass:{type:String,default:""},valueCssClass:{type:String,default:""},title:{type:Boolean,default:!1},wide:{type:Boolean,default:!1},noTruncate:{type:Boolean,default:!1}},computed:{cssClass:function(){return this.title?"property-block-title variant-".concat(this.variant):this.wide?"property-block-wide":this.noTruncate?"property-block-no-truncate":"property-block"}}},m=(0,o.Z)(f,a,[],!1,null,null,null);m.options.__file="src/components/PropertyBlock.vue";var h=m.exports},8714:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{attrs:{title:t.repo.repoSource+"/"+t.repo.repoOwner+"/"+t.repo.repoName}},[n("span",{staticClass:"repo-source-and-owner"},[t._v(t._s(t.repo.repoSource)+"/"+t._s(t.repo.repoOwner)+"/")]),n("span",{staticClass:"repo-name"},[t._v(t._s(t.repo.repoName))])])};a._withStripped=!0;var r={props:{repo:{type:Object,default:null}}},i=(0,n(1900).Z)(r,a,[],!1,null,null,null);i.options.__file="src/components/RepositoryTitle.vue";var o=i.exports},7777:function(t,e,n){"use strict";n.d(e,{Z:function(){return l}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.section?n("b-jumbotron",{staticClass:"section-header",attrs:{header:t.header,"bg-variant":t.bgVariant,"text-variant":t.textVariant,"header-level":"4","container-fluid":"",fluid:""}}):t._e()};a._withStripped=!0;var r=n(629);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o={components:{BJumbotron:n(9406).M},props:{sectionRouteName:{type:String,default:null}},methods:{isFunction:function(t){return t&&"[object Function]"==={}.toString.call(t)}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),a.forEach((function(e){i(t,e,n[e])}))}return t}({},(0,r.rn)("user",{user:"me"}),{section:function(){var t=this.$route.matched[0].name;return this.sectionRouteName&&(t=this.sectionRouteName),this.$router.options.routes.find((function(e){return e.name===t}))},header:function(){var t=this.section;return t?t.meta&&t.meta.text?t.meta.text:t.name:""},bgVariant:function(){var t=this.section;return t&&t.meta&&t.meta.variant?t.meta.variant:"secondary"},textVariant:function(){var t=this.section;if(!t)return"white";if(t.meta&&t.meta.variant)switch(t.meta.variant){case"warning":return"dark"}return"white"}})},s=(0,n(1900).Z)(o,a,[],!1,null,null,null);s.options.__file="src/components/SectionHeader.vue";var l=s.exports},7817:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"spinner-border estafette-spinner",class:t._f("bootstrapClass")(t.color,"text"),attrs:{role:"status"}},[n("span",{staticClass:"sr-only"},[t._v("Loading...")])])};a._withStripped=!0;var r={props:{color:{type:String,default:null}}},i=(0,n(1900).Z)(r,a,[],!1,null,null,null);i.options.__file="src/components/Spinner.vue";var o=i.exports},1494:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return h}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("pagination-compact",{staticClass:"float-right",attrs:{pagination:t.pagination}})],1)]),t._v(" "),n("b-table",{ref:"entities",attrs:{items:t.entitiesProvider,fields:t.fields,"per-page":t.pagination.size,"current-page":t.pagination.page,"sort-icon-left":"",striped:"",hover:"",borderless:"",stacked:"lg"},scopedSlots:t._u([{key:"top-row",fn:function(){return[n("b-td",[n("label",{staticClass:"font-weight-bold d-lg-none",attrs:{for:"parent-key"}},[t._v("\n          Parent Key\n        ")]),t._v(" "),n("b-form-select",{attrs:{id:"parent-key",options:t.mappedParentKeys},on:{change:t.updateParentKey},model:{value:t.parentKey,callback:function(e){t.parentKey=e},expression:"parentKey"}})],1),t._v(" "),n("b-td",[t.parentKey?n("label",{staticClass:"font-weight-bold d-lg-none",attrs:{for:"parent-value"}},[t._v("\n          Parent Value\n        ")]):t._e(),t._v(" "),t.parentKey?n("b-form-select",{attrs:{id:"parent-value",options:t.mappedParentValues},on:{change:t.refreshEntities},model:{value:t.parentValue,callback:function(e){t.parentValue=e},expression:"parentValue"}}):t._e()],1),t._v(" "),n("b-td",[n("label",{staticClass:"font-weight-bold d-lg-none",attrs:{for:"entity-key"}},[t._v("\n          Entity Key\n        ")]),t._v(" "),n("b-form-select",{attrs:{id:"entity-key",options:t.mappedEntityKeys},on:{change:t.updateEntityKey},model:{value:t.entityKey,callback:function(e){t.entityKey=e},expression:"entityKey"}})],1),t._v(" "),n("b-td",[t.entityKey?n("label",{staticClass:"font-weight-bold d-lg-none",attrs:{for:"entity-value"}},[t._v("\n          Entity Value\n        ")]):t._e(),t._v(" "),t.entityKey?n("b-form-select",{attrs:{id:"entity-value",options:t.mappedEntityValues},on:{change:t.refreshEntities},model:{value:t.entityValue,callback:function(e){t.entityValue=e},expression:"entityValue"}}):t._e()],1),t._v(" "),n("b-td",{staticClass:"d-none d-lg-table-cell"}),t._v(" "),n("b-td",[n("label",{staticClass:"font-weight-bold d-lg-none",attrs:{for:"labels"}},[t._v("\n          Labels\n        ")]),t._v(" "),n("b-form-select",{staticClass:"d-inline-flex",attrs:{id:"labels",options:t.mappedLabels},on:{change:t.refreshEntities},model:{value:t.label,callback:function(e){t.label=e},expression:"label"}})],1),t._v(" "),n("b-td",{staticClass:"d-none d-lg-table-cell"}),t._v(" "),n("b-td",{staticClass:"d-none d-lg-table-cell"})]},proxy:!0},{key:"cell(parent_key)",fn:function(e){return[n("span",{staticClass:"text-muted w-50"},[t._v(t._s(e.item.parentKey))])]}},{key:"cell(parent_value)",fn:function(e){return[t._v("\n      "+t._s(e.item.parentValue)+"\n    ")]}},{key:"cell(entity_key)",fn:function(e){return[n("span",{staticClass:"text-muted w-50"},[t._v(t._s(e.item.key))])]}},{key:"cell(entity_value)",fn:function(e){return[t._v("\n      "+t._s(e.item.value)+"\n    ")]}},{key:"cell(labels)",fn:function(t){return[n("labels",{attrs:{labels:t.item.labels}})]}}])}),t._v(" "),t.entities.length>0?n("pagination",{attrs:{pagination:t.pagination}}):t._e()],1)};a._withStripped=!0;var r=n(4140),i=n(6456),o=n(6982),s=n(2352),l=n(9090),c=n(5212),u=n(3900);function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f={components:{BTable:r.h,BTd:i.S,BFormSelect:o.K,PaginationCompact:s.Z,Pagination:l.Z,Labels:c.Z},props:{query:{type:Object,default:null}},data:function(){var t=this;return{parentKey:null,parentKeys:[],parentValue:null,parentValues:[],entityKey:null,entityKeys:[],entityValue:null,entityValues:[],label:null,labels:[],entities:[],pagination:{page:1,size:100,totalPages:0,totalItems:0},fields:[{key:"parent_key",sortable:!0},{key:"parent_value",sortable:!0},{key:"entity_key",sortable:!0},{key:"entity_value",sortable:!0},{key:"linkedPipeline",sortable:!0},{key:"labels"},{key:"insertedAt",sortable:!0,formatter:function(e,n,a){return t.$options.filters.formatDatetime(e)}},{key:"updatedAt",sortable:!0,formatter:function(e,n,a){return t.$options.filters.formatDatetime(e)}}]}},created:function(){this.setDataFromQueryParams(),this.loadParentKeys(),this.loadParentValues(),this.loadEntityKeys(),this.loadEntityValues(),this.loadLabels()},methods:{setDataFromQueryParams:function(){if(this.query.parent){var t=this.query.parent.split("=");this.parentKey=t.length>0?t[0]:null,this.parentValue=t.length>1?t[1]:null}if(this.query.entity){var e=this.query.entity.split("=");this.entityKey=e.length>0?e[0]:null,this.entityValue=e.length>1?e[1]:null}this.query.label&&(this.label=this.query.label)},setQueryParamsFromData:function(){var t=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),a.forEach((function(e){p(t,e,n[e])}))}return t}({},this.$route.query);this.parentKey?(t.parent=this.parentKey,this.parentValue&&(t.parent+="=".concat(this.parentValue))):t.parent&&delete t.parent,this.entityKey?(t.entity=this.entityKey,this.entityValue&&(t.entity+="=".concat(this.entityValue))):t.entity&&delete t.entity,this.label?t.label=this.label:t.label&&delete t.label,this.$router.push({query:t})},loadParentKeys:function(){var t=this,e="";this.entityKey&&(e="&filter[entity]=".concat(this.entityKey),this.entityValue&&(e+="=".concat(this.entityValue)));var n="";this.label&&(n="&filter[labels]=".concat(this.label)),this.axios.get("/api/catalog/entity-parent-keys?page[number]=1&page[size]=100".concat(e).concat(n)).then((function(e){t.parentKeys=e.data.items})).catch((function(e){u.Z.timeoutWithJitter(t.timeout,t.loadParentKeys,15)}))},loadParentValues:function(){var t=this,e="";this.parentKey&&(e="&filter[parent]=".concat(this.parentKey));var n="";this.entityKey&&(n="&filter[entity]=".concat(this.entityKey),this.entityValue&&(n+="=".concat(this.entityValue)));var a="";this.label&&(a="&filter[labels]=".concat(this.label)),this.axios.get("/api/catalog/entity-parent-values?page[number]=1&page[size]=100".concat(e).concat(n).concat(a)).then((function(e){t.parentValues=e.data.items})).catch((function(e){u.Z.timeoutWithJitter(t.timeout,t.loadParentValues,15)}))},loadEntityKeys:function(){var t=this,e="";this.parentKey&&(e="&filter[parent]=".concat(this.parentKey),this.parentValue&&(e+="=".concat(this.parentValue)));var n="";this.label&&(n="&filter[labels]=".concat(this.label)),this.axios.get("/api/catalog/entity-keys?page[number]=1&page[size]=100".concat(e).concat(n)).then((function(e){t.entityKeys=e.data.items})).catch((function(e){u.Z.timeoutWithJitter(t.timeout,t.loadEntityKeys,15)}))},loadEntityValues:function(){var t=this,e="";this.parentKey&&(e="&filter[parent]=".concat(this.parentKey),this.parentValue&&(e+="=".concat(this.parentValue)));var n="";this.entityKey&&(n="&filter[entity]=".concat(this.entityKey));var a="";this.label&&(a="&filter[labels]=".concat(this.label)),this.axios.get("/api/catalog/entity-values?page[number]=1&page[size]=100".concat(e).concat(n).concat(a)).then((function(e){t.entityValues=e.data.items})).catch((function(e){u.Z.timeoutWithJitter(t.timeout,t.loadEntityValues,15)}))},loadLabels:function(){var t=this,e="";this.parentKey&&(e="&filter[parent]=".concat(this.parentKey),this.parentValue&&(e+="=".concat(this.parentValue)));var n="";this.entityKey&&(n="&filter[entity]=".concat(this.entityKey),this.entityValue&&(n+="=".concat(this.entityValue))),this.axios.get("/api/catalog/entity-labels?page[number]=1&page[size]=100".concat(e).concat(n)).then((function(e){t.labels=e.data.items})).catch((function(e){u.Z.timeoutWithJitter(t.timeout,t.loadKeys,15)}))},entitiesProvider:function(t){var e=this,n="";this.parentKey&&(n="&filter[parent]=".concat(this.parentKey),this.parentValue&&(n+="=".concat(this.parentValue)));var a="";this.entityKey&&(a="&filter[entity]=".concat(this.entityKey),this.entityValue&&(a+="=".concat(this.entityValue)));var r="";this.label&&(r="&filter[labels]=".concat(this.label));var i="";return t.sortBy&&(i+="&sort=",t.sortDesc&&(i+="-"),i+="".concat(t.sortBy)),this.axios.get("/api/catalog/entities?page[number]=".concat(t.currentPage,"&page[size]=").concat(t.perPage).concat(n).concat(a).concat(r).concat(i)).then((function(t){return e.entities=t.data.items,e.pagination=t.data.pagination,e.entities||[]}))},updateParentKey:function(){this.parentValue=null,this.refreshEntities()},updateEntityKey:function(){this.entityValue=null,this.refreshEntities()},refreshEntities:function(){this.setQueryParamsFromData(),this.loadParentKeys(),this.loadParentValues(),this.loadEntityKeys(),this.loadEntityValues(),this.loadLabels(),this.$refs.entities.refresh()}},computed:{mappedParentKeys:function(){return this.parentKeys?[{value:null,text:"--"}].concat(this.parentKeys.map((function(t){return{value:"".concat(t.key),text:"".concat(t.key," (").concat(t.count,")")}}))):[]},mappedParentValues:function(){return this.parentValues?[{value:null,text:"--"}].concat(this.parentValues.map((function(t){return{value:"".concat(t.key),text:"".concat(t.key," (").concat(t.count,")")}}))):[]},mappedEntityKeys:function(){return this.entityKeys?[{value:null,text:"--"}].concat(this.entityKeys.map((function(t){return{value:"".concat(t.key),text:"".concat(t.key," (").concat(t.count,")")}}))):[]},mappedEntityValues:function(){return this.entityValues?[{value:null,text:"--"}].concat(this.entityValues.map((function(t){return{value:"".concat(t.key),text:"".concat(t.key," (").concat(t.count,")")}}))):[]},mappedLabels:function(){return this.labels?[{value:null,text:"--"}].concat(this.labels.map((function(t){return{value:"".concat(t.key,"=").concat(t.value),text:"".concat(t.key,"=").concat(t.value," (").concat(t.count,")")}}))):[]}},beforeDestroy:function(){this.timeout&&clearTimeout(this.timeout)}},m=(0,n(1900).Z)(f,a,[],!1,null,null,null);m.options.__file="src/views/CatalogEntities.vue";var h=m.exports},3458:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return p}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",t._l(t.groups,(function(e){return n("b-col",{key:e.id,staticClass:"mb-3 col-xxxl-3",attrs:{cols:"12",lg:"4"}},[n("b-card",{attrs:{title:e.name,tag:"article"}},[n("b-card-text",[t._v("\n        "+t._s(e.description)+"\n      ")]),t._v(" "),n("b-button",{attrs:{to:{name:"CatalogGroupDetails",params:{id:e.id}},variant:"primary"}},[t._v("\n        Details\n      ")])],1)],1)})),1)};a._withStripped=!0;var r=n(6253),i=n(725),o=n(9952),s=n(7391),l=n(5193),c={components:{BRow:r.T,BCol:i.l,BCard:o._,BCardText:s.j,BButton:l.T},data:function(){return{groups:[]}},created:function(){this.loadGroups()},methods:{loadGroups:function(){var t=this;this.axios.get("/api/catalog/groups").then((function(e){t.groups=e.data.items})).catch((function(t){console.warn(t)}))}}},u=(0,n(1900).Z)(c,a,[],!1,null,null,null);u.options.__file="src/views/CatalogGroups.vue";var p=u.exports},3277:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return v}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("section-header",{attrs:{"section-route-name":"Catalog"}}),t._v(" "),n("b-breadcrumb",{staticClass:"m-3 rounded",attrs:{items:t.breadcrumbs}}),t._v(" "),t.catalogItem?n("catalog-item-header",{attrs:{"catalog-item":t.catalogItem}}):t._e(),t._v(" "),n("inner-navigation-tabs",{attrs:{"section-route-name":"Catalog"}}),t._v(" "),t.catalogItem?n("router-view",{staticClass:"m-3",attrs:{"catalog-item":t.catalogItem}}):t._e()],1)};a._withStripped=!0;var r=n(6578),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header-block"},[n("property-block",{attrs:{label:"Catalog",value:t.catalogItem.repoName,variant:"info",title:""}}),t._v(" "),n("property-block",{attrs:{label:"Repository"}},[n("repository-title",{attrs:{repo:t.catalogItem}})],1)],1)};i._withStripped=!0;var o=n(5322),s=n(8714),l={components:{PropertyBlock:o.Z,RepositoryTitle:s.Z},props:{catalogItem:{type:Object,default:null}}},c=n(1900),u=(0,c.Z)(l,i,[],!1,null,null,null);u.options.__file="src/components/CatalogItemHeader.vue";var p=u.exports,f=n(7777),m=n(9708),h={components:{BBreadcrumb:r.P,SectionHeader:f.Z,CatalogItemHeader:p,InnerNavigationTabs:m.Z},props:{repoSource:{type:String,default:null},repoOwner:{type:String,default:null},repoName:{type:String,default:null}},data:function(){return{catalogItem:null,refresh:!0,breadcrumbs:[{text:"Catalog",to:{name:"Catalog"}},{text:this.repoName,to:{name:"CatalogItemOverview",params:{repoSource:this.repoSource,repoOwner:this.repoOwner,repoName:this.repoName}},active:!0}]}},created:function(){this.loadCatalogItem()},methods:{loadCatalogItem:function(){var t=this;this.axios.get("/api/pipelines/".concat(this.repoSource,"/").concat(this.repoOwner,"/").concat(this.repoName)).then((function(e){t.catalogItem=e.data,t.periodicallyRefreshCatalogItem(5)})).catch((function(e){t.periodicallyRefreshCatalogItem(30)}))},periodicallyRefreshCatalogItem:function(t){this.refreshTimeout&&clearTimeout(this.refreshTimeout);var e=1e3*t*.75,n=1e3*t*1.25,a=Math.floor(Math.random()*(e-n+1)+n);this.refresh&&(this.refreshTimeout=setTimeout(this.loadCatalogItem,a))}},beforeDestroy:function(){this.refresh=!1,this.refreshTimeout&&clearTimeout(this.refreshTimeout)}},d=(0,c.Z)(h,a,[],!1,null,null,null);d.options.__file="src/views/CatalogItemDetails.vue";var v=d.exports},219:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return o}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"m-3 border rounded p-3 bg-white"},[n("h1",[t._v(t._s(t.catalogItem.repoName))])])};a._withStripped=!0;var r={props:{catalogItem:{type:Object,default:null}}},i=(0,n(1900).Z)(r,a,[],!1,null,null,null);i.options.__file="src/views/CatalogItemOverview.vue";var o=i.exports},3335:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return T}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-sm-6 col-lg-3 col-xxl-2"},[n("b-form",{attrs:{autocomplete:"off"}},[n("b-input-group",{staticClass:"mb-3"},[n("b-input-group-prepend",{attrs:{"is-text":""}},[n("font-awesome-icon",{attrs:{icon:"tags"}})],1),t._v(" "),t.filterOptions.length>0?n("b-form-select",{attrs:{id:"filter-select",options:t.filters},on:{change:t.onChange},model:{value:t.activeFilter,callback:function(e){t.activeFilter=e},expression:"activeFilter"}}):t._e()],1)],1)],1),t._v(" "),n("div",{staticClass:"col-12 col-sm-6 col-lg-9 col-xxl-10 text-right"},[n("pagination-compact",{staticClass:"float-right",attrs:{pagination:t.pagination,"link-generator":t.paginationLinkGenerator}})],1)]),t._v(" "),n("tabs",{attrs:{tabs:t.tabs,"active-tab-text":t.activeFilterValue+" ("+t.pagination.totalItems+")"}}),t._v(" "),t._m(0),t._v(" "),t.catalogItems.length>0?n("transition-group",{attrs:{name:"list-complete",tag:"div"}},t._l(t.catalogItems,(function(t){return n("catalog-item-row",{key:t.repoSource+"/"+t.repoOwner+"/"+t.repoName,attrs:{"catalog-item":t,"row-item":!0}})})),1):t.loaded?n("div",{staticClass:"alert alert-warning text-center p-5"},[t._v("\n    There are no items for the current filter value.\n  ")]):n("div",[n("spinner",{attrs:{color:"primary"}})],1),t._v(" "),t.catalogItems.length>0?n("pagination",{attrs:{pagination:t.pagination,"link-generator":t.paginationLinkGenerator}}):t._e()],1)};a._withStripped=!0;var r=n(4909),i=n(6982),o=n(6127),s=n(7754),l=n(7817),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-link",{staticClass:"row-block list-complete-item",attrs:{to:{name:"CatalogItemOverview",params:{repoSource:t.catalogItem.repoSource,repoOwner:t.catalogItem.repoOwner,repoName:t.catalogItem.repoName}},tag:"div"}},[n("property-block",{staticClass:"col-xxxl-6",attrs:{label:"Catalog",value:t.catalogItem.repoName}}),t._v(" "),n("property-block",{staticClass:"col-xxxl-6",attrs:{label:"Repository"}},[n("repository-title",{attrs:{repo:t.catalogItem}})],1)],1)};c._withStripped=!0;var u=n(5322),p=n(8714),f={components:{PropertyBlock:u.Z,RepositoryTitle:p.Z},props:{catalogItem:{type:Object,default:null}}},m=n(1900),h=(0,m.Z)(f,c,[],!1,null,null,null);h.options.__file="src/components/CatalogItemRow.vue";var d=h.exports,v=n(2352),y=n(9090),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-nav",{staticClass:"mt-3 mb-3 d-none d-lg-flex",attrs:{tabs:""}},t._l(t.tabs,(function(e){return n("b-nav-item",{key:e.text,attrs:{to:e.to,exact:!!e.exact&&e.exact}},[e.icon?n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:e.icon}}):t._e(),t._v(" "),n("span",[t._v("\n        "+t._s(e.text)+"\n      ")])],1)})),1),t._v(" "),n("b-dropdown",{staticClass:"mt-3 mb-3 d-lg-none",attrs:{variant:t.variant,block:"","menu-class":"w-100"},scopedSlots:t._u([{key:"button-content",fn:function(){return[t.activeTabIcon?n("font-awesome-icon",{staticClass:"mr-2",attrs:{icon:t.activeTabIcon}}):t._e(),t._v("\n      "+t._s(t.activeTabTextWithFallback)+"\n    ")]},proxy:!0}])},[t._v(" "),t._l(t.tabs,(function(e){return n("b-dropdown-item",{key:e.text,attrs:{to:e.to,exact:!!e.exact&&e.exact}},[e.icon?n("font-awesome-icon",{staticClass:"dropdown-icon",attrs:{icon:e.icon}}):t._e(),t._v(" "),n("span",[t._v("\n        "+t._s(e.text)+"\n      ")])],1)}))],2)],1)};g._withStripped=!0;var b=n(9027),_=n(2450),w=n(5835),x=n(7379),C=n(8947),k=n(1436),O=n(7810);C.vI.add(k.jPh,k.CgH,k.cf$,k.o4t,k.X8G,k.BC0,k.neB,k.E9T,k.Mm7,k.FL8,k.OS1,k.nFo,k.Stf);var P={components:{BNav:b.O,BNavItem:_.r,BDropdown:w.R,BDropdownItem:x.E,FontAwesomeIcon:O.GN},props:{tabs:{type:Array,default:function(){return[]}},activeTabText:{type:String,default:null},sectionRouteName:{type:String,default:null}},computed:{activeTabTextWithFallback:function(){return this.activeTabText?this.activeTabText:this.$route.meta&&this.$route.meta.text?this.$route.meta.text:this.$route.name},activeTabIcon:function(){var t=this;if(this.tabs&&this.activeTabText){var e=this.tabs.find((function(e){return e.text===t.activeTabText}));if(e&&e.icon)return e.icon}},section:function(){var t=this.$route.matched[0].name;return this.sectionRouteName&&(t=this.sectionRouteName),this.$router.options.routes.find((function(e){return e.name===t}))},variant:function(){var t=this.section;return t&&t.meta&&t.meta.variant?t.meta.variant:"secondary"}}},V=(0,m.Z)(P,g,[],!1,null,null,null);V.options.__file="src/components/Tabs.vue";var S=V.exports,I=n(648);function K(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),a.forEach((function(e){j(t,e,n[e])}))}return t}function j(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}C.vI.add(k.tho);var F={components:{BForm:r.e,BFormSelect:i.K,BInputGroup:o.w,BInputGroupPrepend:s.P,Spinner:l.Z,CatalogItemRow:d,PaginationCompact:v.Z,Pagination:y.Z,Tabs:S,FontAwesomeIcon:O.GN},mixins:[I.Z],props:{query:{type:Object,default:null}},data:function(){return{filters:[],filterOptions:[],activeFilter:null,filterValues:[],activeFilterValue:null,catalogItems:[],pagination:{page:1,size:25,totalPages:0,totalItems:0},loaded:!1,refresh:!0}},created:function(){this.setDataFromQueryParams(),this.loadFilters()},methods:{setDataFromQueryParams:function(){if(this.query.filter){var t=this.query.filter.split("=");t.length>0&&(this.activeFilter=t[0]),t.length>1&&(this.activeFilterValue=t[1])}this.query.page&&(this.pagination.page=this.query.page)},setQueryParams:function(){var t=K({},this.$route.query),e="".concat(this.activeFilter,"=").concat(this.activeFilterValue),n=this.pagination.page;t.filter===e&&t.page===n||(t.filter=e,t.page=n,this.$router.push({query:t}))},loadFilters:function(){var t=this;this.axios.get("/api/catalog/filters").then((function(e){t.filters=e.data;var n=[];t.filters.forEach((function(t){n.push({value:t,text:t})})),t.filterOptions=n,!(t.filters&&t.filters.length>0)||t.activeFilter&&t.filters.some((function(e){return e===t.activeFilter}))||(t.activeFilter=t.filters[0]),t.loadFilterValues(),t.periodicallyRefreshFilters(10)})).catch((function(e){console.warn(e),t.periodicallyRefreshFilters(60)}))},periodicallyRefreshFilters:function(t){this.refreshFiltersTimeout&&clearTimeout(this.refreshFiltersTimeout);var e=1e3*t*.75,n=1e3*t*1.25,a=Math.floor(Math.random()*(e-n+1)+n);this.refresh&&(this.refreshFiltersTimeout=setTimeout(this.loadFilters,a))},loadFilterValues:function(){var t=this;this.axios.get("/api/catalog/filtervalues?filter[labels]=".concat(this.activeFilter)).then((function(e){t.filterValues=e.data,!(t.filterValues&&t.filterValues.length>0)||t.activeFilterValue&&t.filterValues.some((function(e){return e.value===t.activeFilterValue}))||(t.activeFilterValue=t.filterValues[0].value,t.setQueryParams()),t.loadCatalogItems()})).catch((function(t){console.warn(t)}))},loadCatalogItems:function(){var t=this;this.axios.get("/api/pipelines?filter[labels]=".concat(this.activeFilter,"=").concat(this.activeFilterValue,"&filter[since]=eternity&page[number]=").concat(this.pagination.page,"&page[size]=").concat(this.pagination.size)).then((function(e){t.catalogItems=e.data.items,t.pagination=e.data.pagination,t.loaded=!0})).catch((function(t){console.warn(t)}))},onChange:function(t){delete this.activeFilterValue,this.loadFilterValues()},paginationLinkGenerator:function(t){var e=K({},this.$route.query);return t>0?e.page=t:e.page&&delete e.page,{query:e}}},computed:{tabs:function(){var t=this;return this.filterValues?this.filterValues.map((function(e){return{text:"".concat(e.value," (").concat(e.pipelinescount,")"),enabled:!0,exact:!0,to:{name:"CatalogServices",query:t.queryGenerator({filter:"".concat(t.activeFilter,"=").concat(e.value)})}}})):[]}},watch:{$route:function(t,e){this.setDataFromQueryParams(),this.loadCatalogItems()}},beforeDestroy:function(){this.refresh=!1,this.refreshFiltersTimeout&&clearTimeout(this.refreshFiltersTimeout)}},E=(0,m.Z)(F,a,[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row-header"},[n("div",{staticClass:"col-6"},[t._v("\n      Name\n    ")]),t._v(" "),n("div",{staticClass:"col-6"},[t._v("\n      Repository\n    ")])])}],!1,null,null,null);E.options.__file="src/views/CatalogServices.vue";var T=E.exports}}]);