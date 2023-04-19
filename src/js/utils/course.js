import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);


const courseSection = document.querySelector('.course');

if (courseSection) {
    const h1 = courseSection.querySelector('h1')
    const img = courseSection.querySelector('img')
    const top = courseSection.querySelector('.course__top')
    const content = courseSection.querySelector('.course__bottom-content')

    gsap.to(h1.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.3
    })

    gsap.to(img, {
        opacity: 1,
        y: 0,
        delay: 0.5,
        duration: 0.7,
    })


    ScrollTrigger.create({
        trigger: courseSection,
        start: "center center",
        end: "+=100%",
        invalidateOnRefresh: true,
        onEnter: () => {
            gsap.to(h1.querySelectorAll('span'), {
                opacity: 0,
                y: '-100%',
                duration: 0.5,
                delay: 0.1
            })

            gsap.to(img, {
                opacity: 0,
                y: '-10%',
                delay: 0.2,
                duration: 0.5,
            })

            gsap.to(content, {
                opacity: 1,
                y: 0,
                delay: 0.7,
                duration: 0.5,
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
                delay: 0.7
            })

            gsap.to(img, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.7,
            })

            gsap.to(content, {
                opacity: 0,
                y: '50%',
                duration: 0.5,
            })


        }
    });
}