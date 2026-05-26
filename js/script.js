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
const heroImgElement = document.querySelector('.hero-image img');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-menu a');

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navmenu.classList.add('scrolled');
        navcontainer.classList.add('scrolled');
        navbar.classList.remove('animation');
    } else {
        navbar.classList.remove('scrolled');
        navmenu.classList.remove('scrolled');
        navcontainer.classList.remove('scrolled');
    }

    highlightCurrentSection();
}

function highlightCurrentSection() {
    const isDisabledNav = window.isDisabledNav === true;

    if (isDisabledNav) return;

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
    const isMobileDevice = window.innerWidth < 768 && window.innerWidth < window.innerHeight;
    
    if (isMobileDevice) {
        if (heroBg) {
            heroBg.style.transform = 'translate(-5%, -5%)';
        }
        if (heroImage) {
            heroImage.style.transform = 'translate(-50%, -50%)';
        }
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
        const footerImage = document.querySelector('.footer-image img');
        if (footerImage) {
            footerImage.style.transform = 'translateY(30%)';
        }
        return;
    }
    
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

    if (heroImgElement) {
        const rect = heroImgElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroImgElement.style.setProperty('--x', `${x}px`);
        heroImgElement.style.setProperty('--y', `${y}px`);
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

document.addEventListener('mousemove', handleMouseMove);

// 添加窗口大小变化监听器，以便在设备旋转或窗口调整时重新检测是否应该禁用景深效果
window.addEventListener('resize', function() {
    // 强制触发一次鼠标移动事件来更新景深效果状态
    const event = new MouseEvent('mousemove', {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
    });
    document.dispatchEvent(event);
});

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

document.addEventListener('DOMContentLoaded', function () {
    const scrollRows = document.querySelectorAll('.dj-scroll-row');

    scrollRows.forEach(row => {
        const items = row.querySelectorAll('.dj-item');

        for (let i = 0; i < 8; i++) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                row.appendChild(clone);
            });
        }
    });

    let previousValues = { days: null, hours: null, minutes: null, seconds: null };
    
    function updateCountdown() {
        const targetDate = new Date('2026-07-18T00:00:00').getTime();
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        const isEnglishPage = window.location.pathname.includes('eng/index.html');

        if (timeRemaining <= 0) {
            const message = isEnglishPage ? 'Event Started' : '活动已开始';
            document.querySelector('.countdown-timer').innerHTML = `<div class="countdown-item">${message}</div>`;
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        const countdownTimer = document.querySelector('.countdown-timer');
        if (countdownTimer) {
            if (previousValues.days === null) {
                if (isEnglishPage) {
                    countdownTimer.innerHTML = `
                        <div class="countdown-item">
                            <span class="countdown-number">${days}</span> Days
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${hours}</span> Hours
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${minutes}</span> Minutes
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${seconds}</span> Seconds
                        </div>
                    `;
                } else {
                    countdownTimer.innerHTML = `
                        <div class="countdown-item">
                            <span class="countdown-number">${days}</span> 天
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${hours}</span> 时
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${minutes}</span> 分
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${seconds}</span> 秒
                        </div>
                    `;
                }
            } else {
                const items = countdownTimer.querySelectorAll('.countdown-item');
                const currentValues = [days, hours, minutes, seconds];
                const previousKeys = ['days', 'hours', 'minutes', 'seconds'];
                
                for (let i = 0; i < items.length; i++) {
                    const current = currentValues[i];
                    const previous = previousValues[previousKeys[i]];
                    
                    if (current !== previous) {
                        const numberElement = items[i].querySelector('.countdown-number');
                        if (numberElement) {
                            numberElement.classList.add('fade-out');
                            
                            setTimeout(() => {
                                numberElement.textContent = current;
                                numberElement.classList.remove('fade-out');
                                numberElement.classList.add('fade-in');
                                
                                setTimeout(() => {
                                    numberElement.classList.remove('fade-in');
                                }, 300);
                            }, 300);
                        }
                    }
                }
            }
            
            previousValues = { days, hours, minutes, seconds };
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    const tabButtons = document.querySelectorAll('.tab-button');
    const scheduleContents = document.querySelectorAll('[data-content]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            scheduleContents.forEach(content => {
                if (content.getAttribute('data-content') === targetTab) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const bgImages = document.querySelectorAll('.hero-bg-image');
    let currentIndex = 0;
    
    function switchBackground() {
        try {
            if (!bgImages || bgImages.length === 0) return;
            
            bgImages[currentIndex].classList.remove('active');
            
            currentIndex = (currentIndex + 1) % bgImages.length;
            
            bgImages[currentIndex].classList.add('active');
        } catch {
            return;
        }
    }
    
    setInterval(switchBackground, 500);
    
    const djBgImages = document.querySelectorAll('.dj-hero-bg-image');
    let djCurrentIndex = 0;
    
    function switchDjBackground() {
        try {
            if (!djBgImages || djBgImages.length === 0) return;
            
            djBgImages[djCurrentIndex].classList.remove('active');
            
            djCurrentIndex = (djCurrentIndex + 1) % djBgImages.length;
            
            djBgImages[djCurrentIndex].classList.add('active');
        } catch {
            return;
        }
    }
    
    setInterval(switchDjBackground, 500);
});

document.addEventListener('DOMContentLoaded', function() {

    const friendLinkImages = document.querySelectorAll('.friend-link-img');
    
    friendLinkImages.forEach(img => {
        const originalSrc = img.src;
        const hoverSrc = img.getAttribute('data-hover-src');
        
        if (hoverSrc && hoverSrc !== originalSrc) {
            const hoverImage = new Image();
            hoverImage.src = hoverSrc;
            
            img.addEventListener('mouseenter', function() {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '0';
                
                setTimeout(() => {
                    img.src = hoverSrc;
                    img.style.opacity = '1';
                }, 150);
            });
            
            img.addEventListener('mouseleave', function() {
                img.style.opacity = '0';
                
                setTimeout(() => {
                    img.src = originalSrc;
                    img.style.opacity = '0.7';
                }, 150);
            });
        }
    });
});

(function() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;
    
    const cursorOuter = cursor.querySelector('.cursor-outer');
    if (!cursorOuter) return;
    
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (isTouchDevice) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let isFirstMove = true;
    let rafId = null;
    
    const ease = 0.3;
    
    function animate() {
        outerX += (mouseX - outerX) * ease;
        outerY += (mouseY - outerY) * ease;
        
        const offsetX = outerX - mouseX;
        const offsetY = outerY - mouseY;
        
        cursorOuter.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        
        rafId = requestAnimationFrame(animate);
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        if (isFirstMove) {
            outerX = mouseX;
            outerY = mouseY;
            cursor.style.opacity = '1';
            isFirstMove = false;
            animate();
        }
    });
    
    const hoverElements = document.querySelectorAll('a, button, .tab-button, .qa-question, .pricing-button, .hero-button, .section-button, .contact-button, .hamburger, .gallery-item, .pagination-button, .lightbox-close, .lightbox-nav');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
    
    document.addEventListener('mousedown', function() {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('click');
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
})();
