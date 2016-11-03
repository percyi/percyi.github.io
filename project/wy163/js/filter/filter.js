/**
 * Created by qingyun on 16/9/26.
 */

angular.module('starter')

    .filter('getpdate', [function () {
        return function (input) {
            //ptime

            if (!input) {
                return ''
            }
            //"2016-10-12 07:32:42"
            var result = input.match(/\d+\-(\d+\-\d+\s*\d+:\d+):\d+/);

            var date = result [1];
            return date;
        };

    }
    ]).filter('replceimg', [function () {
        return function (input, news) {
            //ptime
            var result,
                imgs = news && news.img;
            if (!input) {
                return ''
            }

            result = input;
            if(result.replace) {
                angular.forEach(imgs, function (img, i) {
                    result = result.replace(img.ref, function () {
                        var dim = img.pixel;
                        return '<img src="' + img.src + '" img-resize  data-dim="' + img.pixel + '">';
                    })
                })


                return result;
            }else{
                return ''
            }
        };

    }
    ])
