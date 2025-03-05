import{E as B,c as i,h as r,J as m,b2 as q,b3 as I,r as h,b4 as V,b5 as x,w as v,o as M,ai as O,ad as d,g as P,aJ as _}from"./index.199a5e3f.js";import{Q as j}from"./QMenu.7c4a117a.js";var R=B({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:a}){const t=i(()=>{const o=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(l=>e[l]===!0).map(l=>`q-btn-group--${l}`).join(" ");return`q-btn-group row no-wrap${o.length!==0?" "+o:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>r("div",{class:t.value},m(a.default))}});const $=Object.keys(q);function L(e){return $.reduce((a,t)=>{const o=e[t];return o!==void 0&&(a[t]=o),a},{})}var J=B({name:"QBtnDropdown",props:{...q,...I,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:a,emit:t}){const{proxy:o}=P(),l=h(e.modelValue),u=h(null),c=V(),f=i(()=>{const n={"aria-expanded":l.value===!0?"true":"false","aria-haspopup":"true","aria-controls":c.value,"aria-label":e.toggleAriaLabel||o.$q.lang.label[l.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(n["aria-disabled"]="true"),n}),S=i(()=>"q-btn-dropdown__arrow"+(l.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),b=i(()=>x(e)),w=i(()=>L(e));v(()=>e.modelValue,n=>{u.value!==null&&u.value[n?"show":"hide"]()}),v(()=>e.split,s);function C(n){l.value=!0,t("beforeShow",n)}function y(n){t("show",n),t("update:modelValue",!0)}function A(n){l.value=!1,t("beforeHide",n)}function D(n){t("hide",n),t("update:modelValue",!1)}function Q(n){t("click",n)}function k(n){_(n),s(),t("click",n)}function H(n){u.value!==null&&u.value.toggle(n)}function g(n){u.value!==null&&u.value.show(n)}function s(n){u.value!==null&&u.value.hide(n)}return Object.assign(o,{show:g,hide:s,toggle:H}),M(()=>{e.modelValue===!0&&g()}),()=>{const n=[r(O,{class:S.value,name:e.dropdownIcon||o.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&n.push(r(j,{ref:u,id:c.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:C,onShow:y,onBeforeHide:A,onHide:D},a.default)),e.split===!1?r(d,{class:"q-btn-dropdown q-btn-dropdown--simple",...w.value,...f.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:Q},{default:()=>m(a.label,[]).concat(n),loading:a.loading}):r(R,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...b.value,glossy:e.glossy,stretch:e.stretch},()=>[r(d,{class:"q-btn-dropdown--current",...w.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:k},{default:a.label,loading:a.loading}),r(d,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...f.value,...b.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>n)])}}});export{J as Q};
