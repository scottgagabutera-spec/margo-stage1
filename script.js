const composer = document.getElementById("composer");
const openComposer = document.getElementById("openComposer");
const closeComposer = document.getElementById("closeComposer");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");
const textInput = document.getElementById("textInput");
const count = document.getElementById("count");

openComposer.onclick = () => composer.classList.remove("hidden");
closeComposer.onclick = () => composer.classList.add("hidden");

textInput.oninput = () => {
  count.textContent = textInput.value.length;
};

postBtn.onclick = () => {
  if (textInput.value.trim().length < 20) {
    alert("Write at least 20 characters.");
    return;
  }

  const emotion = document.getElementById("emotion").value;
  const song = document.getElementById("song").value;

  const post = document.createElement("div");
  post.className = "post";

  post.innerHTML = `
    <p>${textInput.value}</p>
    <div class="meta">
      ${song ? "🎵 " + song : ""}
      ${emotion ? " • " + emotion : ""}
    </div>
    <div class="actions-row">
      <a href="#" onclick="sharePost('${encodeURIComponent(textInput.value)}')">Share</a>
      ${song ? `<a href="https://song.link/" target="_blank">Listen</a>` : ""}
    </div>
  `;

  feed.prepend(post);

  composer.classList.add("hidden");
  textInput.value = "";
  count.textContent = "0";
};

function sharePost(text) {
  const url = `https://twitter.com/intent/tweet?text=${text}%20—%20via%20MARGO`;
  window.open(url, "_blank");
}
