const navbar = document.querySelector('.navbar');
const navmenu = document.querySelector('.nav-menu');
const navcontainer = document.querySelector('.nav-container');
const heroBg = document.querySelector('.hero-bg img');

function handleScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navmenu.classList.add('scrolled');
        navcontainer.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        navmenu.classList.remove('scrolled');
        navcontainer.classList.remove('scrolled');
    }
}

function handleMouseMove(e) {
    if (!heroBg) return;

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const bgMoveX = (mouseX - 0.5) * 10;
    const bgMoveY = (mouseY - 0.5) * 10;

    const titleMoveX = (mouseX - 0.5) * 30;
    const titleMoveY = (mouseY - 0.5) * 30;

    heroBg.style.transform = `translate(calc(-5% + ${bgMoveX}px), calc(-5% + ${bgMoveY}px))`;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(${titleMoveX}px, ${titleMoveY}px)`;
    }
}

handleScroll();

window.addEventListener('scroll', handleScroll);

if (heroBg) {
    document.addEventListener('mousemove', handleMouseMove);
    document.querySelector('.hero').addEventListener('mouseleave', handleMouseLeave);
}