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
textInput.oninput = () => {
  count.textContent = textInput.value.length;
};

// Helper: build search links safely
function buildLinks(song) {
  const q = encodeURIComponent(song);
  return {
    spotify: `https://open.spotify.com/search/${q}`,
    apple: `https://music.apple.com/us/search?term=${q}`,
    youtube: `https://www.youtube.com/results?search_query=${q}`,
    deezer: `https://www.deezer.com/search/${q}`,
    soundcloud: `https://soundcloud.com/search?q=${q}`
  };
}

// Post
postBtn.onclick = () => {
  const text = textInput.value.trim();
  if (!text) return;

  const emotion = emotionSelect.value;
  const song = songInput.value.trim();
  const links = song ? buildLinks(song) : null;

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
      ${song ? `
        <a href="${links.spotify}" target="_blank">Spotify</a>
        <a href="${links.apple}" target="_blank">Apple</a>
        <a href="${links.youtube}" target="_blank">YouTube</a>
        <a href="${links.deezer}" target="_blank">Deezer</a>
        <a href="${links.soundcloud}" target="_blank">SoundCloud</a>
      ` : ""}
    </div>
  `;

  // Share to X
  post.querySelector(".share-x").onclick = (e) => {
    e.preventDefault();
    const tweet = encodeURIComponent(`"${text}" — via MARGO`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
  };

  // Copy
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
