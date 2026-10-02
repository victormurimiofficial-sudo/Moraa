document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const menu=document.querySelector(".menu");
  const mobile=document.querySelector(".mobile-nav");

  const syncHeader=()=>header?.classList.toggle("scrolled",window.scrollY>24);
  syncHeader();
  window.addEventListener("scroll",syncHeader,{passive:true});

  if(menu&&mobile){
    menu.setAttribute("aria-expanded","false");
    menu.addEventListener("click",()=>{
      const open=mobile.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(open));
      menu.setAttribute("aria-label",open?"Close menu":"Open menu");
      menu.textContent=open?"×":"☰";
    });
    mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
      mobile.classList.remove("open");
      menu.setAttribute("aria-expanded","false");
      menu.setAttribute("aria-label","Open menu");
      menu.textContent="☰";
    }));
    document.addEventListener("click",e=>{
      if(mobile.classList.contains("open")&&!mobile.contains(e.target)&&!menu.contains(e.target)){
        mobile.classList.remove("open");
        menu.setAttribute("aria-expanded","false");
        menu.textContent="☰";
      }
    });
  }

  const path=window.location.pathname.replace(/\/$/,"")||"/";
  document.querySelectorAll(".nav a").forEach(a=>{
    const href=new URL(a.href,window.location.origin).pathname.replace(/\/$/,"")||"/";
    a.classList.toggle("active",href===path);
  });

  document.querySelectorAll(".gallery-item").forEach(item=>{
    item.setAttribute("tabindex","0");
    item.setAttribute("role","button");
    const open=()=>{
      const box=document.querySelector(".lightbox"),image=box?.querySelector("img"),src=item.querySelector("img")?.src;
      if(box&&image&&src){image.src=src;image.alt=item.querySelector("img")?.alt||"Moraa Beauty Parlour";box.classList.add("open");document.body.style.overflow="hidden"}
    };
    item.addEventListener("click",open);
    item.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
  });

  document.querySelectorAll(".lightbox").forEach(box=>{
    const close=()=>{box.classList.remove("open");document.body.style.overflow=""};
    box.querySelector("button")?.addEventListener("click",close);
    box.addEventListener("click",e=>{if(e.target===box)close()});
  });
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape")document.querySelector(".lightbox.open")?.querySelector("button")?.click();
  });

  document.querySelectorAll(".faq-q").forEach(q=>q.addEventListener("click",()=>{
    const item=q.parentElement;
    document.querySelectorAll(".faq-item.open").forEach(other=>{if(other!==item)other.classList.remove("open")});
    item.classList.toggle("open");
  }));

  document.querySelectorAll("[data-booking-form]").forEach(form=>{
    const date=form.querySelector('input[type="date"]');
    if(date)date.min=new Date().toISOString().split("T")[0];
    form.addEventListener("submit",e=>{
      e.preventDefault();
      if(!form.reportValidity())return;
      const success=form.parentElement.querySelector(".form-success");
      if(success)success.classList.add("show");
      form.reset();
      if(date)date.min=new Date().toISOString().split("T")[0];
      success?.scrollIntoView({behavior:"smooth",block:"center"});
    });
  });

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
  }),{threshold:.08});
  document.querySelectorAll(".section,.page-hero,.service-card,.review,.card,.gallery-item,.intro-image,.product-showcase>div,.standard-band,.visit-section").forEach(el=>{
    el.classList.add("reveal");observer.observe(el);
  });

  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());

  if(!document.querySelector(".mobile-book")&&path!=="/booking"){
    const a=document.createElement("a");
    a.className="mobile-book";
    a.href="/booking";
    a.textContent="Book Appointment →";
    document.body.appendChild(a);
  }
});