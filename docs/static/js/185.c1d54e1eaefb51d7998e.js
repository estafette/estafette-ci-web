(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[185],{9944:function(t,e,n){"use strict";n.d(e,{SH:function(){return q}});var i=n(538),r=n(4689),a=n(3294),o=n(2299),s=n(494),c=n(3284),l=n(3954),u=n(7040),p=n(451),d=n(488),f=n(8280),h=n(9558),g=n(824),b=n(6595),v=n(8265),m=n(1578);function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O={viewBox:"0 0 16 16",width:"1em",height:"1em",focusable:"false",role:"img","aria-label":"icon"},j={width:null,height:null,focusable:null,role:null,"aria-label":null},w={animation:(0,p.pi)(o.N0),content:(0,p.pi)(o.N0),flipH:(0,p.pi)(o.U5,!1),flipV:(0,p.pi)(o.U5,!1),fontScale:(0,p.pi)(o.fE,1),rotate:(0,p.pi)(o.fE,0),scale:(0,p.pi)(o.fE,1),shiftH:(0,p.pi)(o.fE,0),shiftV:(0,p.pi)(o.fE,0),stacked:(0,p.pi)(o.U5,!1),title:(0,p.pi)(o.N0),variant:(0,p.pi)(o.N0)},T=i.Z.extend({name:r.Rv,functional:!0,props:w,render:function(t,e){var n,i=e.data,r=e.props,a=e.children,o=r.animation,s=r.content,u=r.flipH,p=r.flipV,d=r.stacked,f=r.title,g=r.variant,b=(0,m.nP)((0,l.f_)(r.fontScale,1),0)||1,w=(0,m.nP)((0,l.f_)(r.scale,1),0)||1,T=(0,l.f_)(r.rotate,0),P=(0,l.f_)(r.shiftH,0),S=(0,l.f_)(r.shiftV,0),I=u||p||1!==w,k=I||T,x=P||S,_=!(0,c.Jp)(s),C=t("g",{attrs:{transform:[k?"translate(8 8)":null,I?"scale(".concat((u?-1:1)*w," ").concat((p?-1:1)*w,")"):null,T?"rotate(".concat(T,")"):null,k?"translate(-8 -8)":null].filter(v.y).join(" ")||null},domProps:_?{innerHTML:s||""}:{}},a);x&&(C=t("g",{attrs:{transform:"translate(".concat(16*P/16," ").concat(-16*S/16,")")}},[C])),d&&(C=t("g",[C]));var D=[f?t("title",f):null,C].filter(v.y);return t("svg",(0,h.b)({staticClass:"b-icon bi",class:(n={},y(n,"text-".concat(g),g),y(n,"b-icon-animation-".concat(o),o),n),attrs:O,style:d?{}:{fontSize:1===b?null:"".concat(100*b,"%")}},i,d?{attrs:j}:{},{attrs:{xmlns:d?null:"http://www.w3.org/2000/svg",fill:"currentColor"}}),D)}});function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function S(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(Object(n),!0).forEach((function(e){I(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function I(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var k=function(t,e){var n=(0,b.GL)(t),r="BIcon".concat((0,b.Ho)(t)),a="bi-".concat(n),o=n.replace(/-/g," "),s=(0,b.fy)(e||"");return i.Z.extend({name:r,functional:!0,props:(0,u.CE)(w,["content"]),render:function(t,e){var n=e.data,i=e.props;return t(T,(0,h.b)({props:{title:o},attrs:{"aria-label":o}},n,{staticClass:a,props:S(S({},i),{},{content:s})}))}})},x=k("Blank",""),_=k("PersonFill",'<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>');function C(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function D(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?C(Object(n),!0).forEach((function(e){N(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function N(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var E=function t(e,n){return e?(e.$options||{}).components[n]||t(e.$parent,n):null},z=(0,u.CE)(w,["content"]),R=(0,p.y2)((0,u.GE)(D(D({},z),{},{icon:(0,p.pi)(o.N0)})),r.DU),A=i.Z.extend({name:r.DU,functional:!0,props:R,render:function(t,e){var n=e.data,i=e.props,r=e.parent,a=(0,b.Ho)((0,b.fy)(i.icon||"")).replace(g.Hb,"");return t(a&&E(r,"BIcon".concat(a))||x,(0,h.b)(n,{props:(0,p.uj)(z,i)}))}}),B=n(5193),U=n(7347);function H(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function L(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?H(Object(n),!0).forEach((function(e){V(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function V(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var $="b-avatar",F=["sm",null,"lg"],G=(0,u.CE)(U.NQ,["active","event","routerTag"]),Z=(0,p.y2)((0,u.GE)(L(L({},G),{},{alt:(0,p.pi)(o.N0,"avatar"),ariaLabel:(0,p.pi)(o.N0),badge:(0,p.pi)(o.gL,!1),badgeLeft:(0,p.pi)(o.U5,!1),badgeOffset:(0,p.pi)(o.N0),badgeTop:(0,p.pi)(o.U5,!1),badgeVariant:(0,p.pi)(o.N0,"primary"),button:(0,p.pi)(o.U5,!1),buttonType:(0,p.pi)(o.N0,"button"),icon:(0,p.pi)(o.N0),rounded:(0,p.pi)(o.gL,!1),size:(0,p.pi)(o.fE),square:(0,p.pi)(o.U5,!1),src:(0,p.pi)(o.N0),text:(0,p.pi)(o.N0),variant:(0,p.pi)(o.N0,"secondary")})),r.Bh),q=i.Z.extend({name:r.Bh,mixins:[f.Z],inject:{bvAvatarGroup:{default:null}},props:Z,data:function(){return{localSrc:this.src||null}},computed:{computedSize:function(){var t,e=this.bvAvatarGroup;return t=e?e.size:this.size,t=(0,c.HD)(t)&&(0,c.kE)(t)?(0,l.f_)(t,0):t,(0,c.hj)(t)?"".concat(t,"px"):t||null},computedVariant:function(){var t=this.bvAvatarGroup;return t&&t.variant?t.variant:this.variant},computedRounded:function(){var t=this.bvAvatarGroup,e=!(!t||!t.square)||this.square,n=t&&t.rounded?t.rounded:this.rounded;return e?"0":""===n||(n||"circle")},fontStyle:function(){var t=this.computedSize,e=-1===F.indexOf(t)?"calc(".concat(t," * ").concat(.4,")"):null;return e?{fontSize:e}:{}},marginStyle:function(){var t=this.computedSize,e=this.bvAvatarGroup,n=e?e.overlapScale:0,i=t&&n?"calc(".concat(t," * -").concat(n,")"):null;return i?{marginLeft:i,marginRight:i}:{}},badgeStyle:function(){var t=this.computedSize,e=this.badgeTop,n=this.badgeLeft,i=this.badgeOffset||"0px";return{fontSize:-1===F.indexOf(t)?"calc(".concat(t," * ").concat(.27999999999999997," )"):null,top:e?i:null,bottom:e?null:i,left:n?i:null,right:n?null:i}}},watch:{src:function(t,e){t!==e&&(this.localSrc=t||null)}},methods:{onImgError:function(t){this.localSrc=null,this.$emit(a.rP,t)},onClick:function(t){this.$emit(a.PZ,t)}},render:function(t){var e,n=this.computedVariant,i=this.disabled,r=this.computedRounded,a=this.icon,o=this.localSrc,c=this.text,l=this.fontStyle,u=this.marginStyle,f=this.computedSize,h=this.button,g=this.buttonType,b=this.badge,v=this.badgeVariant,m=this.badgeStyle,y=!h&&(0,d.u$)(this),O=h?B.T:y?U.we:"span",j=this.alt,w=this.ariaLabel||null,T=null;this.hasNormalizedSlot()?T=t("span",{staticClass:"b-avatar-custom"},[this.normalizeSlot()]):o?(T=t("img",{style:n?{}:{width:"100%",height:"100%"},attrs:{src:o,alt:j},on:{error:this.onImgError}}),T=t("span",{staticClass:"b-avatar-img"},[T])):T=a?t(A,{props:{icon:a},attrs:{"aria-hidden":"true",alt:j}}):c?t("span",{staticClass:"b-avatar-text",style:l},[t("span",c)]):t(_,{attrs:{"aria-hidden":"true",alt:j}});var P=t(),S=this.hasNormalizedSlot(s.T_);if(b||""===b||S){var I=!0===b?"":b;P=t("span",{staticClass:"b-avatar-badge",class:V({},"badge-".concat(v),v),style:m},[S?this.normalizeSlot(s.T_):I])}return t(O,{staticClass:$,class:(e={},V(e,"".concat($,"-").concat(f),f&&-1!==F.indexOf(f)),V(e,"badge-".concat(n),!h&&n),V(e,"rounded",!0===r),V(e,"rounded-".concat(r),r&&!0!==r),V(e,"disabled",i),e),style:L(L({},u),{},{width:f,height:f}),attrs:{"aria-label":w||null},props:h?{variant:n,disabled:i,type:g}:y?(0,p.uj)(G,this):{},on:h||y?{click:this.onClick}:{}},[T,P])}})},7794:function(t,e,n){"use strict";n.d(e,{o:function(){return l}});var i=n(538),r=n(9558),a=n(4689),o=n(2299),s=n(451),c=(0,s.y2)({columns:(0,s.pi)(o.U5,!1),deck:(0,s.pi)(o.U5,!1),tag:(0,s.pi)(o.N0,"div")},a.CB),l=i.Z.extend({name:a.CB,functional:!0,props:c,render:function(t,e){var n=e.props,i=e.data,a=e.children;return t(n.tag,(0,r.b)(i,{class:n.deck?"card-deck":n.columns?"card-columns":"card-group"}),a)}})},7391:function(t,e,n){"use strict";n.d(e,{j:function(){return l}});var i=n(538),r=n(9558),a=n(4689),o=n(2299),s=n(451),c=(0,s.y2)({textTag:(0,s.pi)(o.N0,"p")},a.zv),l=i.Z.extend({name:a.zv,functional:!0,props:c,render:function(t,e){var n=e.props,i=e.data,a=e.children;return t(n.textTag,(0,r.b)(i,{staticClass:"card-text"}),a)}})},4424:function(t,e,n){"use strict";n.d(e,{N:function(){return h}});var i=n(538),r=n(9558),a=n(4689),o=n(2299),s=n(7040),c=n(451),l=n(4909);function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){d(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=(0,c.y2)((0,s.GE)(p(p({},l.N),{},{disabled:(0,c.pi)(o.U5,!1),formClass:(0,c.pi)(o.wA)})),a.n5),h=i.Z.extend({name:a.n5,functional:!0,props:f,render:function(t,e){var n=e.props,i=e.data,a=e.listeners,o=e.children;return t("li",(0,r.b)((0,s.CE)(i,["attrs","on"]),{attrs:{role:"presentation"}}),[t(l.e,{staticClass:"b-dropdown-form",class:[n.formClass,{disabled:n.disabled}],props:n,attrs:p(p({},i.attrs||{}),{},{disabled:n.disabled,tabindex:n.disabled?null:"-1"}),on:a,ref:"form"},o)])}})},1909:function(t,e,n){"use strict";n.d(e,{d:function(){return m}});var i=n(538),r=n(4689),a=n(3294),o=n(2299),s=n(3663),c=n(7040),l=n(451),u=n(3727),p=n(8280),d=n(6034),f=n(1451);function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){b(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v=(0,l.y2)((0,c.GE)(g(g({},u.N),{},{disabled:(0,l.pi)(o.U5,!1),noRemove:(0,l.pi)(o.U5,!1),pill:(0,l.pi)(o.U5,!1),removeLabel:(0,l.pi)(o.N0,"Remove tag"),tag:(0,l.pi)(o.N0,"span"),title:(0,l.pi)(o.N0),variant:(0,l.pi)(o.N0,"secondary")})),r.tT),m=i.Z.extend({name:r.tT,mixins:[u.t,p.Z],props:v,methods:{onRemove:function(t){var e=t.type,n=t.keyCode;this.disabled||"click"!==e&&("keydown"!==e||n!==s.oD)||this.$emit(a.qF)}},render:function(t){var e=this.title,n=this.tag,i=this.variant,r=this.pill,a=this.disabled,o=this.safeId(),s=this.safeId("_taglabel_"),c=t();this.noRemove||a||(c=t(f.Z,{staticClass:"b-form-tag-remove",props:{ariaLabel:this.removeLabel},attrs:{"aria-controls":o,"aria-describedby":s,"aria-keyshortcuts":"Delete"},on:{click:this.onRemove,keydown:this.onRemove}}));var l=t("span",{staticClass:"b-form-tag-content flex-grow-1 text-truncate",attrs:{id:s}},this.normalizeSlot()||e);return t(d.k,{staticClass:"b-form-tag d-inline-flex align-items-baseline mw-100",class:{disabled:a},props:{tag:n,variant:i,pill:r},attrs:{id:o,title:e||null,"aria-labelledby":s}},[l,c])}})},1605:function(t,e,n){"use strict";n.d(e,{D:function(){return q}});var i,r=n(538),a=n(4689),o=n(3294),s=n(3663),c=n(2299),l=n(824),u=n(494),p=n(1572),d=n(4679),f=n(6410),h=n(8415),g=n(8265),b=n(3284),v=n(3058),m=n(4602),y=n(7040),O=n(451),j=n(6595),w=n(2023),T=n(9035),P=n(5505),S=n(3727),I=n(8280),k=n(5193),x=n(2307),_=n(1666),C=n(1909);function D(t){return function(t){if(Array.isArray(t))return N(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return N(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function E(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function z(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?E(Object(n),!0).forEach((function(e){R(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function R(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var A=(0,m.l)("value",{type:c.aJ,defaultValue:[]}),B=A.mixin,U=A.props,H=A.prop,L=A.event,V=["text","email","tel","url","number"],$=[".b-form-tag","button","input","select"].join(" "),F=function(t){return(0,p.zo)(t).map((function(t){return(0,j.fy)((0,j.BB)(t))})).filter((function(t,e,n){return t.length>0&&n.indexOf(t)===e}))},G=function(t){return(0,b.HD)(t)?t:(0,b.cO)(t)&&t.target.value||""},Z=(0,O.y2)((0,y.GE)(z(z(z(z(z(z({},S.N),U),w.N),T.N),P.N),{},{addButtonText:(0,O.pi)(c.N0,"Add"),addButtonVariant:(0,O.pi)(c.N0,"outline-secondary"),addOnChange:(0,O.pi)(c.U5,!1),duplicateTagText:(0,O.pi)(c.N0,"Duplicate tag(s)"),ignoreInputFocusSelector:(0,O.pi)(c.Mu,$),inputAttrs:(0,O.pi)(c.aR,{}),inputClass:(0,O.pi)(c.wA),inputId:(0,O.pi)(c.N0),inputType:(0,O.pi)(c.N0,"text",(function(t){return(0,p.kI)(V,t)})),invalidTagText:(0,O.pi)(c.N0,"Invalid tag(s)"),limit:(0,O.pi)(c.jg),limitTagsText:(0,O.pi)(c.N0,"Tag limit reached"),noAddOnEnter:(0,O.pi)(c.U5,!1),noOuterFocus:(0,O.pi)(c.U5,!1),noTagRemove:(0,O.pi)(c.U5,!1),placeholder:(0,O.pi)(c.N0,"Add tag..."),removeOnDelete:(0,O.pi)(c.U5,!1),separator:(0,O.pi)(c.Mu),tagClass:(0,O.pi)(c.wA),tagPills:(0,O.pi)(c.U5,!1),tagRemoveLabel:(0,O.pi)(c.N0,"Remove tag"),tagRemovedLabel:(0,O.pi)(c.N0,"Tag removed"),tagValidator:(0,O.pi)(c.Sx),tagVariant:(0,O.pi)(c.N0,"secondary")})),a.bu),q=r.Z.extend({name:a.bu,mixins:[S.t,B,w.X,T.j,P.J,I.Z],props:Z,data:function(){return{hasFocus:!1,newTag:"",tags:[],removedTags:[],tagsState:{all:[],valid:[],invalid:[],duplicate:[]}}},computed:{computedInputId:function(){return this.inputId||this.safeId("__input__")},computedInputType:function(){return(0,p.kI)(V,this.inputType)?this.inputType:"text"},computedInputAttrs:function(){var t=this.disabled,e=this.form;return z(z({},this.inputAttrs),{},{id:this.computedInputId,value:this.newTag,disabled:t,form:e})},computedInputHandlers:function(){return{input:this.onInputInput,change:this.onInputChange,keydown:this.onInputKeydown,reset:this.reset}},computedSeparator:function(){return(0,p.zo)(this.separator).filter(b.HD).filter(g.y).join("")},computedSeparatorRegExp:function(){var t,e=this.computedSeparator;return e?new RegExp("[".concat((t=e,(0,j.hr)(t).replace(l.Gt,"\\s")),"]+")):null},computedJoiner:function(){var t=this.computedSeparator.charAt(0);return" "!==t?"".concat(t," "):t},computeIgnoreInputFocusSelector:function(){return(0,p.zo)(this.ignoreInputFocusSelector).filter(g.y).join(",").trim()},disableAddButton:function(){var t=this,e=(0,j.fy)(this.newTag);return""===e||!this.splitTags(e).some((function(e){return!(0,p.kI)(t.tags,e)&&t.validateTag(e)}))},duplicateTags:function(){return this.tagsState.duplicate},hasDuplicateTags:function(){return this.duplicateTags.length>0},invalidTags:function(){return this.tagsState.invalid},hasInvalidTags:function(){return this.invalidTags.length>0},isLimitReached:function(){var t=this.limit;return(0,b.hj)(t)&&t>=0&&this.tags.length>=t}},watch:(i={},R(i,H,(function(t){this.tags=F(t)})),R(i,"tags",(function(t,e){(0,v.W)(t,this[H])||this.$emit(L,t),(0,v.W)(t,e)||(t=(0,p.zo)(t).filter(g.y),e=(0,p.zo)(e).filter(g.y),this.removedTags=e.filter((function(e){return!(0,p.kI)(t,e)})))})),R(i,"tagsState",(function(t,e){(0,v.W)(t,e)||this.$emit(o.Ol,t.valid,t.invalid,t.duplicate)})),i),created:function(){this.tags=F(this[H])},mounted:function(){var t=this,e=(0,f.oq)("form",this.$el);e&&((0,h.XO)(e,"reset",this.reset,o.SH),this.$on(o.vl,(function(){(0,h.QY)(e,"reset",t.reset,o.SH)})))},methods:{addTag:function(t){if(t=(0,b.HD)(t)?t:this.newTag,!this.disabled&&""!==(0,j.fy)(t)&&!this.isLimitReached){var e=this.parseTags(t);if(e.valid.length>0||0===e.all.length)if((0,f.wB)(this.getInput(),"select"))this.newTag="";else{var n=[].concat(D(e.invalid),D(e.duplicate));this.newTag=e.all.filter((function(t){return(0,p.kI)(n,t)})).join(this.computedJoiner).concat(n.length>0?this.computedJoiner.charAt(0):"")}e.valid.length>0&&(this.tags=(0,p.zo)(this.tags,e.valid)),this.tagsState=e,this.focus()}},removeTag:function(t){var e=this;this.disabled||(this.tags=this.tags.filter((function(e){return e!==t})),this.$nextTick((function(){e.focus()})))},reset:function(){var t=this;this.newTag="",this.tags=[],this.$nextTick((function(){t.removedTags=[],t.tagsState={all:[],valid:[],invalid:[],duplicate:[]}}))},onInputInput:function(t){if(!(this.disabled||(0,b.cO)(t)&&t.target.composing)){var e=G(t),n=this.computedSeparatorRegExp;this.newTag!==e&&(this.newTag=e),e=(0,j.fi)(e),n&&n.test(e.slice(-1))?this.addTag():this.tagsState=""===e?{all:[],valid:[],invalid:[],duplicate:[]}:this.parseTags(e)}},onInputChange:function(t){if(!this.disabled&&this.addOnChange){var e=G(t);this.newTag!==e&&(this.newTag=e),this.addTag()}},onInputKeydown:function(t){if(!this.disabled&&(0,b.cO)(t)){var e=t.keyCode,n=t.target.value||"";this.noAddOnEnter||e!==s.K2?!this.removeOnDelete||e!==s.d1&&e!==s.oD||""!==n||((0,h.p7)(t,{propagation:!1}),this.tags=this.tags.slice(0,-1)):((0,h.p7)(t,{propagation:!1}),this.addTag())}},onClick:function(t){var e=this,n=this.computeIgnoreInputFocusSelector,i=t.target;this.disabled||(0,f.H9)(i)||n&&(0,f.oq)(n,i,!0)||this.$nextTick((function(){e.focus()}))},onFocusin:function(){this.hasFocus=!0},onFocusout:function(){this.hasFocus=!1},handleAutofocus:function(){var t=this;this.$nextTick((function(){(0,f.bz)((function(){t.autofocus&&!t.disabled&&t.focus()}))}))},focus:function(){this.disabled||(0,f.KS)(this.getInput())},blur:function(){this.disabled||(0,f.Cx)(this.getInput())},splitTags:function(t){t=(0,j.BB)(t);var e=this.computedSeparatorRegExp;return(e?t.split(e):[t]).map(j.fy).filter(g.y)},parseTags:function(t){var e=this,n=this.splitTags(t),i={all:n,valid:[],invalid:[],duplicate:[]};return n.forEach((function(t){(0,p.kI)(e.tags,t)||(0,p.kI)(i.valid,t)?(0,p.kI)(i.duplicate,t)||i.duplicate.push(t):e.validateTag(t)?i.valid.push(t):(0,p.kI)(i.invalid,t)||i.invalid.push(t)})),i},validateTag:function(t){var e=this.tagValidator;return!(0,O.lo)(e)||e(t)},getInput:function(){return(0,f.Ys)("#".concat((0,d.Q)(this.computedInputId)),this.$el)},defaultRender:function(t){var e=t.addButtonText,n=t.addButtonVariant,i=t.addTag,r=t.disableAddButton,a=t.disabled,o=t.duplicateTagText,s=t.inputAttrs,c=t.inputClass,l=t.inputHandlers,p=t.inputType,d=t.invalidTagText,f=t.isDuplicate,h=t.isInvalid,b=t.isLimitReached,v=t.limitTagsText,m=t.noTagRemove,y=t.placeholder,O=t.removeTag,w=t.tagClass,T=t.tagPills,P=t.tagRemoveLabel,S=t.tagVariant,I=t.tags,D=this.$createElement,N=I.map((function(t){return t=(0,j.BB)(t),D(C.d,{class:w,props:{disabled:a,noRemove:m,pill:T,removeLabel:P,tag:"li",title:t,variant:S},on:{remove:function(){return O(t)}},key:"tags_".concat(t)},t)})),E=d&&h?this.safeId("__invalid_feedback__"):null,R=o&&f?this.safeId("__duplicate_feedback__"):null,A=v&&b?this.safeId("__limit_feedback__"):null,B=[s["aria-describedby"],E,R,A].filter(g.y).join(" "),U=D("input",{staticClass:"b-form-tags-input w-100 flex-grow-1 p-0 m-0 bg-transparent border-0",class:c,style:{outline:0,minWidth:"5rem"},attrs:z(z({},s),{},{"aria-describedby":B||null,type:p,placeholder:y||null}),domProps:{value:s.value},on:l,directives:[{name:"model",value:s.value}],ref:"input"}),H=D(k.T,{staticClass:"b-form-tags-button py-0",class:{invisible:r},style:{fontSize:"90%"},props:{disabled:r||b,variant:n},on:{click:function(){return i()}},ref:"button"},[this.normalizeSlot(u.iV)||e]),L=this.safeId("__tag_list__"),V=D("li",{staticClass:"b-from-tags-field flex-grow-1",attrs:{role:"none","aria-live":"off","aria-controls":L},key:"tags_field"},[D("div",{staticClass:"d-flex",attrs:{role:"group"}},[U,H])]),$=D("ul",{staticClass:"b-form-tags-list list-unstyled mb-0 d-flex flex-wrap align-items-center",attrs:{id:L},key:"tags_list"},[N,V]),F=D();if(d||o||v){var G=this.computedJoiner,Z=D();E&&(Z=D(x.h,{props:{id:E,forceShow:!0},key:"tags_invalid_feedback"},[this.invalidTagText,": ",this.invalidTags.join(G)]));var q=D();R&&(q=D(_.m,{props:{id:R},key:"tags_duplicate_feedback"},[this.duplicateTagText,": ",this.duplicateTags.join(G)]));var J=D();A&&(J=D(_.m,{props:{id:A},key:"tags_limit_feedback"},[v])),F=D("div",{attrs:{"aria-live":"polite","aria-atomic":"true"},key:"tags_feedback"},[Z,q,J])}return[$,F]}},render:function(t){var e=this.name,n=this.disabled,i=this.required,r=this.form,a=this.tags,o=this.computedInputId,s=this.hasFocus,c=this.noOuterFocus,l=z({tags:a.slice(),inputAttrs:this.computedInputAttrs,inputType:this.computedInputType,inputHandlers:this.computedInputHandlers,removeTag:this.removeTag,addTag:this.addTag,reset:this.reset,inputId:o,isInvalid:this.hasInvalidTags,invalidTags:this.invalidTags.slice(),isDuplicate:this.hasDuplicateTags,duplicateTags:this.duplicateTags.slice(),isLimitReached:this.isLimitReached,disableAddButton:this.disableAddButton},(0,y.ei)(this.$props,["addButtonText","addButtonVariant","disabled","duplicateTagText","form","inputClass","invalidTagText","limit","limitTagsText","noTagRemove","placeholder","required","separator","size","state","tagClass","tagPills","tagRemoveLabel","tagVariant"])),p=this.normalizeSlot(u.Pq,l)||this.defaultRender(l),d=t("output",{staticClass:"sr-only",attrs:{id:this.safeId("__selected_tags__"),role:"status",for:o,"aria-live":s?"polite":"off","aria-atomic":"true","aria-relevant":"additions text"}},this.tags.join(", ")),f=t("div",{staticClass:"sr-only",attrs:{id:this.safeId("__removed_tags__"),role:"status","aria-live":s?"assertive":"off","aria-atomic":"true"}},this.removedTags.length>0?"(".concat(this.tagRemovedLabel,") ").concat(this.removedTags.join(", ")):""),h=t();if(e&&!n){var g=a.length>0;h=(g?a:[""]).map((function(n){return t("input",{class:{"sr-only":!g},attrs:{type:g?"hidden":"text",value:n,required:i,name:e,form:r},key:"tag_input_".concat(n)})}))}return t("div",{staticClass:"b-form-tags form-control h-auto",class:[{focus:s&&!c&&!n,disabled:n},this.sizeFormClass,this.stateClass],attrs:{id:this.safeId(),role:"group",tabindex:n||c?null:"-1","aria-describedby":this.safeId("__selected_tags__")},on:{click:this.onClick,focusin:this.onFocusin,focusout:this.onFocusout}},[d,f,p,h])}})},6253:function(t,e,n){"use strict";n.d(e,{T:function(){return O}});var i=n(9558),r=n(4689),a=n(2299),o=n(1572),s=n(6542),c=n(8265),l=n(1051),u=n(7040),p=n(451),d=n(6595);function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b=["start","end","center"],v=(0,l.H)((function(t,e){return(e=(0,d.fy)((0,d.BB)(e)))?(0,d.vl)(["row-cols",t,e].filter(c.y).join("-")):null})),m=(0,l.H)((function(t){return(0,d.vl)(t.replace("cols",""))})),y=[],O={name:r.tt,functional:!0,get props(){var t;return delete this.props,this.props=(t=(0,s.QC)().reduce((function(t,e){return t[(0,p.wv)(e,"cols")]=(0,p.pi)(a.fE),t}),(0,u.Ue)(null)),y=(0,u.XP)(t),(0,p.y2)((0,u.GE)(h(h({},t),{},{alignContent:(0,p.pi)(a.N0,null,(function(t){return(0,o.kI)((0,o.zo)(b,"between","around","stretch"),t)})),alignH:(0,p.pi)(a.N0,null,(function(t){return(0,o.kI)((0,o.zo)(b,"between","around"),t)})),alignV:(0,p.pi)(a.N0,null,(function(t){return(0,o.kI)((0,o.zo)(b,"baseline","stretch"),t)})),noGutters:(0,p.pi)(a.U5,!1),tag:(0,p.pi)(a.N0,"div")})),r.tt)),this.props},render:function(t,e){var n,r=e.props,a=e.data,o=e.children,s=r.alignV,c=r.alignH,l=r.alignContent,u=[];return y.forEach((function(t){var e=v(m(t),r[t]);e&&u.push(e)})),u.push((g(n={"no-gutters":r.noGutters},"align-items-".concat(s),s),g(n,"justify-content-".concat(c),c),g(n,"align-content-".concat(l),l),n)),t(r.tag,(0,i.b)(a,{staticClass:"row",class:u}),o)}}},8367:function(t,e,n){"use strict";n.d(e,{f:function(){return y}});var i=n(538),r=n(9558),a=n(4689),o=n(2299),s=n(1572),c=n(6410),l=n(7040),u=n(451),p=n(488),d=n(7347);function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b=["a","router-link","button","b-link"],v=(0,l.CE)(d.NQ,["event","routerTag"]);delete v.href.default,delete v.to.default;var m=(0,u.y2)((0,l.GE)(h(h({},v),{},{action:(0,u.pi)(o.U5,!1),button:(0,u.pi)(o.U5,!1),tag:(0,u.pi)(o.N0,"div"),variant:(0,u.pi)(o.N0)})),a.KT),y=i.Z.extend({name:a.KT,functional:!0,props:m,render:function(t,e){var n,i=e.props,a=e.data,o=e.children,l=i.button,f=i.variant,h=i.active,m=i.disabled,y=(0,p.u$)(i),O=l?"button":y?d.we:i.tag,j=!!(i.action||y||l||(0,s.kI)(b,i.tag)),w={},T={};return(0,c.YR)(O,"button")?(a.attrs&&a.attrs.type||(w.type="button"),i.disabled&&(w.disabled=!0)):T=(0,u.uj)(v,i),t(O,(0,r.b)(a,{attrs:w,props:T,staticClass:"list-group-item",class:(n={},g(n,"list-group-item-".concat(f),f),g(n,"list-group-item-action",j),g(n,"active",h),g(n,"disabled",m),n)}),o)}})},322:function(t,e,n){"use strict";n.d(e,{N:function(){return u}});var i=n(538),r=n(9558),a=n(4689),o=n(2299),s=n(3284),c=n(451);var l=(0,c.y2)({flush:(0,c.pi)(o.U5,!1),horizontal:(0,c.pi)(o.gL,!1),tag:(0,c.pi)(o.N0,"div")},a.DX),u=i.Z.extend({name:a.DX,functional:!0,props:l,render:function(t,e){var n=e.props,i=e.data,a=e.children,o=""===n.horizontal||n.horizontal;o=!n.flush&&o;var c,l,u,p={staticClass:"list-group",class:(c={"list-group-flush":n.flush,"list-group-horizontal":!0===o},l="list-group-horizontal-".concat(o),u=(0,s.HD)(o),l in c?Object.defineProperty(c,l,{value:u,enumerable:!0,configurable:!0,writable:!0}):c[l]=u,c)};return t(n.tag,(0,r.b)(i,p),a)}})}}]);