/**
 * Created by qingyun on 16/10/13.
 */
function () {
    $(function () {
        var lujing = $("#logimg").attr("src");  //分享中带有的图片
        var url = window.location.href;         //分享页的地址
        var title = document.title;             //分享内容的标题
        weixin("http://m.e-iot.com/images/bg.jpg", url, title);
    });


    function weixin(a, b, c) {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {


            window.shareData = {
                "imgUrl": a,
                "timeLineLink": b,
                "sendFriendLink": b,
                "weiboLink": b,
                "tTitle": c,
                "tContent": "8+1互助平台---营销型网站互助分享会",
                "fTitle": c,
                "fContent": "8+1互助平台---营销型网站互助分享会",
                "wContent": "8+1互助平台---营销型网站互助分享会"
            };


// 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                WeixinJSBridge.invoke('sendAppMessage', {
                    "img_url": window.shareData.imgUrl,
                    "img_width": "640",
                    "img_height": "640",
                    "link": window.shareData.sendFriendLink,
                    "desc": window.shareData.fContent,
                    "title": window.shareData.fTitle
                }, function (res) {
                    _report('send_msg', '111111');
                })
            });


// 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function (argv) {
                WeixinJSBridge.invoke('shareTimeline', {
                    "img_url": window.shareData.imgUrl,
                    "img_width": "640",
                    "img_height": "640",
                    "link": window.shareData.timeLineLink,
                    "desc": window.shareData.tContent,
                    "title": window.shareData.tTitle
                }, function (res) {
                    _report('timeline', res.err_msg);
                });
            });


// 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function (argv) {
                WeixinJSBridge.invoke('shareWeibo', {
                    "content": window.shareData.wContent,
                    "url": window.shareData.weiboLink
                }, function (res) {
                    _report('weibo', res.err_msg);
                });
            });
        }, false)
    }

}