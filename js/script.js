const roles = ["Python Developer", "Software Developer", "Junior DevOps Engineer"];
const typingEl = document.getElementById("typing");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  charIndex += isDeleting ? -1 : 1;
  typingEl.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    delay = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();
// Scroll reveal animation
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));
// Contact form
const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusMsg.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      statusMsg.textContent = "Thank you! Your message has been sent.";
      form.reset();
    } else {
      statusMsg.textContent = "Something went wrong. Please email me directly.";
    }
  } catch (error) {
    statusMsg.textContent = "Something went wrong. Please email me directly.";
  }
});
