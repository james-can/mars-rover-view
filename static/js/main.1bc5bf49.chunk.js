(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{155:function(e,t,a){e.exports=a(323)},160:function(e,t,a){},323:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(22),i=a.n(o),l=(a(160),a(153)),s=a(30),c=a(16),m=a(17),u=a(21),h=a(18),p=a(20),d=a(150),g=a.n(d),f=a(147),v=a.n(f),E=a(24),b=a(65),w=a.n(b),y=a(34),C=a.n(y),k=a(38),x=a.n(k),O=a(25),S=a.n(O),j=a(88),I=a.n(j),N=a(89),P=a.n(N),T=a(27),A=a.n(T),M=a(32),F=a.n(M),D=a(66),R=a.n(D),z=a(131),L=a.n(z),_=a(31),W=a.n(_),B=a(19),U=a.n(B),H=a(6),V=a.n(H),G=a(130),Z=a.n(G),q=a(15),J=a.n(q),$=a(33),K=a.n($),Y=a(64),Q=a.n(Y),X=a(90),ee=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",hasLoginError:!1,redirect:{active:!1,route:"/mars-rover-view/"}},a.controller=new AbortController,a.signal=a.controller.signal,a.validateEmail=function(e){return/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e)},a.handleSubmit=function(e){e.preventDefault();var t=a.validateEmail(a.state.email),n=t?"":"Please enter a valid email";a.setState(function(){return{emailErrorText:n,hasEmailError:!t}}),t&&!a.state.hasPasswordError&&fetch("https://shielded-woodland-10835.herokuapp.com/auth",{method:"POST",signal:a.signal,body:JSON.stringify({email:a.state.email,password:a.state.password}),headers:{"Content-type":"application/json; charset=UTF-8"}}).then(function(e){if(!e.ok)throw console.log("error with new account request"),a.setState({hasLoginError:!0}),new Error("Failed to authenticate, status="+e.status);return e.text()}).then(function(e){console.log(a.props.match),a.props.login(a.state.email,e),console.log("this.props.referrer: "+a.props.referrer),a.setState({redirect:{active:!0,route:1===a.props.referrer?"/mars-rover-view/my-gallery":"/mars-rover-view/"}})}).catch(function(e){return console.log("error: "+e)})},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){}},{key:"handleTextChange",value:function(e,t){t.persist(),this.setState(function(){return Object(E.a)({},e,t.target.value)})}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state.redirect;return a.active?r.a.createElement(Q.a,{to:a.route}):r.a.createElement("main",{className:t.main},r.a.createElement(x.a,null),r.a.createElement(W.a,{className:t.paper},r.a.createElement(w.a,{className:t.avatar},r.a.createElement(R.a,null)),r.a.createElement(U.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement("form",{className:t.form,onSubmit:function(t){return e.handleSubmit(t)}},r.a.createElement(S.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(F.a,{htmlFor:"email"},"Email Address"),r.a.createElement(A.a,{type:"text",autoComplete:"email",autoFocus:!0,value:this.state.email,onChange:function(t){return e.handleTextChange("email",t)}})),r.a.createElement(S.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(F.a,{htmlFor:"password"},"Password"),r.a.createElement(A.a,{name:"password",type:"password",id:"password",autoComplete:"current-password",value:this.state.password,onChange:function(t){return e.handleTextChange("password",t)}})),r.a.createElement(J.a,{container:!0,justify:"space-between"},r.a.createElement(I.a,{control:r.a.createElement(P.a,{value:"remember",color:"primary"}),label:"Remember me"}),r.a.createElement(X.a,{style:{textDecoration:"none",color:"inherit"},to:"/mars-rover-view/create-account"},r.a.createElement(Z.a,{variant:"body2",onClick:function(){e.props.handleMenuNav(3)}},"Create Account"))),r.a.createElement(S.a,{error:!0},this.state.hasLoginError&&r.a.createElement(K.a,null,"Invalid email or password")),r.a.createElement(S.a,null,1===this.props.referrer&&r.a.createElement(K.a,{filled:!0,className:t.infoMessage},r.a.createElement(L.a,{fontSize:"small"})," \xa0 You must be logged in to access that page")),r.a.createElement(C.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"Sign in"))))}}]),t}(r.a.Component),te=V()(function(e){return{main:Object(E.a)({width:"auto",display:"block",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(400+3*e.spacing.unit*2),{width:400,marginLeft:"auto",marginRight:"auto"}),infoMessage:{display:"flex",alignItems:"center"},paper:{marginTop:8*e.spacing.unit,display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(2*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px")},avatar:{margin:e.spacing.unit,backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing.unit},submit:{marginTop:3*e.spacing.unit}}})(ee),ae=a(148),ne=a.n(ae),re=a(152),oe=a(5),ie=a.n(oe),le=a(67),se=a.n(le),ce=a(136),me=a.n(ce),ue=a(68),he=a.n(ue),pe=a(132),de=a.n(pe),ge=a(134),fe=a.n(ge),ve=a(135),Ee=a.n(ve),be=a(133),we=a.n(be),ye=a(26);var Ce=Object(ye.withStyles)(function(e){return{icon:{marginRight:2*e.spacing.unit},heroUnit:{backgroundColor:e.palette.background.paper,width:"100%"},heroContent:{maxWidth:600,margin:"0 auto",padding:"".concat(4*e.spacing.unit,"px 0 ").concat(3*e.spacing.unit,"px")},heroButtons:{marginTop:4*e.spacing.unit},layout:Object(E.a)({width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(1100+3*e.spacing.unit*2),{width:1100,marginLeft:"auto",marginRight:"auto"}),cardGrid:{padding:"".concat(8*e.spacing.unit,"px 0")},card:{height:"100%",display:"flex",flexDirection:"column"},cardMedia:{paddingTop:"56.25%"},cardContent:{flexGrow:1},footer:{backgroundColor:e.palette.background.paper,padding:6*e.spacing.unit},info:{display:"flex",alignItems:"center",justify:"space-between"}}})(function(e){var t=e.classes,a=new AbortController,o=a.signal,i=Object(n.useState)([]),l=Object(re.a)(i,2),s=l[0],c=l[1];return Object(n.useEffect)(function(){return fetch("https://shielded-woodland-10835.herokuapp.com/gallery-saves",{method:"GET",signal:o,headers:{"Content-type":"application/json; charset=UTF-8","x-auth-token":sessionStorage.getItem("rover-view-token")}}).then(function(e){return e.ok||console.log("error loading gallery"),e.json()}).then(function(e){c(e)}).catch(function(e){return console.log("error: "+e)}),function(){a.abort()}},[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,null),r.a.createElement("main",null,r.a.createElement("div",{className:t.heroUnit},r.a.createElement("div",{className:t.heroContent},r.a.createElement(U.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Gallery"))),r.a.createElement("div",{className:ie()(t.layout,t.cardGrid)},r.a.createElement(J.a,{container:!0,spacing:40},s.map(function(e){return r.a.createElement(J.a,{item:!0,key:e.img_src,sm:6,md:4,lg:3},r.a.createElement(se.a,{className:t.card},r.a.createElement(de.a,{className:t.cardMedia,image:e.img_src,title:"image id: ".concat(e.id)}),r.a.createElement(he.a,{className:t.cardContent},r.a.createElement(U.a,{gutterBottom:!0,color:"textSecondary",className:t.info},r.a.createElement(we.a,{fontSize:"small"}),"\xa0",e.rover.name),r.a.createElement(U.a,{gutterBottom:!0,color:"textSecondary",className:t.info},r.a.createElement(fe.a,{fontSize:"small"}),"\xa0",e.camera.full_name),r.a.createElement(U.a,{gutterBottom:!0,color:"textSecondary",className:t.info},r.a.createElement(Ee.a,{fontSize:"small"}),"\xa0",e.sol)),r.a.createElement(me.a,null,r.a.createElement(C.a,{size:"small",color:"primary"},"View"),r.a.createElement(C.a,{size:"small",color:"primary"},"Remove"))))})))),r.a.createElement("footer",{className:t.footer}))}),ke="Email already exists in the system",xe=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",confirmPassword:"",hasPasswordError:!1,hasEmailError:!1,passwordErrorText:"",emailErrorText:"",redirect:!1},a.controller=new AbortController,a.signal=a.controller.signal,a.handleSubmit=function(e){e.preventDefault(),console.log(e);var t=a.validateEmail(a.state.email),n=t?"":"Please enter a valid email";a.setState(function(){return{emailErrorText:n,hasEmailError:!t}}),!t&&a.state.emailErrorText!==ke||a.state.hasPasswordError||fetch("https://shielded-woodland-10835.herokuapp.com/users",{method:"POST",signal:a.signal,body:JSON.stringify({email:a.state.email,password:a.state.password}),headers:{"Content-type":"application/json; charset=UTF-8"}}).then(function(e){if(400===e.status&&a.setState(function(){return{hasEmailError:!0,emailErrorText:ke}}),!e.ok)throw new Error("error with new account request, status="+e.status);return e.text()}).then(function(e){a.props.login(a.state.email,e),a.setState({redirect:!0})}).catch(function(e){return console.log("error: "+e)})},a.validatePassword=function(e,t){return e!==t?"Passwords do not match":/\d/.test(e)&&/[a-z]/.test(e)&&/[A-Z]/.test(e)?e.length<8?"Password should be at least 8 characters":"":"Password should include at least one uppercase letter, one lowercase letter, and one number"},a.validateEmail=function(e){return/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e)},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentWillUnmount",value:function(){this.controller.abort()}},{key:"handleTextChange",value:function(e,t){var a=this;t.persist(),this.setState(function(n){var r,o="";switch(e){case"email":break;case"password":o=a.validatePassword(t.target.value,n.confirmPassword);break;case"confirmPassword":o=a.validatePassword(t.target.value,n.password)}return r={},Object(E.a)(r,e,t.target.value),Object(E.a)(r,"passwordErrorText",o),Object(E.a)(r,"hasPasswordError",0!==o.length),r})}},{key:"render",value:function(){var e=this,t=this.props.classes;return this.state.redirect?r.a.createElement(Q.a,{to:"/mars-rover-view"}):r.a.createElement("main",{className:t.main},r.a.createElement(x.a,null),r.a.createElement(W.a,{className:t.paper},r.a.createElement(w.a,{className:t.avatar},r.a.createElement(R.a,null)),r.a.createElement(U.a,{component:"h1",variant:"h5"},"Create Account"),r.a.createElement("form",{className:t.form,onSubmit:function(t){return e.handleSubmit(t)}},r.a.createElement(S.a,{margin:"normal",required:!0,fullWidth:!0,error:this.state.hasEmailError},r.a.createElement(F.a,{htmlFor:"email"},"Email Address"),r.a.createElement(A.a,{type:"text",autoComplete:"email",autoFocus:!0,value:this.state.email,onChange:function(t){return e.handleTextChange("email",t)}}),this.state.hasEmailError&&r.a.createElement(K.a,null,this.state.emailErrorText)),r.a.createElement(S.a,{margin:"normal",required:!0,fullWidth:!0,error:this.state.hasPasswordError},r.a.createElement(F.a,{htmlFor:"password"},"Password"),r.a.createElement(A.a,{name:"password",type:"password",id:"password",autoComplete:"current-password",value:this.state.password,onChange:function(t){return e.handleTextChange("password",t)}})),r.a.createElement(S.a,{margin:"normal",required:!0,fullWidth:!0,error:this.state.hasPasswordError},r.a.createElement(F.a,{htmlFor:"password"},"Confirm Password"),r.a.createElement(A.a,{name:"password",type:"password",id:"confirm-password",autoComplete:"current-password",value:this.state.confirmPassword,onChange:function(t){return e.handleTextChange("confirmPassword",t)}}),r.a.createElement(K.a,null,this.state.passwordErrorText)),r.a.createElement(C.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"Create Account"))))}}]),t}(r.a.Component),Oe=V()(function(e){return{main:Object(E.a)({width:"auto",display:"block",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(400+3*e.spacing.unit*2),{width:400,marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:8*e.spacing.unit,display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(2*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px")},avatar:{margin:e.spacing.unit,backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing.unit},submit:{marginTop:3*e.spacing.unit}}})(xe),Se=(a(115),a(151)),je=a.n(Se),Ie=a(149),Ne=a.n(Ie),Pe=a(141),Te=a.n(Pe),Ae=a(69),Me=a.n(Ae),Fe=a(138),De=a.n(Fe),Re=a(71),ze=a.n(Re),Le=a(91),_e=a.n(Le),We=a(92),Be=a.n(We),Ue=a(137),He=a.n(Ue),Ve=a(139),Ge=a.n(Ve),Ze=a(140),qe=a.n(Ze),Je=a(326),$e={list:{width:250},fullList:{width:"auto"},navLink:{textDecoration:"none",color:"inherit"}},Ke=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={left:!1},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=r.a.createElement("div",{className:t.list},r.a.createElement(Me.a,null,r.a.createElement(Je.a,{activeStyle:$e.navLink,to:"/mars-rover-view"},r.a.createElement(ze.a,{button:!0},r.a.createElement(_e.a,null,r.a.createElement(He.a,null)),r.a.createElement(Be.a,{primary:"Rover View"})))),r.a.createElement(De.a,null),r.a.createElement(Me.a,null,[this.props.loggedIn?"Sign Out":"Sign in","My Gallery"].map(function(t,a){return r.a.createElement(Je.a,{activeStyle:$e.navLink,key:t,to:a%2===0?"/mars-rover-view/sign-in":"/mars-rover-view/my-gallery"},r.a.createElement(ze.a,{button:!0,onClick:function(){return e.props.handleMenuNav(a)}},r.a.createElement(_e.a,null,a%2===0?r.a.createElement(Ge.a,null):r.a.createElement(qe.a,null)),r.a.createElement(Be.a,{primary:t})))})));return r.a.createElement("div",null,r.a.createElement(Te.a,{open:this.props.isOpen,onClose:function(){return e.props.toggleDrawer(!1)}},r.a.createElement("div",{tabIndex:0,role:"button",onClick:function(){return e.props.toggleDrawer(!1)},onKeyDown:function(){return e.props.toggleDrawer(!1)}},a)))}}]),t}(r.a.Component),Ye=Object(ye.withStyles)($e)(Ke),Qe=a(39),Xe=a.n(Qe),et=a(55),tt=a(73),at=a.n(tt),nt=a(41),rt=a.n(nt),ot=a(142),it=a.n(ot),lt=a(143),st=a.n(lt),ct={margin:"0 auto",width:"100%",position:"relative",top:0,left:0},mt=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{style:Object(s.a)({height:"".concat(1/e.aspect,"%")},ct),src:e.src,hidden:!e.show}))},ut=a(72),ht=a.n(ut),pt={width:"100%",maxWidth:"600px",borderRadius:"9999px",backgroundColor:"#ccc"},dt=Object(s.a)({bottom:"auto",position:"fixed"},pt),gt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).isScrolledIntoView=function(e){return e.getBoundingClientRect().top>=a.props.offset},a.handleScroll=function(e){var t=!a.isScrolledIntoView(a.myRef.current);a.setState({isFloating:t})},a.myRef=r.a.createRef(),a.state={isFloating:!1},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.handleScroll)}},{key:"render",value:function(){var e=this.props.offset<-30?this.props.offset-64:this.props.offset;return r.a.createElement(r.a.Fragment,null,r.a.createElement(J.a,{container:!0},r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement("span",{style:{}}),r.a.createElement("div",{style:Object(s.a)({zIndex:this.props.zIndex},this.state.isFloating?Object(s.a)({},dt,{top:20-this.props.offset}):pt)},this.props.children))),r.a.createElement("span",{ref:this.myRef,style:Object(s.a)({height:"56px"},this.props.absolute?{position:"absolute",top:e,left:e}:{})}))}}]),t}(n.Component);gt.defaultProps={offset:0,absolute:!1,zIndex:1};var ft=ht()(gt),vt=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentWillUpdate",value:function(){document.body.style.overflow="scroll",document.body.style.paddingRight=0}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.children)}}]),t}(n.Component),Et=a(144),bt=a.n(Et),wt=a(74),yt=a.n(wt),Ct={curiosity:{},opportunity:{},spirit:{}},kt=function(e){for(var t=0,a={a:10,b:11,c:12,d:13,e:14,f:15},n=0;n<e.length;n++)t+=parseInt("abcdef".includes(e[n])?a[e[n]]:e[n])*Math.pow(16,e.length-1-n);return t},xt=function(e){var t=e.photo_manifest.name.toLowerCase();Ct[t]=e.photo_manifest;for(var a=[],n=e.photo_manifest.photos,r=0,o=0;a.length<Ct[t].max_sol;r++)a.push(n[o].sol===r?n[o++]:{sol:r,earth_date:"",total_photos:0,cameras:[]});Ct[t].photos=a},Ot=function e(t){var a="https://shielded-woodland-10835.herokuapp.com/manifests/".concat(t);fetch(a).then(function(e){return e.json()}).then(xt).catch(function(a){console.log("parsing failed",a),e(t)})},St={position:"absolute",top:10,left:10,maxWidth:"600px"},jt=function(){function e(t,a){Object(c.a)(this,e),this._abbrev=t,this._full=a,this._totalPhotos=0}return Object(m.a)(e,[{key:"abbrev",get:function(){return this._abbrev}},{key:"full",get:function(){return this._full}},{key:"totalPhotos",get:function(){return this._totalPhotos},set:function(e){this._totalPhotos=e}}]),e}(),It=[new jt("fhaz","Front Hazard Avoidance"),new jt("rhaz","Rear Hazard Avoidance"),new jt("mast","Mast"),new jt("chemcam","Chemistry and Camera Complex"),new jt("mahli","Mars Hand Lens Imager"),new jt("mardi","Mars Descent Imager"),new jt("navcam","Navigation"),new jt("pancam","Panoramic"),new jt("minites","Miniature Thermal Emission Spectrometer")],Nt=["curiosity","opportunity","spirit"],Pt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).getAvailablePhotos=function(){Ct.curiosity.photos&&Ct.opportunity.photos&&Ct.spirit.photos&&a.setState(function(e,t){return{photosAvailable:Ct[Nt[e.rover]].photos[e.sol||0].total_photos}})},a.handleLoadClick=function(e){var t="https://shielded-woodland-10835.herokuapp.com/".concat(Nt[a.state.rover],"/").concat(a.state.sol),n=Object(et.a)(Object(et.a)(a));fetch(t).then(function(e){return e.json()}).then(function(e){var t;n.setCameraDistrubtion(e.photos),n.setState(function(a,n){return t=0===a.rover?"mast":"pancam",{photos:e.photos,cam:t,roverCamIndex:a.rover}}),n.loadImages(t)}).catch(function(e){console.log("parsing failed",e)})},a.loadImages=function(e){var t=[],n=e.toUpperCase();for(var r in a.state.photos)if(n===a.state.photos[r].camera.name){var o=new Image;o.src=a.state.photos[r].img_src,o.originalIndex=r,o.onload=function(){},o.onerror=function(){},t.push(o)}a.setState(function(e,a){return{totalPhotos:t.length,imageObjects:[].concat(t),sliderValue:t.length>0?1:0}})},a.handleCamChange=function(e){a.setState({cam:e.target.value}),a.loadImages(e.target.value)},a.handleSliderChange=function(e,t){a.setState({sliderValue:t})},a.handleRoverChange=function(e){a.setState({rover:e.target.value}),a.getAvailablePhotos()},a.handleSolChange=function(e){var t=e.target.value;/^\d*$/.test(t)&&t>=0&&t<Ct[Nt[a.state.rover]].max_sol&&(a.setState({sol:/^0?$/.test(t)?0:t.replace(/^0*/,"")}),a.getAvailablePhotos())},a.setCameraDistrubtion=function(e){a.setState(function(t,a){var n={FHAZ:0,RHAZ:0,MAST:0,CHEMCAM:0,MAHLI:0,MARDI:0,NAVCAM:0,PANCAM:0,MINITES:0};for(var r in e)n[e[r].camera.name]++;return{roverCams:t.roverCams.map(function(e,a){return t.rover===a?e.map(function(e){var t={abbrev:e.abbrev,full:e.full,totalPhotos:0};return Object(s.a)({},t,{totalPhotos:n[e.abbrev.toUpperCase()]})}):e})}})},a.handleSaveImageClick=function(){if(a.props.loggedIn){var e=a.state,t=e.imageObjects,n=e.sliderValue,r=e.photos;fetch("https://shielded-woodland-10835.herokuapp.com/gallery-saves",{method:"POST",body:JSON.stringify({photo:JSON.stringify(r[t[n-1].originalIndex])}),headers:{"Content-type":"application/json; charset=UTF-8","x-auth-token":sessionStorage.getItem("rover-view-token")}}).then(function(e){if(!e.ok)throw new Error("HTTP error, status = "+e.status);return a.props.openSnackBar("Added to gallery"),e.json()}).then(function(e){return console.log(e)}).catch(function(e){return console.log(e)})}},a.state={sliderValue:0,rover:0,roverCamIndex:0,totalPhotos:0,cam:"",sol:"0",photosAvailable:3702,imageObjects:[],photos:[],roverCams:[[0,1,2,3,4,5,6].map(function(e){return It[e]}),[0,1,6,7,8].map(function(e){return It[e]}),[0,1,6,7,8].map(function(e){return It[e]})]},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){for(var e in Ct)Ot(e)}},{key:"render",value:function(){var e=this,t=this.props.classes,a=.25*Math.min(this.props.windowWidth,600)+50>(this.props.windowWidth-600)/2;return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,null),r.a.createElement("main",null,r.a.createElement("div",{className:t.heroUnit},r.a.createElement("div",{className:t.heroContent},r.a.createElement(U.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Rover View"),r.a.createElement(U.a,{className:t.brief,variant:"h6",align:"center",color:"textSecondary",paragraph:!0},"Choose a rover, camera, and sol(Martian day, starting from the beginning of the mission), click load, and use the slider to animate the images"),r.a.createElement("div",null,r.a.createElement(J.a,{container:!0,justify:"space-evenly",alignItems:"center"},r.a.createElement(J.a,{item:!0,xs:6,sm:5},r.a.createElement(J.a,{container:!0,justify:"center"},r.a.createElement(S.a,{className:ie()(t.mainField,t.formControl)},r.a.createElement(F.a,{shrink:!0},"Rover"),r.a.createElement(at.a,{value:this.state.rover,onChange:this.handleRoverChange,input:r.a.createElement(A.a,{name:"rover"}),displayEmpty:!0,name:"rover",className:t.selectEmpty},r.a.createElement(rt.a,{value:0},r.a.createElement(vt,null,"Curiosity")),r.a.createElement(rt.a,{value:1},r.a.createElement(vt,null,"Opportunity")),r.a.createElement(rt.a,{value:2},r.a.createElement(vt,null,"Spirit"))),r.a.createElement(K.a,null)))),r.a.createElement(J.a,{item:!0,xs:6,sm:1}),r.a.createElement(J.a,{item:!0,xs:6,sm:3},r.a.createElement(J.a,{container:!0,justify:"center"},r.a.createElement(S.a,{className:ie()(t.mainField,t.formControl)},r.a.createElement(it.a,{className:t.solSpinner,label:"Sol",value:this.state.sol,onChange:this.handleSolChange,type:"number",helperText:"of ".concat(Ct[Nt[this.state.rover]].max_sol-1||2360),InputLabelProps:{shrink:!0}})))),r.a.createElement(J.a,{item:!0,xs:6,sm:3},r.a.createElement(C.a,{onClick:this.handleLoadClick,variant:"contained",color:"primary",className:t.button},"Load"),r.a.createElement(K.a,null,this.state.photosAvailable," photos available ")),r.a.createElement(ft,{offset:6,zIndex:3},r.a.createElement(J.a,{container:!0,justify:"space-evenly",alignItems:"center",className:t.sliderContainer},r.a.createElement(J.a,{item:!0,xs:10},r.a.createElement(st.a,{className:t.slider,value:this.state.sliderValue,min:1,max:this.state.totalPhotos,step:1,onChange:this.handleSliderChange})),r.a.createElement(J.a,{item:!0,xs:2,align:"center"},r.a.createElement(U.a,{variant:"h6",className:t.floatingDisplay},this.state.sliderValue)))))))),r.a.createElement("div",{className:ie()(t.layout,t.cardGrid)},r.a.createElement(se.a,{className:t.card},r.a.createElement(he.a,null,r.a.createElement("div",{className:t.imageContainer},this.state.imageObjects.map(function(t,a){return r.a.createElement(mt,{aspect:t.width/t.height,show:e.state.sliderValue-1===a,src:t.src,key:t.src,alt:"frame ".concat(a)})}),this.state.photos.length>0&&r.a.createElement(r.a.Fragment,null,this.state.imageObjects.length>0&&r.a.createElement(Xe.a,{onClick:this.handleSaveImageClick,style:{position:"absolute",top:"5px",right:"5px",zIndex:2}},r.a.createElement(yt.a,{title:this.props.loggedIn?"Add to My Gallery":"Sign in to add"},r.a.createElement(bt.a,null))),r.a.createElement(ft,{offset:a?-40:16,absolute:!0},r.a.createElement(J.a,{container:!0,justify:"space-between",style:Object(s.a)({},St,{width:this.props.windowWidth-90})},r.a.createElement(J.a,{item:!0,xs:3},r.a.createElement(W.a,{className:t.camSelectContainerNested},r.a.createElement(S.a,{className:ie()(t.mainField,t.formControl)},r.a.createElement(F.a,{shrink:!0},"Camera"),r.a.createElement(at.a,{value:this.state.cam||" ",onChange:this.handleCamChange,input:r.a.createElement(A.a,{name:"camera"}),displayEmpty:!0,name:"camera",className:ie()(t.selectEmpty)},this.state.roverCams[this.state.roverCamIndex].map(function(t,a){return(t.totalPhotos>0||e.state.cam===t.abbrev)&&r.a.createElement(rt.a,{key:a,value:t.abbrev},r.a.createElement(vt,null,t.full," (".concat(t.totalPhotos,")")))})),r.a.createElement(K.a,null,"rover: ".concat(Nt[this.state.roverCamIndex]))))))))))))))}}]),t}(r.a.Component),Tt=ht()(Object(ye.withStyles)(function(e){var t;t=e.palette.primary.main,kt("".concat(t[1]).concat(t[2])),kt("".concat(t[3]).concat(t[4])),kt("".concat(t[5]).concat(t[6]));return{slider:{padding:e.spacing.unit},floatingDisplay:{color:e.palette.primary.main},sliderContainer:{padding:"0 16px"},camSelect:{opacity:1,maxHeight:"100px"},camSelectContainerNested:{backgroundColor:"rgba(66,66,66, .9)"},imageContainer:{position:"relative",left:0,top:0,alignItems:"flex-start",minHeight:"1000px",justifyContent:"flex-start"},button:{margin:e.spacing.unit},heroUnit:{backgroundColor:e.palette.background.paper,width:"100%"},heroContent:{maxWidth:600,margin:"0 auto",padding:"".concat(4*e.spacing.unit,"px 0 ").concat(3*e.spacing.unit,"px")},layout:Object(E.a)({width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(1100+3*e.spacing.unit*2),{width:1100,marginLeft:"auto",marginRight:"auto"}),cardGrid:{padding:"".concat(e.spacing.unit,"px 0")},formControl:{margin:e.spacing.unit,width:120},mainField:{width:"90%"},camera:{minWidth:80},brief:{fontSize:".75em"}}})(Pt)),At=a(145),Mt=a.n(At),Ft=a(146),Dt=a.n(Ft),Rt=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={anchorEl:null},a.handleMenu=function(e){a.setState({anchorEl:e.currentTarget})},a.handleClose=function(){a.setState({anchorEl:null})},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state.anchorEl,a=Boolean(t);return r.a.createElement("div",null,r.a.createElement(yt.a,{title:this.props.email},r.a.createElement(Xe.a,{"aria-owns":a?"menu-appbar":void 0,"aria-haspopup":"true",onClick:this.handleMenu,color:"inherit"},r.a.createElement(Mt.a,null))),r.a.createElement(Dt.a,{id:"menu-appbar",anchorEl:t,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},open:a,onClose:this.handleClose},r.a.createElement(rt.a,{onClick:function(){return e.props.logOut()}},r.a.createElement(vt,null,r.a.createElement(X.a,{style:{textDecoration:"none",color:"inherit"},to:"/mars-rover-view/sign-in"},"Sign Out")))))}}]),t}(n.Component),zt=a(328),Lt=a(329),_t=a(154),Wt=a(327),Bt=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={pageToDisplay:2,drawerOpen:!1,loggedIn:!1,snackbarOpen:!1,email:"",menuIndexClicked:0},a.controller=new AbortController,a.signal=a.controller.signal,a.toggleDrawer=function(e){a.setState({drawerOpen:e})},a.goHome=function(){a.setState(function(){return{pageToDisplay:2}})},a.logOut=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];console.log("LOGGED OUT"),sessionStorage.removeItem("rover-view-token"),a.openSnackbar("Signed out",e),a.setState(function(){return{loggedIn:!1,email:"",menuIndexClicked:0}})},a.handleMenuNav=function(e){a.setState(function(t){var n={};return 0===e&&t.loggedIn&&(a.openSnackbar("Signed out"),sessionStorage.removeItem("rover-view-token"),n={loggedIn:!1,email:""}),Object(s.a)({},n,{menuIndexClicked:e})})},a.handleSnackbarClose=function(e,t){"clickaway"!==t&&a.setState({snackbarOpen:!1})},a.login=function(e,t){sessionStorage.setItem("rover-view-token",t),a.openSnackbar("Signed in as ".concat(e)),a.setState(function(t){return{loggedIn:!0,email:e}})},a.openSnackbar=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];a.setState(function(){return{snackBarMsg:e,snackbarOpen:t}})},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=sessionStorage.getItem("rover-view-token");t&&(console.log("token exists"),fetch("https://shielded-woodland-10835.herokuapp.com/users/me",{method:"GET",signal:this.signal,headers:{"Content-type":"application/json; charset=UTF-8","x-auth-token":t}}).then(function(t){return t.ok||(console.log("Authentication error occurred"),e.logOut(!1)),t.json()}).then(function(t){e.setState({loggedIn:!0,email:t.email})}).catch(function(e){return console.log("error: "+e)}))}},{key:"componentWillUnmount",value:function(){this.controller.abort()}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state.loggedIn;return r.a.createElement(zt.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{position:"static",className:t.appBar},r.a.createElement(ne.a,null,r.a.createElement(J.a,{container:!0,justify:"space-between"},r.a.createElement(Xe.a,{onClick:function(){return e.toggleDrawer(!0)},style:{marginLeft:-12,marginRight:20},color:"inherit","aria-label":"Menu"},r.a.createElement(Ne.a,null)),this.state.loggedIn&&r.a.createElement(Rt,{email:this.state.email,logOut:this.logOut})),r.a.createElement(Ye,{loggedIn:this.state.loggedIn,logout:this.logOut,toggleDrawer:this.toggleDrawer,isOpen:this.state.drawerOpen,goHome:this.goHome,handleMenuNav:this.handleMenuNav})),r.a.createElement(g.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.snackbarOpen,autoHideDuration:6e3,onClose:this.handleSnackbarClose,ContentProps:{"aria-describedby":"message-id"},message:r.a.createElement("span",{id:"message-id"},this.state.snackBarMsg),action:[r.a.createElement(Xe.a,{key:"close","aria-label":"Close",color:"inherit",onClick:this.handleSnackbarClose},r.a.createElement(je.a,null))]})),r.a.createElement(Lt.a,null,r.a.createElement(_t.a,{exact:!0,path:"/mars-rover-view",render:function(t){return r.a.createElement(Tt,{loggedIn:e.state.loggedIn,openSnackBar:e.openSnackbar})}}),r.a.createElement(_t.a,{exact:!0,path:"/mars-rover-view/sign-in",render:function(t){return r.a.createElement(te,{referrer:e.state.menuIndexClicked,handleMenuNav:e.handleMenuNav,login:e.login})}}),r.a.createElement(_t.a,{exact:!0,path:"/mars-rover-view/create-account",render:function(t){return r.a.createElement(Oe,{login:e.login})}}),r.a.createElement(_t.a,{path:"/mars-rover-view/my-gallery",render:function(){return a?r.a.createElement(Ce,null):r.a.createElement(Wt.a,{to:"/mars-rover-view/sign-in"})}}))))}}]),t}(n.Component),Ut=(n.Component,Object(ye.withStyles)(function(e){return{appBar:{position:"relative",width:"100%"},snackBar:{color:"#FFF",backgroundColor:e.palette.primary.dark}}})(Bt));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ht=Object(ye.createMuiTheme)({palette:{type:"dark",secondary:{main:"#b71c1c"},primary:{main:"#ab5810"}}});i.a.render(r.a.createElement(ye.MuiThemeProvider,{theme:Ht},r.a.createElement(Ut,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[155,1,2]]]);
//# sourceMappingURL=main.1bc5bf49.chunk.js.map