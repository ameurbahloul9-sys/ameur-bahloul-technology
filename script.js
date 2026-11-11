const translations = {ar:{dir:"rtl",lang:"ar"},fr:{dir:"ltr",lang:"fr"}};
let currentLang="ar";
const langToggle=document.getElementById("langToggle");
function setLanguage(lang){
  currentLang=lang;
  document.documentElement.lang=translations[lang].lang;
  document.documentElement.dir=translations[lang].dir;
  document.body.dir=translations[lang].dir;
  document.querySelectorAll("[data-ar][data-fr]").forEach(el=>{
    const value=el.dataset[lang];
    if(value!==undefined) el.innerHTML=value;
  });
  langToggle.textContent=lang==="ar"?"FR":"ع";
  document.title=lang==="ar"?"الأستاذ عامر البهلول | مكانك للتميز نحو التكنولوجيا":"Prof. Amer Bahloul | Votre espace d’excellence vers la technologie";
}
langToggle.addEventListener("click",()=>setLanguage(currentLang==="ar"?"fr":"ar"));
document.getElementById("year").textContent=new Date().getFullYear();

const menu=document.getElementById("mainNav");
document.getElementById("menuToggle").addEventListener("click",()=>menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));

let circuitClosed=false;
const switchButton=document.getElementById("switchButton");
const switchArm=document.getElementById("switchArm");
const bulb=document.getElementById("bulbGroup");
const status=document.getElementById("circuitStatus");
const statusDot=document.getElementById("statusDot");
const board=document.querySelector(".circuit-board");
function updateCircuit(){
  bulb.classList.toggle("on",circuitClosed);
  bulb.classList.toggle("off",!circuitClosed);
  switchArm.setAttribute("d",circuitClosed?"M170 85 L260 85":"M170 85 L235 55");
  statusDot.classList.toggle("on",circuitClosed);
  board.classList.toggle("active",circuitClosed);
  if(currentLang==="ar"){
    switchButton.querySelector("span").textContent=circuitClosed?"فتح القاطعة":"إغلاق القاطعة";
    status.textContent=circuitClosed?"الدارة مغلقة — المصباح مضيء":"الدارة مفتوحة — المصباح منطفئ";
  }else{
    switchButton.querySelector("span").textContent=circuitClosed?"Ouvrir l’interrupteur":"Fermer l’interrupteur";
    status.textContent=circuitClosed?"Circuit fermé — lampe allumée":"Circuit ouvert — lampe éteinte";
  }
}
switchButton.addEventListener("click",()=>{circuitClosed=!circuitClosed;updateCircuit();});

const answers=[...document.querySelectorAll(".answer")];
const feedback=document.getElementById("quizFeedback");
answers.forEach(btn=>btn.addEventListener("click",()=>{
  answers.forEach(a=>{a.disabled=true;a.classList.remove("correct","wrong")});
  const correct=btn.dataset.correct==="true";
  btn.classList.add(correct?"correct":"wrong");
  const right=answers.find(a=>a.dataset.correct==="true");
  right.classList.add("correct");
  feedback.textContent=currentLang==="ar"?(correct?"أحسنت! إجابة صحيحة.":"ليست الإجابة الصحيحة. الإجابة الصحيحة هي: عندما تكون الدارة مغلقة."):(correct?"Bravo ! Bonne réponse.":"Ce n’est pas la bonne réponse. Le circuit doit être fermé.");
  feedback.style.color=correct?"#16865f":"#bd5555";
}));
document.getElementById("resetQuiz").addEventListener("click",()=>{
  answers.forEach(a=>{a.disabled=false;a.classList.remove("correct","wrong")});
  feedback.textContent="";
});
