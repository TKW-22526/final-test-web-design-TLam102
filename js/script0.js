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
// ── MODAL AUTH ──
(function () {
    const overlay   = document.getElementById('modal-overlay');
    const mLogin    = document.getElementById('modal-login');
    const mRegister = document.getElementById('modal-register');

    function show(modal) {
        overlay.style.display = 'block';
        modal.style.display   = 'block';
        requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('active')));
        document.body.style.overflow = 'hidden';
    }

    function hideAll() {
        [mLogin, mRegister].forEach(m => {
            m.classList.remove('active');
            setTimeout(() => m.style.display = 'none', 300);
        });
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    document.getElementById('btn-login')
        .addEventListener('click', e => { e.preventDefault(); show(mLogin); });
    document.getElementById('btn-register')
        .addEventListener('click', e => { e.preventDefault(); show(mRegister); });
    document.getElementById('close-login')
        .addEventListener('click', hideAll);
    document.getElementById('close-register')
        .addEventListener('click', hideAll);
    overlay.addEventListener('click', hideAll);

    document.getElementById('goto-register').addEventListener('click', e => {
        e.preventDefault(); hideAll();
        setTimeout(() => show(mRegister), 320);
    });
    document.getElementById('goto-login').addEventListener('click', e => {
        e.preventDefault(); hideAll();
        setTimeout(() => show(mLogin), 320);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') hideAll();
    });
})();