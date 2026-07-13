import{a as $,S as A,N as O,P as x,M as T,K as N,b as l}from"./assets/vendor-D-vJw_Y6.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&n(y)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const D=document.querySelector(".burger-btn"),j=document.querySelector(".mob-menu-close-btn"),L=document.querySelector(".mob-menu"),H=window.matchMedia("(min-width: 768px)"),U=()=>{console.log("click on burger"),L.classList.add("is-open")},P=()=>{L.classList.remove("is-open")},F=e=>{e.matches&&P()},K=e=>{e.target.closest("a")!==null&&P()};L.addEventListener("click",K);D.addEventListener("click",U);j.addEventListener("click",P);H.addEventListener("change",F);const g=$.create({baseURL:"https://wedding-photographer.b.goit.study/api"}),V=async()=>{try{return(await g.get("feedbacks",{params:{limit:9,page:1}})).data}catch(e){console.log(e)}},_=async()=>{try{return(await g.get("categories")).data}catch(e){console.log(e)}},k=async({pageNumber:e=1,limit:t=9,sortName:o="title",categoryId:n}={})=>{try{return(await g.get("wedding-photos",{params:{page:`${e}`,limit:`${t}`,sortName:`${o}`,categoryId:n}})).data}catch(r){console.log(r)}},G=async({name:e,phone:t,message:o})=>{try{return await g.post("orders",{name:e,phone:t,message:o})}catch(n){console.log(n)}},q=document.querySelector(".feedbacks-list"),R=e=>e.map(({descr:t,name:o})=>`
       <li class="feedbacks-item swiper-slide">
       <div class="feedbacks-item-textual-wrapper">
          <p class="feedbacks-comments">
           ${t}
          </p>
          <p class="feedbacks-names">${o}</p>
        </div>
        </li>`).join(""),W=async()=>{q.textContent="";try{const e=await V();q.insertAdjacentHTML("afterbegin",R(e.feedbacks))}catch(e){console.log(e)}};W();new A(".swiper",{modules:[O,x,T,N],spaceBetween:24,speed:500,breakpoints:{320:{slidesPerView:1},768:{slidesPerView:3}},mousewheel:{forceToAxis:!0},keyboard:{enabled:!0,onlyInViewport:!0},navigation:{nextEl:".feedbacks-button-next",prevEl:".feedbacks-button-prev"},pagination:{el:".custom-swiper-pagination",type:"bullets",clickable:!0,dynamicBullets:!0}});const Y=e=>{let t;l.fire({title:`${e} <br><b></b>`,timer:2e3,timerProgressBar:!0,didOpen:()=>{l.showLoading();const o=l.getPopup().querySelector("b");t=setInterval(()=>{o.textContent=`${l.getTimerLeft()}`},100)},willClose:()=>{clearInterval(t)}})},u=e=>{l.fire({position:"top-end",icon:"error",title:"Oops...",text:`${e}`,showConfirmButton:!1,timer:2e3})},C=document.querySelector(".loader"),M=()=>{C.classList.remove("visually-hidden")},d=()=>{C.classList.add("visually-hidden")},I=document.querySelector(".portfolio-buttons-list"),f=document.querySelector(".portfolio-gallery-list"),S=document.querySelector(".portfolio-button-load-more"),z=document.querySelector(".portfolio-uploaded-photo"),J=document.querySelector(".portfolio-total-amount");S.disabled=!0;const Q=e=>e.map(({_id:t,category:o})=>`
        <li data-id="${t}">
            <button type="button" class="portfolio-button" data-id="${t}">
                ${o}
            </button>
        </li>
        `).join(""),X=async()=>{try{const e=await _();I.insertAdjacentHTML("beforeend",Q(e))}catch(e){console.log(e)}};X();let c=0,h=3,m=1,p,a=0;const B=(e,t)=>{z.textContent=e,J.textContent=t},E=e=>e.map(({_id:t,img:o,title:n})=>`  
        <li class="portfolio-gallery-item" data-id="${t}">
            <img src="${o}" alt="${n}">
        </li>`).join(""),b=()=>{f.innerHTML="",c=0,m=1,h=3,p=null,a=0},i=e=>{S.disabled=e},Z=async()=>{b(),M(),i(!0);try{const e=await k({});if(c=e.totalItems,m+=e.weddingPhotos.length/h,a+=e.weddingPhotos.length,B(a,c),e.weddingPhotos.length===0)throw new Error("Empty array");f.insertAdjacentHTML("beforeend",E(e.weddingPhotos)),i(!1),d()}catch(e){console.log(e),u(e),b(),i(!0),d()}};Z();const w=(e,t)=>{if(e>=t)return Y("NO MORE CONTENT"),i(!0),d(),!0},ee=async()=>{if(M(),!w(a,c))try{const e=await k({pageNumber:m,limit:h,categoryId:p});if(a+=e.weddingPhotos.length,m+=1,B(a,c),f.insertAdjacentHTML("beforeend",E(e.weddingPhotos)),w(a,c))return;i(!1),d()}catch(e){console.log(e),u(e),i(!0),d()}};S.addEventListener("click",ee);const te=e=>{I.querySelector(".active").classList.remove("active"),e.classList.add("active")},oe=async e=>{const t=e.target.closest("button");if(t){te(t),i(!0),M(),b(),p=t.dataset.id;try{const o=await k({categoryId:p});if(c=o.totalItems,m+=o.weddingPhotos.length/h,a+=o.weddingPhotos.length,B(a,c),o.weddingPhotos.length===0)throw new Error("Empty array");if(f.insertAdjacentHTML("beforeend",E(o.weddingPhotos)),i(!1),w(a,c)){i(!0);return}d()}catch(o){console.log(o),u(o),i(!0),d()}}};I.addEventListener("click",oe);const re=e=>{let t;l.fire({html:`${e} <br><b></b>`,timer:3e3,timerProgressBar:!0,didOpen:()=>{l.showLoading(),t=setInterval(()=>{},100)},willClose:()=>{clearInterval(t)}})},v=document.querySelector(".contacts-form"),ne=`<div class="modal_success">
  <div class="modal_success-container">
    <div class="modal_success-content-wrapper">
      <h2>Thank You for Your Inquiry!</h2>
      <div class="modal_success-img-container">
        <img src="/img/modal/success-modal.jpg" alt="wedding" />
      </div>
      <p>
        I have received your message and I'm so excited about your interest! I
        will get in touch with you within 24-48 hours to discuss the details of
        your wedding day. In the meantime, feel free to browse my portfolio or
        follow me on Instagram for more inspiration.
      </p>
    </div>
  </div>
</div>`,se=async e=>{e.preventDefault();const t=new FormData(v),o={name:t.get("name"),phone:t.get("phone"),message:t.get("message")};if(o.name===""||o.phone===""||o.message===""){u("The field is empty!");return}try{(await G({name:o.name,phone:o.phone,message:o.message})).status===201&&re(ne)}catch(n){console.log(n),u(n)}v.reset()};v.addEventListener("submit",se);
//# sourceMappingURL=index.js.map
