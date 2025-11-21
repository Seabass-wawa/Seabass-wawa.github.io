document.getElementById("year").textContent = new Date().getFullYear();

const music = document.getElementById("bg-music");
const btn = document.getElementById("music-toggle-eq");
const bars = document.querySelectorAll(".eq-bars span");
const albumPopup = document.getElementById("album-popup");
const openAlbum = document.getElementById("open-album");
const closePopup = document.getElementById("close-popup");

let playing = false;

/* PLAY / PAUSE MUSIC */
btn.addEventListener("click", (e) => {
    e.stopPropagation(); 

    if (!playing) {
        music.play();
        btn.textContent = "⏸";
        bars.forEach(bar => bar.style.animationPlayState = "running");
        playing = true;
    } else {
        music.pause();
        btn.textContent = "▶";
        bars.forEach(bar => bar.style.animationPlayState = "paused");
        playing = false;
    }
});

/* SHOW ALBUM POPUP */
openAlbum.addEventListener("click", () => {
    albumPopup.style.display = "flex";
});

/* CLOSE POPUP */
closePopup.addEventListener("click", () => {
    albumPopup.style.display = "none";
});

// FIXED: correct audio element ID
const audio = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volumeSlider");

// Volume control logic
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

const slider = document.getElementById("volumeSlider");

const stop = (e) => e.stopPropagation();

slider.addEventListener("click", stop);
slider.addEventListener("mousedown", stop);
slider.addEventListener("touchstart", stop);

// VOLUME
// const slider = document.getElementById("volumeSlider"); no need, it has been declared
const audioPlayer = document.getElementById("bg-music");
const tooltip = document.getElementById("volumeTooltip");

slider.addEventListener("input", () => {
  const v = slider.value;
  audioPlayer.volume = v;

  updateSliderGradient();
  updateTooltip();
});

slider.addEventListener("mouseenter", () => {
  tooltip.style.opacity = "1";
  tooltip.style.transform = "translateX(-50%) scale(1)";
});

slider.addEventListener("mouseleave", () => {
  tooltip.style.opacity = "0";
  tooltip.style.transform = "translateX(-50%) scale(0.95)";
});

function updateTooltip() {
  const sliderRect = slider.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  const pct = slider.value * 100;
  tooltip.textContent = Math.round(pct) + "%";

  const x =
    (slider.value * (sliderRect.width - 14)) + 7; // 14px thumb width, centered

  tooltip.style.left = x + "px";
}

function updateSliderGradient() {
  const v = slider.value;
  const pct = v * 100;

  const start = `rgb(${80 + v*60}, ${90 - v*20}, ${210 - v*10})`;
  const end   = `rgb(${100 + v*80}, ${70 + v*40}, 230)`;

  slider.style.background = `
    linear-gradient(90deg,
      ${start} 0%,
      ${end} ${pct}%,
      #3c356a ${pct}%,
      #3c356a 100%
    )
  `;
}

updateSliderGradient();
updateTooltip();
