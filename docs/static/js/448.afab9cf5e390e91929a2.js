(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[448],{5302:function(t,e,i){"use strict";i.d(e,{y:function(){return E}});var o=i(538),n=i(4689),r=i(2299),s=i(6410),a=i(3284),l=i(1578),c=i(3954),h=i(7040),u=i(451),p=i(2023),d=i(685),f=i(9035),b=i(5505),v=i(403),m=i(4791),w=i(3727),g=i(8596),y=i(6677),$=i(824),O=i(3058);function _(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var P="__bv__visibility_observer",k=function(){function t(e,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.el=e,this.callback=i.callback,this.margin=i.margin||0,this.once=i.once||!1,this.observer=null,this.visible=void 0,this.doneOnce=!1,this.createObserver(o)}var e,i,o;return e=t,(i=[{key:"createObserver",value:function(t){var e=this;if(this.observer&&this.stop(),!this.doneOnce&&(0,a.mf)(this.callback)){try{this.observer=new IntersectionObserver(this.handler.bind(this),{root:null,rootMargin:this.margin,threshold:0})}catch(t){return this.doneOnce=!0,this.observer=void 0,void this.callback(null)}t.context.$nextTick((function(){(0,s.bz)((function(){e.observer&&e.observer.observe(e.el)}))}))}}},{key:"handler",value:function(t){var e=t?t[0]:{},i=Boolean(e.isIntersecting||e.intersectionRatio>0);i!==this.visible&&(this.visible=i,this.callback(i),this.once&&this.visible&&(this.doneOnce=!0,this.stop()))}},{key:"stop",value:function(){this.observer&&this.observer.disconnect(),this.observer=null}}])&&_(e.prototype,i),o&&_(e,o),t}(),j=function(t){var e=t[P];e&&e.stop&&e.stop(),delete t[P]},C=function(t,e,i){var o=e.value,n=e.modifiers,r={margin:"0px",once:!1,callback:o};(0,h.XP)(n).forEach((function(t){$.R2.test(t)?r.margin="".concat(t,"px"):"once"===t.toLowerCase()&&(r.once=!0)})),j(t),t[P]=new k(t,r,i),t[P]._prevModifiers=(0,h.d9)(n)},S={bind:C,componentUpdated:function(t,e,i){var o=e.value,n=e.oldValue,r=e.modifiers;r=(0,h.d9)(r),!t||o===n&&t[P]&&(0,O.W)(r,t[P]._prevModifiers)||C(t,{value:o,modifiers:r},i)},unbind:function(t){j(t)}};function x(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function D(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?x(Object(i),!0).forEach((function(e){R(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):x(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function R(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var T=(0,u.y2)((0,h.GE)(D(D(D(D(D(D({},w.N),p.N),f.N),b.N),v.NQ),{},{maxRows:(0,u.pi)(r.fE),noAutoShrink:(0,u.pi)(r.U5,!1),noResize:(0,u.pi)(r.U5,!1),rows:(0,u.pi)(r.fE,2),wrap:(0,u.pi)(r.N0,"soft")})),n.eo),E=o.Z.extend({name:n.eo,directives:{"b-visible":S},mixins:[y.o,w.t,g.E,p.X,f.j,b.J,v.Q_,d.o,m.e],props:T,data:function(){return{heightInPx:null}},computed:{computedStyle:function(){var t={resize:!this.computedRows||this.noResize?"none":null};return this.computedRows||(t.height=this.heightInPx,t.overflowY="scroll"),t},computedMinRows:function(){return(0,l.nP)((0,c.Z3)(this.rows,2),2)},computedMaxRows:function(){return(0,l.nP)(this.computedMinRows,(0,c.Z3)(this.maxRows,0))},computedRows:function(){return this.computedMinRows===this.computedMaxRows?this.computedMinRows:null},computedAttrs:function(){var t=this.disabled,e=this.required;return{id:this.safeId(),name:this.name||null,form:this.form||null,disabled:t,placeholder:this.placeholder||null,required:e,autocomplete:this.autocomplete||null,readonly:this.readonly||this.plaintext,rows:this.computedRows,wrap:this.wrap||null,"aria-required":this.required?"true":null,"aria-invalid":this.computedAriaInvalid}},computedListeners:function(){return D(D({},this.bvListeners),{},{input:this.onInput,change:this.onChange,blur:this.onBlur})}},watch:{localValue:function(){this.setHeight()}},mounted:function(){this.setHeight()},methods:{visibleCallback:function(t){t&&this.$nextTick(this.setHeight)},setHeight:function(){var t=this;this.$nextTick((function(){(0,s.bz)((function(){t.heightInPx=t.computeHeight()}))}))},computeHeight:function(){if(this.$isServer||!(0,a.Ft)(this.computedRows))return null;var t=this.$el;if(!(0,s.pn)(t))return null;var e=(0,s.yD)(t),i=(0,c.f_)(e.lineHeight,1),o=(0,c.f_)(e.borderTopWidth,0)+(0,c.f_)(e.borderBottomWidth,0),n=(0,c.f_)(e.paddingTop,0)+(0,c.f_)(e.paddingBottom,0),r=o+n,h=i*this.computedMinRows+r,u=(0,s.C2)(t,"height")||e.height;(0,s.A_)(t,"height","auto");var p=t.scrollHeight;(0,s.A_)(t,"height",u);var d=(0,l.nP)((p-n)/i,2),f=(0,l.bS)((0,l.nP)(d,this.computedMinRows),this.computedMaxRows),b=(0,l.nP)((0,l.hv)(f*i+r),h);return this.noAutoShrink&&(0,c.f_)(u,0)>b?u:"".concat(b,"px")}},render:function(t){return t("textarea",{class:this.computedClass,style:this.computedStyle,directives:[{name:"b-visible",value:this.visibleCallback,modifiers:{640:!0}}],attrs:this.computedAttrs,domProps:{value:this.localValue},on:this.computedListeners,ref:"input"})}})},8365:function(t,e,i){"use strict";i.d(e,{T:function(){return _}});var o,n,r=i(538),s=i(4689),a=i(3294),l=i(2299),c=i(8112),h=i(3597),u=i(3284),p=i(7040),d=i(451),f=i(8280),b=i(7410);function v(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function m(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var w="disabled",g=a.j7+w,y="show",$=a.j7+y,O=(0,d.y2)((m(o={boundary:(0,d.pi)([c.mv,l.aR,l.N0],"scrollParent"),boundaryPadding:(0,d.pi)(l.fE,50),container:(0,d.pi)([c.mv,l.aR,l.N0]),customClass:(0,d.pi)(l.N0),delay:(0,d.pi)(l.$k,50)},w,(0,d.pi)(l.U5,!1)),m(o,"fallbackPlacement",(0,d.pi)(l.Mu,"flip")),m(o,"id",(0,d.pi)(l.N0)),m(o,"noFade",(0,d.pi)(l.U5,!1)),m(o,"noninteractive",(0,d.pi)(l.U5,!1)),m(o,"offset",(0,d.pi)(l.fE,0)),m(o,"placement",(0,d.pi)(l.N0,"top")),m(o,y,(0,d.pi)(l.U5,!1)),m(o,"target",(0,d.pi)([c.mv,c.t_,l.Sx,l.aR,l.N0],void 0,!0)),m(o,"title",(0,d.pi)(l.N0)),m(o,"triggers",(0,d.pi)(l.Mu,"hover focus")),m(o,"variant",(0,d.pi)(l.N0)),o),s.qv),_=r.Z.extend({name:s.qv,mixins:[f.Z],inheritAttrs:!1,props:O,data:function(){return{localShow:this.show,localTitle:"",localContent:""}},computed:{templateData:function(){return function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?v(Object(i),!0).forEach((function(e){m(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):v(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({title:this.localTitle,content:this.localContent,interactive:!this.noninteractive},(0,p.ei)(this.$props,["boundary","boundaryPadding","container","customClass","delay","fallbackPlacement","id","noFade","offset","placement","target","target","triggers","variant",w]))},templateTitleContent:function(){return{title:this.title,content:this.content}}},watch:(n={},m(n,y,(function(t,e){t!==e&&t!==this.localShow&&this.$_toolpop&&(t?this.$_toolpop.show():this.$_toolpop.forceHide())})),m(n,w,(function(t){t?this.doDisable():this.doEnable()})),m(n,"localShow",(function(t){this.$emit($,t)})),m(n,"templateData",(function(){var t=this;this.$nextTick((function(){t.$_toolpop&&t.$_toolpop.updateData(t.templateData)}))})),m(n,"templateTitleContent",(function(){this.$nextTick(this.updateContent)})),n),created:function(){this.$_toolpop=null},updated:function(){this.$nextTick(this.updateContent)},beforeDestroy:function(){this.$off(a.oJ,this.doOpen),this.$off(a.Cc,this.doClose),this.$off(a.MH,this.doDisable),this.$off(a.wV,this.doEnable),this.$_toolpop&&(this.$_toolpop.$destroy(),this.$_toolpop=null)},mounted:function(){var t=this;this.$nextTick((function(){var e=t.getComponent();t.updateContent();var i=(0,h.P)(t)||(0,h.P)(t.$parent),o=t.$_toolpop=new e({parent:t,_scopeId:i||void 0});o.updateData(t.templateData),o.$on(a.l0,t.onShow),o.$on(a.AS,t.onShown),o.$on(a.yM,t.onHide),o.$on(a.v6,t.onHidden),o.$on(a.gi,t.onDisabled),o.$on(a.VU,t.onEnabled),t.disabled&&t.doDisable(),t.$on(a.oJ,t.doOpen),t.$on(a.Cc,t.doClose),t.$on(a.MH,t.doDisable),t.$on(a.wV,t.doEnable),t.localShow&&o.show()}))},methods:{getComponent:function(){return b.j},updateContent:function(){this.setTitle(this.normalizeSlot()||this.title)},setTitle:function(t){t=(0,u.Jp)(t)?"":t,this.localTitle!==t&&(this.localTitle=t)},setContent:function(t){t=(0,u.Jp)(t)?"":t,this.localContent!==t&&(this.localContent=t)},onShow:function(t){this.$emit(a.l0,t),t&&(this.localShow=!t.defaultPrevented)},onShown:function(t){this.localShow=!0,this.$emit(a.AS,t)},onHide:function(t){this.$emit(a.yM,t)},onHidden:function(t){this.$emit(a.v6,t),this.localShow=!1},onDisabled:function(t){t&&t.type===a.gi&&(this.$emit(g,!0),this.$emit(a.gi,t))},onEnabled:function(t){t&&t.type===a.VU&&(this.$emit(g,!1),this.$emit(a.VU,t))},doOpen:function(){!this.localShow&&this.$_toolpop&&this.$_toolpop.show()},doClose:function(){this.localShow&&this.$_toolpop&&this.$_toolpop.hide()},doDisable:function(){this.$_toolpop&&this.$_toolpop.disable()},doEnable:function(){this.$_toolpop&&this.$_toolpop.enable()}},render:function(t){return t()}})}}]);