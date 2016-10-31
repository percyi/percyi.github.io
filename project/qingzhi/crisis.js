/**
 *
 * Created by qingyun on 16/9/22.
 */

(function (angular) {
    angular.module('crisis-center', ['dialog'])
        .service('crisisService', CrisisService)
        .component('crisisCenter', {
            template: '<h2>Crisis Center</h2><ng-outlet></ng-outlet>',
            $routeConfig: [
                {path: '/', name: 'CrisisList', component: 'crisisList', useAsDefault: true},
                {path: '/:id', name: 'CrisisDetail', component: 'crisisDetail'}
            ]
        })
        .component('crisisList', {
            templateUrl: 'routeConfig/routeConfig_crisis_list.html',
            bindings: {
                $router: '<'
            },
            controller: CrisisListComponent,
            $canActivate: function ($nextInstruction, $prevInstruction) {
                console.log('$canActivate', arguments)
            }
        })
        .component('crisisDetail', {
            templateUrl: 'routeConfig/routeConfig_crisis_detail.html',
            bindings: {
                $router: '<'
            },
            controller: CrisisDetailComponent
        })

    function CrisisService($q) {
        var crisesPromise = $q.when([
            {id: 1, name: 'Princess Held Captive'},
            {id: 2, name: 'Dragon Burning Cities'},
            {id: 3, name: 'Giant Asteroid Heading For Earth'},
            {id: 4, name: 'Release Deadline Looms'}
        ]);

        this.getCrises = function () {
            return crisesPromise;
        };

        this.getCrisis = function (id) {
            return crisesPromise.then(function (crises) {
                for (var i = 0; i < crises.length; i++) {
                    if (crises[i].id === id)return crises[i];
                }
            });
        };
    }


    function CrisisListComponent(crisisService) {
        var selectedId = null;
        var ctrl = this;

        this.$routerOnActivate = function (next, previous) {
            console.log('ni', arguments);

            crisisService.getCrises().then(function (crises) {
                console.log(crises)
                ctrl.crises = crises;
                selectedId = next.params.id;
            });
        };

        this.isSelected = function (crisis) {
            return (crisis.id === selectedId)
        };

        this.onSelect = function (crisis) {
            this.$router.navigate(['CrisisDetail', {id: crisis.id}]);
        };
    }

    function CrisisDetailComponent(crisisService, dialogService) {
        var ctrl = this;
        this.$routerOnActivate = function (next, previous) {
            var id = next.params.id;
            crisisService.getCrisis(id).then(function (crisis) {
                if (crisis) {
                    ctrl.ediName = crisis.name;
                    ctrl.crisis = crisis
                } else {
                    ctrl.gotoCrises();
                }
            });
        };

        this.$routerCanDeactivate = function () {
            if (!this.crisis || this.crisis.name === this.editName) {
                return true;
            }
            return dialogService.confirm('Discard changes?')
        };


        this.cancel = function () {
            ctrl.ediName = ctrl.crisis.name;
            ctrl.gotoCrises();
        };

        this.save = function () {
            ctrl.crisis.name = ctrl.editName;
            ctrl.gotoCrises();
        };


        this.gotoCrises = function () {
            var crisisId = ctrl.crisis && ctrl.crisis.id;
            this.$router.navigate(['CrisisList', {id: crisisId}]);
        }
    }
}(window.angular));










