const navBar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    const position = window.scrollY > 0;
    navBar.classList.toggle("scrolling-active", position);
});
