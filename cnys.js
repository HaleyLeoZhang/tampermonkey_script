// ==UserScript==
// @name         cnys.tv 视频地址抓取
// @namespace    www.hlzblog.top
// @version      0.1
// @description  try to take over the world!
// @author       github.com/HaleyLeoZhang
// @match        cnys.tv
// @match        cnys.tv/*
// @icon         https://cnys.tv/static/Streamlab/img/logo3.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    class AdClear {
        // 私有变量
        debug = true // 判断是否调试  true: 开启日志 false:关闭日志
        second = 0.5 // 循环检测时间定时器，单位，秒
        maxTimesToRemoveAd = 10 // 最多尝试多少次，去检测广告删除

        // - 构造函数
        constructor() {
            // -
        }

        // 启动APP功能
        iniApp() {
            this.showPlayUrl()
        }

        // - 显示播放地址
        showPlayUrl() {
            let _this = this
            // 仅播放页面才生效
            // _this.output(location.href)
            if (location.href.match(/vodplay/) === null) {
                return
            }
            _this.output(`开始`)

            // 获取播放地址
            let res = document.body.innerHTML.match(/"url":"(.*?m3u8)"/i)
            if (res !== null) {
                let m3u8Url = res[1]
                m3u8Url = m3u8Url.replace(/\\/g,"")
                _this.output(`m3u8Url`)
                _this.output(m3u8Url)
                let html = `
                        <h1 style="font-size:50px;color:red;font-weight:800;margin-top:100px;vertical-align: center" >播放地址</h1>
                        <h1 style="font-size:20px;color:white;margin-top:10px;vertical-align: center">${m3u8Url}</h1>
                    `
                $("body").prepend(html)
                _this.output(`showPlayUrl done`)
            }
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