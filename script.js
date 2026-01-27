const openBtn = document.getElementById("openComposer");
const closeBtn = document.getElementById("closeComposer");
const composer = document.getElementById("composer");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");
const textInput = document.getElementById("textInput");
const count = document.getElementById("count");

openBtn.onclick = () => composer.classList.remove("hidden");
closeBtn.onclick = () => composer.classList.add("hidden");

textInput.oninput = () => {
  count.textContent = textInput.value.length;
};

postBtn.onclick = () => {
  if (!textInput.value.trim()) return;

  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `<p>${textInput.value}</p>`;

  feed.prepend(post);

  textInput.value = "";
  count.textContent = "0";
  composer.classList.add("hidden");
};
