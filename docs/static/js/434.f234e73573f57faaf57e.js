(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[434],{6982:function(t,e,n){"use strict";n.d(e,{K:function(){return x}});var r=n(2989),i=n(1572),a=n(6410),s=n(8735),l=n(3727),o=n(6944),u=n(9035),p=n(5505),c={props:{plain:{type:Boolean,default:!1}},computed:{custom:function(){return!this.plain}}},f=n(8280),d=n(7668),h=n(3284),g=n(7040),m=n(7568),b={props:{options:{type:[Array,Object],default:function(){return[]}},valueField:{type:String,default:"value"},textField:{type:String,default:"text"},htmlField:{type:String,default:"html"},disabledField:{type:String,default:"disabled"}},computed:{formOptions:function(){return this.normalizeOptions(this.options)}},methods:{normalizeOption:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if((0,g.PO)(t)){var n=(0,d.ZP)(t,this.valueField),r=(0,d.ZP)(t,this.textField);return{value:(0,h.o8)(n)?e||r:n,text:(0,s.o)(String((0,h.o8)(r)?e:r)),html:(0,d.ZP)(t,this.htmlField),disabled:Boolean((0,d.ZP)(t,this.disabledField))}}return{value:e||t,text:(0,s.o)(String(t)),disabled:!1}},normalizeOptions:function(t){var e=this;return(0,i.kJ)(t)?t.map((function(t){return e.normalizeOption(t)})):(0,g.PO)(t)?((0,m.ZK)('Setting prop "options" to an object is deprecated. Use the array format instead.',this.$options.name),(0,g.XP)(t).map((function(n){return e.normalizeOption(t[n]||{},n)}))):[]}}},v={mixins:[b],props:{labelField:{type:String,default:"label"},optionsField:{type:String,default:"options"}},methods:{normalizeOption:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if((0,g.PO)(t)){var n=(0,d.ZP)(t,this.valueField),r=(0,d.ZP)(t,this.textField),i=(0,d.ZP)(t,this.optionsField,null);return(0,h.Ft)(i)?{value:(0,h.o8)(n)?e||r:n,text:String((0,h.o8)(r)?e:r),html:(0,d.ZP)(t,this.htmlField),disabled:Boolean((0,d.ZP)(t,this.disabledField))}:{label:String((0,d.ZP)(t,this.labelField)||r),options:this.normalizeOptions(i)}}return{value:e||t,text:String(t),disabled:!1}}}},y=n(9558),P={value:{required:!0},disabled:{type:Boolean,default:!1}},O=r.Z.extend({name:"BFormSelectOption",functional:!0,props:P,render:function(t,e){var n=e.props,r=e.data,i=e.children,a=n.value,s=n.disabled;return t("option",(0,y.b)(r,{attrs:{disabled:s},domProps:{value:a}}),i)}}),S=r.Z.extend({name:"BFormSelectOptionGroup",mixins:[f.Z,b],props:{label:{type:String,required:!0}},render:function(t){return t("optgroup",{attrs:{label:this.label}},[this.normalizeSlot("first"),this.formOptions.map((function(e,n){return t(O,{props:{value:e.value,disabled:e.disabled},domProps:(0,s.U)(e.html,e.text),key:"option_".concat(n,"_opt")})})),this.normalizeSlot("default")])}}),x=r.Z.extend({name:"BFormSelect",mixins:[l.Z,f.Z,o.Z,u.Z,p.Z,c,v],model:{prop:"value",event:"input"},props:{value:{},multiple:{type:Boolean,default:!1},selectSize:{type:Number,default:0},ariaInvalid:{type:[Boolean,String],default:!1}},data:function(){return{localValue:this.value}},computed:{computedSelectSize:function(){return this.plain||0!==this.selectSize?this.selectSize:null},inputClass:function(){return[this.plain?"form-control":"custom-select",this.size&&this.plain?"form-control-".concat(this.size):null,this.size&&!this.plain?"custom-select-".concat(this.size):null,this.stateClass]},computedAriaInvalid:function(){return!0===this.ariaInvalid||"true"===this.ariaInvalid||"is-invalid"===this.stateClass?"true":null}},watch:{value:function(t){this.localValue=t},localValue:function(){this.$emit("input",this.localValue)}},methods:{focus:function(){(0,a.KS)(this.$refs.input)},blur:function(){(0,a.Cx)(this.$refs.input)}},render:function(t){var e=this;return t("select",{ref:"input",class:this.inputClass,directives:[{name:"model",rawName:"v-model",value:this.localValue,expression:"localValue"}],attrs:{id:this.safeId(),name:this.name,form:this.form||null,multiple:this.multiple||null,size:this.computedSelectSize,disabled:this.disabled,required:this.required,"aria-required":this.required?"true":null,"aria-invalid":this.computedAriaInvalid},on:{change:function(t){var n=t.target,r=(0,i.Dp)(n.options).filter((function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));e.localValue=n.multiple?r:r[0],e.$nextTick((function(){e.$emit("change",e.localValue)}))}}},[this.normalizeSlot("first"),this.formOptions.map((function(e,n){var r="option_".concat(n,"_opt"),a=e.options;return(0,i.kJ)(a)?t(S,{props:{label:e.label,options:a},key:r}):t(O,{props:{value:e.value,disabled:e.disabled},domProps:(0,s.U)(e.html,e.text),key:r})})),this.normalizeSlot("default")])}})},4199:function(t,e,n){"use strict";n.d(e,{$:function(){return u},B:function(){return p}});var r=n(2989),i=n(9558),a=n(8222);function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={id:{type:String,default:null},tag:{type:String,default:"div"},isText:{type:Boolean,default:!1}},p=r.Z.extend({name:"BInputGroupAddon",functional:!0,props:l(l({},u),{},{append:{type:Boolean,default:!1}}),render:function(t,e){var n=e.props,r=e.data,s=e.children;return t(n.tag,(0,i.b)(r,{class:{"input-group-append":n.append,"input-group-prepend":!n.append},attrs:{id:n.id}}),n.isText?[t(a.e,s)]:s)}})},7754:function(t,e,n){"use strict";n.d(e,{P:function(){return u}});var r=n(2989),i=n(9558),a=n(4199);function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=r.Z.extend({name:"BInputGroupPrepend",functional:!0,props:a.$,render:function(t,e){var n=e.props,r=e.data,s=e.children;return t(a.B,(0,i.b)(r,{props:l(l({},n),{},{append:!1})}),s)}})},8222:function(t,e,n){"use strict";n.d(e,{e:function(){return s}});var r=n(2989),i=n(9558),a={tag:{type:String,default:"div"}},s=r.Z.extend({name:"BInputGroupText",functional:!0,props:a,render:function(t,e){var n=e.props,r=e.data,a=e.children;return t(n.tag,(0,i.b)(r,{staticClass:"input-group-text"}),a)}})},6127:function(t,e,n){"use strict";n.d(e,{w:function(){return y}});var r=n(2989),i=n(9558),a=n(7023),s=n(8735),l=n(2345),o=n(7754),u=n(4199);function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d=r.Z.extend({name:"BInputGroupAppend",functional:!0,props:u.$,render:function(t,e){var n=e.props,r=e.data,a=e.children;return t(u.B,(0,i.b)(r,{props:c(c({},n),{},{append:!0})}),a)}}),h=n(8222);function g(t){return function(t){if(Array.isArray(t))return m(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var b="BInputGroup",v={id:{type:String},size:{type:String,default:function(){return(0,a.wJ)(b,"size")}},prepend:{type:String},prependHtml:{type:String},append:{type:String},appendHtml:{type:String},tag:{type:String,default:"div"}},y=r.Z.extend({name:b,functional:!0,props:v,render:function(t,e){var n,r,a,u=e.props,p=e.data,c=e.slots,f=e.scopedSlots,m=c(),b=f||{},v=[];return u.prepend||u.prependHtml||(0,l.QF)("prepend",b,m)?v.push(t(o.P,[u.prepend||u.prependHtml?t(h.e,{domProps:(0,s.U)(u.prependHtml,u.prepend)}):t(),(0,l.O3)("prepend",{},b,m)||t()])):v.push(t()),(0,l.QF)("default",b,m)?v.push.apply(v,g((0,l.O3)("default",{},b,m))):v.push(t()),u.append||u.appendHtml||(0,l.QF)("append",b,m)?v.push(t(d,[u.append||u.appendHtml?t(h.e,{domProps:(0,s.U)(u.appendHtml,u.append)}):t(),(0,l.O3)("append",{},b,m)||t()])):v.push(t()),t(u.tag,(0,i.b)(p,{staticClass:"input-group",class:(n={},r="input-group-".concat(u.size),a=u.size,r in n?Object.defineProperty(n,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[r]=a,n),attrs:{id:u.id||null,role:"group"}}),v)}})},962:function(t,e,n){"use strict";n.d(e,{c:function(){return h}});var r=n(2989),i=n(7023),a=n(6410),s=n(3284),l=n(1578),o=n(3954),u=n(9878),p="BPagination",c={size:{type:String,default:function(){return(0,i.wJ)(p,"size")}},perPage:{type:[Number,String],default:20},totalRows:{type:[Number,String],default:0},ariaControls:{type:String}},f=function(t){return(0,l.nP)((0,o.Z3)(t)||20,1)},d=function(t){return(0,l.nP)((0,o.Z3)(t)||0,0)},h=r.Z.extend({name:p,mixins:[u.Z],props:c,computed:{numberOfPages:function(){var t=(0,l.hv)(d(this.totalRows)/f(this.perPage));return t<1?1:t},pageSizeNumberOfPages:function(){return{perPage:f(this.perPage),totalRows:d(this.totalRows),numberOfPages:this.numberOfPages}}},watch:{pageSizeNumberOfPages:function(t,e){(0,s.Jp)(e)||(t.perPage!==e.perPage&&t.totalRows===e.totalRows||t.numberOfPages!==e.numberOfPages&&this.currentPage>t.numberOfPages)&&(this.currentPage=1),this.localNumberOfPages=t.numberOfPages}},created:function(){var t=this;this.localNumberOfPages=this.numberOfPages;var e=(0,o.Z3)(this.value,0);e>0?this.currentPage=e:this.$nextTick((function(){t.currentPage=0}))},mounted:function(){this.localNumberOfPages=this.numberOfPages},methods:{onClick:function(t,e){var n=this;t>this.numberOfPages?t=this.numberOfPages:t<1&&(t=1),this.currentPage=t,this.$emit("change",this.currentPage),this.$nextTick((function(){var t=e.target;(0,a.pn)(t)&&n.$el.contains(t)?(0,a.KS)(t):n.focusCurrent()}))},makePage:function(t){return t},linkProps:function(){return{}}}})},9035:function(t,e,n){"use strict";var r=n(7023);e.Z={props:{size:{type:String,default:function(){return(0,r.wJ)("formControls","size")}}},computed:{sizeFormClass:function(){return[this.size?"form-control-".concat(this.size):null]},sizeBtnClass:function(){return[this.size?"btn-".concat(this.size):null]}}}},5505:function(t,e,n){"use strict";var r=n(3284);e.Z={props:{state:{type:Boolean,default:null}},computed:{computedState:function(){return(0,r.jn)(this.state)?this.state:null},stateClass:function(){var t=this.computedState;return!0===t?"is-valid":!1===t?"is-invalid":null}}}},6944:function(t,e,n){"use strict";var r=n(6410),i="input, textarea, select";e.Z={props:{name:{type:String},id:{type:String},disabled:{type:Boolean},required:{type:Boolean,default:!1},form:{type:String},autofocus:{type:Boolean,default:!1}},mounted:function(){this.handleAutofocus()},activated:function(){this.handleAutofocus()},methods:{handleAutofocus:function(){var t=this;this.$nextTick((function(){(0,r.bz)((function(){var e=t.$el;t.autofocus&&(0,r.pn)(e)&&((0,r.wB)(e,i)||(e=(0,r.Ys)(i,e)),(0,r.KS)(e))}))}))}}}},3727:function(t,e){"use strict";e.Z={props:{id:{type:String}},data:function(){return{localId_:null}},computed:{safeId:function(){var t=this.id||this.localId_;return function(e){return t?(e=String(e||"").replace(/\s+/g,"_"))?t+"_"+e:t:null}}},mounted:function(){var t=this;this.$nextTick((function(){t.localId_="__BVID__".concat(t._uid)}))}}},9878:function(t,e,n){"use strict";var r=n(356),i=n(6361),a=n(6410),s=n(3284),l=n(1578),o=n(3954),u=n(6595),p=n(7568),c=n(8280),f=n(7347),d=function(t){var e=(0,o.Z3)(t)||1;return e<1?5:e},h=function(t,e){var n=(0,o.Z3)(t)||1;return n>e?e:n<1?1:n},g=function(t){if(t.keyCode===r.Z.SPACE)return t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),t.currentTarget.click(),!1},m={disabled:{type:Boolean,default:!1},value:{type:[Number,String],default:null,validator:function(t){return!(!(0,s.Ft)(t)&&(0,o.Z3)(t,0)<1)||((0,p.ZK)('"v-model" value must be a number greater than "0"',"BPagination"),!1)}},limit:{type:[Number,String],default:5,validator:function(t){return!((0,o.Z3)(t,0)<1)||((0,p.ZK)('Prop "limit" must be a number greater than "0"',"BPagination"),!1)}},align:{type:String,default:"left"},pills:{type:Boolean,default:!1},hideGotoEndButtons:{type:Boolean,default:!1},ariaLabel:{type:String,default:"Pagination"},labelFirstPage:{type:String,default:"Go to first page"},firstText:{type:String,default:"«"},firstNumber:{type:Boolean,default:!1},firstClass:{type:[String,Array,Object],default:null},labelPrevPage:{type:String,default:"Go to previous page"},prevText:{type:String,default:"‹"},prevClass:{type:[String,Array,Object],default:null},labelNextPage:{type:String,default:"Go to next page"},nextText:{type:String,default:"›"},nextClass:{type:[String,Array,Object]},labelLastPage:{type:String,default:"Go to last page"},lastText:{type:String,default:"»"},lastNumber:{type:Boolean,default:!1},lastClass:{type:[String,Array,Object]},labelPage:{type:[String,Function],default:"Go to page"},pageClass:{type:[String,Array,Object]},hideEllipsis:{type:Boolean,default:!1},ellipsisText:{type:String,default:"…"},ellipsisClass:{type:[String,Array,Object]}};e.Z={mixins:[c.Z],model:{prop:"value",event:"input"},props:m,data:function(){var t=(0,o.Z3)(this.value,0);return{currentPage:t=t>0?t:-1,localNumberOfPages:1,localLimit:5}},computed:{btnSize:function(){return this.size?"pagination-".concat(this.size):""},alignment:function(){var t=this.align;return"center"===t?"justify-content-center":"end"===t||"right"===t?"justify-content-end":"fill"===t?"text-center":""},styleClass:function(){return this.pills?"b-pagination-pills":""},computedCurrentPage:function(){return h(this.currentPage,this.localNumberOfPages)},paginationParams:function(){var t=this.localLimit,e=this.localNumberOfPages,n=this.computedCurrentPage,r=this.hideEllipsis,i=this.firstNumber,a=this.lastNumber,s=!1,o=!1,u=t,p=1;e<=t?u=e:n<t-1&&t>3?(r&&!a||(o=!0,u=t-(i?0:1)),u=(0,l.bS)(u,t)):e-n+2<t&&t>3?(r&&!i||(s=!0,u=t-(a?0:1)),p=e-u+1):(t>3&&(u=t-2,s=!(r&&!i),o=!(r&&!a)),p=n-(0,l.Mk)(u/2)),p<1?(p=1,s=!1):p>e-u&&(p=e-u+1,o=!1),s&&i&&p<4&&(u+=2,p=1,s=!1);var c=p+u-1;return o&&a&&c>e-3&&(u+=c===e-2?2:3,o=!1),t<=3&&(i&&1===p?u=(0,l.bS)(u+1,e,t+1):a&&e===p+u-1&&(p=(0,l.nP)(p-1,1),u=(0,l.bS)(e-p+1,e,t+1))),{showFirstDots:s,showLastDots:o,numberOfLinks:u=(0,l.bS)(u,e-p+1),startNumber:p}},pageList:function(){var t=this.paginationParams,e=t.numberOfLinks,n=t.startNumber,r=this.computedCurrentPage,a=function(t,e){return(0,i.Z)(e).map((function(e,n){return{number:t+n,classes:null}}))}(n,e);if(a.length>3){var s=r-n,l="bv-d-xs-down-none";if(0===s)for(var o=3;o<a.length;o++)a[o].classes=l;else if(s===a.length-1)for(var u=0;u<a.length-3;u++)a[u].classes=l;else{for(var p=0;p<s-1;p++)a[p].classes=l;for(var c=a.length-1;c>s+1;c--)a[c].classes=l}}return a}},watch:{value:function(t,e){t!==e&&(this.currentPage=h(t,this.localNumberOfPages))},currentPage:function(t,e){t!==e&&this.$emit("input",t>0?t:null)},limit:function(t,e){t!==e&&(this.localLimit=d(t))}},created:function(){var t=this;this.localLimit=d(this.limit),this.$nextTick((function(){t.currentPage=t.currentPage>t.localNumberOfPages?t.localNumberOfPages:t.currentPage}))},methods:{handleKeyNav:function(t){var e=t.keyCode,n=t.shiftKey;this.isNav||(e===r.Z.LEFT||e===r.Z.UP?(t.preventDefault(),n?this.focusFirst():this.focusPrev()):e!==r.Z.RIGHT&&e!==r.Z.DOWN||(t.preventDefault(),n?this.focusLast():this.focusNext()))},getButtons:function(){return(0,a.a8)("button.page-link, a.page-link",this.$el).filter((function(t){return(0,a.pn)(t)}))},focusCurrent:function(){var t=this;this.$nextTick((function(){var e=t.getButtons().find((function(e){return(0,o.Z3)((0,a.UK)(e,"aria-posinset"),0)===t.computedCurrentPage}));(0,a.KS)(e)||t.focusFirst()}))},focusFirst:function(){var t=this;this.$nextTick((function(){var e=t.getButtons().find((function(t){return!(0,a.pK)(t)}));(0,a.KS)(e)}))},focusLast:function(){var t=this;this.$nextTick((function(){var e=t.getButtons().reverse().find((function(t){return!(0,a.pK)(t)}));(0,a.KS)(e)}))},focusPrev:function(){var t=this;this.$nextTick((function(){var e=t.getButtons(),n=e.indexOf((0,a.vY)());n>0&&!(0,a.pK)(e[n-1])&&(0,a.KS)(e[n-1])}))},focusNext:function(){var t=this;this.$nextTick((function(){var e=t.getButtons(),n=e.indexOf((0,a.vY)());n<e.length-1&&!(0,a.pK)(e[n+1])&&(0,a.KS)(e[n+1])}))}},render:function(t){var e=this,n=[],r=this.localNumberOfPages,i=this.pageList.map((function(t){return t.number})),a=this.disabled,l=this.paginationParams,o=l.showFirstDots,p=l.showLastDots,c=this.computedCurrentPage,d="fill"===this.align,h=this.isNav,m=function(t){return t===c},b=this.currentPage<1,v=function(n,i,s,l,o,p,c){var v=a||m(p)||b||n<1||n>r,y=n<1?1:n>r?r:n,P={disabled:v,page:y,index:y-1},O=e.normalizeSlot(s,P)||(0,u.BB)(l)||t(),S=t(v?"span":h?f.we:"button",{staticClass:"page-link",class:{"flex-grow-1":!h&&!v&&d},props:v||!h?{}:e.linkProps(n),attrs:{role:h?null:"menuitem",type:h||v?null:"button",tabindex:v||h?null:"-1","aria-label":i,"aria-controls":e.ariaControls||null,"aria-disabled":v?"true":null},on:v?{}:{"!click":function(t){e.onClick(n,t)},keydown:g}},[O]);return t("li",{key:c,staticClass:"page-item",class:[{disabled:v,"flex-fill":d,"d-flex":d&&!h&&!v},o],attrs:{role:h?null:"presentation","aria-hidden":v?"true":null}},[S])},y=function(n){return t("li",{key:"ellipsis-".concat(n?"last":"first"),staticClass:"page-item",class:["disabled","bv-d-xs-down-none",d?"flex-fill":"",e.ellipsisClass],attrs:{role:"separator"}},[t("span",{staticClass:"page-link"},[e.normalizeSlot("ellipsis-text")||(0,u.BB)(e.ellipsisText)||t()])])},P=function(n,i){var l=m(n.number)&&!b,o=a?null:l||b&&0===i?"0":"-1",p={role:h?null:"menuitemradio",type:h||a?null:"button","aria-disabled":a?"true":null,"aria-controls":e.ariaControls||null,"aria-label":(0,s.mf)(e.labelPage)?e.labelPage(n.number):"".concat(e.labelPage," ").concat(n.number),"aria-checked":h?null:l?"true":"false","aria-current":h&&l?"page":null,"aria-posinset":n.number,"aria-setsize":r,tabindex:h?null:o},c=(0,u.BB)(e.makePage(n.number)),v={page:n.number,index:n.number-1,content:c,active:l,disabled:a},y=t(a?"span":h?f.we:"button",{props:a||!h?{}:e.linkProps(n.number),staticClass:"page-link",class:{"flex-grow-1":!h&&!a&&d},attrs:p,on:a?{}:{"!click":function(t){e.onClick(n.number,t)},keydown:g}},[e.normalizeSlot("page",v)||c]);return t("li",{key:"page-".concat(n.number),staticClass:"page-item",class:[{disabled:a,active:l,"flex-fill":d,"d-flex":d&&!h&&!a},n.classes,e.pageClass],attrs:{role:h?null:"presentation"}},[y])},O=t();this.firstNumber||this.hideGotoEndButtons||(O=v(1,this.labelFirstPage,"first-text",this.firstText,this.firstClass,1,"pagination-goto-first")),n.push(O),n.push(v(c-1,this.labelPrevPage,"prev-text",this.prevText,this.prevClass,1,"pagination-goto-prev")),n.push(this.firstNumber&&1!==i[0]?P({number:1},0):t()),n.push(o?y(!1):t()),this.pageList.forEach((function(t,r){var a=o&&e.firstNumber&&1!==i[0]?1:0;n.push(P(t,r+a))})),n.push(p?y(!0):t()),n.push(this.lastNumber&&i[i.length-1]!==r?P({number:r},-1):t()),n.push(v(c+1,this.labelNextPage,"next-text",this.nextText,this.nextClass,r,"pagination-goto-next"));var S=t();this.lastNumber||this.hideGotoEndButtons||(S=v(r,this.labelLastPage,"last-text",this.lastText,this.lastClass,r,"pagination-goto-last")),n.push(S);var x=t("ul",{ref:"ul",staticClass:"pagination",class:["b-pagination",this.btnSize,this.alignment,this.styleClass],attrs:{role:h?null:"menubar","aria-disabled":a?"true":"false","aria-label":h?null:this.ariaLabel||null},on:h?{}:{keydown:this.handleKeyNav}},n);return h?t("nav",{attrs:{"aria-disabled":a?"true":null,"aria-hidden":a?"true":"false","aria-label":h&&this.ariaLabel||null}},[x]):x}}},8735:function(t,e,n){"use strict";n.d(e,{o:function(){return i},U:function(){return a}});var r=/(<([^>]+)>)/gi,i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return String(t).replace(r,"")},a=function(t,e){return t?{innerHTML:t}:e?{textContent:e}:{}}},356:function(t,e,n){"use strict";var r=(0,n(7040).vV)({SPACE:32,ENTER:13,ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,PAGEUP:33,PAGEDOWN:34,HOME:36,END:35,TAB:9,SHIFT:16,CTRL:17,BACKSPACE:8,ALT:18,PAUSE:19,BREAK:19,INSERT:45,INS:45,DELETE:46});e.Z=r},6361:function(t,e){"use strict";e.Z=function(t){return Array.apply(null,{length:t})}}}]);