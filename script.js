const $ = (s) => document.querySelector(s);
const chat = $("#chat");
const input = $("#input");
const composer = $("#composer");
const sendBtn = $("#sendBtn");
const welcome = $("#welcome");
const history = $("#history");
const sidebar = $("#sidebar");

let chats = JSON.parse(localStorage.getItem("ai-chats") || "[]");

function renderHistory(){
  history.innerHTML = chats.length ? '<div class="history-title">Recent</div>' : "";
  chats.slice().reverse().forEach((title, i) => {
    const el = document.createElement("div");
    el.className = "history-item";
    el.textContent = title;
    el.title = title;
    history.appendChild(el);
  });
}

function addMessage(role, text){
  if (welcome) welcome.remove();
  const row = document.createElement("div");
  row.className = `message-row ${role}`;
  if(role === "assistant"){
    row.innerHTML = `<div class="mini-avatar">✦</div><div class="message-bubble"></div>`;
  } else {
    row.innerHTML = `<div class="message-bubble"></div>`;
  }
  row.querySelector(".message-bubble").textContent = text;
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

function fakeReply(text){
  const lower = text.toLowerCase();
  if(lower.includes("hello") || lower.includes("hi ")) return "Hello! How can I help you today?";
  if(lower.includes("html") || lower.includes("website")) return "I can help you build that. Tell me what you want the page to do, and I can suggest the structure, styling, and JavaScript.";
  return "This is a front-end demo, so there is no AI API connected yet. Your message was received successfully. To make it generate real answers, connect the submit handler to your own backend/API.";
}

composer.addEventListener("submit", (e)=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  addMessage("user", text);
  input.value = "";
  resizeInput();
  sendBtn.disabled = true;

  if(!chats.includes(text)) chats.push(text.slice(0, 45));
  chats = chats.slice(-20);
  localStorage.setItem("ai-chats", JSON.stringify(chats));
  renderHistory();

  setTimeout(()=>{
    addMessage("assistant", fakeReply(text));
    sendBtn.disabled = false;
  }, 450);
});

function resizeInput(){
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 180) + "px";
  sendBtn.disabled = !input.value.trim();
}
input.addEventListener("input", resizeInput);
input.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" && !e.shiftKey){
    e.preventDefault();
    composer.requestSubmit();
  }
});

$("#newChatBtn").addEventListener("click", ()=>{
  chat.innerHTML = `<div class="welcome" id="welcome"><div class="logo-mark">✦</div><h1>How can I help you today?</h1><p>Ask a question, brainstorm an idea, or get help with a task.</p></div>`;
  input.focus();
});

$("#collapseBtn").addEventListener("click", ()=> sidebar.classList.toggle("collapsed"));
$("#mobileMenu").addEventListener("click", ()=> sidebar.classList.toggle("collapsed"));
$("#themeBtn").addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if(localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
renderHistory();
resizeInput();
