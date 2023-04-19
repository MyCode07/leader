import gsap from 'gsap'

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry);
        }
    })
}, { threshold: 0.2 });

const documentsList = document.querySelectorAll('.documents__list li');
if (documentsList.length) {
    documentsList.forEach(elem => {
        observer.observe(elem)
    })
}

function animate(elem) {
    gsap.to(elem.target, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
    })
}