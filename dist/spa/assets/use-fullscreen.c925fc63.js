import{r as v,ao as F,w as f,ap as y,o as h,N as x,g as b,aq as p}from"./index.199a5e3f.js";let o=0;const g={fullscreen:Boolean,noRouteFullscreenExit:Boolean},E=["update:fullscreen","fullscreen"];function w(){const d=b(),{props:s,emit:m,proxy:e}=d;let n,u,a;const l=v(!1);F(d)===!0&&f(()=>e.$route.fullPath,()=>{s.noRouteFullscreenExit!==!0&&t()}),f(()=>s.fullscreen,r=>{l.value!==r&&c()}),f(l,r=>{m("update:fullscreen",r),m("fullscreen",r)});function c(){l.value===!0?t():i()}function i(){l.value!==!0&&(l.value=!0,a=e.$el.parentNode,a.replaceChild(u,e.$el),document.body.appendChild(e.$el),o++,o===1&&document.body.classList.add("q-body--fullscreen-mixin"),n={handler:t},p.add(n))}function t(){l.value===!0&&(n!==void 0&&(p.remove(n),n=void 0),a.replaceChild(e.$el,u),l.value=!1,o=Math.max(0,o-1),o===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),e.$el.scrollIntoView!==void 0&&setTimeout(()=>{e.$el.scrollIntoView()})))}return y(()=>{u=document.createElement("span")}),h(()=>{s.fullscreen===!0&&i()}),x(t),Object.assign(e,{toggleFullscreen:c,setFullscreen:i,exitFullscreen:t}),{inFullscreen:l,toggleFullscreen:c}}export{E as a,w as b,g as u};
