// ==UserScript==
// @name         www.iyinghua.io 视频抓取
// @namespace    www.hlzblog.top
// @version      0.1
// @description  try to take over the world!
// @author       github.com/HaleyLeoZhang
// @match        www.iyinghua.io
// @match        www.iyinghua.io/*
// @icon         http://www.hlzblog.top/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    class AdClear {
        // 私有变量
        debug = true // 判断是否调试  true: 开启日志 false:关闭日志
        second = 0.5 // 循环检测时间定时器，单位，秒
        maxTimesToRemoveAd = 7 // 最多尝试多少次，去检测广告删除
        bottomSelector = "#hbidbox" // 底部广告选择器

        // - 构造函数
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
            <h1 style="font-size:20px;margin-top:10px">${m3u8Url}</h1>
        `
            $("body").prepend(html)
        }

        // - 两侧广告
        adSide() {
            // 仅播放页面才生效
            this.handleAdSelector("#HMimageleft", "左侧广告")
            this.handleAdSelector("#HMimageright", "右侧广告")
            this.handleAdSelector("#hbidbox", "右下角角标")

        }

        // 底部广告
        adBottom() {
            this.handleAdSelector(this.bottomSelector, "底部广告")
        }

        // 底部广告
        handleAdSelector(selectorTarget, remark) {
            let _this = this
            let indexInter = 0
            let tryTimes = 0
            // 增加隐藏css设置
            $("head").eq(0).append(`<style>${selectorTarget}{display:none;}</style>`)
            // 去除节点
            indexInter = setInterval(function () {
                tryTimes++
                // 检测当前尝试次数
                if (tryTimes > _this.maxTimesToRemoveAd) {
                    clearInterval(indexInter)
                    _this.output(`${remark} reach Max Times`)
                    return
                }
                // 去除广告
                let temp = document.querySelector(selectorTarget)
                if (temp === null) {
                    if (indexInter > 0) {
                        clearInterval(indexInter)
                        _this.output(`${remark} removed`)
                    }
                } else if (_this.bottomSelector === selectorTarget) { // 底部特殊处理
                    temp.parentNode.remove()
                } else {
                    temp.remove()
                }
                _this.output(`${remark} checking`)
            }, 1000 * _this.second)
        }

        // 日志处理
        output(d) {
            if (this.debug) {
                console.log(d)
            }
        }
    }

    const ad = new AdClear()
    ad.iniApp()
    // Your code here...
})();