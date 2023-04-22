import gsap from 'gsap'

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
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
    if (elem) {
        gsap.to(elem, {
            opacity: 1,
            duration: 1,
            y: 0,
            delay: +elem.dataset.delay,
            ease: 'ease'
        });
    }
}




// stagger animnation

const observerStagger = new IntersectionObserver(entries => {
    let intersected = 0;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStagger(entry.target, intersected);
            intersected++;
            observer.unobserve(entry.target);
        }
    })
}, { threshold: 0.2 });


const stagger = 0.3;
const staggerElems = document.querySelectorAll('.elem-animate-stagger');
if (staggerElems.length) {
    staggerElems.forEach(elem => {
        observerStagger.observe(elem)
    })
}

function animateStagger(elem, i) {
    if (elem) {
        gsap.to(elem, {
            y: 0,
            x:0,
            opacity: 1,
            duration: 0.7,
            delay: stagger * i
        })
    }
}