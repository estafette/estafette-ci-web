(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[472],{4058:function(t,e,i){"use strict";i.d(e,{x:function(){return C}});var n=i(1051),a=i(1572),r=i(7023),l=i(6410),o=i(8077),s=i(3284),u=i(3954),c=i(7040),d=i(6595),p=i(5505),f=i(3727),h=i(8280),b=i(725),v=i(2989),m=i(9558),y={tag:{type:String,default:"div"}},g=v.Z.extend({name:"BFormRow",functional:!0,props:y,render:function(t,e){var i=e.props,n=e.data,a=e.children;return t(i.tag,(0,m.b)(n,{staticClass:"form-row"}),a)}}),S=i(1666),B=i(2307),k={id:{type:String},tag:{type:String,default:"div"},tooltip:{type:Boolean,default:!1},forceShow:{type:Boolean,default:!1},state:{type:Boolean,default:null},ariaLive:{type:String},role:{type:String}},V=v.Z.extend({name:"BFormValidFeedback",functional:!0,props:k,render:function(t,e){var i=e.props,n=e.data,a=e.children,r=!0===i.forceShow||!0===i.state;return t(i.tag,(0,m.b)(n,{class:{"valid-feedback":!i.tooltip,"valid-tooltip":i.tooltip,"d-block":r},attrs:{id:i.id||null,role:i.role||null,"aria-live":i.ariaLive||null,"aria-atomic":i.ariaLive?"true":null}}),a)}});function I(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function O(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?I(Object(i),!0).forEach((function(e){x(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):I(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function x(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var F=function(t,e){var i=e.normalizeSlot("invalid-feedback")||e.invalidFeedback,n=t();return i&&(n=t(B.h,{props:{id:e.invalidFeedbackId,state:e.computedState,tooltip:e.tooltip,ariaLive:e.feedbackAriaLive,role:e.feedbackAriaLive?"alert":null},attrs:{tabindex:i?"-1":null}},[i])),n},w=function(t,e){var i=e.normalizeSlot("valid-feedback")||e.validFeedback,n=t();return i&&(n=t(V,{props:{id:e.validFeedbackId,state:e.computedState,tooltip:e.tooltip,ariaLive:e.feedbackAriaLive,role:e.feedbackAriaLive?"alert":null},attrs:{tabindex:i?"-1":null}},[i])),n},$=function(t,e){var i=e.normalizeSlot("description")||e.description,n=t();return i&&(n=t(S.m,{attrs:{id:e.descriptionId,tabindex:i?"-1":null}},[i])),n},j=(0,n.Z)((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1?arguments[1]:void 0;return"".concat(e).concat((0,d.jC)(t))})),C={name:"BFormGroup",mixins:[f.Z,p.Z,h.Z],get props(){return delete this.props,this.props=(t=(0,r.QC)(),e=t.reduce((function(t,e){return t[j(e,"labelCols")]={type:[Number,String,Boolean],default:!e&&null},t}),(0,c.Ue)(null)),i=t.reduce((function(t,e){return t[j(e,"labelAlign")]={type:String},t}),(0,c.Ue)(null)),O(O(O({label:{type:String},labelFor:{type:String},labelSize:{type:String},labelSrOnly:{type:Boolean,default:!1}},e),i),{},{labelClass:{type:[String,Array,Object]},description:{type:String},invalidFeedback:{type:String},validFeedback:{type:String},tooltip:{type:Boolean,default:!1},feedbackAriaLive:{type:String,default:"assertive"},validated:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}}));var t,e,i},computed:{labelColProps:function(){var t=this,e={};return(0,r.QC)().forEach((function(i){var n=t[j(i,"labelCols")];if(n=""===n||(n||!1),(0,s.jn)(n)||"auto"===n||(n=(n=(0,u.Z3)(n,0))>0&&n),n){var a=i||((0,s.jn)(n)?"col":"cols");e[a]=n}})),e},labelAlignClasses:function(){var t=this,e=[];return(0,r.QC)().forEach((function(i){var n=t[j(i,"labelAlign")]||null;if(n){var a=i?"text-".concat(i,"-").concat(n):"text-".concat(n);e.push(a)}})),e},isHorizontal:function(){return(0,c.XP)(this.labelColProps).length>0},labelId:function(){return this.hasNormalizedSlot("label")||this.label?this.safeId("_BV_label_"):null},descriptionId:function(){return this.hasNormalizedSlot("description")||this.description?this.safeId("_BV_description_"):null},hasInvalidFeedback:function(){return!1===this.computedState&&(this.hasNormalizedSlot("invalid-feedback")||this.invalidFeedback)},invalidFeedbackId:function(){return this.hasInvalidFeedback?this.safeId("_BV_feedback_invalid_"):null},hasValidFeedback:function(){return!0===this.computedState&&(this.hasNormalizedSlot("valid-feedback")||this.validFeedback)},validFeedbackId:function(){return this.hasValidFeedback?this.safeId("_BV_feedback_valid_"):null},describedByIds:function(){return[this.descriptionId,this.invalidFeedbackId,this.validFeedbackId].filter(Boolean).join(" ")||null}},watch:{describedByIds:function(t,e){t!==e&&this.setInputDescribedBy(t,e)}},mounted:function(){var t=this;this.$nextTick((function(){t.setInputDescribedBy(t.describedByIds)}))},methods:{legendClick:function(t){if(!this.labelFor){var e=t.target?t.target.tagName:"";if(!/^(input|select|textarea|label|button|a)$/i.test(e)){var i=(0,l.a8)("input:not([disabled]),textarea:not([disabled]),select:not([disabled])",this.$refs.content).filter(l.pn);i&&1===i.length&&(0,l.KS)(i[0])}}},setInputDescribedBy:function(t,e){if(this.labelFor&&o.jU){var i=(0,l.Ys)("#".concat(this.labelFor),this.$refs.content);if(i){var n="aria-describedby",r=((0,l.UK)(i,n)||"").split(/\s+/);t=(t||"").split(/\s+/),e=(e||"").split(/\s+/),r=r.filter((function(t){return!(0,a.kI)(e,t)})).concat(t).filter(Boolean),(r=(0,c.XP)(r.reduce((function(t,e){return O(O({},t),{},x({},e,!0))}),{})).join(" ").trim())?(0,l.fi)(i,n,r):(0,l.uV)(i,n)}}}},render:function(t){var e=!this.labelFor,i=this.isHorizontal,n=function(t,e){var i=e.normalizeSlot("label")||e.label,n=e.labelFor,a=!n,r=e.isHorizontal,l=a?"legend":"label";if(i||r){if(e.labelSrOnly){var o=t();return i&&(o=t(l,{class:"sr-only",attrs:{id:e.labelId,for:n||null}},[i])),t(r?b.l:"div",{props:r?e.labelColProps:{}},[o])}return t(r?b.l:l,{on:a?{click:e.legendClick}:{},props:r?O({tag:l},e.labelColProps):{},attrs:{id:e.labelId,for:n||null,tabindex:a?"-1":null},class:[a?"bv-no-focus-ring":"",r||a?"col-form-label":"",!r&&a?"pt-0":"",r||a?"":"d-block",e.labelSize?"col-form-label-".concat(e.labelSize):"",e.labelAlignClasses,e.labelClass]},[i])}return t()}(t,this),a=t(i?b.l:"div",{ref:"content",staticClass:"bv-no-focus-ring",attrs:{tabindex:e?"-1":null,role:e?"group":null}},[this.normalizeSlot("default")||t(),F(t,this),w(t,this),$(t,this)]),r={staticClass:"form-group",class:[this.validated?"was-validated":null,this.stateClass],attrs:{id:this.safeId(),disabled:e?this.disabled:null,role:e?null:"group","aria-invalid":!1===this.computedState?"true":null,"aria-labelledby":e&&i?this.labelId:null,"aria-describedby":e?this.describedByIds:null}};return t(e?"fieldset":i?g:"div",r,i&&e?[t(g,[n,a])]:[n,a])}}},2183:function(t,e,i){"use strict";i.d(e,{e:function(){return g}});var n=i(2989),a=i(1572),r=i(6410),l=i(8415),o=i(6944),s=i(685),u=i(9035),c=i(5505),d=i(403),p=i(4791),f=i(3727),h=i(6677);function b(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function v(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?b(Object(i),!0).forEach((function(e){m(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):b(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function m(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var y=["text","password","email","number","url","tel","search","range","color","date","time","datetime","datetime-local","month","week"],g=n.Z.extend({name:"BFormInput",mixins:[h.Z,f.Z,o.Z,u.Z,c.Z,d.Z,s.Z,p.Z],props:{type:{type:String,default:"text",validator:function(t){return(0,a.kI)(y,t)}},noWheel:{type:Boolean,default:!1},min:{type:[String,Number]},max:{type:[String,Number]},step:{type:[String,Number]},list:{type:String}},computed:{localType:function(){return(0,a.kI)(y,this.type)?this.type:"text"},computedAttrs:function(){var t=this.localType,e=this.disabled,i=this.placeholder,n=this.required,a=this.min,r=this.max,l=this.step;return{id:this.safeId(),name:this.name||null,form:this.form||null,type:t,disabled:e,placeholder:i,required:n,autocomplete:this.autocomplete||null,readonly:this.readonly||this.plaintext,min:a,max:r,step:l,list:"password"!==t?this.list:null,"aria-required":n?"true":null,"aria-invalid":this.computedAriaInvalid}},computedListeners:function(){return v(v({},this.bvListeners),{},{input:this.onInput,change:this.onChange,blur:this.onBlur})}},watch:{noWheel:function(t){this.setWheelStopper(t)}},mounted:function(){this.setWheelStopper(this.noWheel)},deactivated:function(){this.setWheelStopper(!1)},activated:function(){this.setWheelStopper(this.noWheel)},beforeDestroy:function(){this.setWheelStopper(!1)},methods:{setWheelStopper:function(t){var e=this.$el;(0,l.tU)(t,e,"focus",this.onWheelFocus),(0,l.tU)(t,e,"blur",this.onWheelBlur),t||(0,l.QY)(document,"wheel",this.stopWheel)},onWheelFocus:function(){(0,l.XO)(document,"wheel",this.stopWheel)},onWheelBlur:function(){(0,l.QY)(document,"wheel",this.stopWheel)},stopWheel:function(t){t.preventDefault(),(0,r.Cx)(this.$el)}},render:function(t){return t("input",{ref:"input",class:this.computedClass,attrs:this.computedAttrs,domProps:{value:this.localValue},on:this.computedListeners})}})},2307:function(t,e,i){"use strict";i.d(e,{h:function(){return l}});var n=i(2989),a=i(9558),r={id:{type:String},tag:{type:String,default:"div"},tooltip:{type:Boolean,default:!1},forceShow:{type:Boolean,default:!1},state:{type:Boolean,default:null},ariaLive:{type:String},role:{type:String}},l=n.Z.extend({name:"BFormInvalidFeedback",functional:!0,props:r,render:function(t,e){var i=e.props,n=e.data,r=e.children,l=!0===i.forceShow||!1===i.state;return t(i.tag,(0,a.b)(n,{class:{"invalid-feedback":!i.tooltip,"invalid-tooltip":i.tooltip,"d-block":l},attrs:{id:i.id||null,role:i.role||null,"aria-live":i.ariaLive||null,"aria-atomic":i.ariaLive?"true":null}}),r)}})},1666:function(t,e,i){"use strict";i.d(e,{m:function(){return s}});var n=i(2989),a=i(9558),r=i(7023);var l="BFormText",o={id:{type:String},tag:{type:String,default:"small"},textVariant:{type:String,default:function(){return(0,r.wJ)(l,"textVariant")}},inline:{type:Boolean,default:!1}},s=n.Z.extend({name:l,functional:!0,props:o,render:function(t,e){var i,n,r,l=e.props,o=e.data,s=e.children;return t(l.tag,(0,a.b)(o,{class:(i={"form-text":!l.inline},n="text-".concat(l.textVariant),r=l.textVariant,n in i?Object.defineProperty(i,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):i[n]=r,i),attrs:{id:l.id}}),s)}})},685:function(t,e){"use strict";e.Z={computed:{selectionStart:{cache:!1,get:function(){return this.$refs.input.selectionStart},set:function(t){this.$refs.input.selectionStart=t}},selectionEnd:{cache:!1,get:function(){return this.$refs.input.selectionEnd},set:function(t){this.$refs.input.selectionEnd=t}},selectionDirection:{cache:!1,get:function(){return this.$refs.input.selectionDirection},set:function(t){this.$refs.input.selectionDirection=t}}},methods:{select:function(){var t;(t=this.$refs.input).select.apply(t,arguments)},setSelectionRange:function(){var t;(t=this.$refs.input).setSelectionRange.apply(t,arguments)},setRangeText:function(){var t;(t=this.$refs.input).setRangeText.apply(t,arguments)}}}},403:function(t,e,i){"use strict";var n=i(6410),a=i(3284),r=i(1578),l=i(3954),o=i(6595);e.Z={model:{prop:"value",event:"update"},props:{value:{type:[String,Number],default:""},ariaInvalid:{type:[Boolean,String],default:!1},readonly:{type:Boolean,default:!1},plaintext:{type:Boolean,default:!1},autocomplete:{type:String},placeholder:{type:String},formatter:{type:Function},lazyFormatter:{type:Boolean,default:!1},trim:{type:Boolean,default:!1},number:{type:Boolean,default:!1},lazy:{type:Boolean,default:!1},debounce:{type:[Number,String],default:0}},data:function(){return{localValue:(0,o.BB)(this.value),vModelValue:this.value}},computed:{computedClass:function(){return[{"custom-range":"range"===this.type,"form-control-plaintext":this.plaintext&&"range"!==this.type&&"color"!==this.type,"form-control":!this.plaintext&&"range"!==this.type||"color"===this.type},this.sizeFormClass,this.stateClass]},computedAriaInvalid:function(){return this.ariaInvalid&&"false"!==this.ariaInvalid?!0===this.ariaInvalid?"true":this.ariaInvalid:!1===this.computedState?"true":null},computedDebounce:function(){return(0,r.nP)((0,l.Z3)(this.debounce,0),0)},hasFormatter:function(){return(0,a.mf)(this.formatter)}},watch:{value:function(t){var e=(0,o.BB)(t);e!==this.localValue&&t!==this.vModelValue&&(this.clearDebounce(),this.localValue=e,this.vModelValue=t)}},mounted:function(){this.$_inputDebounceTimer=null,this.$on("hook:beforeDestroy",this.clearDebounce);var t=this.value,e=(0,o.BB)(t);e!==this.localValue&&t!==this.vModelValue&&(this.localValue=e,this.vModelValue=t)},methods:{clearDebounce:function(){clearTimeout(this.$_inputDebounceTimer),this.$_inputDebounceTimer=null},formatValue:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return t=(0,o.BB)(t),!this.hasFormatter||this.lazyFormatter&&!i||(t=this.formatter(t,e)),t},modifyValue:function(t){return this.trim&&(t=t.trim()),this.number&&(t=(0,l.f_)(t,t)),t},updateValue:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.lazy;if(!n||i)if((t=this.modifyValue(t))!==this.vModelValue){this.clearDebounce();var a=function(){e.vModelValue=t,e.$emit("update",t)},r=this.computedDebounce;r>0&&!n&&!i?this.$_inputDebounceTimer=setTimeout(a,r):a()}else if(this.hasFormatter){var l=this.$refs.input;l&&t!==l.value&&(l.value=t)}},onInput:function(t){if(!t.target.composing){var e=t.target.value,i=this.formatValue(e,t);!1===i||t.defaultPrevented?t.preventDefault():(this.localValue=i,this.updateValue(i),this.$emit("input",i))}},onChange:function(t){var e=t.target.value,i=this.formatValue(e,t);!1===i||t.defaultPrevented?t.preventDefault():(this.localValue=i,this.updateValue(i,!0),this.$emit("change",i))},onBlur:function(t){var e=t.target.value,i=this.formatValue(e,t,!0);!1!==i&&(this.localValue=(0,o.BB)(this.modifyValue(i)),this.updateValue(i,!0)),this.$emit("blur",t)},focus:function(){this.disabled||(0,n.KS)(this.$el)},blur:function(){this.disabled||(0,n.Cx)(this.$el)}}}},4791:function(t,e){"use strict";e.Z={computed:{validity:{cache:!1,get:function(){return this.$refs.input.validity}},validationMessage:{cache:!1,get:function(){return this.$refs.input.validationMessage}},willValidate:{cache:!1,get:function(){return this.$refs.input.willValidate}}},methods:{setCustomValidity:function(){var t;return(t=this.$refs.input).setCustomValidity.apply(t,arguments)},checkValidity:function(){var t;return(t=this.$refs.input).checkValidity.apply(t,arguments)},reportValidity:function(){var t;return(t=this.$refs.input).reportValidity.apply(t,arguments)}}}}}]);