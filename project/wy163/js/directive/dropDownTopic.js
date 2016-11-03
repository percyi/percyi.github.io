/**
 * Created by qingyun on 16/9/26.
 */
angular.module('starter')
    .directive('dropDownTopic', ['dataService', function (dataService) {


        return {
            restrict: 'A',
            link: function (scope, ele, attr) {
                var topicContaier = $(ele).parent().next();
                ele.on('click', function () {
                    if ($(ele).hasClass('checked')) {

                        $(ele).removeClass('checked'),
                            //$(ele).parent().next().css({top: -1 * 685 + 'px'}),
                            $(ele).parent().next().removeClass('topic-show');
                        //{top: -1 * 685 + 'px'}),
                        $('.tab-nav').animate({bottom: '0px'});
                    }
                    else {
                        $(ele).addClass('checked'),
                            //$(ele).parent().next().css({top: 0 + 'px'}),

                            $(ele).parent().next().addClass('topic-show');
                        $('.tab-nav').animate({bottom: -1 * $('.tab-nav').height() + 'px'})
                    }

                });


                $(topicContaier).on('touchstart', 'li', function () {
                    console.log(this);
                    var startT = Date.now(), endT, elapseT;
                    $(this).on('touchend', function () {
                        //获取当前时间
                        endT = Date.now();
                        elapseT = endT - startT;

                        if (elapseT > 1000) {
                            console.log('长安了' + elapseT);
                            $(topicContaier).addClass('pressed');
                        }

                        $(this).off('touchend');
                    })
                })

                $(topicContaier).on('touchstart', 'i', function () {
                    var idx = $(this).parent().attr('data-topicIdx');
                    var del = scope.items.splice(idx, 1);
                    console.log([del, idx]);
                    scope.$apply();
                })

                dataService.getTopic().then(function (data) {
                    scope.items = data;
                });
            }
        }
    }])


    .directive('scaleContent', [function (dataService) {


        return {
            restrict: 'A',
            link: function (scope, ele, attr) {
                scope.$watch('item', function (value) {
                    if(!value) return;
                    var pW = $(ele).width();
                    var cW = $(ele).children().width();
                    var len = $(ele).text().length;
                    var fSize;
                    var size = 3;
                    if (pW - cW - size < 0) {
                        var fSize = (pW - size) / len
                        $(ele).css({fontSize: fSize + 'px'});
                    }
                })


            }
        }
    }]);
