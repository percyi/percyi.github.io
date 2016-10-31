/**
 *
 * Created by qingyun on 16/9/21.
 */

(function (angular) {
    angular.module('heroes', [])
        .service('heroService', HeroService)
        .component('heroes', {
            template: '<h2>Heroes</h2><ng-outlet></ng-outlet>',//ng-outlet给当前组件设置$router属性,

            $routeConfig: [
                {path: '/', name: 'HeroList', component: 'heroList', useAsDefault: true},
                {path: '/:id', name: 'HeroDetail', component: 'heroDetail'}
            ]
        })
        .component('heroList', {
            templateUrl: 'routeConfig/routeConfig_hero_list.html',
            controller: HeroListComponent
        })
        .component('heroDetail', {
            templateUrl: 'routeConfig/routeConfig_hero_detail.html',
            bindings: {
                //将父组件里的$router属性,传入到该组件。
                $router: '<'
            },
            controller: HeroDetailComponent
        });


    function HeroDetailComponent(heroService) {

        var $ctrl = this;

        //$routerOnActivate是一个life-cycle hooks(生命周期钩子)。导航成功后,调用该钩子。
        //接受两个参数。next,previous. 这两个参数,拥有一个params参数。这个参数可以从url获得id
        this.$routerOnActivate = function (next, previous) {
            console.log('next', next, previous);
            var id = next.params.id;
            //heroService 是注入的服务。
            return heroService.getHero(id).then(function (hero) {
                $ctrl.hero = hero;
            })
        };
        //返回到heroList组件。
        this.gotoHeroes = function () {
            //得到hero的id, this.hero是$routerOnActivate(钩子),产生的
            var heroId = this.hero && this.hero.id;
            //$router 是通过ng-outlet绑定到组件内。
            this.$router.navigate(['HeroList', {id: heroId}]);
        }
    }


    function HeroListComponent(heroService) {
        var selectedId = null;
        var $ctrl = this;
        this.$routerOnActivate = function (next, previous) {
            //调用服务heroService中的getHeroes()函数。得到他的英雄数组。和当前url中的id
            return heroService.getHeroes().then(function (heroes) {
                $ctrl.heroes = heroes;
                selectedId = next.params.id;
            })
        };
        this.isSelected = function (hero) {
            return (hero.id === selectedId);
        }
    }

    function HeroService($q) {
        var heroesPromise = $q.when([
            {id: 11, name: 'Mr.Nice'},
            {id: 12, name: 'Narco'},
            {id: 13, name: 'Bombasto'},
            {id: 14, name: 'Celeritas'},
            {id: 15, name: 'Magneta'},
            {id: 16, name: 'RubberMan'}
        ]);


        this.getHeroes = function () {
            return heroesPromise;
        };

        this.getHero = function (id) {
            //模仿异步。
            return heroesPromise.then(function (heroes) {
                for (var i = 0; i < heroes.length; i++) {
                    if (heroes[i].id === id)return heroes[i]
                }
            })
        };
    }
}(window.angular))
