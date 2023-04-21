import gsap from 'gsap'

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStagger();
        }
    })
}, { threshold: 0.2 });

const staggerElems = document.querySelectorAll('.elem-animate-stagger');
console.log(staggerElems);
if (staggerElems.length) {
    staggerElems.forEach(elem => {
        observer.observe(elem)
    })
}

function animateStagger() {
    gsap.to('.elem-animate-stagger', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.3,
    })
}