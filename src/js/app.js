import "./utils/smoothScroll.js";
import "./utils/home.js";
import "./utils/menu.js";
import "./utils/scroll.js";
import "./utils/team.js";
import "./utils/feedback.js";
import "./utils/contacts.js";
import "./utils/breadcambs.js";
import "./utils/course.js";
import "./utils/education.js";
import "./utils/hull.js";

import "./utils/animate-gsap.js";




window.addEventListener("scroll", function () {
    const height = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    if (document.querySelector('.scroll-percent')) {
        document.querySelector('.scroll-percent').innerHTML = Math.round(height * 100) + ' %';
    }
})