(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{228:function(e,t,a){e.exports=a(408)},233:function(e,t,a){},408:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(20),i=a.n(o),s=(a(233),a(22)),l=a(23),c=a(25),m=a(24),u=a(26),h=a(412),p=a(411),d=a(33),g=a(34),E=a(157),f={},b=a(78),v=function(e){return void 0===e||null===e||"object"===typeof e&&0===Object.keys(e).length||"string"===typeof e&&0===e.trim().length},w={isAuthenticated:!1,user:{}},C=Object(g.c)({errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(b.a)({},e,{isAuthenticated:!v(t.payload),user:t.payload});default:return e}}}),y=Object(g.e)(C,{},Object(g.d)(Object(g.a)(E.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),j=a(79),O=a.n(j),N=a(46),S=a.n(N),k=function(e){e?S.a.defaults.headers.common.Authorization=e:delete S.a.defaults.headers.common.Authorization},x=function(e){return{type:"SET_CURRENT_USER",payload:e}},T=function(e){return function(t){localStorage.removeItem("jwtToken"),k(!1),t(x({})),e.push("/login")}},I=a(17),_=a(410),R=a(413),U=a(4),P=a.n(U),A=a(19),D=a(73),L=a.n(D),B=a(71),M=a.n(B),W=a(72),G=a.n(W),X=a(36),z=a.n(X),F=a(70),J=a.n(F),V=a(30),q=a.n(V),H=a(74),$=a.n(H),K=a(37),Q=a.n(K),Y=a(162),Z=a.n(Y),ee=a(164),te=a.n(ee),ae=a(163),ne=a.n(ae),re=a(31),oe=a.n(re),ie=a(38),se=a.n(ie),le=a(35),ce=a.n(le),me=a(158),ue=a.n(me),he=a(111),pe=a.n(he),de=a(161),ge=a.n(de),Ee=a(69),fe=a.n(Ee),be=a(159),ve=a.n(be),we=a(160),Ce=a.n(we),ye=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1,subMenus:{tools:!1}},a.handleToolsExpand=function(){a.setState({subMenus:{tools:!a.state.subMenus.tools}})},a.handleDrawerOpen=function(){a.setState({open:!0})},a.handleDrawerClose=function(){a.setState({open:!1})},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"onLogout",value:function(e){e.preventDefault(),this.props.logoutUser(this.props.history)}},{key:"render",value:function(){var e,t,a=this.props.auth,n=a.isAuthenticated,o=a.user,i=this.props,s=i.classes,l=i.theme,c=r.a.createElement(z.a,null,r.a.createElement(oe.a,null,r.a.createElement(se.a,null,r.a.createElement(pe.a,null)),r.a.createElement(ce.a,null,o.name)),r.a.createElement(oe.a,{button:!0,onClick:this.handleToolsExpand},r.a.createElement(se.a,null,r.a.createElement(ue.a,null)),r.a.createElement(ce.a,{inset:!0,primary:"Herramientas"}),this.state.subMenus.tools?r.a.createElement(ve.a,null):r.a.createElement(Ce.a,null)),r.a.createElement(fe.a,{in:this.state.subMenus.tools,timeout:"auto",unmountOnExit:!0},r.a.createElement(z.a,{component:"div",disablePadding:!0},r.a.createElement(_.a,{className:"nav-link",to:"/tools/boxState"},r.a.createElement(oe.a,{button:!0,className:s.nested},r.a.createElement(ce.a,{inset:!0,primary:"Estado de Caja"})))))),m=r.a.createElement(_.a,{className:"nav-link",to:"/login"},r.a.createElement(oe.a,{button:!0,key:"Login"},r.a.createElement(se.a,null,r.a.createElement(pe.a,null)),r.a.createElement(ce.a,null,"Login"))),u=r.a.createElement(_.a,{className:"nav-link",to:"/login"},r.a.createElement(oe.a,{button:!0,onClick:this.onLogout.bind(this)},r.a.createElement(se.a,null,r.a.createElement(ge.a,null)),r.a.createElement(ce.a,null,"Logout")));return r.a.createElement("div",{className:s.root},r.a.createElement(J.a,null),r.a.createElement(M.a,{position:"fixed",className:P()(s.appBar,Object(I.a)({},s.appBarShift,this.state.open))},r.a.createElement(G.a,{disableGutters:!this.state.open},r.a.createElement(Q.a,{color:"inherit","aria-label":"Open drawer",onClick:this.handleDrawerOpen,className:P()(s.menuButton,Object(I.a)({},s.hide,this.state.open))},r.a.createElement(Z.a,null)),r.a.createElement(q.a,{variant:"h6",color:"inherit",noWrap:!0},"Project Management Platform"))),r.a.createElement(L.a,{variant:"permanent",className:P()(s.drawer,(e={},Object(I.a)(e,s.drawerOpen,this.state.open),Object(I.a)(e,s.drawerClose,!this.state.open),e)),classes:{paper:P()((t={},Object(I.a)(t,s.drawerOpen,this.state.open),Object(I.a)(t,s.drawerClose,!this.state.open),t))},open:this.state.open},r.a.createElement("div",{className:s.toolbar},r.a.createElement(Q.a,{onClick:this.handleDrawerClose},"rtl"===l.direction?r.a.createElement(ne.a,null):r.a.createElement(te.a,null))),r.a.createElement($.a,null),r.a.createElement(z.a,null,n?c:null,n?u:m)),r.a.createElement("main",{className:s.content},this.props.children))}}]),t}(r.a.Component),je=Object(R.a)(Object(A.withStyles)(function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginLeft:12,marginRight:36},hide:{display:"none"},drawer:{width:240,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(I.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:7*e.spacing.unit+1},e.breakpoints.up("sm"),{width:9*e.spacing.unit+1}),toolbar:Object(b.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),content:{flexGrow:1,padding:3*e.spacing.unit}}},{withTheme:!0})(Object(d.b)(function(e){return{auth:e.auth}},{logoutUser:T})(ye))),Oe=a(27),Ne=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).state={CC:"",name:"",lastname:"",appointment:"",email:"",password:"",password_confirm:"",errors:{}},e.handleInputChange=e.handleInputChange.bind(Object(Oe.a)(Object(Oe.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(Oe.a)(Object(Oe.a)(e))),e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"handleInputChange",value:function(e){this.setState(Object(I.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={CC:this.state.CC,name:this.state.name,lastname:this.state.email,appointment:this.state.appointment,email:this.state.email,password:this.state.password,password_confirm:this.state.password_confirm};this.props.registerUser(t,this.props.history)}},{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/"),e.errors&&this.setState({errors:e.errors})}},{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/")}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container",style:{marginTop:"50px",width:"700px"}},r.a.createElement("h2",{style:{marginBottom:"40px"}},"Registration"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Identification",className:P()("form-control form-control-lg",{"is-invalid":e.CC}),name:"CC",onChange:this.handleInputChange,value:this.state.CC}),e.CC&&r.a.createElement("div",{className:"invalid-feedback"},e.CC)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Name",className:P()("form-control form-control-lg",{"is-invalid":e.name}),name:"name",onChange:this.handleInputChange,value:this.state.name})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"lastname",className:P()("form-control form-control-lg",{"is-invalid":e.lastname}),name:"lastname",onChange:this.handleInputChange,value:this.state.lastname})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"appointment",className:P()("form-control form-control-lg",{"is-invalid":e.appointment}),name:"appointment",onChange:this.handleInputChange,value:this.state.appointment})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",placeholder:"Email",className:P()("form-control form-control-lg",{"is-invalid":e.email}),name:"email",onChange:this.handleInputChange,value:this.state.email})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",className:P()("form-control form-control-lg",{"is-invalid":e.password}),name:"password",onChange:this.handleInputChange,value:this.state.password}),e.password&&r.a.createElement("div",{className:"invalid-feedback"},e.password)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Confirm Password",className:P()("form-control form-control-lg",{"is-invalid":e.password_confirm}),name:"password_confirm",onChange:this.handleInputChange,value:this.state.password_confirm}),e.password_confirm&&r.a.createElement("div",{className:"invalid-feedback"},e.password_confirm)),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Register User"))))}}]),t}(n.Component),Se=Object(d.b)(function(e){return{auth:e.auth,errors:e.errors}},{registerUser:function(e,t){return function(a){S.a.post("http://localhost:5000/api/users",{newUser:e}).then(function(e){return t.push("/login")}).catch(function(e){a({type:"GET_ERRORS",payload:e.response.data})})}}})(Object(R.a)(Ne)),ke=a(57),xe=a.n(ke),Te=a(75),Ie=a.n(Te),_e=a(168),Re=a.n(_e),Ue=a(167),Pe=a.n(Ue),Ae=a(76),De=a.n(Ae),Le=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleClickShowPassword=function(){e.setState(function(e){return{showPassword:!e.showPassword}})},e.state={CC:"",password:"",showPassword:!1,errors:{}},e.handleInputChange=e.handleInputChange.bind(Object(Oe.a)(Object(Oe.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(Oe.a)(Object(Oe.a)(e))),e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"handleInputChange",value:function(e){this.setState(Object(I.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={CC:this.state.CC,password:this.state.password};this.props.loginUser(t)}},{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/"),e.errors&&this.setState({errors:e.errors})}},{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/")}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"content"},r.a.createElement(q.a,{variant:"h3",component:"h3",align:"center"},"Ingreso a usuarios."),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement(xe.a,{required:!0,error:!!e.CC,id:"outlined-with-placeholder",label:"Identificaci\xf3n",placeholder:"Identificaci\xf3n",margin:"normal",variant:"outlined",style:{width:"100%"},name:"CC",onChange:this.handleInputChange,value:this.state.CC}),e.CC&&r.a.createElement(q.a,{variant:"caption"},e.CC)),r.a.createElement("div",{className:"form-group"},r.a.createElement(xe.a,{required:!0,error:!!e.password,id:"outlined-adornment-password",variant:"outlined",type:this.state.showPassword?"text":"password",label:"Password",name:"password",style:{width:"100%",marginTop:"10px"},value:this.state.password,onChange:this.handleInputChange,InputProps:{endAdornment:r.a.createElement(Ie.a,{position:"end"},r.a.createElement(Q.a,{"aria-label":"Toggle password visibility",onClick:this.handleClickShowPassword},this.state.showPassword?r.a.createElement(Pe.a,null):r.a.createElement(Re.a,null)))}}),e.password&&r.a.createElement("div",{className:"invalid-feedback"},e.password)),r.a.createElement("div",{className:"form-group",style:{float:"none",textAlign:"center"}},r.a.createElement(De.a,{variant:"contained",color:"primary",type:"submit",style:{marginTop:"10px"}},"Acceder"))))}}]),t}(n.Component),Be=Object(d.b)(function(e){return{auth:e.auth,errors:e.errors}},{loginUser:function(e){return function(t){S.a.post("http://localhost:5000/api/users/signin",{user:e}).then(function(e){var a=e.data.token;localStorage.setItem("jwtToken",a),k(a);var n=O()(a);t(x(n))}).catch(function(e){t({type:"GET_ERRORS",payload:e.response.data})})}}})(Le),Me=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"content"},"Welcome to Project Management Platform App")}}]),t}(n.Component),We=a(7),Ge=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleChange=function(t){return function(a){e.setState(Object(I.a)({},t,a.target.value),function(){e.getInfo()})}},e.getUsers=function(){var t=e.state.colector,a="http://localhost:5000/api/dbcsv/getUsers?type=1&number=".concat(t);fetch(a,{method:"GET",mode:"cors"}).then(function(t){t.ok&&t.json().then(function(t){e.setState({users:t})})}).catch(function(e){console.log(e)})},e.getInfo=function(){var t=e.state,a=t.searchType,n=t.searchNumber,r={method:"POST",mode:"cors",body:JSON.stringify({type:a,number:n}),headers:{"Content-Type":"application/json"}};fetch("http://localhost:5000/api/dbcsv/getInfo",r).then(function(t){t.ok&&t.json().then(function(t){t.concentrador?e.setState(t):e.setState({concentrador:0,colector:0,caja:0})})}).catch(function(e){console.log(e)})},e.state={searchNumber:0,searchType:1,users:[],concentrador:0,colector:0,caja:0},e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.users,a=this.state,n=a.concentrador,o=a.colector,i=a.caja,s=t.filter(function(e){return""!==e.anomalia});return r.a.createElement("div",{className:"content"},r.a.createElement(We.d,{container:!0,spacing:8},r.a.createElement(We.d,{item:!0,xs:12},r.a.createElement(We.l,{variant:"h4",component:"h4",align:"center"},"Verificaci\xf3n de Cajas")),r.a.createElement(We.d,{item:!0,xs:5},r.a.createElement(We.k,{select:!0,label:"Buscar por:",className:P()(e.margin,e.textField),value:this.state.searchType,onChange:this.handleChange("searchType"),variant:"outlined"},[{name:"Colector",value:1},{name:"Caja",value:2},{name:"Usuario",value:3},{name:"Medidor",value:4}].map(function(e){return r.a.createElement(We.e,{key:e.value,value:e.value},e.name)}))),r.a.createElement(We.d,{item:!0,xs:5},r.a.createElement(We.k,{label:"C\xf3digo",className:P()(e.margin,e.textField),variant:"outlined",onChange:this.handleChange("searchNumber")})),r.a.createElement(We.d,{item:!0,xs:2},r.a.createElement(We.b,{variant:"contained",color:"primary",className:e.button,onClick:this.getUsers},"BUSCAR"))),r.a.createElement(We.d,{container:!0,spacing:24},r.a.createElement(We.c,{avatar:r.a.createElement(We.a,null,"CC"),label:n,className:e.chip}),r.a.createElement(We.c,{avatar:r.a.createElement(We.a,null,"CL"),label:o,className:e.chip}),r.a.createElement(We.c,{avatar:r.a.createElement(We.a,null,"CJ"),label:i,className:e.chip}),r.a.createElement(We.c,{avatar:r.a.createElement(We.a,null,"U"),label:t.length,className:e.chip,color:"primary"}),r.a.createElement(We.c,{avatar:r.a.createElement(We.a,null,"A"),label:s.length,className:e.chip,color:"secondary"})),r.a.createElement(We.d,{container:!0,spacing:24},r.a.createElement(We.f,{className:e.table},r.a.createElement(We.i,null,r.a.createElement(We.j,null,r.a.createElement(We.h,null,"Codigo"),r.a.createElement(We.h,null,"Tipo"),r.a.createElement(We.h,{numeric:!0},"Medidor"),r.a.createElement(We.h,{numeric:!0},"Homedisplay"),r.a.createElement(We.h,{numeric:!0},"Fecha"),r.a.createElement(We.h,{numeric:!0},"Lectura"),r.a.createElement(We.h,{numeric:!0},"Anomalia"))),r.a.createElement(We.g,null,t.map(function(e){return r.a.createElement(We.j,{key:e["codigo usuario"]},r.a.createElement(We.h,null,e["codigo usuario"]),r.a.createElement(We.h,null,e.tipousuario),r.a.createElement(We.h,{numeric:!0},e["codigo de medidor"]),r.a.createElement(We.h,{numeric:!0},e.display),r.a.createElement(We.h,{numeric:!0},e.fecha),r.a.createElement(We.h,{numeric:!0},e.lectura),r.a.createElement(We.h,{numeric:!0},e.anomalia))})))))}}]),t}(n.Component),Xe=Object(A.withStyles)(function(e){return{root:{display:"flex",flexWrap:"wrap"},margin:{margin:e.spacing.unit},withoutLabel:{marginTop:3*e.spacing.unit},textField:{flexBasis:200,width:"100%"},button:{height:"75%",width:"100%",margin:e.spacing.unit},table:{minWidth:700},chip:{margin:e.spacing.unit,marginLeft:"20px"}}})(Ge);if(localStorage.jwtToken){k(localStorage.jwtToken);var ze=O()(localStorage.jwtToken);y.dispatch(x(ze));var Fe=Date.now()/1e3;ze.exp<Fe&&(y.dispatch(T()),window.location.href="/login")}var Je=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,{store:y},r.a.createElement(h.a,null,r.a.createElement("div",null,r.a.createElement(je,null,r.a.createElement(p.a,{exact:!0,path:"/",component:Me}),r.a.createElement("div",null,r.a.createElement(p.a,{exact:!0,path:"/register",component:Se}),r.a.createElement(p.a,{exact:!0,path:"/login",component:Be}),r.a.createElement(p.a,{exact:!0,path:"/tools/boxState",component:Xe}))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(Je,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[228,2,1]]]);
//# sourceMappingURL=main.e05075b9.chunk.js.map