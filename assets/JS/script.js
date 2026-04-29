document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburgerMenu");
    const overlay = document.getElementById("myNav");

    let isOpen = false;

    hamburger.addEventListener("click", function() {
        if (isOpen) {
            overlay.style.width = "0%";
            isOpen = false;
        } else {
            overlay.style.width = "50%";
            isOpen = true;
        }
    });
});
