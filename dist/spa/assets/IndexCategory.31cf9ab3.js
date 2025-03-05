import{Q as j}from"./QTooltip.bac9bef9.js";import{r as p,o as F,c as O,x as $,y as A,j as e,C as o,ag as z,ah as T,ae as s,aj as l,ay as D,ad as g,ak as B,ax as y,az as E,bs as H,av as _,a$ as Z,au as ee,B as U,aF as L,ai as P,br as S,af as ae,F as te,aw as oe}from"./index.199a5e3f.js";import{Q as se,a as le,b as I,c as re}from"./QTable.f81b2d5a.js";import{Q as de}from"./QPage.2ef07c91.js";import{l as C}from"./index.1757aa92.js";import{u as ne}from"./use-quasar.cb6e291d.js";import{u as q}from"./category-store.2a0162d0.js";import{a as J,C as M}from"./ClosePopup.e69073b2.js";import{Q as K}from"./QSpinnerGears.7e50aff2.js";import{Q as W}from"./QForm.fdbdeff7.js";import{u as N}from"./vue-i18n.runtime.bdb4f456.js";import"./QMenu.7c4a117a.js";import"./selection.75008187.js";import"./QSelect.0341fc00.js";import"./QItem.37ed3076.js";import"./QItemLabel.5bbf1fb7.js";import"./format.2cae61da.js";import"./use-fullscreen.c925fc63.js";import"./axios.afd0666a.js";const ie={class:"text-h6"},ce={class:"col-md-10 col-xs-12 q-pa-sm"},ue={class:"text-bold"},me={class:"text-red"},ge={class:"col-md-10 col-xs-12 q-pa-sm"},pe={class:"text-bold"},be={class:"text-grey"},fe={__name:"CreateCategory",emits:["created"],setup(x,{emit:h}){const{t:r}=N(),V=h,i=p({name:"",description:""}),b=p([]),v=async()=>{try{const a=await q().all();b.value=a.data.data}catch(a){console.error("Error fetching data:",a)}};F(()=>{v()});const k=p({name:[a=>!!a||r("dashboard.main.category.validate.nameRequired"),a=>a.length<=50||r("dashboard.main.category.validate.nameMaxLength"),a=>typeof a=="string"&&b.value?!b.value.some(n=>n.name.toLowerCase()===a.toLowerCase())||r("dashboard.main.category.validate.nameAlready"):!0]}),f=p(!1),w=O(()=>f.value||!i.value.name),Q=async()=>{f.value=!0;try{await q().create(i.value),C.success(r("dashboard.main.category.successCreateMsg")),V("created")}catch(a){console.error("Error submitting form:",a),C.error(a.response.data.message||r("dashboard.main.category.failedCreateMsg"))}f.value=!1};return(a,n)=>($(),A("div",null,[e(W,{onSubmit:Q},{default:o(()=>[e(z,{style:{"min-width":"400px"}},{default:o(()=>[e(T,{class:"row items-center q-py-sm"},{default:o(()=>[s("div",ie,l(a.$t("dashboard.main.category.createText")),1),e(J),D(e(g,{icon:"close",flat:"",round:"",dense:""},null,512),[[M]])]),_:1}),e(B),e(T,{class:"scroll",style:{"max-height":"77vh"}},{default:o(()=>[s("div",ce,[s("div",ue,[y(l(a.$t("dashboard.main.category.data.name"))+" ",1),s("span",me,l(a.$t("public.requiredText")),1)]),e(E,{modelValue:i.value.name,"onUpdate:modelValue":n[0]||(n[0]=u=>i.value.name=u),placeholder:"Makanan",rules:k.value.name,outlined:"",dense:"",required:"",autofocus:""},null,8,["modelValue","rules"])]),s("div",ge,[s("div",pe,[y(l(a.$t("dashboard.main.category.data.description"))+" ",1),s("span",be,l(a.$t("public.optionalText")),1)]),e(E,{modelValue:i.value.description,"onUpdate:modelValue":n[1]||(n[1]=u=>i.value.description=u),type:"textarea",outlined:"",dense:""},null,8,["modelValue"])])]),_:1}),e(B),e(H,{align:"right",class:"text-primary"},{default:o(()=>[D(e(g,{color:"primary",label:_(r)("public.cancelText"),flat:""},null,8,["label"]),[[M]]),e(g,{type:"submit",color:"primary",label:_(r)("public.createText"),loading:f.value,disable:w.value},{loading:o(()=>[e(K)]),_:1},8,["label","loading","disable"])]),_:1})]),_:1})]),_:1})]))}},ye={class:"text-h6"},he={class:"col-md-10 col-xs-12 q-pa-sm"},ve={class:"text-bold"},_e={class:"text-red"},xe={class:"col-md-10 col-xs-12 q-pa-sm"},we={class:"text-bold"},$e={class:"text-grey"},G={__name:"EditCategory",props:["item"],emits:["edited"],setup(x,{emit:h}){const{t:r}=N(),V=h,i=p({id:x.item.id,name:x.item.name,description:x.item.description}),b=p([]),v=async()=>{try{const a=await q().all();b.value=a.data.data}catch(a){console.error("Error fetching data:",a)}};F(()=>{v()});const k=p({name:[a=>!!a||r("dashboard.main.category.validate.nameRequired"),a=>a.length<=50||r("dashboard.main.category.validate.nameMaxLength"),a=>typeof a=="string"&&b.value?!b.value.some(n=>n.name.toLowerCase()===a.toLowerCase()&&n.name.toLowerCase()!==x.item.name.toLowerCase())||r("dashboard.main.category.validate.nameAlready"):!0]}),f=p(!1),w=O(()=>f.value||!i.value.name),Q=async()=>{f.value=!0;try{await q().edit(i.value),C.success(r("dashboard.main.category.successEditMsg")),V("edited")}catch(a){console.error("Error submitting form:",a),C.error(a.response.data.message||r("dashboard.main.category.failedEditMsg"))}f.value=!1};return(a,n)=>($(),A("div",null,[e(W,{onSubmit:Q},{default:o(()=>[e(z,{style:{"min-width":"400px"}},{default:o(()=>[e(T,{class:"row items-center q-py-sm"},{default:o(()=>[s("div",ye,l(a.$t("dashboard.main.category.editText")),1),e(J),D(e(g,{icon:"close",flat:"",round:"",dense:""},null,512),[[M]])]),_:1}),e(B),e(T,{class:"scroll",style:{"max-height":"77vh"}},{default:o(()=>[s("div",he,[s("div",ve,[y(l(a.$t("dashboard.main.category.data.name"))+" ",1),s("span",_e,l(a.$t("public.requiredText")),1)]),e(E,{modelValue:i.value.name,"onUpdate:modelValue":n[0]||(n[0]=u=>i.value.name=u),placeholder:"Makanan",rules:k.value.name,outlined:"",dense:"",required:"",autofocus:""},null,8,["modelValue","rules"])]),s("div",xe,[s("div",we,[y(l(a.$t("dashboard.main.category.data.description"))+" ",1),s("span",$e,l(a.$t("public.optionalText")),1)]),e(E,{modelValue:i.value.description,"onUpdate:modelValue":n[1]||(n[1]=u=>i.value.description=u),type:"textarea",outlined:"",dense:""},null,8,["modelValue"])])]),_:1}),e(B),e(H,{align:"right",class:"text-primary"},{default:o(()=>[D(e(g,{color:"primary",label:_(r)("public.cancelText"),flat:""},null,8,["label"]),[[M]]),e(g,{type:"submit",color:"primary",label:_(r)("public.editText"),loading:f.value,disable:w.value},{loading:o(()=>[e(K)]),_:1},8,["label","loading","disable"])]),_:1})]),_:1})]),_:1})]))}},Ce={class:"text-body2 text-bold text-center q-pa-md"},qe={class:"text-h6 text-bold"},Ve={class:"text-subtitle2"},ke={class:"text-long"},Qe={class:"text-body1 q-my-md"},Te={class:"text-bold"},De={class:"text-body1 q-my-md"},Ee={class:"text-bold"},Ie={class:"text-body1 q-my-md"},Be={class:"text-bold"},Me={class:"text-long"},Ue={class:"absolute absolute-bottom-right q-pa-md"},aa={__name:"IndexCategory",setup(x){const h=ne(),{t:r}=N(),V=Z(),i=p([]),b=async()=>{try{const d=await q().all();i.value=d.data.data}catch(d){console.error("Error fetching data:",d),d.response.data.status==="failed"&&V.push("/notfound")}};F(()=>{b()});const v=p(!1),k=()=>{v.value=!1,b()},f=d=>{d.editItemDialog=!1,b()},w=d=>{h.dialog({title:r("dashboard.warningTitle"),message:r("dashboard.warningText"),cancel:!0,persistent:!0}).onOk(async()=>{try{await q().delete(d.id),C.success(r("dashboard.main.category.successDeleteMsg")),b()}catch(m){console.error("Error submitting form:",m),C.error(m.response.data.message||r("dashboard.main.category.failedDeleteMsg"))}})},Q=i,a=[{name:"id",field:"id",label:"No",align:"center"},{name:"name",field:"name",label:r("dashboard.main.category.data.name"),align:"center",sortable:!0},{name:"description",field:"description",label:r("dashboard.main.category.data.description"),align:"left"},{name:"action",field:"action",label:r("dashboard.actionTable"),align:"center"}],n=p(""),u=p(!1),R=p({}),X=d=>{d.toggleFullscreen()};return(d,m)=>{const Y=ee("viewer");return $(),U(de,{class:"q-pa-md"},{default:o(()=>[D(($(),U(se,{pagination:R.value,"onUpdate:pagination":m[4]||(m[4]=t=>R.value=t),"rows-per-page-options":[10,20,30],class:L([_(h).dark.isActive?"text-grey-4":"text-grey-9","dashboard-table"]),rows:_(Q),columns:a,"hide-header":u.value,grid:u.value,filter:n.value,separator:"cell",title:d.$t("dashboard.main.category.titleText"),"row-key":"__index","virtual-scroll":"",flat:"",bordered:""},{"top-right":o(t=>[e(g,{color:"primary",icon:t.inFullscreen?"fullscreen_exit":"fullscreen",onClick:c=>X(t),flat:"",round:"",dense:""},{default:o(()=>[e(j,null,{default:o(()=>[y(l(t.inFullscreen?d.$t("dashboard.fullscreenExitBtn"):d.$t("dashboard.fullscreenBtn")),1)]),_:2},1024)]),_:2},1032,["icon","onClick"]),e(g,{color:"primary",icon:u.value?"list":"grid_on",onClick:m[0]||(m[0]=c=>u.value=!u.value),class:"q-mr-sm",flat:"",round:"",dense:""},{default:o(()=>[e(j,null,{default:o(()=>[y(l(u.value?d.$t("dashboard.listBtn"):d.$t("dashboard.gridBtn")),1)]),_:1})]),_:1},8,["icon"]),e(E,{modelValue:n.value,"onUpdate:modelValue":m[1]||(m[1]=c=>n.value=c),placeholder:d.$t("public.searchText"),debounce:"300",outlined:"",dense:""},{append:o(()=>[e(P,{name:"search"})]),_:1},8,["modelValue","placeholder"])]),"top-left":o(()=>[e(g,{color:"primary",label:d.$t("dashboard.main.category.createText"),class:"shadow-3 q-my-sm",onClick:m[2]||(m[2]=t=>v.value=!0),"no-caps":""},null,8,["label"]),e(S,{modelValue:v.value,"onUpdate:modelValue":m[3]||(m[3]=t=>v.value=t),persistent:""},{default:o(()=>[e(fe,{onCreated:k})]),_:1},8,["modelValue"])]),header:o(t=>[e(le,{props:t},{default:o(()=>[($(!0),A(te,null,ae(t.cols,c=>($(),U(re,{key:c.name,props:t,class:L(_(h).dark.isActive?"bg-blue-grey-10":"bg-grey-2"),style:{"font-weight":"bolder","font-size":"13px"}},{default:o(()=>[y(l(c.label),1)]),_:2},1032,["props","class"]))),128))]),_:2},1032,["props"])]),"no-data":o(()=>[s("div",Ce,[e(P,{name:"warning_amber",size:"25px",class:"q-mx-sm"}),y(" "+l(d.$t("dashboard.noDataText")),1)])]),"body-cell-id":o(t=>[e(I,{props:t},{default:o(()=>[y(l(t.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-name":o(t=>[e(I,{props:t},{default:o(()=>[s("div",qe,l(t.row.name),1),s("div",Ve,l(t.row.slug),1)]),_:2},1032,["props"])]),"body-cell-description":o(t=>[e(I,{props:t},{default:o(()=>[s("div",ke,l(t.row.description),1)]),_:2},1032,["props"])]),"body-cell-action":o(t=>[e(I,{props:t},{default:o(()=>[e(g,{color:"warning",field:"edit",icon:"edit",class:"q-mx-xs",onClick:c=>t.row.editItemDialog=!0,dense:"",round:""},{default:o(()=>[e(S,{modelValue:t.row.editItemDialog,"onUpdate:modelValue":c=>t.row.editItemDialog=c,persistent:""},{default:o(()=>[e(G,{onEdited:c=>f(t.row),item:t.row},null,8,["onEdited","item"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["onClick"]),e(g,{color:"red",field:"delete",icon:"delete",class:"q-mx-xs",onClick:c=>w(t.row),dense:"",round:""},null,8,["onClick"])]),_:2},1032,["props"])]),item:o(t=>[s("div",{class:"dashboard-card q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4 grid-style-transition",style:oe(t.selected?"transform: scale(0.95);":"")},[e(z,{class:L([_(h).dark.isActive?"text-grey-4":"text-grey-9","dashboard-card q-pa-md"])},{default:o(()=>[e(T,{class:"q-pb-xl"},{default:o(()=>[s("div",Qe,[s("span",Te,l(d.$t("dashboard.main.category.data.name"))+" :",1),y(" "+l(t.row.name),1)]),s("div",De,[s("span",Ee,l(d.$t("dashboard.main.category.data.slug"))+" :",1),y(" "+l(t.row.slug),1)]),s("div",Ie,[s("span",Be,l(d.$t("dashboard.main.category.data.description"))+" :",1),s("span",Me,l(t.row.description),1)])]),_:2},1024),s("div",Ue,[e(g,{color:"warning",field:"edit",icon:"edit",class:"q-mx-xs",onClick:c=>t.row.editItemDialog=!0,dense:"",round:""},{default:o(()=>[e(S,{modelValue:t.row.editItemDialog,"onUpdate:modelValue":c=>t.row.editItemDialog=c,persistent:""},{default:o(()=>[e(G,{onEdited:c=>f(t.row),item:t.row},null,8,["onEdited","item"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["onClick"]),e(g,{color:"red",field:"delete",icon:"delete",class:"q-mx-xs",onClick:c=>w(t.row),dense:"",round:""},null,8,["onClick"])])]),_:2},1032,["class"])],4)]),_:1},8,["pagination","class","rows","hide-header","grid","filter","title"])),[[Y]])]),_:1})}}};export{aa as default};
