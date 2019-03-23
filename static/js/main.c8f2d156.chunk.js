(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,a,t){e.exports=t(250)},108:function(e,a,t){},250:function(e,a,t){"use strict";t.r(a);var n=t(1),o=t.n(n),r=t(15),i=t.n(r),s=(t(108),t(102)),l=t(92),c=t(101),m=t(29),h=t(55),u=t(56),p=t(93),g=t(7),d=t.n(g),v=t(96),f=t.n(v),E=t(99),b=t.n(E),y=t(94),w=t.n(y),C=t(16),k=t.n(C),x=t(97),j=t.n(x),S=t(32),O=t.n(S),N=t(19),_=t(30),P=t.n(_),A=t(40),L=t.n(A),R=t(39),I=t.n(R),M=t(33),V=t.n(M),z=t(26),B=t.n(z),T=t(98),W=t.n(T),H=t(100),D=t.n(H),F=function(e){return o.a.createElement("img",{style:{margin:"0 auto",width:"100%",height:"".concat(1/e.aspect,"%")},src:e.src,hidden:!e.show})},G=(t(109),t(31)),J=t.n(G),U={curiosity:{},opportunity:{},spirit:{}},$=function(e){console.log("json: "+e);var a=e.photo_manifest.name.toLowerCase();U[a]=e.photo_manifest;for(var t=[],n=e.photo_manifest.photos,o=n[0].sol,r=0;t.length<U[a].max_sol;o++)t.push(n[r].sol===o?n[r++]:{sol:o,earth_date:"",total_photos:0,cameras:[]});U[a].photos=t},q=function e(a){var t="https://shielded-woodland-10835.herokuapp.com/manifests/".concat(a);console.log("fetchurl: "+t),fetch(t).then(function(e){return e.json()}).then($).catch(function(t){console.log("parsing failed",t),console.log("typeof ex: "+typeof t),"object"==typeof t&&console.log("ex keys: "+Object.keys(t)),e(a)})};for(var K in U)q(K);var Q=function(){function e(a,t){Object(h.a)(this,e),this._abbrev=a,this._full=t}return Object(u.a)(e,[{key:"abbrev",get:function(){return this._abbrev}},{key:"full",get:function(){return this._full}}]),e}(),X=[new Q("fhaz","Front Hazard Avoidance"),new Q("rhaz","Rear Hazard Avoidance"),new Q("mast","Mast"),new Q("chemcam","Chemistry and Camera Complex"),new Q("mahli","Mars Hand Lens Imager"),new Q("mardi","Mars Descent Imager"),new Q("navcam","Navigation"),new Q("pancam","Panoramic"),new Q("minites","Miniature Thermal Emission Spectrometer")],Y=[[0,1,2,3,4,5,6].map(function(e){return X[e]}),[0,1,6,7,8].map(function(e){return X[e]}),[0,1,6,7,8].map(function(e){return X[e]})],Z=["curiosity","opportunity","spirit"],ee=function(e){function a(e){var t;return Object(h.a)(this,a),(t=Object(s.a)(this,Object(l.a)(a).call(this,e))).getAvailablePhotos=function(){U.curiosity.photos&&U.opportunity.photos&&U.spirit.photos&&t.setState(function(e,a){return{photosAvailable:U[Z[e.rover]].photos[e.sol].total_photos}})},t.handleLoadClick=function(e){var a="https://shielded-woodland-10835.herokuapp.com/".concat(Z[t.state.rover],"/").concat(t.state.sol,"/").concat(t.state.cam),n=Object(m.a)(Object(m.a)(t));fetch(a).then(function(e){return e.json()}).then(function(e){var a=[];for(var t in e.photos){var o=new Image;o.src=e.photos[t].img_src,o.onload=function(){},o.onerror=function(){},a.push(o)}n.setState({totalPhotos:e.photos.length,photos:e.photos,imageObjects:a})}).catch(function(e){console.log("parsing failed",e)})},t.handleCamChange=function(e){console.log("handleCamChange, event: "+e),t.setState({cam:e.target.value})},t.handleSliderChange=function(e,a){t.setState({sliderValue:a})},t.handleRoverChange=function(e){console.log("rovername: "+Object.keys(U[Z[t.state.rover]])),console.log("maxsol: "+U[Z[t.state.rover]].max_sol),t.setState({rover:e.target.value,sol:0,cam:0===e.target.value?"mast":"pancam"}),t.getAvailablePhotos()},t.handleSolChange=function(e){/^\d+$/.test(e.target.value)&&e.target.value>=0&&e.target.value<U[Z[t.state.rover]].max_sol&&(t.setState({sol:parseInt(e.target.value)}),t.getAvailablePhotos())},t.state={sliderValue:0,rover:0,totalPhotos:0,cam:"mast",sol:0,photosAvailable:3702,imageObjects:[],photos:[]},t}return Object(c.a)(a,e),Object(u.a)(a,[{key:"render",value:function(){var e=this,a=this.props.classes;return o.a.createElement(o.a.Fragment,null,o.a.createElement(w.a,null),o.a.createElement(f.a,{position:"static",className:a.appBar},o.a.createElement(j.a,null,o.a.createElement(O.a,{variant:"h6",color:"inherit",noWrap:!0},"Rover View"))),o.a.createElement("main",null,o.a.createElement("div",{className:a.heroUnit},o.a.createElement("div",{className:a.heroContent},o.a.createElement(O.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Rover View"),o.a.createElement(O.a,{className:a.brief,variant:"h6",align:"center",color:"textSecondary",paragraph:!0},"Choose a rover, camera, and sol(Martian day, starting from the beginning of the mission), click load, and use the slider to animate the images"),o.a.createElement("div",null,o.a.createElement(k.a,{container:!0,spacing:16,justify:"space-evenly",alignItems:"center"},o.a.createElement(k.a,{item:!0,xs:6,sm:3},o.a.createElement(k.a,{container:!0,justify:"center"},o.a.createElement(P.a,{className:a.formControl},o.a.createElement(I.a,{shrink:!0},"Rover"),o.a.createElement(L.a,{value:this.state.rover,onChange:this.handleRoverChange,input:o.a.createElement(B.a,{name:"rover"}),displayEmpty:!0,name:"rover",className:a.selectEmpty},o.a.createElement(V.a,{value:0},"Curiosity"),o.a.createElement(V.a,{value:1},"Opportunity"),o.a.createElement(V.a,{value:2},"Spirit")),o.a.createElement(J.a,null)))),o.a.createElement(k.a,{item:!0,xs:6,sm:3},o.a.createElement(P.a,{className:a.formControl},o.a.createElement(I.a,{shrink:!0},"Camera"),o.a.createElement(L.a,{value:this.state.cam,onChange:this.handleCamChange,input:o.a.createElement(B.a,{name:"cam"}),displayEmpty:!0,name:"cam",className:a.selectEmpty},Y[this.state.rover].map(function(e,a){return o.a.createElement(V.a,{key:a,value:e.abbrev},e.full," ")})),o.a.createElement(J.a,null))),o.a.createElement(k.a,{item:!0,xs:6,sm:3},o.a.createElement(k.a,{container:!0,justify:"center"},o.a.createElement(P.a,{className:a.formControl},o.a.createElement(W.a,{className:a.solSpinner,label:"Sol",value:this.state.sol,onChange:this.handleSolChange,type:"number",helperText:"of ".concat(U[Z[this.state.rover]].max_sol-1||2350),InputLabelProps:{shrink:!0}})))),o.a.createElement(k.a,{item:!0,xs:6,sm:3},o.a.createElement(b.a,{onClick:this.handleLoadClick,variant:"contained",color:"primary",className:a.button},"Load"),o.a.createElement(J.a,null,this.state.photosAvailable," photos available")),o.a.createElement(k.a,{item:!0,xs:10},o.a.createElement(D.a,{className:a.slider,value:this.state.sliderValue,min:1,max:this.state.totalPhotos,step:1,onChange:this.handleSliderChange})),o.a.createElement(k.a,{item:!0,xs:2},o.a.createElement(O.a,{variant:"h6",align:"center",color:"textSecondary",paragraph:!0},this.state.sliderValue)))))),o.a.createElement("div",{className:d()(a.layout,a.cardGrid)},o.a.createElement(k.a,{container:!0,spacing:16,className:a.imageContainer},this.state.imageObjects.map(function(a,t){return o.a.createElement(F,{aspect:a.width/a.height,show:e.state.sliderValue-1===t,src:a.src,key:a.src,alt:"frame ".concat(t)})})))))}}]),a}(o.a.Component),ae=Object(N.withStyles)(function(e){return{slider:{padding:e.spacing.unit},totalSolDisplay:{},solSpinner:{},imageContainer:{minHeight:"1000px"},appBar:{position:"relative",width:"100%"},button:{margin:e.spacing.unit},heroUnit:{backgroundColor:e.palette.background.paper,width:"100%"},heroContent:{maxWidth:600,margin:"0 auto",padding:"".concat(4*e.spacing.unit,"px 0 ").concat(3*e.spacing.unit,"px")},layout:Object(p.a)({width:"auto",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(1100+3*e.spacing.unit*2),{width:1100,marginLeft:"auto",marginRight:"auto"}),cardGrid:{padding:"".concat(8*e.spacing.unit,"px 0")},formControl:{margin:e.spacing.unit,width:120},camera:{minWidth:80},brief:{fontSize:".75em"}}},{withTheme:!1})(ee);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var te=Object(N.createMuiTheme)({palette:{type:"dark",secondary:{main:"#b71c1c"},primary:{main:"#ab5810"}}});i.a.render(o.a.createElement(N.MuiThemeProvider,{theme:te},o.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[103,1,2]]]);
//# sourceMappingURL=main.c8f2d156.chunk.js.map