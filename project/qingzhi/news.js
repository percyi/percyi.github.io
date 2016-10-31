/**
 *
 * Created by qingyun on 16/9/23.
 */
(function (angular) {

    angular.module('news', [])
        .service('newsService', NewsService)
        .directive('myScroll', ['newsService', function (newsService) {
            function link(scope, element, attrs) {
                newsService.getNews().then(function (response) {
                    console.log(response.data.tid);
                    scope.news = response.data.tid;
                });

                
                element.on('wheel', function () {
                    var rect = element[0].getBoundingClientRect();
                    console.log(rect.bottom , window.innerHeight)
                    if (rect.bottom < window.innerHeight+1) {
                        var promise = newsService.getNextNews();

                        promise && promise.then(function (res) {
                            scope.news = scope.news.concat(res.data.tid);
                            newsService.setReqStatus(false);
                        })
                    }
                })
            }

            return {link: link}
        }])
        .component('news', {
            template: '<h2>News</h2><ng-outlet></ng-outlet>',
            $routeConfig: [
                {path: '/', name: 'NewsList', component: 'newsList', useAsDefault: true},
                {path: '/:id', name: 'Report', component: 'report'}
            ]
        })
        .component('newsList', {
            templateUrl: 'routeConfig/routeConfig_news_list.html',
            controller: function () {
            },
            bindings: {
                data: '=',
                $router: '<'
            }
        })
        .component('report', {
            templateUrl: 'routeConfig/routeConfig_news_report.html',
            bindings: {
                $router: '<'
            },
            controller: ReportComponent
        })


    function NewsService($http) {
        var offset = 0;
        var size = 10;
        var isRequesting = false;

        //抓取网易新闻10条
        this.getNews = function () {
            var url = '/163/getSubDocPic?from=toutiao&fn=1&prog=LMA1&passport=&devId=xoedrIW%2B3Rt4l8pUvGdOEKpf1EYb5T9gRf4fBOGROoFb3mnQy%2F8LrNIu7bfDsCH%2B&offset=' + offset + '&size='
                + size + '&version=15.1&spever=false&net=wifi&lat=34qUv%2FiF8%2BeVafFPTTydOQ%3D%3D&lon=J3FWwuNJ4%2FX4l6tN03aQxg%3D%3D&ts=1474183347&sign=8gjKE6Eq98IRhHe3q%2B%2FWkspM8xdvXbcOMDCWpbUFa4548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
            return $http.get(url);
        };

        this.getNextNews = function () {
            if (!isRequesting) {
                isRequesting = true;
                offset += size;
                return this.getNews();
            }
        };

        this.getReport = function (id) {
            var reportUrl = '/163detail/' + id + '/full.html';
            return $http.get(reportUrl);
        };

        this.setReqStatus = function (status) {
            isRequesting = status;
        };
    }


    function ReportComponent(newsService) {
        var ctrl = this;

        this.$routerOnActivate = function (next, previous) {
            var id = next.params.id;
            newsService.getReport(id).then(function (report) {
                ctrl.report = report.data[id];
            })
        };

        this.gotoNews = function () {
            var reportId = this.report && this.report.id;
            this.$router.navigate(['NewsList', {id: report.id}])
        }
    }


}(window.angular))
