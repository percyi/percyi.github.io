/**
 *
 * Created by qingyun on 16/9/23.
 */


(function (angular) {
    angular.module('dialog', [])
        .service('dialogService', DialogService);

    function DialogService($q) {
        this.confirm = function (msg) {
            return $q.when(window.confirm(msg || 'Is it Ok?'))
        }
    }
}(window.angular))

