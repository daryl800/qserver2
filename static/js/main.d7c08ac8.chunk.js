(this.webpackJsonpqserver2=this.webpackJsonpqserver2||[]).push([[0],{30:function(e,a,t){},37:function(e,a,t){e.exports=t.p+"static/media/logo.5d5d9eef.svg"},42:function(e,a,t){e.exports=t(63)},50:function(e,a,t){},51:function(e,a,t){},61:function(e,a,t){},63:function(e,a,t){"use strict";t.r(a);var n=t(2),r=t.n(n),o=t(22),c=t.n(o),l=t(9),s=t(10),u=t(12),i=t(11),m=(t(30),t(41)),d=t(40),p=t(23),v=(t(50),function(e){Object(u.a)(t,e);var a=Object(i.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){var e=this.props,a=e.value,t=e.clickHandler,n="X"===a?"square-1":"square-2";return console.log("cls: "+n),r.a.createElement("span",{className:n,onClick:function(){t()}},a)}}]),t}(r.a.Component)),h=function(e){Object(u.a)(t,e);var a=Object(i.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"cellClickHandler",value:function(e){alert(e+" clicked")}},{key:"render",value:function(){var e=this,a=[];return this.props.board.map((function(t,n){console.log("val: "+t+" || index: "+n),a.push(r.a.createElement("div",null,r.a.createElement(v,{key:n,value:t,clickHandler:function(){return e.cellClickHandler(n)}})))})),r.a.createElement("div",{className:"board"},a)}}]),t}(r.a.Component),f=(t(51),p.a.initializeApp({apiKey:"AIzaSyCJcKHsm9yfeCIZcQtwIgz7j8j0v_lJUFQ",authDomain:"queuesapp-415d3.firebaseapp.com",databaseURL:"https://queuesapp-415d3.firebaseio.com",projectId:"queuesapp-415d3",storageBucket:"queuesapp-415d3.appspot.com",messagingSenderId:"1023683818860",appId:"1:1023683818860:web:fbdb633ee95a930c"}).firestore()),g=function(e){Object(u.a)(t,e);var a=Object(i.a)(t);function t(e){var n;return Object(l.a)(this,t),(n=a.call(this,e)).state={board:[],servingQNum:0,lastQNum:0},n}return Object(s.a)(t,[{key:"componentDidMount",value:function(){this.updateQueue("queue_"+this.props.queue)}},{key:"addToQueue",value:function(e,a,t){console.log("add to Queue"),this.setState({board:this.state.board.concat(e),lastQNum:a,servingQNum:t})}},{key:"updateQueue",value:function(e){var a=this;console.log("updateQueue called"),f.collection("SweeCafe").doc(e).onSnapshot({includeMetadataChanges:!0},(function(e){var t=e.data().name,n=e.data().rear_no,r=e.data().serving_no;if(console.log("queue_name: (firebase)",t),console.log("serving_no: (firebase)",r),console.log("servingQNum: (local)",a.state.servingQNum),console.log("lastQNum: (local)",a.state.lastQNum),0==a.state.lastQNum)for(var o=1;o<=n;o++)o<=r?a.addToQueue("X",n,r):a.addToQueue(a.props.queue+o,n,r);else n>a.state.lastQNum?(console.log("rear_num_from_firebase: "+n),console.log("lastQNum: "+a.state.lastQNum),a.addToQueue(a.props.queue+n,n,r)):r>a.state.servingQNum&&a.updateServingQNum(r)}))}},{key:"updateServingQNum",value:function(e){var a=e-1,t=Object(d.a)(this.state.board);Object(m.a)({},t[a]);t[a]="X",this.setState({board:t,servingQNum:e})}},{key:"next",value:function(){this.state.servingQNum<this.state.lastQNum?f.collection("SweeCafe").doc("queue_"+this.props.queue).update({serving_no:p.a.firestore.FieldValue.increment(1)},{merge:!0}).then((function(){console.log("Document successfully written!")})).catch((function(e){console.error("Error writing document: ",e)})):alert("Alert:  Reached end of queue!")}},{key:"reset",value:function(){f.collection("SweeCafe").doc("queue_"+this.props.queue).set({serving_no:0,rear_no:1},{merge:!0}).then((function(){console.log("Document successfully written!")})).catch((function(e){console.error("Error writing document: ",e)})),this.setState({board:[],lastQNum:0})}},{key:"render",value:function(){return console.log("<<< rendering >>>"),r.a.createElement("div",{className:"queue"},r.a.createElement("div",{className:"displayBox"},r.a.createElement("p",null,"Currently serving: ",r.a.createElement("strong",null," ",this.props.queue,this.state.servingQNum," ")),r.a.createElement("p",null,"Last in queue: ",r.a.createElement("strong",null," ",this.props.queue,this.state.lastQNum," "))),r.a.createElement("div",{className:"queue-body"},r.a.createElement(h,{board:this.state.board})),r.a.createElement("button",{className:"nextButton",variant:"primary",onClick:this.next.bind(this)},"Next"),r.a.createElement("br",null),r.a.createElement("button",{className:"nextButton",variant:"primary",onClick:this.reset.bind(this)},"RESET"))}}]),t}(r.a.Component),b=t(36),E=t(37),N=t.n(E),Q=function(e){Object(u.a)(t,e);var a=Object(i.a)(t);function t(){var e;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=a.call.apply(a,[this].concat(r))).scrollToTop=function(){b.animateScroll.scrollToTop()},e}return Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"nav",id:"navbar"},r.a.createElement("div",{className:"nav-content"},r.a.createElement("img",{src:N.a,className:"nav-logo",alt:"Logo",onClick:this.scrollToTop}),r.a.createElement("h2",null,"QServer")))}}]),t}(n.Component),y=t(38),_=t(24),k=t(39),q=function(e){Object(u.a)(t,e);var a=Object(i.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){return console.log("<<< rendering 1 >>>"),r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,null),r.a.createElement("main",{className:"container"},r.a.createElement(y.a,null,r.a.createElement(k.a,null,r.a.createElement(_.a,null,r.a.createElement("h3",{className:"header"},"Queue A"),r.a.createElement("div",{className:"app__content"},r.a.createElement("div",{className:"app__header"}),r.a.createElement("div",{className:"app__body"},r.a.createElement(g,{queue:"A"})))),r.a.createElement(_.a,null,r.a.createElement("h3",{className:"header"},"Queue B"),r.a.createElement("div",{className:"app__content"},r.a.createElement("div",{className:"app__header"}),r.a.createElement("div",{className:"app__body"},r.a.createElement(g,{queue:"B"})))),r.a.createElement(_.a,null,r.a.createElement("h3",{className:"header"},"Queue C"),r.a.createElement("div",{className:"app__content"},r.a.createElement("div",{className:"app__header"}),r.a.createElement("div",{className:"app__body"},r.a.createElement(g,{queue:"C"}))))))))}}]),t}(n.Component);t(61),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(62);c.a.render(r.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[42,1,2]]]);
//# sourceMappingURL=main.d7c08ac8.chunk.js.map