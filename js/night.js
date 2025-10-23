window.addEventListener('load', function () {
    setTimeout(function () {
        document.body.classList.add('loaded');
    }, 500);
});

const navbar = document.querySelector('.navbar');
const navmenu = document.querySelector('.nav-menu');
const navcontainer = document.querySelector('.nav-container');
const heroBg = document.querySelector('.hero-bg img');
const heroImage = document.querySelector('.hero-image');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-menu a');

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

    highlightCurrentSection();
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPosition = window.scrollY + 150;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (currentSection) {
        const activeLink = document.querySelector(`.nav-menu a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

function handleMouseMove(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    if (heroBg) {
        const bgIntensity = 15;
        const imageIntensity = 25;
        const titleIntensity = 30;

        const bgMoveX = (mouseX - 0.5) * bgIntensity;
        const bgMoveY = (mouseY - 0.5) * bgIntensity;

        const imageMoveX = (mouseX - 0.5) * imageIntensity;
        const imageMoveY = (mouseY - 0.5) * imageIntensity;

        const titleMoveX = (mouseX - 0.5) * titleIntensity;
        const titleMoveY = (mouseY - 0.5) * titleIntensity;

        heroBg.style.transform = `translate(calc(-5% + ${bgMoveX}px), calc(-5% + ${bgMoveY}px))`;

        if (heroImage) {
            heroImage.style.transform = `translate(calc(-50% + ${imageMoveX}px), calc(-50% + ${imageMoveY}px))`;
        }

        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${titleMoveX}px, ${titleMoveY}px)`;
        }
    }

    const footerImage = document.querySelector('.footer-image img');
    if (footerImage) {
        const footerIntensity = 15;
        const footerMoveX = (mouseX - 0.5) * footerIntensity;
        const footerMoveY = (mouseY - 0.5) * footerIntensity;
        footerImage.style.transform = `translateY(30%) translate(${footerMoveX}px, ${footerMoveY}px)`;
    }
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navmenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navmenu.classList.remove('active');
    });
});

handleScroll();

window.addEventListener('scroll', handleScroll);

// 为所有页面添加鼠标移动事件监听，确保页脚景深效果正常工作
document.addEventListener('mousemove', handleMouseMove);

document.addEventListener('DOMContentLoaded', function () {
    const qaQuestions = document.querySelectorAll('.qa-question');

    qaQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const qaItem = this.parentElement;
            const isActive = qaItem.classList.contains('active');

            const parentColumn = qaItem.parentElement;
            const allItems = parentColumn.querySelectorAll('.qa-item');

            allItems.forEach(item => {
                if (item !== qaItem) {
                    item.classList.remove('active');
                }
            });

            if (isActive) {
                qaItem.classList.remove('active');
            } else {
                qaItem.classList.add('active');
            }
        });
    });

    highlightCurrentSection();
});