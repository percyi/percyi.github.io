//侧边栏
angular.module('starkAPP')
    .controller('sidebarController', ['$scope', '$rootScope', 'BaseService', '$timeout', '$location',
        function ($scope, $rootScope, BaseService, $timeout, $location) {
            function refreshen() {
                $scope.active = {};
                var path = $location.path().slice(1, -1);
                // var path = $location.path().split('/')[1];
                $scope.active[path + 'IsActive'] = true;
            }

            refreshen();

            $scope.changeURL = function (url) {
                $location.url(url);
                refreshen();
            }

            $scope.showSearch = function () {
                $rootScope.$broadcast('showSearch');
            }
        }
    ]);
