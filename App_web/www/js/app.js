const moonPath = 
    "M13 27.5C13 42.6878 27.5 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C27.5 0 13 12.3122 13 27.5Z";

const sunPath = 
    "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";

const darkMode = document.querySelector("#darkMode");
let toggle = false;

//We need to click on the sun

darkMode.addEventListener("click", () => {
    //We need to use anime.js
    //Here we set up the timeline
    const timeline = anime.timeline({
        duration : 750,
        easing : "easeOutExpo"
    });
    //Add different animations to the timeline
    timeline.add({
        targets : ".sun",
        d: [{value: toggle ? sunPath : moonPath}]
    })
    .add({
        targets: "#darkMode",
        rotate: toggle ? 0 : 320
    },
     "-= 350"
    )
    /*.add({
        targets: "section",
        backgroundColor: toggle ? "rgb(204, 192, 192)" : "rgb(22,22,22)",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"
    }, 
    "-= 700" 
    )*/
    .add({
        targets: "body",
        backgroundColor: toggle ? "rgb(204, 204, 204)" : "rgb(22,22,22)",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"

    },
    "-= 700"
    )
    .add({
        targets: "p",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"

    },
    "-= 700"
    )
    .add({
        targets: "a p",
        color: toggle ? "rgb(22,22,22)" : "rgb(22,22,22)"

    },
    "-= 700"
    )
    .add({
        targets: "fieldset",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"

    },
    "-= 700"
    )
    .add({
        targets: "#logo",
        backgroundColor: toggle ? "rgb(255, 255, 255)" : "rgb(33,33,33)",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"
        

    },
    "-= 700"
    )
    .add({
        targets: ".button",
        /*backgroundColor: toggle ? "rgb(255, 255, 255)" : "rgb(22,22,22)",*/
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"

    },
    "-= 700"
    )
    .add({
        targets: ".dropdown-button",
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"

    },
    "-= 700"
    )
    .add({
        targets: ".",
        /*backgroundColor: toggle ? "rgb(192, 192, 192)" : "rgb(22,22,22)",*/
        color: toggle ? "rgb(22,22,22)" : "rgb(255,255,255)"

    },
    "-= 700"
    )
    .add({
        target: ".poll-list a:hover",
        boxShadow: toggle ? "0 5px 10px rgba(0, 0, 0, 0.2)" : "0 5px 10px rgb(255, 255, 255)"
    },
    "-= 700"
    )
    .add({
        targets: "form, section id = answeredPolls",
        backgroundColor: toggle ? "rgb(255, 255, 255)" : "rgb(80,80,80)",
    },
    "-= 700"
    )
    ;
    //Everytime we click on the sun I want that toggle to switch
    if(!toggle){
        toggle = true;
    }else{
        toggle = false;
    }
});