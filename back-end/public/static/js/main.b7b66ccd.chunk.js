(this["webpackJsonpfront-end-react"]=this["webpackJsonpfront-end-react"]||[]).push([[0],{23:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(16),r=n.n(s),i=(n(23),n(24),n(11)),l=n(3),o=n(0),j=function(){return Object(o.jsx)("div",{className:"styleHome",children:Object(o.jsx)("h1",{children:"Home"})})},b=n(2),d=n(8),m=function(){var e=Object(a.useState)({email:"",password:""}),t=Object(d.a)(e,2),n=t[0],c=t[1];return Object(o.jsx)("div",{className:"form-login",children:Object(o.jsxs)("div",{className:"box-login",children:[Object(o.jsx)("div",{className:"form-group-login",children:Object(o.jsx)("h3",{children:"Login Admin"})}),Object(o.jsxs)("div",{className:"form-group-login",children:[Object(o.jsx)("label",{children:"Email"}),Object(o.jsx)("input",{type:"email",name:"email",onChange:function(e){return c(Object(b.a)(Object(b.a)({},n),{},{email:e.target.value}))}})]}),Object(o.jsxs)("div",{className:"form-group-login",children:[Object(o.jsx)("label",{children:"Password"}),Object(o.jsx)("input",{type:"password",name:"password",onChange:function(e){return c(Object(b.a)(Object(b.a)({},n),{},{password:e.target.value}))}})]}),Object(o.jsx)("div",{className:"form-group-login",children:Object(o.jsx)("button",{className:"btn-login",onClick:function(){return function(){if(""!=n.email&&""!=n.password){var e=new FormData;e.append("email",n.email),e.append("password",n.password),fetch("http://127.0.0.1:8000/api/users/login",{method:"POST",body:e}).then((function(e){return e.json()})).then((function(e){console.log(e)}))}}()},children:"Login"})})]})})},u=n(9),p=(n(26),function(){var e,t=Object(l.f)(),n=Object(a.useState)(0),c=Object(d.a)(n,2),s=c[0],r=c[1],i=Object(a.useState)(!1),j=Object(d.a)(i,2),m=j[0],p=j[1],O=Object(a.useState)({email:"",name:"",password:"",confirm_password:""}),h=Object(d.a)(O,2),x=h[0],f=h[1],g=Object(a.useState)({inputForm:!1,uploadAvatar:!1,btnRegister:!1}),v=Object(d.a)(g,2),N=v[0],w=v[1],k=Object(a.useState)(),C=Object(d.a)(k,2),F=C[0],y=C[1],S=Object(a.useState)(),A=Object(d.a)(S,2),P=A[0],_=A[1],R=Object(a.useState)(""),L=Object(d.a)(R,2),B=L[0],E=L[1];Object(a.useEffect)((function(){return r(25),fetch("http://127.0.0.1:8000/api/token").then((function(e){return e.json()})).then((function(e){return E(e.token)})),function(){}}),[]);var D=function(e){if("inputForm"===e&&(x.name.length>2&&I(x.email)&&x.password.length>=8&&x.password==x.confirm_password&&(r(75),w(Object(b.a)(Object(b.a)({},N),{},{inputForm:!0}))),p(!0)),"uploadAvatar"===e&&void 0!==F&&(w(Object(b.a)(Object(b.a)({},N),{},{uploadAvatar:!0})),r(100)),"btnRegister"===e){var n=new FormData;n.append("name",x.name),n.append("email",x.email),n.append("password",x.password),n.append("confirm_password",x.confirm_password),n.append("UrlImage",F),n.append("token",B),fetch("http://127.0.0.1:8000/api/users",{method:"POST",body:n}).then((function(e){return e.json()})).then((function(e){e.success>0?(alert("B\u1ea1n \u0111\xe3 \u0111\u0103ng k\xfd th\xe0nh c\xf4ng!"),t.push("/login")):alert(JSON.stringify(e.error))}))}},I=function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())},T=function(e){"inputForm"===e&&(w(Object(b.a)(Object(b.a)({},N),{},{inputForm:!1})),r(25)),"uploadAvatar"===e&&(w(Object(b.a)(Object(b.a)({},N),{},{uploadAvatar:!1})),r(75))},H=Object(o.jsxs)("div",{className:"form-register",children:[Object(o.jsxs)("div",{className:"form-label",children:[Object(o.jsx)("label",{children:"Name"}),Object(o.jsx)("input",{type:"text",name:"name",placeholder:"",onChange:function(e){return f(Object(b.a)(Object(b.a)({},x),{},{name:e.target.value}))},value:x.name})]}),Object(o.jsxs)("div",{className:"form-label",children:[Object(o.jsx)("label",{children:"Email"}),Object(o.jsx)("input",{type:"email",name:"name",placeholder:"",onChange:function(e){return f(Object(b.a)(Object(b.a)({},x),{},{email:e.target.value}))},value:x.email})]}),Object(o.jsxs)("div",{className:"form-label",children:[Object(o.jsx)("label",{children:"Password"}),Object(o.jsx)("input",{type:"password",name:"name",placeholder:"",onChange:function(e){return f(Object(b.a)(Object(b.a)({},x),{},{password:e.target.value}))},value:x.password})]}),Object(o.jsxs)("div",{className:"form-label",children:[Object(o.jsx)("label",{children:"Confirm Password"}),Object(o.jsx)("input",{type:"password",name:"name",placeholder:"",onChange:function(e){return f(Object(b.a)(Object(b.a)({},x),{},{confirm_password:e.target.value}))},value:x.confirm_password})]}),Object(o.jsx)("div",{className:"form-label",children:Object(o.jsx)("button",{className:"btn-next",onClick:function(){return D("inputForm")},children:"Next"})}),Object(o.jsx)("div",{className:"form-label",children:m&&Object(o.jsxs)("div",{className:"errors",children:[""===x.name&&Object(o.jsx)("span",{children:"Name b\u1ea1n ch\u01b0a nh\u1eadp"}),x.name.length<=2&&Object(o.jsx)("span",{children:"Name c\u1ea7n 3 k\xfd t\u1ef1"}),!I(x.email)&&Object(o.jsx)("span",{children:"Email b\u1ea1n kh\xf4ng \u0111\xfang"}),""===x.password&&Object(o.jsx)("span",{children:"Password b\u1ea1n ch\u01b0a nh\u1eadp"}),x.password.length<8&&Object(o.jsx)("span",{children:"Password c\u1ea7n 8 k\xfd t\u1ef1"}),""===x.confirm_password&&Object(o.jsx)("span",{children:"Confirm Password ch\u01b0a nh\u1eadp"}),x.password!==x.confirm_password&&Object(o.jsx)("span",{children:"Password kh\xf4ng kh\u1edbp"})]})})]}),J=Object(o.jsxs)("div",{className:"form-upload",children:[Object(o.jsx)("div",{className:"upload-file",children:Object(o.jsxs)("div",{className:"box-avatar",children:[Object(o.jsx)("label",{className:"label-avatar",children:"Avatar"}),F&&Object(o.jsx)("img",{src:P,alt:"avatar",className:"img-avatar"}),Object(o.jsx)("input",{type:"file",name:"file",className:"input-file",onChange:function(e){if(e.target.files&&0!==e.target.files.length){y(e.target.files[0]);var t=new FileReader;t.onloadend=function(){_(t.result)},e.target.files[0]?(t.readAsDataURL(e.target.files[0]),_(t.result)):_(void 0)}else y(void 0)}})]})}),Object(o.jsx)("div",{className:"upload-file",children:Object(o.jsxs)("div",{className:"box-event",children:[Object(o.jsx)("button",{className:"btn-next",onClick:function(){return T("inputForm")},children:"Back"}),Object(o.jsx)("button",{className:"btn-next",onClick:function(){return D("uploadAvatar")},children:"Next"})]})})]}),z=Object(o.jsx)("div",{className:"form-event-register",children:Object(o.jsxs)("div",{className:"form-event",children:[Object(o.jsx)("label",{children:"Vui l\xf2ng b\u1ea5m x\xe1c nh\u1eadn \u0111\u1ec3 ho\xe0n th\xe0nh \u0111\u0103ng k\xfd"}),Object(o.jsxs)("div",{className:"box-event",children:[Object(o.jsx)("button",{className:"btn-next",onClick:function(){return T("uploadAvatar")},children:"Back"}),Object(o.jsx)("button",{className:"btn-next",onClick:function(){return D("btnRegister")},children:"Register"})]})]})});return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"boxState",children:Object(o.jsxs)("div",{className:"box",children:[Object(o.jsxs)("svg",{children:[Object(o.jsx)("circle",{cx:"70px",cy:"70px",r:"70px"}),Object(o.jsx)("circle",(e={className:"p50"},Object(u.a)(e,"className",s>0?"p"+s:"p25"),Object(u.a)(e,"cx","70px"),Object(u.a)(e,"cy","70px"),Object(u.a)(e,"r","70px"),e))]}),Object(o.jsxs)("div",{className:"number_precent",children:[Object(o.jsx)("span",{children:s}),"%"]})]})}),!N.inputForm&&H,N.inputForm&&!N.uploadAvatar&&J,N.uploadAvatar&&!N.btnRegister&&z]})});var O=function(){return Object(o.jsx)("div",{className:"container-fluid",children:Object(o.jsxs)(i.a,{children:[Object(o.jsxs)("div",{className:"menu-top",children:[Object(o.jsx)("div",{className:"btnHome",children:Object(o.jsx)(i.b,{to:"/",style:{backgroundImage:"url(".concat("/bg-menu-top.png",")")}})}),Object(o.jsxs)("div",{className:"menu",children:[Object(o.jsx)(i.b,{to:"/login",children:"Login"}),Object(o.jsx)(i.b,{to:"/register",children:"Register"})]})]}),Object(o.jsxs)(l.c,{children:[Object(o.jsx)(l.a,{path:"/",exact:!0,component:j}),Object(o.jsx)(l.a,{path:"/login",component:m}),Object(o.jsx)(l.a,{path:"/register",component:p})]})]})})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};r.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(O,{})}),document.getElementById("root")),h()}},[[35,1,2]]]);
//# sourceMappingURL=main.b7b66ccd.chunk.js.map