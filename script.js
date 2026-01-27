const openComposer = document.getElementById("openComposer");
const closeComposer = document.getElementById("closeComposer");
const composer = document.getElementById("composer");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");

const textInput = document.getElementById("textInput");
const emotionSelect = document.getElementById("emotion");
const songInput = document.getElementById("song");
const count = document.getElementById("count");

// Open / Close modal
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
      <a href="#" class="share">Share</a>
    </div>
  `;

  // Share logic
  post.querySelector(".share").onclick = (e) => {
    e.preventDefault();
    const shareText = `"${text}" — via MARGO`;
    navigator.clipboard.writeText(shareText);
    alert("Copied to clipboard ✨");
  };

  feed.prepend(post);

  // Reset
  textInput.value = "";
  emotionSelect.value = "";
  songInput.value = "";
  count.textContent = "0";
  composer.classList.add("hidden");
};
