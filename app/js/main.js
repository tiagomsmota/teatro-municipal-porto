function position(el) {
    return el.getBoundingClientRect();
}

//handle menu opening
if(document.querySelector(".menu-btn")) {
    document.querySelector(".menu-btn").addEventListener("click", function() {
        var menu = document.querySelector(".menu");
        var body = document.querySelector("body");
        var shadow = document.querySelector(".content-shadow");

        menu.classList.toggle("hidden");
        body.classList.toggle("noScroll");
        shadow.classList.toggle("shadow-hidden");
    });
};

if(document.querySelector(".menu-close-btn")) {
    document.querySelector(".menu-close-btn").addEventListener("click", function() {
        var menu = document.querySelector(".menu");
        var body = document.querySelector("body");
        var shadow = document.querySelector(".content-shadow");

        menu.classList.toggle("hidden");
        body.classList.toggle("noScroll");
        shadow.classList.toggle("shadow-hidden");
    });
};

//change menu-btn color on scroll
if(document.querySelector(".menu-btn")) {
    var menuBtn = document.querySelector(".menu-btn");
        menu = document.querySelector(".menu");
        header = document.querySelector("header");

    document.addEventListener("scroll", function() {
        var headerPos = position(header);
        if(headerPos.bottom <= 30) {
            menuBtn.classList.add("dark-theme");
            // menu.classList.add("dark-theme");
        } else {
            menuBtn.classList.remove("dark-theme");
            // menu.classList.remove("dark-theme");
        }
    });
};
