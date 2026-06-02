const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/three.module-DEr07-xz.js","assets/three.core-q-WGY-P2.js","assets/CSS3DRenderer-m8hO0bwP.js","assets/EffectComposer-cPWNpv0X.js","assets/CopyShader-BzTUYzf6.js","assets/Pass-B8wrNoK5.js","assets/RenderPass-21Cnp93D.js","assets/UnrealBloomPass-_7LCtout.js","assets/OutputPass-B0h7yean.js","assets/lights-DGcazgiY.js","assets/particles-CcgJCtl7.js","assets/islands-DRt8OSMY.js","assets/camera-bMDuc2xH.js","assets/cards-BikhYICp.js"])))=>i.map(i=>d[i]);
(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))v(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&v(i)}).observe(document,{childList:!0,subtree:!0});function l(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function v(t){if(t.ep)return;t.ep=!0;const o=l(t);fetch(t.href,o)}})();const F="modulepreload",U=function(n){return"/"+n},T={},r=function(s,l,v){let t=Promise.resolve();if(l&&l.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));t=Promise.allSettled(l.map(c=>{if(c=U(c),c in T)return;T[c]=!0;const h=c.endsWith(".css"),P=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${P}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":F,h||(d.as="script"),d.crossOrigin="",d.href=c,a&&d.setAttribute("nonce",a),document.head.appendChild(d),h)return new Promise((E,L)=>{d.addEventListener("load",E),d.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return t.then(i=>{for(const a of i||[])a.status==="rejected"&&o(a.reason);return s().catch(o)})};window.addEventListener("DOMContentLoaded",async()=>{console.log("⚡ Initializing 3D Portfolio Bootloader...");const n=document.createElement("div");n.id="loading-overlay",n.innerHTML=`
    <div class="loader-content">
      <div class="spinner"></div>
      <p>Assembling 3D Archipelago...</p>
    </div>
  `,document.body.appendChild(n);const s=document.createElement("style");s.textContent=`
    #loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #0a0a1a;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.8s ease;
      color: #ffffff;
      font-family: 'Space Grotesk', sans-serif;
    }
    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(0, 240, 255, 0.15);
      border-top-color: #00f0ff;
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,document.head.appendChild(s);try{const[l,v]=await Promise.all([r(()=>import("./three.module-DEr07-xz.js"),__vite__mapDeps([0,1])),r(()=>import("./index-a9woYdh8.js"),[])]),{gsap:t}=v,{ScrollTrigger:o}=await r(async()=>{const{ScrollTrigger:e}=await import("./ScrollTrigger-88WqrurJ.js");return{ScrollTrigger:e}},[]);t.registerPlugin(o);const{CSS3DRenderer:i}=await r(async()=>{const{CSS3DRenderer:e}=await import("./CSS3DRenderer-m8hO0bwP.js");return{CSS3DRenderer:e}},__vite__mapDeps([2,0,1])),{EffectComposer:a}=await r(async()=>{const{EffectComposer:e}=await import("./EffectComposer-cPWNpv0X.js");return{EffectComposer:e}},__vite__mapDeps([3,0,1,4,5])),{RenderPass:c}=await r(async()=>{const{RenderPass:e}=await import("./RenderPass-21Cnp93D.js");return{RenderPass:e}},__vite__mapDeps([6,0,1,5])),{UnrealBloomPass:h}=await r(async()=>{const{UnrealBloomPass:e}=await import("./UnrealBloomPass-_7LCtout.js");return{UnrealBloomPass:e}},__vite__mapDeps([7,0,1,5,4])),{OutputPass:P}=await r(async()=>{const{OutputPass:e}=await import("./OutputPass-B0h7yean.js");return{OutputPass:e}},__vite__mapDeps([8,0,1,5])),{detectDevice:d}=await r(async()=>{const{detectDevice:e}=await import("./device-Dq4ziCwf.js");return{detectDevice:e}},[]),{setupLights:E}=await r(async()=>{const{setupLights:e}=await import("./lights-DGcazgiY.js");return{setupLights:e}},__vite__mapDeps([9,1])),{setupParticles:L}=await r(async()=>{const{setupParticles:e}=await import("./particles-CcgJCtl7.js");return{setupParticles:e}},__vite__mapDeps([10,1])),{createIslands:x}=await r(async()=>{const{createIslands:e}=await import("./islands-DRt8OSMY.js");return{createIslands:e}},__vite__mapDeps([11,1])),{setupCameraTrack:b}=await r(async()=>{const{setupCameraTrack:e}=await import("./camera-bMDuc2xH.js");return{setupCameraTrack:e}},__vite__mapDeps([12,1])),{initCards:I}=await r(async()=>{const{initCards:e}=await import("./cards-BikhYICp.js");return{initCards:e}},__vite__mapDeps([13,2,0,1])),{initNav:u}=await r(async()=>{const{initNav:e}=await import("./nav-BaPl7Zfa.js");return{initNav:e}},[]);Y(l,t,o,i,a,c,h,P,d,E,L,x,b,I,u,n)}catch(l){console.error("❌ Failed to load 3D assets:",l),n.innerHTML=`
      <div style="text-align: center; padding: 20px;">
        <h3 style="color: #ffc107;">Unable to Load 3D WebGL Scene</h3>
        <p style="color: #a0a0c0; margin: 10px 0;">Please check your connection and try again.</p>
        <button onclick="window.location.reload()" style="background:#00f0ff; border:none; padding:8px 16px; border-radius:4px; cursor:pointer;">Retry</button>
      </div>
    `}});function Y(n,s,l,v,t,o,i,a,c,h,P,d,E,L,x,b){const u=c().config,e=new n.Scene;e.background=new n.Color(657946),u.useFog&&(e.fog=new n.FogExp2(657946,.015));const C=new n.Scene,p=new n.PerspectiveCamera(55,window.innerWidth/window.innerHeight,.1,300);p.position.set(0,5,20);const V=document.getElementById("webgl-container"),w=new n.WebGLRenderer({antialias:u.antialias,alpha:!1,powerPreference:"high-performance"});w.setSize(window.innerWidth,window.innerHeight),w.setPixelRatio(u.pixelRatio),u.shadows&&(w.shadowMap.enabled=!0,w.shadowMap.type=n.PCFSoftShadowMap),w.toneMapping=n.ACESFilmicToneMapping,w.toneMappingExposure=1,V.appendChild(w.domElement);const k=document.getElementById("css3d-container"),f=new v;f.setSize(window.innerWidth,window.innerHeight),f.domElement.style.position="absolute",f.domElement.style.top="0",f.domElement.style.left="0",f.domElement.style.width="100%",f.domElement.style.height="100%",f.domElement.style.pointerEvents="none",k.appendChild(f.domElement);let y;if(u.enableBloom){const g=new o(e,p),m=new i(new n.Vector2(window.innerWidth,window.innerHeight),.8,.4,.3),D=new a;y=new t(w),y.addPass(g),y.addPass(m),y.addPass(D)}h(e,u);const M=P(e,u.particleCount),W=d(e,u),S=L(n,C),z=x(s),O=E(n,s,l,p,e,C,z),_={x:0,y:0,targetX:0,targetY:0};window.addEventListener("mousemove",g=>{_.targetX=g.clientX/window.innerWidth-.5,_.targetY=g.clientY/window.innerHeight-.5}),window.addEventListener("resize",()=>{p.aspect=window.innerWidth/window.innerHeight,p.updateProjectionMatrix(),w.setSize(window.innerWidth,window.innerHeight),f.setSize(window.innerWidth,window.innerHeight),y&&y.setSize(window.innerWidth,window.innerHeight)});let A=0;const B=new n.Clock;function R(){requestAnimationFrame(R);const g=B.getElapsedTime();M.update(g),W.forEach((m,D)=>{m.userData&&m.userData.initialY!==void 0?(m.position.y=m.userData.initialY+Math.sin(g*m.userData.speed+m.userData.phase)*.1,m.rotation.y+=.01):(m.position.y+=Math.sin(g*.8+D*2)*.0015,m.rotation.y+=Math.sin(g*.2+D)*1e-4)}),S&&S.update&&S.update(g),_.x+=(_.targetX-_.x)*.08,_.y+=(_.targetY-_.y)*.08,p.position.x=_.x*.8,p.position.y=-_.y*.8,p.position.z=0,O&&O.target&&p.lookAt(O.target),y&&u.enableBloom?y.render():w.render(e,p),f.render(C,p),A<5&&(A++,A===5&&s.to(b,{opacity:0,duration:.8,onComplete:()=>b.remove()}))}R()}
