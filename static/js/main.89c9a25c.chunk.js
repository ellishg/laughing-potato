(this["webpackJsonplaughing-potato"]=this["webpackJsonplaughing-potato"]||[]).push([[0],{39:function(e,t,a){e.exports=a(53)},44:function(e){e.exports=JSON.parse('{"flour":{"cups":1,"grams":136},"butter":{"cups":1,"grams":227},"white sugar":{"cups":1,"grams":201},"sugar":{"cups":1,"grams":201}}')},53:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),o=a.n(c),l=a(15),i=a(60),u=a(62),m=a(58),s=a(59),g=a(17),p=a(5),h=function(){return r.a.createElement("div",null,r.a.createElement(i.a.Title,null,"About"),r.a.createElement(i.a.Link,{href:"https://github.com/ellishg/laughing-potato"},"github.com/ellishg/laughing-potato"),r.a.createElement(i.a.Text,null,"This is a simple collection of recipes that are easy to read. If you would like to add your own recipe, please make a pull request at ",r.a.createElement("a",{href:"https://github.com/ellishg/urban-bassoon"},"github.com/ellishg/urban-bassoon"),"."))},E=a(55),f=function(){return r.a.createElement(E.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading..."))},d=a(56),b=a(61),v=a(57),y=function(e){var t=Math.trunc(e+.001),a=e-t,n=a<1/8/2?null:a<.1875?"1/8":a<1/4+(1/3-1/4)/2?"1/4":a<1/3+(3/8-1/3)/2?"1/3":a<.4375?"3/8":a<.5625?"1/2":a<5/8+(2/3-5/8)/2?"5/8":a<2/3+(3/4-2/3)/2?"2/3":a<.8125?"3/4":"7/8";return 0===t?n||"0":"".concat(t)+(n?" ".concat(n):"")},S=function(e){var t=e.recipeName,c=Object(n.useState)(),o=Object(l.a)(c,2),s=o[0],g=o[1],p=Object(n.useState)((function(){return localStorage.getItem("useMetricUnit")===(!0).toString()})),h=Object(l.a)(p,2),E=h[0],S=h[1],k=Object(n.useState)(),O=Object(l.a)(k,2),j=O[0],w=O[1];return Object(n.useEffect)((function(){localStorage.getItem("useMetricUnit")!==E.toString()&&localStorage.setItem("useMetricUnit",E.toString())}),[E]),Object(n.useEffect)((function(){fetch("/laughing-potato/recipe-data/"+t+".json").then((function(e){return e.text()})).then((function(e){return g(JSON.parse(e))})).catch((function(e){return w(e.message)}))}),[t]),j?r.a.createElement(m.a,{variant:"danger"},"Could not find recipe for '",t,"'"):s?r.a.createElement("div",null,r.a.createElement(i.a.Title,{as:"h1"},s.title,r.a.createElement(d.a,{toggle:!0},r.a.createElement(b.a,{type:"radio",value:E.toString(),checked:E,onChange:function(){return S(!0)}},"Metric"),r.a.createElement(b.a,{type:"radio",value:(!E).toString(),checked:!E,onChange:function(){return S(!1)}},"Imperial"))),r.a.createElement(i.a.Text,null,s.description),s.images.map((function(e,t){return r.a.createElement(v.a,{src:"/laughing-potato/"+e,rounded:!0,style:{width:"8rem"},key:t})})),r.a.createElement(i.a.Header,{as:"h2"},"Ingredients"),r.a.createElement(i.a.Body,null,r.a.createElement(u.a,null,s.ingredients.map((function(e,t){return r.a.createElement(u.a.Item,{key:t},function(e,t){var n=a(44),r=new Map([["grams","g"],["tablespoons","tbsp."],["teaspoons","tsp."],["ounces","oz"]]);if(e.unit){var c=e.amount,o=e.unit;if(e.name in n){var l=n[e.name],i=l.cups,u=l.grams;t&&"cups"===o?(c=c*u/i,o="grams"):t||"grams"!==o||(c=c*i/u,o="cups")}return"".concat(y(c)," ").concat(r.get(o)||o)}return y(e.amount)}(e,E)," ",e.name)})))),r.a.createElement(i.a.Header,{as:"h2"},"Directions"),r.a.createElement(i.a.Body,null,r.a.createElement("ol",null,s.directions.map((function(e,t){return r.a.createElement("li",{key:t},e)}))))):r.a.createElement(f,null)},k=function(){var e=Object(n.useState)(),t=Object(l.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){fetch("/laughing-potato/recipe-data/recipe-list.json").then((function(e){return e.text()})).then((function(e){return c(JSON.parse(e))}))}),[]),a?r.a.createElement("div",null,r.a.createElement(i.a.Title,null,"Recipe List"),r.a.createElement(u.a,null,a.map((function(e,t){return r.a.createElement(u.a.Item,{key:t},r.a.createElement(g.b,{to:"/laughing-potato/recipe/"+e.filename},e.title))})))):r.a.createElement(f,null)},O=function(){return r.a.createElement(m.a,{variant:"danger"},"Invalid URL.")},j=function(){return r.a.createElement(g.a,null,r.a.createElement(i.a,null,r.a.createElement(i.a.Header,null,r.a.createElement(s.a,{variant:"tabs",defaultActiveKey:"/"},r.a.createElement(s.a.Item,null,r.a.createElement(s.a.Link,{as:g.b,to:"/laughing-potato/"},"Home")),r.a.createElement(s.a.Item,null,r.a.createElement(s.a.Link,{as:g.b,to:"/laughing-potato/about"},"About")))),r.a.createElement(i.a.Body,null,r.a.createElement(p.c,null,r.a.createElement(p.a,{path:"/laughing-potato/",exact:!0,component:k}),r.a.createElement(p.a,{path:"/laughing-potato/about",exact:!0,component:h}),r.a.createElement(p.a,{path:"/laughing-potato/recipe/:recipeName",exact:!0,component:function(e){return r.a.createElement(S,{recipeName:e.match.params.recipeName})}}),r.a.createElement(p.a,{component:O})))))};a(52),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.89c9a25c.chunk.js.map