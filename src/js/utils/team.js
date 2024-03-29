import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const personalGropus = document.querySelectorAll('.team__personal');
if (personalGropus.length) {
    personalGropus.forEach(personal => {

        const personalSectionBody = personal.querySelector('.team__personal-body');

        ScrollTrigger.create({
            trigger: personalSectionBody,
            start: "top top",
            invalidateOnRefresh: true,
            end: `bottom-=${window.innerHeight}`,
            onUpdate: (self) => {
                marginNull(personal, self.progress + (1 - self.progress * 2))
            }
        })

    })

    function marginNull(personal, progress) {
        const teamSectionColumns = personal.querySelectorAll('.column-margin');
        teamSectionColumns.forEach(column => {
            column.style.transform = `translate3d(0, ${progress * 200}px, 0 )`
        })
    }
}

const persons = document.querySelectorAll('.team__personal-item');
if (persons.length) {
    persons.forEach(person => {
        person.addEventListener('click', function (e) {
            if (e.target.tagName != 'BUTTON') {
                person.classList.add('_active')
            }
        })

        person.querySelector('button').addEventListener('click', function () {
            person.classList.remove('_active')
        })

    })
}