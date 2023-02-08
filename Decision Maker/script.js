const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

textarea.focus();

textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);

  function highlight(e) {
    let number = Math.floor(Math.random() * getTags(e.target.value).length);
    tag = document.querySelectorAll(".tag")[number];
    tag.classList.add("highlight");

    setTimeout(() => {
      tag.classList.remove("highlight");
    }, 100);
  }

  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
      textarea.disabled = true;
    }, 100);
    randomSelect();
  }
});

function getTags(input) {
  return input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());
}

function createTags(input) {
  const tags = getTags(input);
  tagsEl.innerHTML = "";
  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.textContent = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => unhighlightTag(randomTag), 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
  }, times * 100);

  setTimeout(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    textarea.disabled = false;
  }, times * 100 + 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unhighlightTag(tag) {
  tag.classList.remove("highlight");
}
