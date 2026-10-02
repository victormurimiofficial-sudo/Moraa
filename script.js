document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu"), mobile=document.querySelector(".mobile-nav");
  if(menu&&mobile) menu.addEventListener("click",()=>mobile.classList.toggle("open"));

  document.querySelectorAll(".gallery-item").forEach(item=>{
    item.addEventListener("click",()=>{
      const box=document.querySelector(".lightbox");
      const image=box?.querySelector("img");
      if(box&&image){image.src=item.querySelector("img").src;box.classList.add("open")}
    });
  });
  document.querySelectorAll(".lightbox button").forEach(b=>b.addEventListener("click",()=>b.parentElement.classList.remove("open")));
  document.querySelectorAll(".lightbox").forEach(b=>b.addEventListener("click",e=>{if(e.target===b)b.classList.remove("open")}));

  document.querySelectorAll(".faq-q").forEach(q=>q.addEventListener("click",()=>q.parentElement.classList.toggle("open")));

  document.querySelectorAll("[data-booking-form]").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const success=form.parentElement.querySelector(".form-success");
      if(success) success.classList.add("show");
      form.reset();
    });
  });

  const year=document.querySelectorAll("[data-year]");
  year.forEach(el=>el.textContent=new Date().getFullYear());
});