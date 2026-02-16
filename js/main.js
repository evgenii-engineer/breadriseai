const LINKS = [
  {title:"WHO IS BREAD RISE?",href:"./who-is-bread-rise/"},
  {title:"PORTFOLIO",href:"./portfolio/"},
  {title:"WORK W/ BREAD RISE",href:"./lets-work/"},
  {title:"STUDY W/ BREAD RISE",href:"./study/"}
];

const root = document.getElementById("buttons");
LINKS.forEach((l) => {
  const a = document.createElement("a");
  a.className = "bigBtn";
  a.href = l.href;
  a.innerHTML = `<div class="btnTitle">${l.title}</div>`;
  root.appendChild(a);
});
