(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{I3XD:function(t,e,a){"use strict";var s=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"spinner-border estafette-spinner",class:this._f("bootstrapClass")(this.color,"text"),attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[this._v("Loading...")])])};s._withStripped=!0;var i={props:{color:{type:String,default:null}}},n=a("KHd+"),r=Object(n.a)(i,s,[],!1,null,null,null);r.options.__file="src/components/Spinner.vue";e.a=r.exports},XB7O:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-form",{staticClass:"rounded border bg-white p-3",attrs:{autocomplete:"off"},on:{submit:t.onSubmit}},[a("b-form-group",{attrs:{label:"Template","label-for":"template-select"}},[t.templatesOptions.length>0?a("b-form-select",{staticClass:"border-primary text-primary",attrs:{id:"template-select",options:t.templatesOptions},on:{change:t.setTemplate},model:{value:t.form.template,callback:function(e){t.$set(t.form,"template",e)},expression:"form.template"}}):t._e()],1),t._v(" "),t._l(t.placeholders,(function(e){return a("div",{key:e.name,staticClass:"mt-3"},[a("b-form-group",{attrs:{label:t._f("splitCamelcase")(e.name),"label-for":"placeholder-"+e.name}},[a("b-form-input",{attrs:{id:"placeholder-"+e.name,type:"text",placeholder:"Enter "+t.$options.filters.splitCamelcase(e.name)},model:{value:t.form.placeholders[e.name],callback:function(a){t.$set(t.form.placeholders,e.name,a)},expression:"form.placeholders[placeholder.name]"}})],1)],1)})),t._v(" "),t.form.template?a("b-button",{staticClass:"mt-3",attrs:{type:"submit",variant:"primary"}},[t._v("\n      Generate\n    ")]):t._e()],2),t._v(" "),t.generating?a("div",[a("spinner",{attrs:{color:"secondary"}})],1):t._e(),t._v(" "),t.manifest?a("div",{staticClass:"mt-4"},[a("h5",[t._v("Manifest")]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"pre-wrapper"},[a("pre",{staticClass:"bg-light p-3"},[a("code",[t._v(t._s(t.manifest))])]),t._v(" "),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.click",modifiers:{click:!0}}],staticClass:"btn-clipboard",attrs:{title:"Copied!"},on:{click:t.copy}},[t._v("\n        Copy\n      ")])],1)]):t._e()],1)};s._withStripped=!0;var i=a("I3XD"),n=a("Ed67"),r=a("g2Gq"),o=a("R5cT"),l=a("giZP"),c=a("GUe+"),p=a("tK4P"),m={components:{Spinner:i.a,BForm:n.a,BFormSelect:r.a,BFormInput:o.a,BFormGroup:l.a,BButton:c.a},directives:{BTooltip:p.a},props:{query:{type:Object,default:null}},data:function(){return{form:{template:null,placeholders:{}},templates:null,templatesOptions:[],placeholders:[],manifest:null,generating:!1,refresh:!0}},created:function(){this.loadTemplates()},methods:{copy:function(){var t=document.createElement("textarea");t.value=this.manifest,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)},loadTemplates:function(){var t=this;this.axios.get("/api/manifest/templates").then((function(e){t.templates=e.data.templates;var a=[{value:null,text:"Please select a template"}];t.templates.forEach((function(t){a.push({value:t.template,text:t.template})})),t.templatesOptions=a})).catch((function(e){t.periodicallyRefreshTemplates(30)}))},setTemplate:function(t){var e=this.templates.find((function(e){return e.template===t}));if(e){var a=[];e.placeholders.forEach((function(t){a.push({name:t})})),this.placeholders=a,this.manifest=null}},onSubmit:function(t){var e=this;t.preventDefault(),this.generating=!0,this.manifest=null,this.axios.post("/api/manifest/generate",this.form).then((function(t){e.generating=!1,e.manifest=t.data.manifest})).catch((function(t){e.generating=!1,console.warn(t)}))}},beforeDestroy:function(){this.refresh=!1,this.refreshTimeout&&clearTimeout(this.refreshTimeout)}},u=a("KHd+"),f=Object(u.a)(m,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Store the content below in file "),e("code",[this._v(".estafette.yaml")]),this._v(" in the root of your application repository, add it to git and push it to the origin and Estafette CI will automatically build your application, regardless of which branch you push.")])}],!1,null,null,null);f.options.__file="src/views/ManifestGenerator.vue";e.default=f.exports},wcEu:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-form",{staticClass:"rounded border bg-white p-3",attrs:{autocomplete:"off"},on:{submit:t.onSubmit}},[a("b-form-group",{attrs:{label:"Manifest","label-for":"manifest"}},[a("b-form-textarea",{staticClass:"border bg-light",class:t._f("bootstrapClass")(t.status,"border"),attrs:{id:"manifest",placeholder:"Paste your manifest",rows:25},model:{value:t.form.manifest,callback:function(e){t.$set(t.form,"manifest",e)},expression:"form.manifest"}})],1),t._v(" "),a("b-button",{staticClass:"mt-3",attrs:{type:"submit",variant:"primary"}},[t._v("\n      Validate\n    ")])],1),t._v(" "),t.validating?a("div",[a("spinner",{attrs:{color:"secondary"}})],1):t._e(),t._v(" "),"succeeded"==t.status?a("div",{staticClass:"mt-4"},[a("h5",{staticClass:"text-success"},[t._v("\n      Your manifest is valid!\n    ")]),t._v(" "),t._m(0)]):t._e(),t._v(" "),"failed"==t.status?a("div",{staticClass:"mt-4"},[a("h5",{staticClass:"text-danger"},[t._v("\n      Validation errors\n    ")]),t._v(" "),a("p",[t._v("Please address the following errors and validate again!")]),t._v(" "),a("pre",{staticClass:"bg-light border-danger p-3"},[a("code",[t._v(t._s(t.errors))])])]):t._e()],1)};s._withStripped=!0;var i=a("I3XD"),n=a("Ed67"),r=a("nH37"),o=a("giZP"),l=a("GUe+"),c={components:{Spinner:i.a,BForm:n.a,BFormTextarea:r.a,BFormGroup:o.a,BButton:l.a},data:function(){return{form:{manifest:null},validating:!1,status:"secondary",errors:null}},methods:{onSubmit:function(t){var e=this;t.preventDefault(),this.validating=!0,this.axios.post("/api/manifest/validate",this.form).then((function(t){e.validating=!1,e.status=t.data.status,e.errors=t.data.errors,window.scrollTo(0,document.body.scrollHeight)})).catch((function(t){e.validating=!1}))}}},p=a("KHd+"),m=Object(p.a)(c,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Store the manifest in file "),e("code",[this._v(".estafette.yaml")]),this._v(" in the root of your application repository.")])}],!1,null,null,null);m.options.__file="src/views/ManifestValidator.vue";e.default=m.exports}}]);