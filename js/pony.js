const ponyMessages = {
    welcome: {
        morning: [
            '早上好！早睡早起是好小马……呃，也是好羊。',
            '上午好呀，我要去看看大家在给马聚做什么样的准备……'
        ],
        afternoon: [
            '午安，困的话就小睡一会儿吧。',
            '午后很容易犯困呢，今天的运动目标完成了吗？',
            '下午总能发现好听的新歌诶。'
        ],
        evening: [
            '晚上好，今天过得怎么样？',
            '记得吃晚饭~！'
        ],
        night: [
            '夜晚是小马们休息的时候，但也是灵感迸发的高发期呢。',
            '很晚啦，快睡吧，露娜会保佑你的。'
        ]
    },
    click: [
        "你问我为什么有两只羊角？咩啊！但是你可以羡慕我，嘿嘿~",
        "华南马聚总有你喜欢的东西，让我来带你玩！",
        "哼，不要随便碰我的衣服，我知道它很酷，这是我大老远跑去瑞瑞那让她设计的呢……",
        "我很喜欢音乐，不管是民间小马创作的歌曲，还是谐律元素们传唱的歌曲，都超棒的！",
        "夏天的羊城好热啊，不过和小马们在一起的时光总是开心的。",
        "想和我面对面交流吗，7.18~19在羊城等你！",
        "*Boop*",
        "我知道我很酷，不过我不介意有小马夸我~（移开视线）",
        "咩",
        "感谢各位对华南马聚的支持，咩咩都看在眼里~",
        "咩啊？",
        "CSBC少不了大家每一只小马的力量，欢迎大家踊跃报名参与各个环节！"
    ]
};

let bubbleHideTimer = null;
let ponyImages = [];
let currentPonyIndex = 0;

function getTimeBasedWelcomeType() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 17) {
        return 'afternoon';
    } else if (hour >= 17 && hour < 21) {
        return 'evening';
    } else {
        return 'night';
    }
}

function getRandomMessage(type) {
    if (type === 'welcome') {
        const timeType = getTimeBasedWelcomeType();
        const messages = ponyMessages.welcome[timeType];
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    } else {
        const messages = ponyMessages[type];
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
}

function showBubble(message) {
    const bubble = document.querySelector('.pony-bubble');
    bubble.textContent = message;
    bubble.classList.add('show');
    
    if (bubbleHideTimer) {
        clearTimeout(bubbleHideTimer);
    }
    
    bubbleHideTimer = setTimeout(() => {
        bubble.classList.remove('show');
        bubbleHideTimer = null;
    }, 3000);
}

function switchPonyImage() {
    const ponyImage = document.getElementById('pony-image');
    if (!ponyImage || ponyImages.length <= 1) {
        showBubble('当前只有一个形象哦～');
        return;
    }
    
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * ponyImages.length);
    } while (newIndex === currentPonyIndex && ponyImages.length > 1);
    
    currentPonyIndex = newIndex;
    
    ponyImage.style.transition = 'all 0.3s ease';
    ponyImage.style.opacity = '0';
    
    setTimeout(() => {
        ponyImage.src = ponyImages[currentPonyIndex];
        ponyImage.style.opacity = '1';
    }, 300);
}

function initPonyMascot() {
    const mascot = document.querySelector('.pony-mascot');
    const bubble = document.querySelector('.pony-bubble');
    const switchButton = document.getElementById('switch-pony');
    const ponyImage = document.getElementById('pony-image');
    
    if (!mascot || !bubble) {
        return;
    }
    
    const imagesData = mascot.getAttribute('data-pony-images');
    if (imagesData) {
        try {
            ponyImages = JSON.parse(imagesData);
        } catch (e) {
            ponyImages = [];
        }
    }
    
    if (ponyImages.length > 0) {
        currentPonyIndex = Math.floor(Math.random() * ponyImages.length);
        if (ponyImage) {
            ponyImage.src = ponyImages[currentPonyIndex];
        }
    }
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            showBubble(getRandomMessage('welcome'));
        }, 1000);
    });
    
    mascot.addEventListener('click', () => {
        mascot.classList.add('clicked');
        setTimeout(() => {
            mascot.classList.remove('clicked');
        }, 300);
        
        showBubble(getRandomMessage('click'));
    });
    
    if (switchButton) {
        switchButton.addEventListener('click', (e) => {
            e.stopPropagation();
            switchPonyImage();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const existingMascot = document.querySelector('.pony-mascot');
    if (!existingMascot) {
        setTimeout(() => {
            initPonyMascot();
        }, 500);
    } else {
        initPonyMascot();
    }
});

window.ponyMascot = {
    showMessage: showBubble,
    getRandomMessage: getRandomMessage,
    init: initPonyMascot
};