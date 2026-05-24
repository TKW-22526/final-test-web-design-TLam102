document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.banner-track');
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    if (!track || slides.length === 0 || dots.length === 0) return;

    let current = 0;
    let timer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startAuto() {
        timer = setInterval(() => goTo(current + 1), 4500);
    }

    function resetAuto() {
        clearInterval(timer);
        startAuto();
    }

    document.querySelector('.prev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.querySelector('.next').addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

    startAuto();
});