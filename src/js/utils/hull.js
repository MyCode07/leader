import gsap from 'gsap'
import { isMobile } from './isMobile.js'

const hullimage = document.querySelector('.hull__bg img');

if (hullimage) {
    const hoverElem = document.querySelector('.hull__bg-hover');

    if (!isMobile.any() && window.innerWidth > 1024) {
        hoverElem.addEventListener('mousemove', function (e) {
            hullimage.style.top = e.clientY + 'px'
            hullimage.style.left = e.clientX + 'px'
            hullimage.style.top = e.clientY + 'px'
        })

        hoverElem.addEventListener('mouseenter', function (e) {
            hullimage.style.opacity = 1;
        })

        hoverElem.addEventListener('mouseleave', function (e) {
            hullimage.style.opacity = 0;
        })
    }
}





const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry);
        }
    })
}, { threshold: 0.2 });


const hullGridItems = document.querySelectorAll(".hull-grid ul li");

if (hullGridItems.length) {
    hullGridItems.forEach(hull => {
        observer.observe(hull)
    })
}

function animate(entry) {
    gsap.to(entry.target, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
    })
}