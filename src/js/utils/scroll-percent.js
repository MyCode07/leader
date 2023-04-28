window.addEventListener('load', function () {
    const svg = document.querySelector('.menu__bottom-burger svg');
    const progressBar = document.querySelector('.progress-bar');
    const totalLength = progressBar.getTotalLength();


    progressBar.style.strokeDasharray = totalLength;
    progressBar.style.strokeDashoffset = totalLength;

    window.addEventListener('scroll', () => {
        setProgress(progressBar, totalLength);
    });
})

function setProgress(progressBar, totalLength) {
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const percentage = scrollTop / (scrollHeight - clientHeight);
    progressBar.style.strokeDashoffset = totalLength - totalLength * percentage;
}