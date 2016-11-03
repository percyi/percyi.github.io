/**
 * Created by qingyun on 16/9/26.
 */

angular.module('starter')

    .directive('navBar', ['dataService', function (dataService) {

        var data = ["推荐", "新闻", "娱乐", "体育", "财经", "汽车", "军事", "图片", "视频", "段子", "时尚", "本地", "网易号", "手机", "公开课",
            "科技", "跟贴", "游戏", "数码", "教育", "健康", "独家", "旅游", "亲子", "彩票", "星闻", "房产", "家居", "小说", "漫画", "BoBo"];

        return {
            templateUrl: 'temp/navBar.html',
            restrict: 'E',
            scope: {},

            link: function (scope, ele, attr) {

                dataService.getTopic().then(function (data) {
                    scope.tList = data;
                })

                ele = angular.element(ele);
                var container = ele.find('[data-id="container"]');


                /*data.forEach(function (d) {
                 var item = angular.element('<span>' + d + '</span>')
                 container.append(item);
                 })*/


                scope.isOrdered = function (topic) {
                    return !!topic._order;
                }

                scope.isUnOrdered = function (topic) {
                    return !topic._order;
                }
                ele.on('click', '.nav', function (e) {
                    //console.log(e);
                    var _this = angular.element(this);
                    _this.parent().children().removeClass('checked');
                    _this.addClass('checked');
                    var rect = this.getBoundingClientRect();
                    var leftDis = container[0].offsetLeft - (rect.left - window.innerWidth / 2 + rect.width / 2);

                    leftDis > 0 && (leftDis = 0);
                    container.css({left: leftDis + 'px'})
                    // e.preventDefault();
                    e.stopPropagation();
                })
            }
        }
    }])
    .directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    if (value) {
                        // Incase value is a TrustedValueHolderType, sometimes it
                        // needs to be explicitly called into a string in order to
                        // get the HTML string.
                        element.html(value && value.toString());
                        element.find('p').each(function (i, p) {
                            $(p).text($(p).text().trim());
                        })
                        // If scope is provided use it, otherwise use parent scope
                        var compileScope = scope;
                        if (attrs.bindHtmlScope) {
                            compileScope = scope.$eval(attrs.bindHtmlScope);
                        }
                        $compile(element.contents())(compileScope);
                    }
                });
            }
        };
    }])
    .directive('imgResize', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var w = attrs.width;
                var h = attrs.height;

                var pW = $(element).parent().width();
                element.css({width: pW + 'px'});
            }
        };
    }])
    .directive('comment', ['commentService', function (commentService) {
        return {
            restrict: 'A',
            scope: '=',
            link: {
                pre: function ($scope, $element, $attrs) {
                    
                    var returned = 0;
                    $scope.topThree = function (key, i, list) {
                        if(i==0) returned =0;
                        var rvalue;
                        if (returned >= 3) {
                            rvalue = false;
                        }else {
                            if (key.indexOf(',') != -1) {

                                rvalue = false;
                            } else {
                                ++returned;
                                rvalue = true;
                            }
                        }
                        console.log(rvalue)
                        return rvalue;
                    }
                    $scope.$watch('news', function (value) {
                        console.log(value);
                        if (value) {
                           // $scope.comments = commentService.get($scope.news.docid);
                            commentService.get($scope.news.docid).then(function (data) {
                                $scope.news.hotList = data.data;
                                $scope.hotList = $scope.news.hotList;
                            });
                        }
                    })

                }
            }
        };
    }])
    .directive('showAll', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, $element, $attrs) {
                $scope.fn = function () {
                    $scope.isHidden = !$scope.isHidden;
                }

                $scope.getContent = function () {
                    var ids = $scope.id.split(',');
                    var id = ids[0];

                    return $scope.hotList.comments[ids[0]].content;

                }
                $timeout(function () {
                    var height = 123;
                    var h = $($element).find('.content').height();
                    if (h > height) {

                        //$element.find('p').css({height:height +'px'});
                        $scope.isHidden = true;
                        $scope.height = height;
                    }
                    console.log('height:' + h)
                }, 0)
            }
        };
    }])
    .directive('netstComment', ['$timeout', '$compile', function ($timeout, $compile) {
        return {
            restrict: 'A',
            scope: '=',
            link: function ($scope, $element, $attrs) {
                var parent = $element;


                var ids = $scope.id.split(',');
                var temp = $element.clone(true);

                var len = ids.length;
                if (ids.length > 1) {
                    ids = ids.reverse();
                    $.each(ids, function (i, id) {
                        if ('2607397836' == id) {
                            debugger;
                        }
                        if (i == 0) {

                            $element.children().attr({id: id});

                            var content = $compile($element.html())($scope)
                            $element.children().remove();
                            $element.append(content)
                            $(content).css({border: 'none'});
                            //parent = $(content);
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return;
                        }
                        var newComment = temp.clone(true);
                        newComment.children().attr({'id': id});
                        newComment.children().attr({'idx': len - i});
                        var content = $compile(newComment.html())($scope)

                        if (i == 1) {
                            parent.find('.contentWrap').prepend(content);
                        } else {
                            parent.prepend(content);
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        parent = $(content);
                    })
                }
            }
        };
    }]).directive('getId', ['$timeout', '$compile', function ($timeout, $compile) {
    return {
        restrict: 'A',
        scope: true,
        link: function ($scope, $element, $attrs) {
            if ($attrs.id) {
                $scope.id = $attrs.id
                $scope.idx = $attrs.idx;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
            ;
        }
    };
}]);