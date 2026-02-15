
const LINKS = [
  {title:"LET'S WORK",href:"https://ig.me/m/breadrise_ai",external:true},
  {title:"PORTFOLIO",href:"./pages/portfolio.html"}
];

const root = document.getElementById("buttons");
LINKS.forEach(l=>{
  const a=document.createElement("a");
  a.className="bigBtn";
  a.href=l.href;
  if(l.external){
    a.target="_blank";
    a.rel="noopener noreferrer";
  }
  a.innerHTML=`
    <div class="thumb"></div>
    <div class="btnText">
      <div class="btnTitle">${l.title}</div>
      ${l.subtitle?`<div class="btnSub">${l.subtitle}</div>`:""}
    </div>`;
  root.appendChild(a);
});

document.getElementById("year").textContent=new Date().getFullYear();
