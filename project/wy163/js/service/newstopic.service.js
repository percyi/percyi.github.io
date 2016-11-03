angular.module('starter')
    .factory('newstopicService', ['$http', '$q', function ($http, $q) {


            var count = 0;
            var offset = 0, limit = 10;
            var service = {
                get: function () {
                    var url = '/newstopic';


                    url += '/' + offset + '-' + (offset + limit) + '.html';
                    offset += limit;

                    var rdefer = $q.defer();
                    var deferTopic = $http.get(url, {cache: true});

                    deferTopic.then(function (res) {
                        rdefer.resolve(res.data);
                        ++count;
                    })

                    return rdefer.promise;
                }


            }

            return service;
        }
        ]
    )





