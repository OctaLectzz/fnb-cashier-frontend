import{aE as n}from"./index.4b455d6d.js";import{server as o,headers as r}from"./axios.7d27b938.js";const m=n("auth",{actions:{async register(t,a,e,l){return await o.post("api/auth/register",{name:t,email:a,password:e,phone_number:l})},async login(t,a){const e=await o.post("api/auth/login",{email:t,password:a});return localStorage.setItem("token",e.data.data.token),e},async employee(t,a){console.log(t,a);const e=await o.post("api/auth/employee",{nip:t,pin:a},{headers:r});return localStorage.setItem("employeetoken",e.data.data.token),localStorage.setItem("branch",e.data.data.employee.branch.id),e},async logout(){return localStorage.removeItem("token"),localStorage.removeItem("employeetoken"),localStorage.removeItem("branch"),window.location.reload(),await o.get("api/auth/logout",{headers:r})}}});export{m as u};
