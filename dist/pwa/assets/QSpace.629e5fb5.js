import{E as t,a0 as u,a1 as c,c as a,h as s,J as i,g as p}from"./index.4b455d6d.js";const g=["ul","ol"];var v=t({name:"QList",props:{...u,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:r}){const n=p(),o=c(e,n.proxy.$q),l=a(()=>g.includes(e.tag)?null:"list"),d=a(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(o.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>s(e.tag,{class:d.value,role:l.value},i(r.default))}}),m=t({name:"QSpace",setup(){const e=s("div",{class:"q-space"});return()=>e}});export{v as Q,m as a};
