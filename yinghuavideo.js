// ==UserScript==
// @name         www.yinghuavideo.com 视频抓取
// @namespace    www.hlzblog.top
// @version      0.1
// @description  try to take over the world!
// @author       github.com/HaleyLeoZhang
// @match        www.yinghuavideo.com/v/*.html
// @icon         http://www.hlzblog.top/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    class AdClear {
        // 私有变量
        second = 1 // 循环检测时间定时器
        constructor() {
            // -
        }

        // 启动APP功能
        iniApp() {
            this.showPlayUrl()
            this.adSide()
            this.adBottom()
        }

        // - 显示播放地址
        showPlayUrl() {
            let m3u8Url = $("#playbox").attr("data-vid").split("$")[0]
            let html = `
            <h1 style="font-size:50px">视频播放地址</h1>
            <h3 style="font-size:30px">${m3u8Url}</h3>
        `
            $("body").prepend(html)
        }

        // - 两侧广告
        adSide() {
            let _this = this
            let indexInter = 0
            indexInter = setInterval(function () {
                // 去除广告
                var temp = document.querySelector("#HMcoupletDivright")
                if (temp === null) {
                    if (indexInter > 0) {
                        clearInterval(indexInter)
                        console.log("ad removed")
                    }
                } else {
                    temp.remove()
                    document.querySelector("#HMcoupletDivleft").remove()
                }
                console.log("checking ad two side")
            }, 1000 * _this.second)
        }

        // 底部广告
        adBottom() {
            let _this = this
            let indexInter = 0
            indexInter = setInterval(function () {
                // 去除广告
                var temp = document.querySelector("#hbidbox")
                if (temp === null) {
                    if (indexInter > 0) {
                        clearInterval(indexInter)
                        console.log("ad removed")
                    }
                } else {
                    temp.parentNode.remove()
                }
                console.log("checking ad bottom")
            }, 1000 * _this.second)
        }
    }

    const ad = new AdClear()
    ad.iniApp()
    // Your code here...
})();