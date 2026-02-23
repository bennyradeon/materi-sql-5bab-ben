
function fallbackCopy(text, done){
  const ta=document.createElement("textarea");
  ta.value=text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  done();
}
function copyFromEl(id, btn){
  const el = document.getElementById(id);
  if(!el) return;
  const text = el.dataset.raw || el.innerText;
  const done = () => {
    const old = btn.innerText;
    btn.innerText = "Tersalin ✓";
    btn.classList.add("btn-success");
    btn.classList.remove("btn-outline-light","btn-outline-primary","btn-outline-secondary");
    setTimeout(()=>{ btn.innerText=old; btn.classList.remove("btn-success"); }, 900);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text, done));
  } else fallbackCopy(text, done);
}
document.addEventListener("click",(e)=>{
  const btn=e.target.closest("[data-copy]");
  if(btn) copyFromEl(btn.dataset.copy, btn);
});
