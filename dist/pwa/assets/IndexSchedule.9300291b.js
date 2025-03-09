import{Q as Be}from"./QTooltip.500b7a29.js";import{E as it,a0 as dt,bm as rt,a1 as ct,bw as mt,r as $,c as x,w as Oe,ak as vt,J as ft,h as p,g as ht,by as _t,n as pt,$ as bt,Y as gt,aw as B,a4 as q,x as L,y as $e,j as a,C as n,a7 as Ce,a8 as ee,a5 as r,aa as b,ab as re,av as Q,ax as j,a9 as Y,bC as Ee,at as F,a_ as yt,o as xt,as as qt,B as xe,aF as qe,bs as we,a6 as wt,F as kt,au as $t}from"./index.4b455d6d.js";import{Q as Ct,a as Vt,b as ke,c as Tt}from"./QTable.d1437a3c.js";import{Q as Dt}from"./QPage.588b5698.js";import{l as R}from"./index.820023a3.js";import{u as Mt}from"./use-quasar.9bc68b2c.js";import{a as Ue,b as St,c as Qt,_ as de,g as It,f as Bt,Q as ce,u as me}from"./schedule-store.f7488780.js";import{a as Fe}from"./QSpace.629e5fb5.js";import{T as Ot}from"./TouchPan.843c03c9.js";import{p as z}from"./format.959830d0.js";import{Q as He}from"./QSpinnerGears.2f99577e.js";import{Q as Pe}from"./QForm.9927cc01.js";import{C as H}from"./ClosePopup.aea1e414.js";import{u as Ve}from"./vue-i18n.runtime.f1e77c75.js";import"./QMenu.e94dcc54.js";import"./selection.c802d758.js";import"./QSelect.d220868d.js";import"./QItem.bbd7d839.js";import"./QItemLabel.625aaa4e.js";import"./use-fullscreen.cb2c894f.js";import"./axios.7d27b938.js";import"./touch.9135741d.js";function Ut(l,T){if(l.hour!==null){if(l.minute===null)return"minute";if(T===!0&&l.second===null)return"second"}return"hour"}function At(){const l=new Date;return{hour:l.getHours(),minute:l.getMinutes(),second:l.getSeconds(),millisecond:l.getMilliseconds()}}var ve=it({name:"QTime",props:{...dt,...rt,...Ue,modelValue:{required:!0,validator:l=>typeof l=="string"||l===null},mask:{...Ue.mask,default:null},format24h:{type:Boolean,default:null},defaultDate:{type:String,validator:l=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(l)},options:Function,hourOptions:Array,minuteOptions:Array,secondOptions:Array,withSeconds:Boolean,nowBtn:Boolean},emits:St,setup(l,{slots:T,emit:v}){const O=ht(),{$q:d}=O.proxy,C=ct(l,d),{tabindex:g,headerClass:U,getLocale:A,getCurrentDate:u}=Qt(l,d),f=mt(l),_=_t(f);let E,M;const W=$(null),K=x(()=>Ye()),h=x(()=>A()),w=x(()=>Re()),N=de(l.modelValue,K.value,h.value,l.calendar,w.value),s=$(Ut(N)),o=$(N),k=$(N.hour===null||N.hour<12),je=x(()=>`q-time q-time--${l.landscape===!0?"landscape":"portrait"}`+(C.value===!0?" q-time--dark q-dark":"")+(l.disable===!0?" disabled":l.readonly===!0?" q-time--readonly":"")+(l.bordered===!0?" q-time--bordered":"")+(l.square===!0?" q-time--square no-border-radius":"")+(l.flat===!0?" q-time--flat no-shadow":"")),fe=x(()=>{const e=o.value;return{hour:e.hour===null?"--":D.value===!0?z(e.hour):String(k.value===!0?e.hour===0?12:e.hour:e.hour>12?e.hour-12:e.hour),minute:e.minute===null?"--":z(e.minute),second:e.second===null?"--":z(e.second)}}),D=x(()=>l.format24h!==null?l.format24h:d.lang.date.format24h),Ke=x(()=>{const e=s.value==="hour",t=e===!0?12:60,i=o.value[s.value];let y=`rotate(${Math.round(i*(360/t))-180}deg) translateX(-50%)`;return e===!0&&D.value===!0&&o.value.hour>=12&&(y+=" scale(.7)"),{transform:y}}),Te=x(()=>o.value.hour!==null),Ne=x(()=>Te.value===!0&&o.value.minute!==null),G=x(()=>l.hourOptions!==void 0?e=>l.hourOptions.includes(e):l.options!==void 0?e=>l.options(e,null,null):null),te=x(()=>l.minuteOptions!==void 0?e=>l.minuteOptions.includes(e):l.options!==void 0?e=>l.options(o.value.hour,e,null):null),le=x(()=>l.secondOptions!==void 0?e=>l.secondOptions.includes(e):l.options!==void 0?e=>l.options(o.value.hour,o.value.minute,e):null),I=x(()=>{if(G.value===null)return null;const e=se(0,11,G.value),t=se(12,11,G.value);return{am:e,pm:t,values:e.values.concat(t.values)}}),J=x(()=>te.value!==null?se(0,59,te.value):null),X=x(()=>le.value!==null?se(0,59,le.value):null),ae=x(()=>{switch(s.value){case"hour":return I.value;case"minute":return J.value;case"second":return X.value}}),ze=x(()=>{let e,t,i=0,m=1;const y=ae.value!==null?ae.value.values:void 0;s.value==="hour"?D.value===!0?(e=0,t=23):(e=0,t=11,k.value===!1&&(i=12)):(e=0,t=55,m=5);const S=[];for(let c=e,V=e;c<=t;c+=m,V++){const P=c+i,nt=y!==void 0&&y.includes(P)===!1,ut=s.value==="hour"&&c===0?D.value===!0?"00":"12":c;S.push({val:P,index:V,disable:nt,label:ut})}return S}),Le=x(()=>[[Ot,We,void 0,{stop:!0,prevent:!0,mouse:!0}]]);Oe(()=>l.modelValue,e=>{const t=de(e,K.value,h.value,l.calendar,w.value);(t.dateHash!==o.value.dateHash||t.timeHash!==o.value.timeHash)&&(o.value=t,t.hour===null?s.value="hour":k.value=t.hour<12)}),Oe([K,h],()=>{pt(()=>{ye()})});function De(){const e={...u(),...At()};ye(e),Object.assign(o.value,e),s.value="hour"}function se(e,t,i){const m=Array.apply(null,{length:t+1}).map((y,S)=>{const c=S+e;return{index:c,val:i(c)===!0}}).filter(y=>y.val===!0).map(y=>y.index);return{min:m[0],max:m[m.length-1],values:m,threshold:t+1}}function Me(e,t,i){const m=Math.abs(e-t);return Math.min(m,i-m)}function he(e,{min:t,max:i,values:m,threshold:y}){if(e===t)return t;if(e<t||e>i)return Me(e,t,y)<=Me(e,i,y)?t:i;const S=m.findIndex(P=>e<=P),c=m[S-1],V=m[S];return e-c<=V-e?c:V}function Ye(){return l.calendar!=="persian"&&l.mask!==null?l.mask:`HH:mm${l.withSeconds===!0?":ss":""}`}function Re(){if(typeof l.defaultDate!="string"){const e=u(!0);return e.dateHash=It(e),e}return de(l.defaultDate,"YYYY/MM/DD",void 0,l.calendar)}function _e(){return bt(O)===!0||ae.value!==null&&(ae.value.values.length===0||s.value==="hour"&&D.value!==!0&&I.value[k.value===!0?"am":"pm"].values.length===0)}function pe(){const e=W.value,{top:t,left:i,width:m}=e.getBoundingClientRect(),y=m/2;return{top:t+y,left:i+y,dist:y*.7}}function We(e){if(_e()!==!0){if(e.isFirst===!0){E=pe(),M=oe(e.evt,E);return}M=oe(e.evt,E,M),e.isFinal===!0&&(E=!1,M=null,Se())}}function Se(){s.value==="hour"?s.value="minute":l.withSeconds&&s.value==="minute"&&(s.value="second")}function oe(e,t,i){const m=vt(e),y=Math.abs(m.top-t.top),S=Math.sqrt(Math.pow(Math.abs(m.top-t.top),2)+Math.pow(Math.abs(m.left-t.left),2));let c,V=Math.asin(y/S)*(180/Math.PI);if(m.top<t.top?V=t.left<m.left?90-V:270+V:V=t.left<m.left?V+90:270-V,s.value==="hour"){if(c=V/30,I.value!==null){const P=D.value!==!0?k.value===!0:I.value.am.values.length!==0&&I.value.pm.values.length!==0?S>=t.dist:I.value.am.values.length!==0;c=he(c+(P===!0?0:12),I.value[P===!0?"am":"pm"])}else c=Math.round(c),D.value===!0?S<t.dist?c<12&&(c+=12):c===12&&(c=0):k.value===!0&&c===12?c=0:k.value===!1&&c!==12&&(c+=12);D.value===!0&&(k.value=c<12)}else c=Math.round(V/6)%60,s.value==="minute"&&J.value!==null?c=he(c,J.value):s.value==="second"&&X.value!==null&&(c=he(c,X.value));return i!==c&&at[s.value](c),c}const be={hour(){s.value="hour"},minute(){s.value="minute"},second(){s.value="second"}};function Ge(e){e.keyCode===13&&Qe()}function Je(e){e.keyCode===13&&Ie()}function Xe(e){_e()!==!0&&(d.platform.is.desktop!==!0&&oe(e,pe()),Se())}function Ze(e){_e()!==!0&&oe(e,pe())}function et(e){if(e.keyCode===13)s.value="hour";else if([37,39].includes(e.keyCode)){const t=e.keyCode===37?-1:1;if(I.value!==null){const i=D.value===!0?I.value.values:I.value[k.value===!0?"am":"pm"].values;if(i.length===0)return;if(o.value.hour===null)ne(i[0]);else{const m=(i.length+i.indexOf(o.value.hour)+t)%i.length;ne(i[m])}}else{const i=D.value===!0?24:12,m=D.value!==!0&&k.value===!1?12:0,y=o.value.hour===null?-t:o.value.hour;ne(m+(24+y+t)%i)}}}function tt(e){if(e.keyCode===13)s.value="minute";else if([37,39].includes(e.keyCode)){const t=e.keyCode===37?-1:1;if(J.value!==null){const i=J.value.values;if(i.length===0)return;if(o.value.minute===null)ue(i[0]);else{const m=(i.length+i.indexOf(o.value.minute)+t)%i.length;ue(i[m])}}else{const i=o.value.minute===null?-t:o.value.minute;ue((60+i+t)%60)}}}function lt(e){if(e.keyCode===13)s.value="second";else if([37,39].includes(e.keyCode)){const t=e.keyCode===37?-1:1;if(X.value!==null){const i=X.value.values;if(i.length===0)return;if(o.value.seconds===null)ie(i[0]);else{const m=(i.length+i.indexOf(o.value.second)+t)%i.length;ie(i[m])}}else{const i=o.value.second===null?-t:o.value.second;ie((60+i+t)%60)}}}function ne(e){o.value.hour!==e&&(o.value.hour=e,Z())}function ue(e){o.value.minute!==e&&(o.value.minute=e,Z())}function ie(e){o.value.second!==e&&(o.value.second=e,Z())}const at={hour:ne,minute:ue,second:ie};function Qe(){k.value===!1&&(k.value=!0,o.value.hour!==null&&(o.value.hour-=12,Z()))}function Ie(){k.value===!0&&(k.value=!1,o.value.hour!==null&&(o.value.hour+=12,Z()))}function ge(e){const t=l.modelValue;s.value!==e&&t!==void 0&&t!==null&&t!==""&&typeof t!="string"&&(s.value=e)}function Z(){if(G.value!==null&&G.value(o.value.hour)!==!0){o.value=de(),ge("hour");return}if(te.value!==null&&te.value(o.value.minute)!==!0){o.value.minute=null,o.value.second=null,ge("minute");return}if(l.withSeconds===!0&&le.value!==null&&le.value(o.value.second)!==!0){o.value.second=null,ge("second");return}o.value.hour===null||o.value.minute===null||l.withSeconds===!0&&o.value.second===null||ye()}function ye(e){const t=Object.assign({...o.value},e),i=l.calendar==="persian"?z(t.hour)+":"+z(t.minute)+(l.withSeconds===!0?":"+z(t.second):""):Bt(new Date(t.year,t.month===null?null:t.month-1,t.day,t.hour,t.minute,t.second,t.millisecond),K.value,h.value,t.year,t.timezoneOffset);t.changed=i!==l.modelValue,v("update:modelValue",i,t)}function st(){const e=[p("div",{class:"q-time__link "+(s.value==="hour"?"q-time__link--active":"cursor-pointer"),tabindex:g.value,onClick:be.hour,onKeyup:et},fe.value.hour),p("div",":"),p("div",Te.value===!0?{class:"q-time__link "+(s.value==="minute"?"q-time__link--active":"cursor-pointer"),tabindex:g.value,onKeyup:tt,onClick:be.minute}:{class:"q-time__link"},fe.value.minute)];l.withSeconds===!0&&e.push(p("div",":"),p("div",Ne.value===!0?{class:"q-time__link "+(s.value==="second"?"q-time__link--active":"cursor-pointer"),tabindex:g.value,onKeyup:lt,onClick:be.second}:{class:"q-time__link"},fe.value.second));const t=[p("div",{class:"q-time__header-label row items-center no-wrap",dir:"ltr"},e)];return D.value===!1&&t.push(p("div",{class:"q-time__header-ampm column items-between no-wrap"},[p("div",{class:"q-time__link "+(k.value===!0?"q-time__link--active":"cursor-pointer"),tabindex:g.value,onClick:Qe,onKeyup:Ge},"AM"),p("div",{class:"q-time__link "+(k.value!==!0?"q-time__link--active":"cursor-pointer"),tabindex:g.value,onClick:Ie,onKeyup:Je},"PM")])),p("div",{class:"q-time__header flex flex-center no-wrap "+U.value},t)}function ot(){const e=o.value[s.value];return p("div",{class:"q-time__content col relative-position"},[p(gt,{name:"q-transition--scale"},()=>p("div",{key:"clock"+s.value,class:"q-time__container-parent absolute-full"},[p("div",{ref:W,class:"q-time__container-child fit overflow-hidden"},[B(p("div",{class:"q-time__clock cursor-pointer non-selectable",onClick:Xe,onMousedown:Ze},[p("div",{class:"q-time__clock-circle fit"},[p("div",{class:"q-time__clock-pointer"+(o.value[s.value]===null?" hidden":l.color!==void 0?` text-${l.color}`:""),style:Ke.value}),ze.value.map(t=>p("div",{class:`q-time__clock-position row flex-center q-time__clock-pos-${t.index}`+(t.val===e?" q-time__clock-position--active "+U.value:t.disable===!0?" q-time__clock-position--disable":"")},[p("span",t.label)]))])]),Le.value)])])),l.nowBtn===!0?p(q,{class:"q-time__now-button absolute",icon:d.iconSet.datetime.now,unelevated:!0,size:"sm",round:!0,color:l.color,textColor:l.textColor,tabindex:g.value,onClick:De}):null])}return O.proxy.setNow=De,()=>{const e=[ot()],t=ft(T.default);return t!==void 0&&e.push(p("div",{class:"q-time__actions"},t)),l.name!==void 0&&l.disable!==!0&&_(e,"push"),p("div",{class:je.value,tabindex:-1},[st(),p("div",{class:"q-time__main col overflow-auto"},e)])}}});const Et={class:"text-h6"},Ft={class:"col-md-10 col-xs-12 q-pa-sm"},Ht={class:"text-bold"},Pt={class:"text-red"},jt={class:"col-md-10 col-xs-12 q-pa-sm"},Kt={class:"row justify-center"},Nt={class:"col-md-6 col-xs-12 q-pa-sm"},zt={class:"text-bold"},Lt={class:"text-red"},Yt={class:"row items-center justify-end"},Rt={class:"col-md-6 col-xs-12 q-pa-sm"},Wt={class:"text-bold"},Gt={class:"text-red"},Jt={class:"row items-center justify-end"},Xt={__name:"CreateSchedule",emits:["created"],setup(l,{emit:T}){const{t:v}=Ve(),O=T,d=$({name:"",start_time:"",end_time:""}),C=$({name:[u=>!!u||v("dashboard.employee.schedule.validate.nameRequired"),u=>u.length<=50||v("dashboard.employee.schedule.validate.nameMaxLength")],start_time:[u=>!!u||v("dashboard.employee.schedule.validate.startTimeRequired")],end_time:[u=>!!u||v("dashboard.employee.schedule.validate.endTimeRequired")]}),g=$(!1),U=x(()=>g.value||!d.value.name||!d.value.start_time||!d.value.end_time),A=async()=>{g.value=!0;try{await me().create(d.value),R.success(v("dashboard.employee.schedule.successCreateMsg")),O("created")}catch(u){console.error("Error submitting form:",u),R.error(u.response.data.message||v("dashboard.employee.schedule.failedCreateMsg"))}g.value=!1};return(u,f)=>(L(),$e("div",null,[a(Pe,{onSubmit:A},{default:n(()=>[a(Ce,{style:{"min-width":"400px"}},{default:n(()=>[a(ee,{class:"row items-center q-py-sm"},{default:n(()=>[r("div",Et,b(u.$t("dashboard.employee.schedule.createText")),1),a(Fe),B(a(q,{icon:"close",flat:"",round:"",dense:""},null,512),[[H]])]),_:1}),a(re),a(ee,{class:"scroll",style:{"max-height":"77vh"}},{default:n(()=>[r("div",Ft,[r("div",Ht,[Q(b(u.$t("dashboard.employee.schedule.data.name"))+" ",1),r("span",Pt,b(u.$t("public.requiredText")),1)]),a(j,{modelValue:d.value.name,"onUpdate:modelValue":f[0]||(f[0]=_=>d.value.name=_),placeholder:u.$t("public.exampleText")+u.$t("dashboard.employee.schedule.data.namePlaceholder"),rules:C.value.name,outlined:"",dense:"",required:"",autofocus:""},null,8,["modelValue","placeholder","rules"])]),r("div",jt,[r("div",Kt,[r("div",Nt,[r("div",zt,[Q(b(u.$t("dashboard.employee.schedule.data.startTime"))+" ",1),r("span",Lt,b(u.$t("public.requiredText")),1)]),a(j,{modelValue:d.value.start_time,"onUpdate:modelValue":f[2]||(f[2]=_=>d.value.start_time=_),rules:C.value.start_time,mask:"time",outlined:"",dense:"",required:""},{append:n(()=>[a(Y,{name:"access_time",class:"cursor-pointer"},{default:n(()=>[a(ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[a(ve,{modelValue:d.value.start_time,"onUpdate:modelValue":f[1]||(f[1]=_=>d.value.start_time=_)},{default:n(()=>[r("div",Yt,[B(a(q,{color:"primary",label:"Close",flat:""},null,512),[[H]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","rules"])]),r("div",Rt,[r("div",Wt,[Q(b(u.$t("dashboard.employee.schedule.data.endTime"))+" ",1),r("span",Gt,b(u.$t("public.requiredText")),1)]),a(j,{modelValue:d.value.end_time,"onUpdate:modelValue":f[4]||(f[4]=_=>d.value.end_time=_),rules:C.value.end_time,mask:"time",outlined:"",dense:"",required:""},{append:n(()=>[a(Y,{name:"access_time",class:"cursor-pointer"},{default:n(()=>[a(ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[a(ve,{modelValue:d.value.end_time,"onUpdate:modelValue":f[3]||(f[3]=_=>d.value.end_time=_)},{default:n(()=>[r("div",Jt,[B(a(q,{color:"primary",label:"Close",flat:""},null,512),[[H]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","rules"])])])])]),_:1}),a(re),a(Ee,{align:"right",class:"text-primary"},{default:n(()=>[B(a(q,{color:"primary",label:F(v)("public.cancelText"),flat:""},null,8,["label"]),[[H]]),a(q,{type:"submit",color:"primary",label:F(v)("public.createText"),loading:g.value,disable:U.value},{loading:n(()=>[a(He)]),_:1},8,["label","loading","disable"])]),_:1})]),_:1})]),_:1})]))}},Zt={class:"text-h6"},el={class:"col-md-10 col-xs-12 q-pa-sm"},tl={class:"text-bold"},ll={class:"text-red"},al={class:"col-md-10 col-xs-12 q-pa-sm"},sl={class:"row justify-center"},ol={class:"col-md-6 col-xs-12 q-pa-sm"},nl={class:"text-bold"},ul={class:"text-red"},il={class:"row items-center justify-end"},dl={class:"col-md-6 col-xs-12 q-pa-sm"},rl={class:"text-bold"},cl={class:"text-red"},ml={class:"row items-center justify-end"},Ae={__name:"EditSchedule",props:["item"],emits:["edited"],setup(l,{emit:T}){const{t:v}=Ve(),O=T,d=$({id:l.item.id,name:l.item.name,start_time:l.item.start_time,end_time:l.item.end_time}),C=$({name:[u=>!!u||v("dashboard.employee.schedule.validate.nameRequired"),u=>u.length<=50||v("dashboard.employee.schedule.validate.nameMaxLength")],start_time:[u=>!!u||v("dashboard.employee.schedule.validate.startTimeRequired")],end_time:[u=>!!u||v("dashboard.employee.schedule.validate.endTimeRequired")]}),g=$(!1),U=x(()=>g.value||!d.value.name||!d.value.start_time||!d.value.end_time),A=async()=>{g.value=!0;try{await me().edit(d.value),R.success(v("dashboard.employee.schedule.successEditMsg")),O("edited")}catch(u){console.error("Error submitting form:",u),R.error(u.response.data.message||v("dashboard.employee.schedule.failedEditMsg"))}g.value=!1};return(u,f)=>(L(),$e("div",null,[a(Pe,{onSubmit:A},{default:n(()=>[a(Ce,{style:{"min-width":"400px"}},{default:n(()=>[a(ee,{class:"row items-center q-py-sm"},{default:n(()=>[r("div",Zt,b(u.$t("dashboard.employee.schedule.editText")),1),a(Fe),B(a(q,{icon:"close",flat:"",round:"",dense:""},null,512),[[H]])]),_:1}),a(re),a(ee,{class:"scroll",style:{"max-height":"77vh"}},{default:n(()=>[r("div",el,[r("div",tl,[Q(b(u.$t("dashboard.employee.schedule.data.name"))+" ",1),r("span",ll,b(u.$t("public.requiredText")),1)]),a(j,{modelValue:d.value.name,"onUpdate:modelValue":f[0]||(f[0]=_=>d.value.name=_),placeholder:u.$t("public.exampleText")+u.$t("dashboard.employee.schedule.data.namePlaceholder"),rules:C.value.name,outlined:"",dense:"",required:"",autofocus:""},null,8,["modelValue","placeholder","rules"])]),r("div",al,[r("div",sl,[r("div",ol,[r("div",nl,[Q(b(u.$t("dashboard.employee.schedule.data.startTime"))+" ",1),r("span",ul,b(u.$t("public.requiredText")),1)]),a(j,{modelValue:d.value.start_time,"onUpdate:modelValue":f[2]||(f[2]=_=>d.value.start_time=_),rules:C.value.start_time,mask:"time",outlined:"",dense:"",required:""},{append:n(()=>[a(Y,{name:"access_time",class:"cursor-pointer"},{default:n(()=>[a(ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[a(ve,{modelValue:d.value.start_time,"onUpdate:modelValue":f[1]||(f[1]=_=>d.value.start_time=_)},{default:n(()=>[r("div",il,[B(a(q,{color:"primary",label:"Close",flat:""},null,512),[[H]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","rules"])]),r("div",dl,[r("div",rl,[Q(b(u.$t("dashboard.employee.schedule.data.endTime"))+" ",1),r("span",cl,b(u.$t("public.requiredText")),1)]),a(j,{modelValue:d.value.end_time,"onUpdate:modelValue":f[4]||(f[4]=_=>d.value.end_time=_),rules:C.value.end_time,mask:"time",outlined:"",dense:"",required:""},{append:n(()=>[a(Y,{name:"access_time",class:"cursor-pointer"},{default:n(()=>[a(ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[a(ve,{modelValue:d.value.end_time,"onUpdate:modelValue":f[3]||(f[3]=_=>d.value.end_time=_)},{default:n(()=>[r("div",ml,[B(a(q,{color:"primary",label:"Close",flat:""},null,512),[[H]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","rules"])])])])]),_:1}),a(re),a(Ee,{align:"right",class:"text-primary"},{default:n(()=>[B(a(q,{color:"primary",label:F(v)("public.cancelText"),flat:""},null,8,["label"]),[[H]]),a(q,{type:"submit",color:"primary",label:F(v)("public.editText"),loading:g.value,disable:U.value},{loading:n(()=>[a(He)]),_:1},8,["label","loading","disable"])]),_:1})]),_:1})]),_:1})]))}},vl={class:"text-body2 text-bold text-center q-pa-md"},fl={class:"text-body1 text-bold"},hl={class:"text-body1 q-my-md"},_l={class:"text-bold"},pl={class:"text-body1 q-mx-sm"},bl={class:"absolute absolute-bottom-right q-pa-md"},Pl={__name:"IndexSchedule",setup(l){const T=Mt(),{t:v}=Ve(),O=yt(),d=$([]),C=async()=>{try{const h=await me().all();d.value=h.data.data}catch(h){console.error("Error fetching data:",h),h.response.data.status==="failed"&&O.push("/notfound")}};xt(()=>{C()});const g=$(!1),U=()=>{g.value=!1,C()},A=h=>{h.editItemDialog=!1,C()},u=h=>{T.dialog({title:v("dashboard.warningTitle"),message:v("dashboard.warningText"),cancel:!0,persistent:!0}).onOk(async()=>{try{await me().delete(h.id),R.success(v("dashboard.employee.schedule.successDeleteMsg")),C()}catch(w){console.error("Error submitting form:",w),R.error(w.response.data.message||v("dashboard.employee.schedule.failedDeleteMsg"))}})},f=d,_=[{name:"id",field:"id",label:"No",align:"center"},{name:"name",field:"name",label:v("dashboard.employee.schedule.data.name"),align:"center",sortable:!0},{name:"start_time",field:"start_time",label:v("dashboard.employee.schedule.data.startTime"),align:"center",sortable:!0},{name:"end_time",field:"end_time",label:v("dashboard.employee.schedule.data.endTime"),align:"center",sortable:!0},{name:"action",field:"action",label:v("dashboard.actionTable"),align:"center"}],E=$(""),M=$(!1),W=$({}),K=h=>{h.toggleFullscreen()};return(h,w)=>{const N=qt("viewer");return L(),xe(Dt,{class:"q-pa-md"},{default:n(()=>[B((L(),xe(Ct,{pagination:W.value,"onUpdate:pagination":w[4]||(w[4]=s=>W.value=s),"rows-per-page-options":[10,20,30],class:qe([F(T).dark.isActive?"text-grey-4":"text-grey-9","dashboard-table"]),rows:F(f),columns:_,"hide-header":M.value,grid:M.value,filter:E.value,separator:"cell",title:h.$t("dashboard.employee.schedule.titleText"),"row-key":"__index","virtual-scroll":"",flat:"",bordered:""},{"top-right":n(s=>[a(q,{color:"primary",icon:s.inFullscreen?"fullscreen_exit":"fullscreen",onClick:o=>K(s),flat:"",round:"",dense:""},{default:n(()=>[a(Be,null,{default:n(()=>[Q(b(s.inFullscreen?h.$t("dashboard.fullscreenExitBtn"):h.$t("dashboard.fullscreenBtn")),1)]),_:2},1024)]),_:2},1032,["icon","onClick"]),a(q,{color:"primary",icon:M.value?"list":"grid_on",onClick:w[0]||(w[0]=o=>M.value=!M.value),class:"q-mr-sm",flat:"",round:"",dense:""},{default:n(()=>[a(Be,null,{default:n(()=>[Q(b(M.value?h.$t("dashboard.listBtn"):h.$t("dashboard.gridBtn")),1)]),_:1})]),_:1},8,["icon"]),a(j,{modelValue:E.value,"onUpdate:modelValue":w[1]||(w[1]=o=>E.value=o),placeholder:h.$t("public.searchText"),debounce:"300",outlined:"",dense:""},{append:n(()=>[a(Y,{name:"search"})]),_:1},8,["modelValue","placeholder"])]),"top-left":n(()=>[a(q,{color:"primary",label:h.$t("dashboard.employee.schedule.createText"),class:"shadow-3 q-my-sm",onClick:w[2]||(w[2]=s=>g.value=!0),"no-caps":""},null,8,["label"]),a(we,{modelValue:g.value,"onUpdate:modelValue":w[3]||(w[3]=s=>g.value=s),persistent:""},{default:n(()=>[a(Xt,{onCreated:U})]),_:1},8,["modelValue"])]),header:n(s=>[a(Vt,{props:s},{default:n(()=>[(L(!0),$e(kt,null,wt(s.cols,o=>(L(),xe(Tt,{key:o.name,props:s,class:qe(F(T).dark.isActive?"bg-blue-grey-10":"bg-grey-2"),style:{"font-weight":"bolder","font-size":"13px"}},{default:n(()=>[Q(b(o.label),1)]),_:2},1032,["props","class"]))),128))]),_:2},1032,["props"])]),"no-data":n(()=>[r("div",vl,[a(Y,{name:"warning_amber",size:"25px",class:"q-mx-sm"}),Q(" "+b(h.$t("dashboard.noDataText")),1)])]),"body-cell-id":n(s=>[a(ke,{props:s},{default:n(()=>[Q(b(s.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-name":n(s=>[a(ke,{props:s},{default:n(()=>[r("div",fl,b(s.row.name),1)]),_:2},1032,["props"])]),"body-cell-action":n(s=>[a(ke,{props:s},{default:n(()=>[a(q,{color:"warning",field:"edit",icon:"edit",class:"q-mx-xs",onClick:o=>s.row.editItemDialog=!0,dense:"",round:""},{default:n(()=>[a(we,{modelValue:s.row.editItemDialog,"onUpdate:modelValue":o=>s.row.editItemDialog=o,persistent:""},{default:n(()=>[a(Ae,{onEdited:o=>A(s.row),item:s.row},null,8,["onEdited","item"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["onClick"]),a(q,{color:"red",field:"delete",icon:"delete",class:"q-mx-xs",onClick:o=>u(s.row),dense:"",round:""},null,8,["onClick"])]),_:2},1032,["props"])]),item:n(s=>[r("div",{class:"dashboard-card q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4 grid-style-transition",style:$t(s.selected?"transform: scale(0.95);":"")},[a(Ce,{class:qe([F(T).dark.isActive?"text-grey-4":"text-grey-9","dashboard-card q-pa-md"])},{default:n(()=>[a(ee,{class:"q-pb-xl"},{default:n(()=>[r("div",hl,[r("span",_l,b(h.$t("dashboard.employee.schedule.data.name"))+" :",1),r("span",pl,b(s.row.name),1)])]),_:2},1024),r("div",bl,[a(q,{color:"warning",field:"edit",icon:"edit",class:"q-mx-xs",onClick:o=>s.row.editItemDialog=!0,dense:"",round:""},{default:n(()=>[a(we,{modelValue:s.row.editItemDialog,"onUpdate:modelValue":o=>s.row.editItemDialog=o,persistent:""},{default:n(()=>[a(Ae,{onEdited:o=>A(s.row),item:s.row},null,8,["onEdited","item"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["onClick"]),a(q,{color:"red",field:"delete",icon:"delete",class:"q-mx-xs",onClick:o=>u(s.row),dense:"",round:""},null,8,["onClick"])])]),_:2},1032,["class"])],4)]),_:1},8,["pagination","class","rows","hide-header","grid","filter","title"])),[[N]])]),_:1})}}};export{Pl as default};
