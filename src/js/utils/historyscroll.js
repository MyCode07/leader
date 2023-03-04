export function historyScroll() {
    window.onscroll = function () {
        localStorage.setItem('historyscroll', window.pageYOffset);
    }

    localStorage.getItem('historyscroll') && window.scrollTo(0, localStorage.getItem('historyscroll'));
}