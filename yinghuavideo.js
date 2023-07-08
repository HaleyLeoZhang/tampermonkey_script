// ==UserScript==
// @name         www.yinghuavideo.com 视频抓取
// @namespace    www.hlzblog.top
// @version      0.1
// @description  try to take over the world!
// @author       github.com/HaleyLeoZhang
// @match        www.yinghuavideo.com
// @match        www.yinghuavideo.com/*
// @icon         http://www.hlzblog.top/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    class AdClear {
        // 私有变量
        debug = false // 判断是否调试  true: 开启日志 false:关闭日志
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
            // 仅播放页面才生效
            if (location.href.match(/v\/.*?.html/) === null) {
                return
            }
            let m3u8Url = $("#playbox").attr("data-vid").split("$")[0]
            let html = `
            <h1 style="font-size:50px;color:blue;font-weight:800;margin-top:50px">视频播放地址</h1>
            <input  style="font-size:30px" value="${m3u8Url}" placeholder="暂时没有抓到地址">
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
                        _this.output("adSide removed")
                    }
                } else {
                    temp.remove()
                    document.querySelector("#HMcoupletDivleft").remove()
                }
                _this.output("checking ad adSide")
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
                        _this.output("adBottom removed")
                    }
                } else {
                    temp.parentNode.remove()
                }
                _this.output("checking ad adBottom")
            }, 1000 * _this.second)
        }

        // 日志处理
        output(d) {
            let _this = this
            if (this.debug) {
                _this.output(d)
            }
        }
    }

    const ad = new AdClear()
    ad.iniApp()
    // Your code here...
})();