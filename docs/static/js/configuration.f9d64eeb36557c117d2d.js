(self.webpackChunkestafette_ci_web=self.webpackChunkestafette_ci_web||[]).push([[639],{1247:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.user&&e.user.active?r("div",[e.credentials?r("pre",{staticClass:"rounded border bg-white p-3"},[r("code",{staticClass:"bg-white"},[e._v(e._s(e.credentials))])]):e._e()]):e._e()};function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}i._withStripped=!0;var s={data:function(){return{credentials:null,refresh:!0}},created:function(){this.loadConfig()},methods:{loadConfig:function(){var e=this;this.axios.get("/api/config/credentials").then((function(t){e.credentials=t.data.config,e.periodicallyRefreshConfig(60)})).catch((function(t){e.periodicallyRefreshConfig(120)}))},periodicallyRefreshConfig:function(e){this.refreshTimeout&&clearTimeout(this.refreshTimeout);var t=1e3*e*.75,r=1e3*e*1.25,i=Math.floor(Math.random()*(t-r+1)+r);this.refresh&&(this.refreshTimeout=setTimeout(this.loadConfig,i))}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},(0,r(629).rn)("user",{user:"me"})),beforeDestroy:function(){this.refresh=!1,this.refreshTimeout&&clearTimeout(this.refreshTimeout)}},c=(0,r(1900).Z)(s,i,[],!1,null,null,null);c.options.__file="src/views/ConfigurationCredentials.vue";var u=c.exports},8101:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return u}});var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.user&&e.user.active?r("div",[e.trustedimages?r("pre",{staticClass:"rounded border bg-white p-3"},[r("code",{staticClass:"bg-white"},[e._v(e._s(e.trustedimages))])]):e._e()]):e._e()};function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}i._withStripped=!0;var s={data:function(){return{trustedimages:null,refresh:!0}},created:function(){this.loadConfig()},methods:{loadConfig:function(){var e=this;this.axios.get("/api/config/trustedimages").then((function(t){e.trustedimages=t.data.config})).catch((function(t){e.periodicallyRefreshConfig(120)}))},periodicallyRefreshConfig:function(e){this.refreshTimeout&&clearTimeout(this.refreshTimeout);var t=1e3*e*.75,r=1e3*e*1.25,i=Math.floor(Math.random()*(t-r+1)+r);this.refresh&&(this.refreshTimeout=setTimeout(this.loadConfig,i))}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},(0,r(629).rn)("user",{user:"me"})),beforeDestroy:function(){this.refresh=!1,this.refreshTimeout&&clearTimeout(this.refreshTimeout)}},c=(0,r(1900).Z)(s,i,[],!1,null,null,null);c.options.__file="src/views/ConfigurationTrustedImages.vue";var u=c.exports}}]);