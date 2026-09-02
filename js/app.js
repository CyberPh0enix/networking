import { config } from "./config.js";

class PresentationApp {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.progressBar = document.getElementById("progress-bar");
    this.orb1 = document.getElementById("orb1");
    this.orb2 = document.getElementById("orb2");
    this.totalSlides = this.slides.length;
    this.isAnimating = false;

    // Load saved state or start at 0
    const savedIndex = localStorage.getItem("networking_slide_index");
    this.currentSlide = savedIndex ? parseInt(savedIndex, 10) : 0;

    this.init();
  }

  init() {
    this.applyConfig();
    this.setupEventListeners();

    // Ensure valid index
    if (this.currentSlide >= this.totalSlides || this.currentSlide < 0) {
      this.currentSlide = 0;
    }

    this.render();
  }

  applyConfig() {
    // Hydrate DOM elements with config data
    document.querySelectorAll("[data-config]").forEach((el) => {
      const keyPath = el.getAttribute("data-config").split(".");
      let value = config;
      for (const key of keyPath) {
        if (value[key] !== undefined) value = value[key];
      }
      if (typeof value === "string") {
        el.textContent = value;
      }
    });

    // Hydrate specific attributes like icons
    const avatarIcon = document.querySelector(".speaker-avatar i");
    if (avatarIcon) {
      avatarIcon.className = `fa-solid ${config.speaker.avatarIcon}`;
    }
  }

  render() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.add("active");

        // Update Progress Bar
        const progress = ((index + 1) / this.totalSlides) * 100;
        this.progressBar.style.width = `${progress}%`;

        // Update Ambient Orbs
        const colorKey = slide.getAttribute("data-color") || "cyan";
        const themeColor = config.theme.colors[colorKey];

        if (themeColor) {
          const p1x = 10 + Math.random() * 30;
          const p1y = 10 + Math.random() * 30;
          const p2x = 60 + Math.random() * 30;
          const p2y = 60 + Math.random() * 30;

          this.orb1.style.background = themeColor.glow;
          this.orb1.style.transform = `translate3d(${p1x}vw, ${p1y}vh, 0)`;

          this.orb2.style.background = config.theme.colors.purple.glow; // Secondary contrast
          this.orb2.style.transform = `translate3d(${p2x}vw, ${p2y}vh, 0)`;
        }
      } else {
        slide.classList.remove("active");
      }
    });

    // Save to localStorage
    localStorage.setItem("networking_slide_index", this.currentSlide);

    // Debounce animation lock
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.render();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.render();
    }
  }

  setupEventListeners() {
    // Keyboard Navigation
    document.addEventListener("keydown", (e) => {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        this.nextSlide();
      }
      if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        this.prevSlide();
      }
    });

    // Virtual Controls
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");

    if (btnNext) btnNext.addEventListener("click", () => this.nextSlide());
    if (btnPrev) btnPrev.addEventListener("click", () => this.prevSlide());

    // Touch Swipe Navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    document.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true },
    );

    // Double Click for Fullscreen
    document.addEventListener("dblclick", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      this.nextSlide(); // Swipe Left
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      this.prevSlide(); // Swipe Right
    }
  }
}

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.app = new PresentationApp();
});
