(function () {
    var dpr = window.devicePixelRatio;

    document.documentElement.style.fontSize = window.innerWidth  / 10 + 'px';

    var meta = document.querySelector('meta');
    //meta.setAttribute('content', 'initial-scale=' + 1 / dpr + ', maximum-scale=' + 1 / dpr + ', minimum-scale=' + 1 / dpr + ', user-scalable=no');

}())
