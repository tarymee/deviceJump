!(function(w) {
    if (w.deviceJump) {
        if (typeof(w.deviceJump) == 'object') {
            return
        } else {
            w._deviceJump = w.deviceJump
        }
    }
    
    var f = {}
    var ua = navigator.userAgent.toLowerCase()
    var browser = {
        // ie内核的浏览器(包括手机 pc 等)
        // trident: ua.indexOf('trident') > -1,
        // QQ浏览器
        // QQbro: ua.indexOf('mqqbrowser') > -1,

        // 塞班系统 Symbian
        SB: ua.indexOf('symbian') > -1,
        // Nokia
        NK: ua.indexOf('nokia') > -1,
        // 黑莓 blackBerry
        BB: ua.indexOf('blackberry') > -1,
        // 魅族 多普达 windows ce 系统
        WCE: ua.indexOf('windows ce') > -1,
        // wp手机浏览器
        WP: ua.indexOf('windows phone') > -1,

        Mobile: ua.indexOf('mobile') > -1,
        Android: ua.indexOf('android') > -1,
        Iphone: ua.indexOf('iphone') > -1,
        Ipod: ua.indexOf('ipod') > -1,
        Pad: ua.indexOf('pad') > -1,
        // 小米平板
        Mipad: ua.indexOf('mi-pad') > -1,
        // 微信 Weixin
        WX: ua.indexOf('micromessenger') > -1
    }

    f.bIsWeixin = browser.WX
    if (browser.Pad) {
        f.browserType = 'pad'
    } else if (browser.SB || browser.BB || browser.WCE || browser.WP || browser.NK) {
        f.browserType = 'wap'
    } else if (browser.Mobile || browser.Android || browser.Iphone || browser.Ipod) {
        f.browserType = 'wap_3g'
    } else {
        f.browserType = 'main'
    }

    f.beforeJump = function () {}
    f.link = {
        'main': '',
        'wap': '',
        'pad': '',
        'wap_3g': '',
    }

    f.init = function(config) {
        config = config || {}
        f.beforeJump = config.beforeJump ? config.beforeJump : f.beforeJump
        f.link = config.link ? config.link : f.link

        var jumpType = f.browserType
        var jumpUrl = f.link[jumpType]

        // 拓展一个callback函数，对一些特定的页面在跳转前有特殊需求的时候可以做处理
        f.beforeJump(f)

        // 以下几种情况不跳转
        // 电脑访问
        // 检测到有不跳转标识【nojump】
        // 不存在要跳转版本的链接
        // 要跳转的连接跟当前地址一样
        if (jumpType == 'main' || location.search.indexOf('nojump') > -1 || !jumpUrl || location.href.indexOf(jumpUrl) > -1) return false

        location.href = jumpUrl
    }
    w.deviceJump = f
})(window)