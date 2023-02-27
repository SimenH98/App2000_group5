const moonPath = 
    "M13 27.5C13 42.6878 27.5 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C27.5 0 13 12.3122 13 27.5Z";

const sunPath = 
    "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";

const darkMode = document.querySelector('#darkMode');
let toggle = false;

//We need to click on the sun

darkMode.addEventListener('click', () => {
    //We need to use anime.js
    //Here we set up the timeline
    const timeline = anime.timeline({
        duration : 750,
        easing : "easeOutExpo"
    });
    //Add different animations to the timeline
    timeline.add({
        targets : ".sun",
        d: [{value: moonPath}]
    })
    .add({
        targets: "#darkMode",
        rotate: 320
    }, '-= 350');
});