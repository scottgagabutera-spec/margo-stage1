const openComposer = document.getElementById("openComposer");
const closeComposer = document.getElementById("closeComposer");
const composer = document.getElementById("composer");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");

const textInput = document.getElementById("textInput");
const emotionSelect = document.getElementById("emotion");
const songInput = document.getElementById("song");
const count = document.getElementById("count");

// Open / Close composer
openComposer.onclick = () => composer.classList.remove("hidden");
closeComposer.onclick = () => composer.classList.add("hidden");

// Character counter
textInput.addEventListener("input", () => {
  count.textContent = textInput.value.length;
});

// Post
postBtn.onclick = () => {
  const text = textInput.value.trim();
  if (!text) return;

  const emotion = emotionSelect.value;
  const song = songInput.value;

  const post = document.createElement("div");
  post.className = "post";

  post.innerHTML = `
    <p>${text}</p>
    <div class="meta">
      ${emotion ? `#${emotion}` : ""}
      ${song ? ` · 🎵 ${song}` : ""}
    </div>
    <div class="actions-row">
      <a href="#" class="share-x">X</a>
      <a href="#" class="share-copy">Copy</a>
    </div>
  `;

  // Share to X
  post.querySelector(".share-x").onclick = (e) => {
    e.preventDefault();
    const tweet = encodeURIComponent(`"${text}" — via MARGO`);
    window.open(
      `https://twitter.com/intent/tweet?text=${tweet}`,
      "_blank"
    );
  };

  // Copy to clipboard
  post.querySelector(".share-copy").onclick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`"${text}" — via MARGO`);
    alert("Copied ✨");
  };

  feed.prepend(post);

  // Reset
  textInput.value = "";
  emotionSelect.value = "";
  songInput.value = "";
  count.textContent = "0";
  composer.classList.add("hidden");
};
