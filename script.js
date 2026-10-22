'use strict';

/* ---------- 1. Pengaturan ---------- */
const WEDDING_DATE = new Date('2027-04-03T07:00:00+07:00'); // Akad nikah, WIB

const MS = {
  second: 1000,
  minute: 60 * 1000,
  hour:   60 * 60 * 1000,
  day:    24 * 60 * 60 * 1000,
};


/* ---------- 2. Buka undangan ---------- */
function setupCover() {
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('openBtn');

  openBtn.addEventListener('click', () => {
    cover.classList.add('open');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
  });
}


/* ---------- 3. Hitung mundur ---------- */
function setupCountdown() {
  const fields = {
    days:    document.getElementById('d'),
    hours:   document.getElementById('h'),
    minutes: document.getElementById('m'),
    seconds: document.getElementById('s'),
  };

  function update() {
    const left = Math.max(0, WEDDING_DATE - Date.now());

    fields.days.textContent    = Math.floor(left / MS.day);
    fields.hours.textContent   = Math.floor((left % MS.day) / MS.hour);
    fields.minutes.textContent = Math.floor((left % MS.hour) / MS.minute);
    fields.seconds.textContent = Math.floor((left % MS.minute) / MS.second);
  }

  update();
  setInterval(update, MS.second);
}


/* ---------- 4. Animasi saat digulir ---------- */
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
}


/* ---------- Jalankan ---------- */
setupCover();
setupCountdown();
setupReveal();