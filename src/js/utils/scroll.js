import { gsap, TimelineLite } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import ScrollToPlugin from "gsap/ScrollToPlugin.js";
import { Swiper, Pagination } from "swiper";

gsap.registerPlugin(ScrollTrigger, TimelineLite);



const heights = document.querySelectorAll('.height-bg');
const hiddens = document.querySelectorAll('.hidden');

heights.forEach((height, i) => {

    ScrollTrigger.create({
        trigger: height,
        start: "center center",
        end: "+=50%",
        // markers: true,
        onEnter: () => {
            hiddens[i].classList.add('_show');
        },
        onLeave: () => {
            hiddens[i].classList.add('_hide');
            hiddens[i].classList.remove('_show');
        },
        onEnterBack: () => {
            hiddens[i].classList.add('_show');
            hiddens[i].classList.remove('_hide');
        },
        onLeaveBack: () => {
            hiddens[i].classList.remove('_show');
        },
        // onRefresh: self => self.progress && self.animation.progress(1),
    });

})

const subjects = document.querySelector('.advantages__subjects');
const subjectImages = document.querySelectorAll('.advantages__subjects-image');

ScrollTrigger.create({
    trigger: subjects,
    start: "top bottom",
    end: "top+=75%",
    //  markers: true,
    onEnter: () => {
        subjects.classList.add('_show');
    },
    onLeave: () => {
        subjects.classList.remove('_show');
        subjects.classList.add('_hide');
    },
    onEnterBack: () => {
        subjects.classList.remove('_hide');
        subjects.classList.add('_show');
    },
    onLeaveBack: () => {
        subjects.classList.remove('_show');
    },
    // onRefresh: self => self.progress && self.animation.progress(1),
});



const slides = gsap.utils.toArray(".horizontal__scroll-slide");
const sliderBody = document.querySelector('.horizontal__scroll-slides');
const sliderContainer = document.querySelector('.horizontal__scroll-continer');


let x = slides[0].getBoundingClientRect().width * (slides.length - 1) - (sliderBody.offsetWidth - slides[0].getBoundingClientRect().width)


if (window.innerWidth > 800) {
    let tween = gsap.to(slides, {
        x: -x,
        ease: "none",
        scrollTrigger: {
            trigger: sliderBody,
            pin: true,
            start: "center center",
            scrub: true,
            invalidateOnRefresh: true,
            // snap: {
            //     snapTo: 1 / (slides.length - 1),
            //     inertia: false,
            //     duration: { min: 0.1, max: 0.1 }
            // },
            end: () => "+=" + sliderBody.offsetWidth,
            onEnter: () => {
                sliderBody.classList.add('_before')
            },
        }
    });
}
else {
    sliderContainer.classList.add('swiper');
    sliderBody.classList.add('swiper-wrapper');
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];

        slide.classList.add('swiper-slide');

    }

    new Swiper(sliderContainer, {
        modules: [
            Pagination
        ],
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 15,
        pagination: {
            el: '.horizontal__scroll-pagination',
            clickable: true,
        }
    })
}