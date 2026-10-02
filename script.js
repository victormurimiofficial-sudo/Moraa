document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header"),menu=document.querySelector(".menu"),mobile=document.querySelector(".mobile-nav");
  const WHATSAPP_NUMBER="";
  const wa=(message)=>{
    const text=encodeURIComponent(message);
    const url=WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(url,"_blank","noopener");
  };
  window.MoraaWhatsApp=wa;

  const syncHeader=()=>header?.classList.toggle("scrolled",window.scrollY>24);
  syncHeader(); window.addEventListener("scroll",syncHeader,{passive:true});

  if(menu&&mobile){
    menu.setAttribute("aria-expanded","false");
    menu.addEventListener("click",()=>{
      const open=mobile.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(open));
      menu.setAttribute("aria-label",open?"Close menu":"Open menu");
      menu.textContent=open?"×":"☰";
    });
    mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
      mobile.classList.remove("open"); menu.setAttribute("aria-expanded","false"); menu.textContent="☰";
    }));
    document.addEventListener("click",e=>{
      if(mobile.classList.contains("open")&&!mobile.contains(e.target)&&!menu.contains(e.target)){
        mobile.classList.remove("open"); menu.setAttribute("aria-expanded","false"); menu.textContent="☰";
      }
    });
  }

  const path=window.location.pathname.replace(/\/$/,"")||"/";
  document.querySelectorAll(".nav a").forEach(a=>{
    const href=new URL(a.href,window.location.origin).pathname.replace(/\/$/,"")||"/";
    a.classList.toggle("active",href===path);
  });

  document.querySelectorAll(".gallery-item").forEach(item=>{
    item.setAttribute("tabindex","0"); item.setAttribute("role","button");
    const open=()=>{
      const box=document.querySelector(".lightbox"),image=box?.querySelector("img"),src=item.querySelector("img")?.src;
      if(box&&image&&src){image.src=src;image.alt=item.querySelector("img")?.alt||"Moraa Beauty Parlour";box.classList.add("open");document.body.style.overflow="hidden"}
    };
    item.addEventListener("click",open); item.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
  });

  document.querySelectorAll(".lightbox").forEach(box=>{
    const close=()=>{box.classList.remove("open");document.body.style.overflow=""};
    box.querySelector("button")?.addEventListener("click",close); box.addEventListener("click",e=>{if(e.target===box)close()});
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelector(".lightbox.open")?.querySelector("button")?.click()});

  document.querySelectorAll(".faq-q").forEach(q=>q.addEventListener("click",()=>{
    const item=q.parentElement;
    document.querySelectorAll(".faq-item.open").forEach(other=>{if(other!==item)other.classList.remove("open")});
    item.classList.toggle("open");
  }));

  document.querySelectorAll("[data-booking-form]").forEach(form=>{
    const date=form.querySelector('input[type="date"]'); if(date)date.min=new Date().toISOString().split("T")[0];
    form.addEventListener("submit",e=>{
      e.preventDefault(); if(!form.reportValidity())return;
      const data=new FormData(form);
      const booking={id:"booking_"+Date.now(),name:data.get("name"),phone:data.get("phone"),email:data.get("email")||"",service:data.get("service"),date:data.get("date"),time:data.get("time"),notes:data.get("notes")||"",status:"Pending",createdAt:new Date().toISOString()};
      try{const key="moraa_admin_workspace_v1";const db=JSON.parse(localStorage.getItem(key)||"{}");db.bookings=Array.isArray(db.bookings)?db.bookings:[];db.bookings.push(booking);localStorage.setItem(key,JSON.stringify(db))}catch{}
      const message=["Hello Moraa Beauty Parlour, I'd like to request an appointment.","","Name: "+data.get("name"),"Phone: "+data.get("phone"),"Email: "+(data.get("email")||"Not provided"),"Service: "+data.get("service"),"Preferred date: "+data.get("date"),"Preferred time: "+data.get("time"),"Notes: "+(data.get("notes")||"None")].join("\n");
      const success=form.parentElement.querySelector(".form-success"); if(success)success.classList.add("show");
      wa(message);
    });
  });

  document.querySelectorAll("[data-enquiry-form]").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault(); if(!form.reportValidity())return;
      const data=new FormData(form);
      const message=["Hello Moraa Beauty Parlour, I have an enquiry.","","Name: "+data.get("name"),"Phone: "+data.get("phone"),"Enquiry: "+data.get("message")].join("\n");
      wa(message);
      const success=form.parentElement.querySelector(".form-success"); if(success){success.textContent="Your enquiry is ready to send on WhatsApp.";success.classList.add("show")}
      form.reset();
    });
  });

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
  }),{threshold:.08});
  document.querySelectorAll(".section,.page-hero,.service-card,.review,.card,.gallery-item,.intro-image,.product-showcase>div,.standard-band,.visit-section").forEach(el=>{el.classList.add("reveal");observer.observe(el)});

  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());

  if(!document.querySelector(".mobile-book")&&path!=="/booking"){
    const a=document.createElement("a"); a.className="mobile-book"; a.href="/booking"; a.textContent="Book Appointment →"; document.body.appendChild(a);
  }

  const support=document.createElement("div");
  support.className="moraa-support";
  support.innerHTML=`<button class="moraa-support-toggle" aria-expanded="false" aria-label="Open Moraa Beauty Assistant"><span>✦</span> Ask Moraa</button><div class="moraa-support-panel" hidden><div class="moraa-support-head"><div><small>MORAA BEAUTY PARLOUR</small><strong>Beauty Assistant</strong></div><button type="button" class="moraa-support-close" aria-label="Close">×</button></div><div class="moraa-support-messages"><div class="moraa-msg assistant">Hi, I’m here to help with services, appointments and general enquiries.</div></div><div class="moraa-support-chips"><button type="button">Services</button><button type="button">Booking</button><button type="button">Opening hours</button></div><form class="moraa-support-form"><input aria-label="Ask Moraa" autocomplete="off" placeholder="Ask a question…"><button aria-label="Send">→</button></form><button type="button" class="moraa-support-wa">Continue on WhatsApp</button></div>`;
  document.body.appendChild(support);
  const toggle=support.querySelector(".moraa-support-toggle"),panel=support.querySelector(".moraa-support-panel"),close=support.querySelector(".moraa-support-close"),input=support.querySelector("input"),messages=support.querySelector(".moraa-support-messages");
  const addMsg=(text,who="assistant")=>{const el=document.createElement("div");el.className="moraa-msg "+who;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight};
  const localAnswer=q=>{
    const s=q.toLowerCase();
    if(s.includes("hour")||s.includes("open"))return"Moraa is listed as open Monday to Saturday, 9:00 AM to 7:00 PM.";
    if(s.includes("book")||s.includes("appointment"))return"You can request an appointment through the booking page. For confirmation, send the request to the Moraa team on WhatsApp.";
    if(s.includes("service")||s.includes("hair")||s.includes("nail")||s.includes("lash")||s.includes("makeup")||s.includes("facial")||s.includes("braid"))return"We offer hair & styling, braiding, nails, lashes, makeup, brows and facials & skincare. Tell me what you’re looking for and I can point you in the right direction.";
    if(s.includes("where")||s.includes("location"))return"Moraa Beauty Parlour is presented as a Nairobi, Kenya beauty destination. The exact address should be confirmed with the salon team.";
    return"Tell me what you’d like help with — services, booking, opening hours or a general enquiry. I can also take you to WhatsApp.";
  };
  const ask=async q=>{
    if(!q.trim())return;
    addMsg(q,"user"); input.value="";
    addMsg("Let me check that for you…","assistant");
    const pending=messages.lastElementChild;
    try{
      const r=await fetch("/api/support",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q})});
      if(!r.ok)throw new Error("fallback");
      const d=await r.json(); pending.textContent=d.answer||localAnswer(q);
    }catch(e){pending.textContent=localAnswer(q)}
    messages.scrollTop=messages.scrollHeight;
  };
  toggle.addEventListener("click",()=>{const open=panel.hidden;panel.hidden=!open;toggle.setAttribute("aria-expanded",String(open));if(open)input.focus()});
  close.addEventListener("click",()=>{panel.hidden=true;toggle.setAttribute("aria-expanded","false")});
  support.querySelectorAll(".moraa-support-chips button").forEach(b=>b.addEventListener("click",()=>ask(b.textContent)));
  support.querySelector(".moraa-support-form").addEventListener("submit",e=>{e.preventDefault();ask(input.value)});
  support.querySelector(".moraa-support-wa").addEventListener("click",()=>wa("Hello Moraa Beauty Parlour, I’d like some help with a beauty enquiry."));
});