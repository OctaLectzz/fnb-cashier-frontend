import{r as i,o as y,as as b,x as q,B as $,C as d,j as l,a5 as t,at as T,au as k,aa as s,av as r,aw as Q,ax as g,a4 as V,a7 as S}from"./index.4b455d6d.js";import{Q as B}from"./QSpinnerHourglass.4b5f451e.js";import{Q as F}from"./QForm.9927cc01.js";import{Q as M}from"./QPage.588b5698.js";import{l as v}from"./index.820023a3.js";import{url as C}from"./axios.7d27b938.js";import{u as L}from"./auth-store.e16424b4.js";import{u as j}from"./setting-store.0b7772ac.js";import{u as z}from"./vue-i18n.runtime.f1e77c75.js";const D={class:"row justify-center q-my-sm"},N=["src"],E={class:"text-h5 text-bold text-center q-mb-lg"},I={class:"row justify-center"},P={class:"col-sm-8 col-xs-11"},R={for:"email"},U={class:"text-red"},A={class:"col-sm-8 col-xs-11"},H={for:"password"},G={class:"text-red"},J={class:"col-sm-8 col-xs-11 q-mt-sm"},K={class:"q-mt-lg text-center text-grey-7",style:{"font-size":"11px"}},O={href:"#",target:"_blank",rel:"noopener noreferrer",class:"text-link text-primary"},W={href:"#",target:"_blank",rel:"noopener noreferrer",class:"text-link text-primary"},X={href:"#",target:"_blank",rel:"noopener noreferrer",class:"text-link text-primary"},ne={__name:"LoginPage",setup(Y){const{t:o}=z(),_=i(!0),n=i({}),x=async()=>{try{const e=await j().show(1);n.value=e.data.data,_.value=!1}catch(e){console.error("Error fetching data:",e)}};y(()=>{x()});const c=i(""),m=i(""),h={email:[e=>!!e||o("auth.validate.emailRequired"),e=>/.+@.+/.test(e)||o("auth.validate.emailFormat")],password:[e=>!!e||o("auth.validate.passwordRequired"),e=>e.length>=8||o("auth.validate.passwordMinLength")]},u=i(!1),f=async()=>{u.value=!0;try{await L().login(c.value,m.value),v.success(o("auth.successLoginMsg")),window.location.reload()}catch(e){console.error("Error submitting form:",e),v.error(o("auth.failedLoginMsg"))}u.value=!1};return(e,a)=>{const w=b("lowercase");return q(),$(M,{class:"flex flex-center"},{default:d(()=>[l(S,{class:"q-pa-md",style:{"border-radius":"30px"}},{default:d(()=>[t("div",D,[t("img",{src:T(C)+"/settings/"+n.value.logo,style:k("width:"+n.value.logo_size+"px")},null,12,N)]),t("div",E,s(e.$t("auth.welcomeMsg"))+" "+s(n.value.title),1),l(F,{onSubmit:f},{default:d(()=>[t("div",I,[t("div",P,[t("label",R,[r(s(e.$t("auth.emailForm"))+" ",1),t("span",U,s(e.$t("public.requiredText")),1)]),Q(l(g,{type:"email",modelValue:c.value,"onUpdate:modelValue":a[0]||(a[0]=p=>c.value=p),placeholder:"email@example.com",rules:h.email,outlined:"",dense:"",required:"",autofocus:""},null,8,["modelValue","rules"]),[[w]])]),t("div",A,[t("label",H,[r(s(e.$t("auth.passwordForm"))+" ",1),t("span",G,s(e.$t("public.requiredText")),1)]),l(g,{type:"password",modelValue:m.value,"onUpdate:modelValue":a[1]||(a[1]=p=>m.value=p),placeholder:"********",rules:h.password,outlined:"",dense:"",required:""},null,8,["modelValue","rules"])]),t("div",J,[l(V,{type:"submit",color:"primary",label:e.$t("auth.loginText"),class:"full-width q-mt-sm",loading:u.value,disable:u.value,onClick:f},{loading:d(()=>[l(B,{class:"on-left"}),r(" "+s(e.$t("public.loadingText")),1)]),_:1},8,["label","loading","disable"])])])]),_:1}),t("div",K,[t("div",null,s(e.$t("auth.permissionText1")),1),t("div",null,[t("a",O,s(e.$t("auth.termsText")),1),r(" "+s(e.$t("auth.permissionText2")),1)]),t("div",null,[t("a",W,s(e.$t("auth.privacyText")),1),a[2]||(a[2]=r(" . ")),t("a",X,s(e.$t("auth.noticeText")),1),a[3]||(a[3]=r(" . "))])])]),_:1})]),_:1})}}};export{ne as default};
