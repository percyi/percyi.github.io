angular.module('starter')

    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home/list/toutiao");

        $stateProvider

            .state('home', {
                abstract: true,
                url: '/home',
                templateUrl: 'temp/home.html'

            })
            .state('home.list', {
                url: '/list/:id',
                views: {
                    'home': {
                        templateUrl: 'temp/home.list.html',
                        controller: function ($scope, heroService, data, $stateParams) {

                            $scope.items = data;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            heroService.setReqState(false);

                            $scope.doRefresh = function () {
                                var id = $stateParams.id;
                                var pro = heroService.getArticle(id, true);
                                pro.then(function (data) {
                                    $scope.items = data;
                                    $scope.$broadcast('scroll.refreshComplete');
                                })
                            }

                            $scope.loadMore = function () {
                                var pro = heroService.getMore();
                                pro && pro.then(function (data) {
                                    var items = data;
                                    $scope.items = ($scope.items || []).concat(items);
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                    heroService.setReqState(false);
                                })
                            };

                        },
                        resolve: {
                            data: function (heroService, $stateParams) {
                                var id = $stateParams.id;
                                if (id == 'T1348647853363') {
                                    id = 'toutiao';
                                }
                                if (!id) {
                                    id = 'toutiao'

                                }
                                if (id !== 'toutiao') {
                                    var pro = heroService.getArticle(id);
                                    pro.then(function (a) {
                                        console.log(a);
                                    })
                                    return pro;
                                } else {
                                    var pro = heroService.getNext(id);
                                    return pro;
                                }
                            }
                        }
                    }
                }
            })
            .state('home.detail', {
                url: '/detail/:id',
                views: {
                    'home': {
                        templateUrl: 'temp/detail.html',
                        controller: function ($sce, $stateParams, heroService, commentService, $scope) {
                            console.log($stateParams.id); //*** Exists! ***//
                            var id = $stateParams.id;
                            heroService.getNewDetail(id).then(function (news) {
                                $scope.news = news.data[id];
                                // $scope.news.body = $sce.trustAsHtml($scope.news.body)
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            });

                          //  $('.detail-view').css({zIndex: 20});
                            $scope.loadMore = function () {
                                if ($scope.news) {
                                    commentService.getComment($scope.news.docid).then(function (data) {
                                        var items = data.data;
                                        if ($scope.news.hotList) {
                                            $scope.news.hotList.commentIds = $scope.news.hotList.commentIds.concat(items.commentIds);
                                            $scope.news.hotList.comments = $.extend($scope.news.hotList.comments, items.comments);
                                            $scope.$broadcast('scroll.infiniteScrollComplete');
                                        }

                                    })
                                } else {
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                            };
                        }

                    }

                }
            })
            .state('home.comment', {
                url: '/comment/:id',
                views: {
                    'home': {
                        templateUrl: 'temp/comment.html',
                        controller: function ($sce, $stateParams, heroService, commentService, $scope, data) {
                            console.log($stateParams.id); //*** Exists! ***//
                            var id = $stateParams.id;

                            $scope.hotList = data.data;
                            $('.detail-comment-view').css({zIndex: 30});
                            $scope.loadMore = function () {

                                commentService.getComment(id).then(function (data) {
                                    var items = data.data;

                                    $scope.hotList.commentIds = $scope.hotList.commentIds.concat(items.commentIds);
                                    $scope.hotList.comments = $.extend($scope.hotList.comments, items.comments);
                                    $scope.$broadcast('scroll.infiniteScrollComplete');


                                })

                            };
                        }, resolve: {
                            data: function (commentService, $stateParams) {
                                var docid = $stateParams.id;
                                return commentService.getComment(docid)
                                /*.then(function (data) {
                                 var items = data.data;

                                 /!*$scope.news = {
                                 hotList: {
                                 commentIds: [],
                                 comments: []
                                 }
                                 };

                                 $scope.news.hotList.commentIds = $scope.news.hotList.commentIds.concat(items.commentIds);
                                 $scope.news.hotList.comments = $.extend($scope.news.hotList.comments, items.comments);
                                 $scope.$broadcast('scroll.infiniteScrollComplete');*!/
                                 return items;

                                 });*/
                            }
                        }

                    }

                }
            })

            .state('home.livechannel', {
                url: '/livechannel',
                views: {
                    'livechannel': {
                        templateUrl: 'temp/livechannel.list.html',
                        controller: function ($sce, $stateParams, liveChannelService, $scope) {
                            liveChannelService.get().then(function (data) {
                                //console.log(data);
                                $scope.items = data.live_review;
                                $scope.data = data;
                            })

                            $scope.loadMore = function () {
                                if ($scope.items) {
                                    liveChannelService.get().then(function (data) {
                                        //console.log(data);
                                        $scope.items = $scope.items.concat(data.live_review);
                                        $scope.data = data;
                                        $scope.$broadcast('scroll.infiniteScrollComplete');
                                    })
                                } else {
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                            };
                            console.log($stateParams.id); //*** Exists! ***//

                        }

                    }
                }
            })
            .state('home.newstopic', {
                url: '/newstopic',
                views: {
                    'newstopic': {
                        templateUrl: 'temp/newstopic.list.html',
                        controller: function ($sce, $stateParams, newstopicService, $scope) {
                            newstopicService.get().then(function (data) {
                                //console.log(data);
                                $scope.items = data.data.expertList;
                                $scope.data = data;
                            })

                            $scope.loadMore = function () {
                                if ($scope.items) {
                                    newstopicService.get().then(function (data) {
                                        //console.log(data);
                                        $scope.items = $scope.items.concat(data.live_review);
                                        $scope.data = data;
                                        $scope.$broadcast('scroll.infiniteScrollComplete');
                                    })
                                } else {
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                            };
                            console.log($stateParams.id); //*** Exists! ***//

                        }

                    }
                }
            })
            .state('home.me', {
                url: '/me',
                views: {
                    'me': {
                        templateUrl: 'temp/me.html',
                        controller: function ($sce, $stateParams, newstopicService, $scope) {


                        }

                    }
                }
            })


    })
