import{al as M,E as V,am as G,c as n,h as x,an as O,g as W,bg as F,a$ as K,r as w,o as B,x as y,B as P,C as a,j as e,ah as c,ae as l,aj as b,ag as q,ai as h,y as $}from"./index.199a5e3f.js";import{Q as d}from"./QSkeleton.f97d26c8.js";import{Q as f,a as i}from"./QItem.37ed3076.js";import{Q as E}from"./QPage.2ef07c91.js";import{Q as C}from"./QAvatar.48e197fa.js";import{b as L}from"./format.2cae61da.js";import{u as U}from"./setting-store.40679274.js";import{u as Y}from"./profile-store.e8397c42.js";import"./axios.afd0666a.js";const H={...M,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:t=>t>=0&&t<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},z=50,N=2*z,T=N*Math.PI,J=Math.round(T*1e3)/1e3;var X=V({name:"QCircularProgress",props:{...H,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(t,{slots:u}){const{proxy:{$q:v}}=W(),p=G(t),k=n(()=>{const r=(v.lang.rtl===!0?-1:1)*t.angle;return{transform:t.reverse!==(v.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-r}deg)`:`rotate3d(0, 0, 1, ${r-90}deg)`}}),S=n(()=>t.instantFeedback!==!0&&t.indeterminate!==!0?{transition:`stroke-dashoffset ${t.animationSpeed}ms ease 0s, stroke ${t.animationSpeed}ms ease`}:""),s=n(()=>N/(1-t.thickness/2)),o=n(()=>`${s.value/2} ${s.value/2} ${s.value} ${s.value}`),g=n(()=>L(t.value,t.min,t.max)),I=n(()=>t.max-t.min),_=n(()=>t.thickness/2*s.value),j=n(()=>{const r=(t.max-g.value)/I.value,m=t.rounded===!0&&g.value<t.max&&r<.25?_.value/2*(1-r/.25):0;return T*r+m});function Q({thickness:r,offset:m,color:A,cls:D,rounded:R}){return x("circle",{class:"q-circular-progress__"+D+(A!==void 0?` text-${A}`:""),style:S.value,fill:"transparent",stroke:"currentColor","stroke-width":r,"stroke-dasharray":J,"stroke-dashoffset":m,"stroke-linecap":R,cx:s.value,cy:s.value,r:z})}return()=>{const r=[];t.centerColor!==void 0&&t.centerColor!=="transparent"&&r.push(x("circle",{class:`q-circular-progress__center text-${t.centerColor}`,fill:"currentColor",r:z-_.value/2,cx:s.value,cy:s.value})),t.trackColor!==void 0&&t.trackColor!=="transparent"&&r.push(Q({cls:"track",thickness:_.value,offset:0,color:t.trackColor})),r.push(Q({cls:"circle",thickness:_.value,offset:j.value,color:t.color,rounded:t.rounded===!0?"round":void 0}));const m=[x("svg",{class:"q-circular-progress__svg",style:k.value,viewBox:o.value,"aria-hidden":"true"},r)];return t.showValue===!0&&m.push(x("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:t.fontSize}},u.default!==void 0?u.default():[x("div",g.value)])),x("div",{class:`q-circular-progress q-circular-progress--${t.indeterminate===!0?"in":""}determinate`,style:p.value,role:"progressbar","aria-valuemin":t.min,"aria-valuemax":t.max,"aria-valuenow":t.indeterminate===!0?void 0:g.value},O(u.internal,m))}}});const Z={class:"text-body1"},ee={class:"row justify-between"},te={class:"col-md-3 col-sm-12 col-xs-12 q-ma-sm"},ae={class:"col-md-5 col-sm-12 col-xs-12 q-ma-sm"},se={class:"col-md-3 col-sm-12 col-xs-12 q-ma-sm"},le={key:0,class:"row justify-between"},oe={class:"col-md-3 col-sm-12 col-xs-12 q-ma-sm"},re={class:"col-md-5 col-sm-12 col-xs-12 q-ma-sm"},ie={class:"col-md-3 col-sm-12 col-xs-12 q-ma-sm"},ne={key:1,class:"row justify-between"},ce={class:"col-md-3 col-sm-12 col-xs-12 bg-primary q-pa-sm q-ma-sm"},de={class:"text-h4 text-bold text-white q-mt-xs"},ue={class:"col-md-5 col-sm-12 col-xs-12 bg-primary q-pa-sm q-ma-sm"},me={class:"text-h4 text-bold text-white q-mt-xs"},xe={class:"col-md-3 col-sm-12 col-xs-12 bg-primary q-pa-sm q-ma-sm"},ve={class:"text-h4 text-bold text-white q-mt-xs"},Se={__name:"IndexEmployee",setup(t){F(),K();const u=w(!0),v=w({}),p=async()=>{try{const s=await U().show(1);v.value=s.data.data}catch(s){console.error("Error fetching data:",s)}};B(()=>{p()});const k=w({}),S=async()=>{try{const s=await Y().profile();k.value=s.data.data}catch(s){console.error("Error fetching data:",s)}};return B(()=>{S()}),(s,o)=>u.value?(y(),P(E,{key:0,class:"q-pa-sm"},{default:a(()=>[e(q,{class:"q-pa-md q-my-sm"},{default:a(()=>[e(c,null,{default:a(()=>[o[0]||(o[0]=l("div",{class:"text-h5 text-bold"},"Dashboard Employee",-1)),l("div",Z,"Selamat datang di "+b(v.value.title),1)]),_:1}),e(c,null,{default:a(()=>[l("div",ee,[l("div",te,[e(d,{height:"220px"})]),l("div",ae,[e(d,{height:"220px"})]),l("div",se,[e(d,{height:"220px"})])])]),_:1})]),_:1}),e(q,{class:"q-pa-md q-my-sm"},{default:a(()=>[e(c,null,{default:a(()=>[e(f,null,{default:a(()=>[e(i,{avatar:""},{default:a(()=>[e(h,{color:"primary",name:"insert_chart",size:"80px"})]),_:1}),e(i,null,{default:a(()=>o[1]||(o[1]=[l("div",{class:"text-h4 text-bold"},"Statistik",-1)])),_:1})]),_:1})]),_:1}),e(c,null,{default:a(()=>[e(d,{height:"400px"})]),_:1})]),_:1})]),_:1})):(y(),P(E,{key:1,class:"q-pa-sm"},{default:a(()=>[e(q,{class:"q-pa-md q-my-sm"},{default:a(()=>[e(c,null,{default:a(()=>o[2]||(o[2]=[l("div",{class:"text-h5 text-bold"},"Dashboard",-1),l("div",{class:"text-body1"},"Selamat datang di Yaumi",-1)])),_:1}),e(c,null,{default:a(()=>[u.value?(y(),$("div",le,[l("div",oe,[e(d,{height:"220px"})]),l("div",re,[e(d,{height:"220px"})]),l("div",ie,[e(d,{height:"220px"})])])):(y(),$("div",ne,[l("div",ce,[e(f,null,{default:a(()=>[e(i,{avatar:""},{default:a(()=>[e(C,{"text-color":"white",icon:"account_box",size:"70px",class:"badge-color",rounded:""})]),_:1}),e(i,null,{default:a(()=>[o[3]||(o[3]=l("div",{class:"text-h6 text-bold text-grey-5",style:{"line-height":"18px"}},"TOTAL KARYAWAN",-1)),l("div",de,b(s.item.employee),1)]),_:1})]),_:1}),e(h,{name:"badge",color:"white",size:"90px",class:"q-pa-sm q-px-lg"})]),l("div",ue,[e(f,null,{default:a(()=>[e(i,{avatar:""},{default:a(()=>[e(C,{"text-color":"white",icon:"badge",size:"70px",class:"badge-color",rounded:""})]),_:1}),e(i,null,{default:a(()=>[o[4]||(o[4]=l("div",{class:"text-h6 text-bold text-grey-5",style:{"line-height":"18px"}},"PERSENTASE TEPAT WAKTU",-1)),l("div",me,b(s.item.ontimePercentage)+"%",1)]),_:1})]),_:1}),e(h,{name:"alarm",color:"white",size:"90px",class:"q-pa-sm q-px-lg"}),e(X,{color:"secondary","track-color":"white",size:"150px",value:s.item.ontimePercentage,thickness:.15,class:"float-right q-pa-md q-mx-lg",style:{"margin-top":"-35px"}},null,8,["value"])]),l("div",xe,[e(f,null,{default:a(()=>[e(i,{avatar:""},{default:a(()=>[e(C,{"text-color":"white",icon:"person",size:"70px",class:"badge-color",rounded:""})]),_:1}),e(i,null,{default:a(()=>[o[5]||(o[5]=l("div",{class:"text-h6 text-bold text-grey-5",style:{"line-height":"18px"}},"TOTAL PENGGUNA",-1)),l("div",ve,b(s.item.user),1)]),_:1})]),_:1}),e(h,{name:"group",color:"white",size:"90px",class:"q-pa-sm q-px-lg"})])]))]),_:1})]),_:1}),e(q,{class:"q-pa-md q-my-sm"},{default:a(()=>[e(c,null,{default:a(()=>[e(f,null,{default:a(()=>[e(i,{avatar:""},{default:a(()=>[e(h,{color:"primary",name:"insert_chart",size:"80px"})]),_:1}),e(i,null,{default:a(()=>o[6]||(o[6]=[l("div",{class:"text-h4 text-bold"},"Statistik Absensi",-1)])),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{Se as default};
