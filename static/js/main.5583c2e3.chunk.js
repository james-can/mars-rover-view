(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){e.exports=a(250)},108:function(e,t,a){},250:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(15),l=a.n(r),s=(a(108),a(102)),i=a(92),c=a(101),m=a(28),h=a(55),u=a(56),p=a(93),g=(a(7),a(96)),d=a.n(g),v=a(99),f=a.n(v),E=a(94),b=a.n(E),w=a(16),C=a.n(w),y=a(97),k=a.n(y),x=a(31),S=a.n(x),j=a(38),O=a(29),N=a.n(O),_=a(40),P=a.n(_),A=a(39),L=a.n(A),R=a(32),I=a.n(R),V=a(25),z=a.n(V),B=a(98),M=a.n(B),W=a(100),H=a.n(W),T=function(e){return o.a.createElement("img",{style:{width:"100%",height:"".concat(1/e.aspect,"%")},src:e.src,hidden:!e.show})},D=(a(109),a(30)),F=a.n(D),J={curiosity:{},opportunity:{},spirit:{}},U=function(e){var t=e.photo_manifest.name.toLowerCase();J[t]=e.photo_manifest;for(var a=[],n=e.photo_manifest.photos,o=n[0].sol,r=0;a.length<J[t].max_sol;o++)a.push(n[r].sol===o?n[r++]:{sol:o,earth_date:"",total_photos:0,cameras:[]});J[t].photos=a};for(var $ in J){var q="https://shielded-woodland-10835.herokuapp.com/manifests/".concat($);console.log("fetchurl: "+q),fetch(q).then(function(e){return e.json()}).then(U).catch(function(e){console.log("parsing failed",e)})}var G=function(){function e(t,a){Object(h.a)(this,e),this._abbrev=t,this._full=a}return Object(u.a)(e,[{key:"abbrev",get:function(){return this._abbrev}},{key:"full",get:function(){return this._full}}]),e}(),K=[new G("fhaz","Front Hazard Avoidance"),new G("rhaz","Rear Hazard Avoidance"),new G("mast","Mast"),new G("chemcam","Chemistry and Camera Complex"),new G("mahli","Mars Hand Lens Imager"),new G("mardi","Mars Descent Imager"),new G("navcam","Navigation"),new G("pancam","Panoramic"),new G("minites","Miniature Thermal Emission Spectrometer")],Q=[[0,1,2,3,4,5,6].map(function(e){return K[e]}),[0,1,6,7,8].map(function(e){return K[e]}),[0,1,6,7,8].map(function(e){return K[e]})],X=["curiosity","opportunity","spirit"],Y=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).getAvailablePhotos=function(){a.setState(function(e,t){return{photosAvailable:J[X[e.rover]].photos[e.sol].total_photos}})},a.handleLoadClick=function(e){console.log("totalphotos: "+a.state.totalPhotos);var t="https://shielded-woodland-10835.herokuapp.com/".concat(X[a.state.rover],"/").concat(a.state.sol,"/").concat(a.state.cam);console.log(t);var n=Object(m.a)(Object(m.a)(a));fetch(t).then(function(e){return e.json()}).then(function(e){console.log("parsed json",e);var t=[],a=[],o=function(o){var r=new Image;r.src=e.photos[o].img_src,a.push(new Promise(function(e,t){r.onload=function(){e(r.src)},r.onerror=function(){t(r.src)}})),t.push(r),Promise.all(a).then(function(){console.log("all images loaded"),n.setState({totalPhotos:e.photos.length,photos:e.photos,imageObjects:t})}).catch(function(e){console.log("failed to load: "+e)}),n.setState({totalPhotos:e.photos.length,photos:e.photos,imageObjects:t})};for(var r in e.photos)o(r)}).catch(function(e){console.log("parsing failed",e)})},a.handleCamChange=function(e){console.log("handleCamChange, event: "+e),a.setState({cam:e.target.value})},a.handleSliderChange=function(e,t){a.setState({sliderValue:t})},a.handleRoverChange=function(e){console.log("rovername: "+Object.keys(J[X[a.state.rover]])),console.log("maxsol: "+J[X[a.state.rover]].max_sol),a.setState({rover:e.target.value}),a.getAvailablePhotos()},a.handleSolChange=function(e){/^\d+$/.test(e.target.value)&&e.target.value>=0&&(a.setState({sol:parseInt(e.target.value)}),a.getAvailablePhotos())},a.state={sliderValue:0,rover:0,totalPhotos:0,cam:"",sol:0,photosAvailable:3702,imageObjects:[],photos:[]},a}return Object(c.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a,null),o.a.createElement(d.a,{position:"static",className:t.appBar},o.a.createElement(k.a,null,o.a.createElement(S.a,{variant:"h6",color:"inherit",noWrap:!0},"Rover View"))),o.a.createElement("main",null,o.a.createElement("div",{className:t.heroUnit},o.a.createElement("div",{className:t.heroContent},o.a.createElement(S.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Rover View"),o.a.createElement(S.a,{className:t.brief,variant:"h6",align:"center",color:"textSecondary",paragraph:!0},"Choose a rover, camera, and sol(Martian day, starting from the beginning of the mission), click load, and use the slider to animate the images"),o.a.createElement("div",null,o.a.createElement(C.a,{container:!0,spacing:16,alignItems:"center"},o.a.createElement(C.a,{item:!0,xs:3},o.a.createElement(N.a,{className:t.formControl},o.a.createElement(L.a,{shrink:!0},"Rover"),o.a.createElement(P.a,{value:this.state.rover,onChange:this.handleRoverChange,input:o.a.createElement(z.a,{name:"rover"}),displayEmpty:!0,name:"rover",className:t.selectEmpty},o.a.createElement(I.a,{value:0},"Curiosity"),o.a.createElement(I.a,{value:1},"Opportunity"),o.a.createElement(I.a,{value:2},"Spirit")),o.a.createElement(F.a,null))),o.a.createElement(C.a,{item:!0,xs:3},o.a.createElement(N.a,{className:t.formControl},o.a.createElement(L.a,{shrink:!0},"Camera"),o.a.createElement(P.a,{value:this.state.cam,onChange:this.handleCamChange,input:o.a.createElement(z.a,{name:"cam"}),displayEmpty:!0,name:"cam",className:t.selectEmpty},Q[this.state.rover].map(function(e,t){return o.a.createElement(I.a,{key:t,value:e.abbrev},e.full," ")})),o.a.createElement(F.a,null))),o.a.createElement(C.a,{item:!0,xs:3},o.a.createElement(N.a,{className:t.formControl},o.a.createElement(M.a,{className:t.solSpinner,label:"Sol",value:this.state.sol,onChange:this.handleSolChange,type:"number",helperText:"of ".concat(J[X[this.state.rover]].max_sol||2350),InputLabelProps:{shrink:!0}}))),o.a.createElement(C.a,{item:!0,xs:3},o.a.createElement(f.a,{onClick:this.handleLoadClick,variant:"contained",color:"primary",className:t.button},"Load"),o.a.createElement(F.a,null,this.state.photosAvailable," photos available")),o.a.createElement(C.a,{item:!0,xs:10},o.a.createElement(H.a,{className:t.slider,value:this.state.sliderValue,min:1,max:this.state.totalPhotos,step:1,onChange:this.handleSliderChange})),o.a.createElement(C.a,{item:!0,xs:2},o.a.createElement(S.a,{variant:"h6",align:"center",color:"textSecondary",paragraph:!0},this.state.sliderValue)))))),o.a.createElement("div",{className:t.layout},o.a.createElement(C.a,{container:!0,spacing:40},this.state.imageObjects.map(function(t,a){return o.a.createElement(T,{aspect:t.width/t.height,show:e.state.sliderValue-1===a,src:t.src,key:t.src,alt:"frame ".concat(a)})})))))}}]),t}(o.a.Component),Z=Object(j.withStyles)(function(e){return{slider:{padding:"22px"},totalSolDisplay:{},solSpinner:{},appBar:{position:"relative"},button:{margin:e.spacing.unit},heroUnit:{backgroundColor:e.palette.background.paper},heroContent:{maxWidth:600,margin:"0 auto",padding:"".concat(4*e.spacing.unit,"px 0 ").concat(3*e.spacing.unit,"px")},layout:Object(p.a)({width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(1100+3*e.spacing.unit*2),{width:1100,marginLeft:"auto",marginRight:"auto"}),formControl:{margin:e.spacing.unit,maxWidth:120},brief:{fontSize:".75em"}}},{withTheme:!1})(Y);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[103,1,2]]]);
//# sourceMappingURL=main.5583c2e3.chunk.js.map