import{E as b,as as T,at as k,h as C,r as l,o as S,au as $,x as M,B as q,C as h,ae as t,av as V,aw as z,aj as a,j as i,ax as o,ay as H,az as w,ad as N}from"./index.199a5e3f.js";import{Q}from"./QForm.fdbdeff7.js";import{Q as P}from"./QPage.2ef07c91.js";import{l as y}from"./index.1757aa92.js";import{url as B}from"./axios.afd0666a.js";import{u as F}from"./auth-store.73aa5676.js";import{u as L}from"./setting-store.40679274.js";import{u as j}from"./vue-i18n.runtime.bdb4f456.js";const D='<g><path fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10" d="M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"></path><clipPath id="uil-hourglass-clip1"><rect x="15" y="20" width="70" height="25"><animate attributeName="height" from="25" to="0" dur="1s" repeatCount="indefinite" values="25;0;0" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="20" to="45" dur="1s" repeatCount="indefinite" values="20;45;45" keyTimes="0;0.5;1"></animate></rect></clipPath><clipPath id="uil-hourglass-clip2"><rect x="15" y="55" width="70" height="25"><animate attributeName="height" from="0" to="25" dur="1s" repeatCount="indefinite" values="0;25;25" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="80" to="55" dur="1s" repeatCount="indefinite" values="80;55;55" keyTimes="0;0.5;1"></animate></rect></clipPath><path d="M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z" clip-path="url(#uil-hourglass-clip1)" fill="currentColor"></path><path d="M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z" clip-path="url(#uil-hourglass-clip2)" fill="currentColor"></path><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="180 50 50" repeatCount="indefinite" dur="1s" values="0 50 50;0 50 50;180 50 50" keyTimes="0;0.7;1"></animateTransform></g>';var E=b({name:"QSpinnerHourglass",props:T,setup(g){const{cSize:s,classes:d}=k(g);return()=>C("svg",{class:d.value,width:s.value,height:s.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg",innerHTML:D})}});const R={class:"row justify-center q-my-sm"},A=["src"],I={class:"text-h5 text-bold text-center q-mb-lg"},U={class:"row justify-center"},Y={class:"col-sm-8 col-xs-11"},G={for:"email"},J={class:"text-red"},K={class:"col-sm-8 col-xs-11"},O={for:"password"},W={class:"text-red"},X={class:"col-sm-8 col-xs-11 q-mt-sm"},Z={class:"q-mt-lg text-center text-grey-7",style:{"font-size":"11px"}},ee={href:"#",target:"_blank",rel:"noopener noreferrer",class:"text-link text-primary"},te={href:"#",target:"_blank",rel:"noopener noreferrer",class:"text-link text-primary"},ae={href:"#",target:"_blank",rel:"noopener noreferrer",class:"text-link text-primary"},me={__name:"LoginPage",setup(g){const{t:s}=j(),d=l(!0),n=l({}),x=async()=>{try{const e=await L().show(1);n.value=e.data.data,d.value=!1}catch(e){console.error("Error fetching data:",e)}};S(()=>{x()});const m=l(""),c=l(""),f={email:[e=>!!e||s("auth.validate.emailRequired"),e=>/.+@.+/.test(e)||s("auth.validate.emailFormat")],password:[e=>!!e||s("auth.validate.passwordRequired"),e=>e.length>=8||s("auth.validate.passwordMinLength")]},u=l(!1),v=async()=>{u.value=!0;try{await F().login(m.value,c.value),y.success(s("auth.successLoginMsg")),window.location.reload()}catch(e){console.error("Error submitting form:",e),y.error(s("auth.failedLoginMsg"))}u.value=!1};return(e,r)=>{const _=$("lowercase");return M(),q(P,{class:"flex flex-center"},{default:h(()=>[t("div",null,[t("div",R,[t("img",{src:V(B)+"/settings/"+n.value.logo,style:z("width:"+n.value.logo_size+"px")},null,12,A)]),t("div",I,a(e.$t("auth.welcomeMsg"))+" "+a(n.value.title),1),i(Q,{onSubmit:v},{default:h(()=>[t("div",U,[t("div",Y,[t("label",G,[o(a(e.$t("auth.emailForm"))+" ",1),t("span",J,a(e.$t("public.requiredText")),1)]),H(i(w,{type:"email",modelValue:m.value,"onUpdate:modelValue":r[0]||(r[0]=p=>m.value=p),placeholder:"email@example.com",rules:f.email,outlined:"",dense:""},null,8,["modelValue","rules"]),[[_]])]),t("div",K,[t("label",O,[o(a(e.$t("auth.passwordForm"))+" ",1),t("span",W,a(e.$t("public.requiredText")),1)]),i(w,{type:"password",modelValue:c.value,"onUpdate:modelValue":r[1]||(r[1]=p=>c.value=p),placeholder:"********",rules:f.password,outlined:"",dense:""},null,8,["modelValue","rules"])]),t("div",X,[i(N,{type:"submit",color:"primary",label:e.$t("auth.loginText"),class:"full-width q-mt-sm",loading:u.value,disable:u.value,onClick:v},{loading:h(()=>[i(E,{class:"on-left"}),o(" "+a(e.$t("public.loadingText")),1)]),_:1},8,["label","loading","disable"])])])]),_:1}),t("div",Z,[t("div",null,a(e.$t("auth.permissionText1")),1),t("div",null,[t("a",ee,a(e.$t("auth.termsText")),1),o(" "+a(e.$t("auth.permissionText2")),1)]),t("div",null,[t("a",te,a(e.$t("auth.privacyText")),1),r[2]||(r[2]=o(" . ")),t("a",ae,a(e.$t("auth.noticeText")),1),r[3]||(r[3]=o(" . "))])])])]),_:1})}}};export{me as default};
