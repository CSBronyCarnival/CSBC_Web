/* ----
# Pio Plugin
# By: Dreamer-Paul
# Last Update: 2021.3.3

一个支持更换 Live2D 模型的 Typecho 插件。
---- */

var Paul_Pio = function (prop) {
    var that = this;

    var current = {
        idol: 0,
        menu: document.querySelector(".pio-container .pio-action"),
        canvas: document.getElementById("pio"),
        body: document.querySelector(".pio-container"),
        root: document.location.protocol +'//' + document.location.hostname +'/'
    };

    /* - 方法 */
    var modules = {
        // 更换模型

        idol: function () {
            current.idol < (prop.model.length - 1) ? current.idol++ : current.idol = 0;
            return current.idol;
        },
        // 创建内容
        create: function (tag, prop) {
            var e = document.createElement(tag);
            if(prop.class) e.className = prop.class;
            return e;
        },
        // 随机内容
        rand: function (arr) {
            return arr[Math.floor(Math.random() * (arr.length - 1))];
        },
        // 创建对话框方法
        render: function (text) {
            if(text.constructor === Array){
                dialog.innerText = modules.rand(text);
            }
            else if(text.constructor === String){
                dialog.innerText = text;
            }
            dialog.classList.add("active");
            clearTimeout(this.t);
            this.t = setTimeout(function () {
                dialog.classList.remove("active");
            }, 3000);
        },
        // 移除方法
        destroy: function () {
            that.initHidden();
            localStorage.setItem("posterGirl", 0);
        },
        // 是否为移动设备
        isMobile: function (off) {
            var ua = window.navigator.userAgent.toLowerCase();
            ua = ua.indexOf("mobile") || ua.indexOf("android") || ua.indexOf("ios");

            return window.innerWidth < 500 || ua !== -1;
        }
    };
    this.destroy = modules.destroy;

    var elements = {
        home: modules.create("span", {class: "pio-home"}),
        skin: modules.create("span", {class: "pio-skin"}),
        info: modules.create("span", {class: "pio-info"}),
        sentence: modules.create("span", {class: "pio-sentence"}),
        //close: modules.create("span", {class: "pio-close"}),

        show: modules.create("div", {class: "pio-show"})
    };

    var dialog = modules.create("div", {class: "pio-dialog"});
    current.body.appendChild(dialog);
    current.body.appendChild(elements.show);

    /* - 提示操作 */
        var action = {
        // 欢迎
         welcome: function () {
            if(document.referrer !== "" && document.referrer.indexOf(current.root) === -1){
                var referrer = document.createElement('a');
                referrer.href = document.referrer;
                prop.content.referer ? modules.render(prop.content.referer.replace(/%t/, "“" + referrer.hostname + "”")) : modules.render("欢迎来自 “" + referrer.hostname + "” 的朋友！");
            }

            else if(prop.tips){
                var text, hour = new Date().getHours();

                if (hour > 22 || hour <= 5) {
                    text = '很晚啦，快睡吧，露娜会保佑你的。';
                }
                else if (hour > 5 && hour <= 8) {
                    text = '早上好！早睡早起是好小马……呃，也是好羊。';
                }
                else if (hour > 8 && hour <= 11) {
                    text = '上午好呀，我要去看看大家在给马聚做什么样的准备……';
                }
                else if (hour > 11 && hour <= 14) {
                    text = '午安，困的话就小睡一会儿吧。';
                }
                else if (hour > 14 && hour <= 17) {
                    text = '午后很容易犯困呢，今天的运动目标完成了吗？';
                }
                else if (hour > 17 && hour <= 19) {
                    text = '下午总能发现好听的新歌诶。';
                }
                else if (hour > 19 && hour <= 21) {
                    text = '晚上好，今天过得怎么样？';
                }
                else if (hour > 21 && hour <= 23) {
                    text = '夜晚是小马们休息的时候，但也是灵感迸发的高发期呢。';
                }
                else{
                    text = "咩？";
                }
                modules.render(text);
            }
            else{
                modules.render(prop.content.welcome || "欢迎来到本站！");
            }
        },
        // 触摸
        touch: function () {
            current.canvas.onclick = function () {
                modules.render(prop.content.touch || ["你问我为什么有两只羊角？咩啊！但是你可以羡慕我，嘿嘿~","华南马聚总有你喜欢的东西，让我来带你玩！","哼，不要随便碰我的衣服，我知道它很酷，这是我大老远跑去瑞瑞那让她设计的呢……","我很喜欢音乐，不管是民间小马创作的歌曲，还是谐律元素们传唱的歌曲，都超棒的！","夏天的羊城好热啊，不过和小马们在一起的时光总是开心的。","想和我面对面交流吗，7.18~19在羊城等你！","*Boop*","我知道我很酷，不过我不介意有小马夸我~（移开视线）","咩","感谢各位对华南马聚的支持，咩咩都看在眼里~","咩啊？","CSBC少不了大家每一只小马的力量，欢迎大家踊跃报名参与各个环节！"]);
            };
        },
        // 右侧按钮
         buttons: function () {
             // 返回首页
             elements.home.onclick = function () {
                 location.href = current.root;
             };
             elements.home.onmouseover = function () {
                 modules.render(prop.content.home || "点击这里回到首页！");
             };
             current.menu.appendChild(elements.home);
             // 一言
             elements.sentence.onclick = function () {
                 modules.render(fetch('https://v1.hitokoto.cn')
                                     .then(response => response.json())
                                     .then(data => {
                                             const hitokoto = document.querySelector('.pio-dialog')
                                             hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
                                             hitokoto.innerText = data.hitokoto })
                                     .catch(console.error) )
                  };
                 elements.sentence.onmouseover = function () {
                     modules.render("想来点其他的吗？");
                 };
                 current.menu.appendChild(elements.sentence);
                 
         },
        custom: function () {
            prop.content.custom.forEach(function (t) {
                if(!t.type) t.type = "default";
                var e = document.querySelectorAll(t.selector);

                if(e.length){
                    for(var j = 0; j < e.length; j++){
                        if(t.type === "read"){
                            e[j].onmouseover = function () {
                                modules.render("想阅读 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        }
                        else if(t.type === "link"){
                            e[j].onmouseover = function () {
                                modules.render("想了解一下 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        }
                        else if(t.text){
                            e[j].onmouseover = function () {
                                modules.render(t.text);
                            }
                        }
                    }
                }
            });
        }
    };

    /* - 运行 */
    var begin = {
        static: function () {
            current.body.classList.add("static");
        },
        fixed: function () {
            action.touch(); action.buttons();
        },
        draggable: function () {
            action.touch(); action.buttons();

            var body = current.body;
            body.onmousedown = function (downEvent) {
                var location = {
                    x: downEvent.clientX - this.offsetLeft,
                    y: downEvent.clientY - this.offsetTop
                };

                function move(moveEvent) {
                    body.classList.add("active");
                    body.classList.remove("right");
                    body.style.left = (moveEvent.clientX - location.x) + 'px';
                    body.style.top  = (moveEvent.clientY - location.y) + 'px';
                    body.style.bottom = "auto";
                }

                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", function () {
                    body.classList.remove("active");
                    document.removeEventListener("mousemove", move);
                });
            };
        }
    };

    // 运行
    this.init = function (onlyText) {
        if(!(prop.hidden&& modules.isMobile())){
            if(!onlyText){
                action.welcome();
                loadlive2d("pio", prop.model[Math.floor(Math.random()*(prop.model.length))]);
            }

            switch (prop.mode){
                case "static": begin.static(); break;
                case "fixed":  begin.fixed(); break;
                case "draggable": begin.draggable(); break;
            }

            if(prop.content.custom) action.custom();
        }
    };

    // 隐藏状态
    this.initHidden = function () {
        current.body.classList.add("hidden");
        dialog.classList.remove("active");

        elements.show.onclick = function () {
            current.body.classList.remove("hidden");
            localStorage.setItem("posterGirl", 1);
            that.init();
        }
    }

    localStorage.getItem("posterGirl") == 0 ? this.initHidden() : this.init();
};
