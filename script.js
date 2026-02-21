const roles = [
  "scalable AI systems",
  "fraud detection platforms",
  "data engineering pipelines",
  "full-stack products"
];

const typewriterEl = document.getElementById("typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex += 1;
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }
  } else {
    charIndex -= 1;
    if (charIndex < 1) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  typewriterEl.textContent = current.slice(0, charIndex);
  const speed = deleting ? 45 : 75;
  setTimeout(tick, speed);
}

if (typewriterEl) {
  tick();
}

const moodSwitch = document.getElementById("mood-switch");
const moodAvatar = document.getElementById("mood-avatar");
const moodPopLayer = document.getElementById("mood-pop-layer");
const avatarCard = document.querySelector(".avatar-card");
const moods = [
  { key: "work", emoji: "👨🏻‍💻", label: "Working on laptop" },
  { key: "gym", emoji: "🏋️", label: "Gym mode" },
  { key: "music", emoji: "🎵", label: "Music mode" },
  { key: "food", emoji: "🍜", label: "Food mode" }
];
let moodIndex = 0;
const moodClasses = moods.map((mood) => `mood-${mood.key}`);

function popMoodEmojis() {
  if (!moodPopLayer) {
    return;
  }

  moods.forEach((mood) => {
    const burst = document.createElement("span");
    burst.className = "mood-pop";
    burst.textContent = mood.emoji;

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 65;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 16;

    burst.style.setProperty("--pop-x", `${x.toFixed(1)}px`);
    burst.style.setProperty("--pop-y", `${y.toFixed(1)}px`);

    moodPopLayer.appendChild(burst);
    burst.addEventListener("animationend", () => burst.remove(), { once: true });
  });
}

function applyMood(index) {
  const currentMood = moods[index];

  if (moodAvatar) {
    moodAvatar.textContent = currentMood.emoji;
    moodAvatar.setAttribute("aria-label", currentMood.label);
  }

  if (moodSwitch) {
    moodSwitch.setAttribute("aria-label", `Click to change mood (now: ${currentMood.label})`);
  }

  if (avatarCard) {
    avatarCard.classList.remove(...moodClasses);
    avatarCard.classList.add(`mood-${currentMood.key}`);
  }
}

if (moodSwitch && moodAvatar) {
  applyMood(moodIndex);

  moodSwitch.addEventListener("click", () => {
    moodIndex = (moodIndex + 1) % moods.length;
    applyMood(moodIndex);

    moodAvatar.classList.remove("avatar-swap");
    void moodAvatar.offsetWidth;
    moodAvatar.classList.add("avatar-swap");

    popMoodEmojis();
  });
}

const reveals = document.querySelectorAll(".reveal, .reveal-delay");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.12
  }
);

reveals.forEach((el) => observer.observe(el));

const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".menu-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

const sections = document.querySelectorAll("main section[id]");
window.addEventListener("scroll", () => {
  const cursor = window.scrollY + 140;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.site-nav a[href="#${id}"]`);

    if (link) {
      link.classList.toggle("active", cursor >= top && cursor < bottom);
    }
  });
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
