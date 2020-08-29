(this["webpackJsonplaughing-potato"]=this["webpackJsonplaughing-potato"]||[]).push([[0],{41:function(e,t,a){e.exports=a(55)},46:function(e){e.exports=JSON.parse('{"flour":{"cups":1,"grams":136},"butter":{"cups":1,"grams":227},"white sugar":{"cups":1,"grams":201},"sugar":{"cups":1,"grams":201}}')},55:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),o=a.n(c),l=a(11),u=a(63),i=a(60),s=a(65),m=a(61),p=a(62),g=a(17),f=a(5),h=function(){return r.a.createElement("div",null,r.a.createElement(u.a.Title,null,"About"),r.a.createElement(u.a.Link,{href:"https://github.com/ellishg/laughing-potato"},"github.com/ellishg/laughing-potato"),r.a.createElement(u.a.Text,null,"This is a simple collection of recipes that are easy to read. If you would like to add your own recipe, please make a pull request at"," ",r.a.createElement("a",{href:"https://github.com/ellishg/urban-bassoon"},"github.com/ellishg/urban-bassoon"),"."))},E=a(57),d=function(){return r.a.createElement(E.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading..."))},b=a(58),v=a(64),O=a(59),j=function(e){var t=Math.trunc(e+.001),a=e-t,n=a<1/8/2?null:a<.1875?"1/8":a<1/4+(1/3-1/4)/2?"1/4":a<1/3+(3/8-1/3)/2?"1/3":a<.4375?"3/8":a<.5625?"1/2":a<5/8+(2/3-5/8)/2?"5/8":a<2/3+(3/4-2/3)/2?"2/3":a<.8125?"3/4":"7/8";return 0===t?n||"0":"".concat(t)+(n?" ".concat(n):"")},S=function(e){var t=e.recipeName,c=Object(n.useState)(),o=Object(l.a)(c,2),i=o[0],p=o[1],g=Object(n.useState)((function(){return localStorage.getItem("useMetricUnit")===(!0).toString()})),f=Object(l.a)(g,2),h=f[0],E=f[1],S=Object(n.useState)(),y=Object(l.a)(S,2),k=y[0],w=y[1];return Object(n.useEffect)((function(){localStorage.getItem("useMetricUnit")!==h.toString()&&localStorage.setItem("useMetricUnit",h.toString())}),[h]),Object(n.useEffect)((function(){fetch("/laughing-potato/recipe-data/"+t+".json").then((function(e){return e.text()})).then((function(e){return p(JSON.parse(e))})).catch((function(e){return w(e.message)}))}),[t]),k?r.a.createElement(m.a,{variant:"danger"},"Could not find recipe for '",t,"'"):i?r.a.createElement("div",null,r.a.createElement(u.a.Title,{as:"h1"},i.title,r.a.createElement(b.a,{toggle:!0},r.a.createElement(v.a,{type:"radio",value:h.toString(),checked:h,onChange:function(){return E(!0)}},"Metric"),r.a.createElement(v.a,{type:"radio",value:(!h).toString(),checked:!h,onChange:function(){return E(!1)}},"Imperial"))),r.a.createElement(u.a.Text,null,i.description),i.images.map((function(e,t){return r.a.createElement(O.a,{src:"/laughing-potato/"+e,rounded:!0,style:{width:"8rem"},key:t})})),r.a.createElement(u.a.Header,{as:"h2"},"Ingredients"),r.a.createElement(u.a.Body,null,r.a.createElement(s.a,null,i.ingredients.map((function(e,t){return r.a.createElement(s.a.Item,{key:t},function(e,t){var n=a(46),r=new Map([["grams","g"],["tablespoons","tbsp."],["teaspoons","tsp."],["ounces","oz"]]);if(e.unit){var c=e.amount,o=e.unit;if(e.name in n){var l=n[e.name],u=l.cups,i=l.grams;t&&"cups"===o?(c=c*i/u,o="grams"):t||"grams"!==o||(c=c*u/i,o="cups")}return"".concat(j(c)," ").concat(r.get(o)||o)}return j(e.amount)}(e,h)," ",e.name)})))),r.a.createElement(u.a.Header,{as:"h2"},"Directions"),r.a.createElement(u.a.Body,null,r.a.createElement("ol",null,i.directions.map((function(e,t){return r.a.createElement("li",{key:t},e)}))))):r.a.createElement(d,null)},y=a(38),k=a.n(y),w=function(){var e=Object(n.useState)(),t=Object(l.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(),m=Object(l.a)(o,2),p=m[0],f=m[1],h=Object(n.useState)(""),E=Object(l.a)(h,2),b=E[0],v=E[1],O=Object(n.useState)(),j=Object(l.a)(O,2),S=j[0],y=j[1],w=Object(n.useState)(),I=Object(l.a)(w,2),x=I[0],M=I[1];Object(n.useEffect)((function(){fetch("/laughing-potato/recipe-data/recipe-list.json").then((function(e){return e.text()})).then((function(e){return c(JSON.parse(e))}))}),[]),Object(n.useEffect)((function(){if(a){var e=a.map((function(e){return e.tags.concat([e.title])}));M(e.reduce((function(e,t,a){return t.forEach((function(t){var n;return e.set(t,(null===(n=e.get(t))||void 0===n?void 0:n.concat([a]))||[a])})),e}),new Map)),y(k()(e.flat()))}}),[a]),Object(n.useEffect)((function(){if(b){var e,t=((null===S||void 0===S||null===(e=S.get(b))||void 0===e?void 0:e.flatMap((function(e){var t=Object(l.a)(e,2);t[0];return t[1]})))||[]).flatMap((function(e){return(null===x||void 0===x?void 0:x.get(e))||[]})).reverse().filter((function(e,t,a){return a.lastIndexOf(e)===t})).reverse();f(t)}else f((null===a||void 0===a?void 0:a.map((function(e,t){return t})))||[])}),[a,b,S,x]);return p?r.a.createElement("div",null,r.a.createElement(u.a.Title,null,"Recipe List"),r.a.createElement(i.a,{onSubmit:function(e){e.preventDefault()}},r.a.createElement(i.a.Group,null,r.a.createElement(i.a.Control,{placeholder:"Search for a recipe!",onChange:function(e){e.preventDefault(),v(e.target.value)}}))),r.a.createElement(s.a,null,p.map((function(e){return r.a.createElement(s.a.Item,{key:e},r.a.createElement(g.b,{to:"/laughing-potato/recipe/"+a[e].filename},a[e].title))})))):r.a.createElement(d,null)},I=function(){return r.a.createElement(m.a,{variant:"danger"},"Invalid URL.")},x=function(e){return r.a.createElement(S,{recipeName:e.match.params.recipeName})},M=function(){return r.a.createElement(g.a,null,r.a.createElement(u.a,null,r.a.createElement(u.a.Header,null,r.a.createElement(p.a,{variant:"tabs",defaultActiveKey:"/"},r.a.createElement(p.a.Item,null,r.a.createElement(p.a.Link,{as:g.b,to:"/laughing-potato/"},"Home")),r.a.createElement(p.a.Item,null,r.a.createElement(p.a.Link,{as:g.b,to:"/laughing-potato/about"},"About")))),r.a.createElement(u.a.Body,null,r.a.createElement(f.c,null,r.a.createElement(f.a,{path:"/laughing-potato/",exact:!0,component:w}),r.a.createElement(f.a,{path:"/laughing-potato/about",exact:!0,component:h}),r.a.createElement(f.a,{path:"/laughing-potato/recipe/:recipeName",exact:!0,component:x}),r.a.createElement(f.a,{component:I})))))};a(54),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[41,1,2]]]);
//# sourceMappingURL=main.dc63625a.chunk.js.map