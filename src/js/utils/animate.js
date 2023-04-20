import gsap from 'gsap'

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry);
        }
    })
}, { threshold: 0.2 });

const animateElems = document.querySelectorAll('.elem-animate');
if (animateElems.length) {
    animateElems.forEach(elem => {
        observer.observe(elem)
    })
}

function animate(elem) {
    gsap.to(elem.target, {
        opacity: 1,
        duration: 1,
        y: 0,
        delay: elem.target.dataset.delay,
        ease: 'ease'
    });
}