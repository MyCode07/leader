import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);


const education = document.querySelector('.education');

if (education) {
    const h1 = education.querySelector('h1')
    const label = education.querySelector('label')
    const descroption = education.querySelector('p')


    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            gsap.to(h1.querySelectorAll('span'), {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.3
            })

            gsap.to(label, {
                opacity: 1,
                y: 0,
                delay: 0.4,
                duration: 0.5,
            })

            gsap.to(descroption, {
                opacity: 1,
                y: 0,
                delay: 0.5,
                duration: 0.5,
            })
        }
    });
    observer.observe(education)



    let start = "center 25%"
    if (window.innerWidth <= 1024) {
        start = "center 10%"
    }

    ScrollTrigger.create({
        trigger: education,
        start: start,
        end: "+=100%",
        invalidateOnRefresh: true,

        onEnter: () => {
            gsap.to(h1.querySelectorAll('span'), {
                opacity: 0,
                y: -100,
                duration: 0.5,
                delay: 0.3
            })

            gsap.to(label, {
                opacity: 0,
                y: -100,
                duration: 0.5,
                delay: 0.4,
            })

            gsap.to(descroption, {
                opacity: 0,
                y: -100,
                duration: 0.5,
                delay: 0.5,
            })

            console.log('onEnter');

        },
        onLeave: () => {
            console.log('onLeave');

        },
        onEnterBack: () => {
            console.log('onEnterBack');

        },
        onLeaveBack: () => {
            console.log('onLeaveBack');

            gsap.to(h1.querySelectorAll('span'), {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.5
            })

            gsap.to(label, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.4,
            })

            gsap.to(descroption, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.3,
            })


        }
    });
}
