/**
 * Created by qingyun on 16/9/21.
 */

(function (angular) {
    angular.module('app', ['ngComponentRouter', 'heroes', 'crisis-center','news','ngSanitize'])
        .config(function ($locationProvider) {
            $locationProvider.html5Mode({
                enable: true,
                requireBase: false
            });
        })
        .value('$routerRootComponent', 'app')
        .component('app', {
            templateUrl: 'routeConfig/routeConfig_one.html',
            $routeConfig: [
                {path: '/heroes/...', name: 'Heroes', component: 'heroes'},
                {path: '/crisis-center/...', name: 'CrisisCenter', component: 'crisisCenter', useDefaultAs: true},
                {path: '/news/...', name: 'News', component: 'news'}
            ]
        });
}(window.angular));
