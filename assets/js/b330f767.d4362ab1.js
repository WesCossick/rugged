"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[383],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>g});var r=n(6540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),f=u(n),g=a,d=f["".concat(s,".").concat(g)]||f[g]||p[g]||o;return n?r.createElement(d,i(i({ref:t},c),{},{components:n})):r.createElement(d,i({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9365:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(6540),a=n(870);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:n,className:i}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.A)(o,i),hidden:n},t)}},4865:(e,t,n)=>{n.d(t,{A:()=>g});var r=n(8168),a=n(6540),o=n(870),i=n(2303),l=n(1682),s=n(6976),u=n(3104);const c="tabList__CuJ",p="tabItem_LNqP";function f(e){const{lazy:t,block:n,defaultValue:i,values:f,groupId:g,className:d}=e,m=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=f??m.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),y=(0,l.X)(b,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const v=null===i?i:i??m.find((e=>e.props.default))?.props.value??m[0].props.value;if(null!==v&&!b.some((e=>e.value===v)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${v}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:h,setTabGroupChoices:w}=(0,s.x)(),[O,T]=(0,a.useState)(v),E=[],{blockElementScrollPositionUntilNextRender:j}=(0,u.a_)();if(null!=g){const e=h[g];null!=e&&e!==O&&b.some((t=>t.value===e))&&T(e)}const x=e=>{const t=e.currentTarget,n=E.indexOf(t),r=b[n].value;r!==O&&(j(t),T(r),null!=g&&w(g,String(r)))},k=e=>{let t=null;switch(e.key){case"Enter":x(e);break;case"ArrowRight":{const n=E.indexOf(e.currentTarget)+1;t=E[n]??E[0];break}case"ArrowLeft":{const n=E.indexOf(e.currentTarget)-1;t=E[n]??E[E.length-1];break}}t?.focus()};return a.createElement("div",{className:(0,o.A)("tabs-container",c)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},d)},b.map((e=>{let{value:t,label:n,attributes:i}=e;return a.createElement("li",(0,r.A)({role:"tab",tabIndex:O===t?0:-1,"aria-selected":O===t,key:t,ref:e=>E.push(e),onKeyDown:k,onClick:x},i,{className:(0,o.A)("tabs__item",p,i?.className,{"tabs__item--active":O===t})}),n??t)}))),t?(0,a.cloneElement)(m.filter((e=>e.props.value===O))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},m.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==O})))))}function g(e){const t=(0,i.A)();return a.createElement(f,(0,r.A)({key:String(t)},e))}},4797:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>g,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var r=n(8168),a=(n(6540),n(5680)),o=n(4865),i=n(9365);const l={title:"Config file",slug:"/configuration/file"},s=void 0,u={unversionedId:"configuration/file",id:"configuration/file",title:"Config file",description:"Rugged supports a configuration file at the root of the repository, written in either TypeScript or JavaScript. The file can use any of the available config options.",source:"@site/docs/configuration/file.md",sourceDirName:"configuration",slug:"/configuration/file",permalink:"/docs/configuration/file",draft:!1,editUrl:"https://github.com/sparksuite/rugged/edit/master/website/docs/configuration/file.md",tags:[],version:"current",frontMatter:{title:"Config file",slug:"/configuration/file"},sidebar:"default",previous:{title:"Options",permalink:"/docs/configuration/options"},next:{title:"CLI args",permalink:"/docs/configuration/cli"}},c={},p=[],f={toc:p};function g(e){let{components:t,...n}=e;return(0,a.yg)("wrapper",(0,r.A)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"Rugged supports a configuration file at the root of the repository, written in either TypeScript or JavaScript. The file can use any of the available ",(0,a.yg)("a",{parentName:"p",href:"/docs/configuration/options"},"config options"),"."),(0,a.yg)(o.A,{groupId:"language",defaultValue:"ts",values:[{label:"TypeScript",value:"ts"},{label:"JavaScript",value:"js"}],mdxType:"Tabs"},(0,a.yg)(i.A,{value:"ts",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts",metastring:'title="rugged.config.ts"',title:'"rugged.config.ts"'},"import { Config } from 'rugged';\n\nconst config: Config = {\n    // Config options go here\n};\n\nexport default config;\n"))),(0,a.yg)(i.A,{value:"js",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="rugged.config.js"',title:'"rugged.config.js"'},"module.exports = {\n    // Config options go here\n};\n")))))}g.isMDXComponent=!0}}]);