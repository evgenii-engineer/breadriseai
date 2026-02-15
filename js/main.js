
const LINKS = [
  {title:"HIGH-END AI CAMPAIGNS",subtitle:"COURSE",href:"./pages/course.html"},
  {title:"E-commerce Product Shots",subtitle:"BOOK",href:"./pages/ecommerce.html"},
  {title:"Creative Campaign Images",subtitle:"BOOK",href:"./pages/creative.html"},
  {title:"LET'S WORK",href:"./pages/lets-work.html"},
  {title:"PORTFOLIO",href:"./pages/portfolio.html"}
];

const root = document.getElementById("buttons");
LINKS.forEach(l=>{
  const a=document.createElement("a");
  a.className="bigBtn";
  a.href=l.href;
  a.innerHTML=`
    <div class="thumb"></div>
    <div class="btnText">
      <div class="btnTitle">${l.title}</div>
      ${l.subtitle?`<div class="btnSub">${l.subtitle}</div>`:""}
    </div>`;
  root.appendChild(a);
});

document.getElementById("year").textContent=new Date().getFullYear();
