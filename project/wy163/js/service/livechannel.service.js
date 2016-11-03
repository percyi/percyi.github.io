angular.module('starter')
    .factory('liveChannelService', ['$http', '$q', function ($http, $q) {


            var count = 0;
            var service = {
                get: function () {
                    var url = '/livechannel';
                    if (!count) {
                        url += '/previewlist.json'
                    } else {
                        url += '/previewlist/' + count + '.json';
                    }


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





