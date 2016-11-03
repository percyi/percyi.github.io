angular.module('starter')
    .factory('apiService', function () {
        /*
         var apies = {
         "0": {
         "txt": "推荐", "api": function (offset, size) {
         var url = '/163/getSubDocPic?from=toutiao&fn=1&prog=LMA1&passport=&devId=xoedrIW%2B3Rt4l8pUvGdOEKpf1EYb5T9gRf4fBOGROoFb3mnQy%2F8LrNIu7bfDsCH%2B&offset=' + offset + '&size='
         + size + '&version=15.1&spever=false&net=wifi&lat=34qUv%2FiF8%2BeVafFPTTydOQ%3D%3D&lon=J3FWwuNJ4%2FX4l6tN03aQxg%3D%3D&ts=1474183347&sign=8gjKE6Eq98IRhHe3q%2B%2FWkspM8xdvXbcOMDCWpbUFa4548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';
         return url;
         },
         href: 'tuijian'
         },
         "1": {"txt": "新闻", "api": "", href: 'news'},
         "2": {"txt": "娱乐", "api": "", href: 'enth'},
         "3": {"txt": "体育", "api": ""},
         "4": {"txt": "财经", "api": ""},
         "5": {"txt": "汽车", "api": ""},
         "6": {"txt": "军事", "api": ""},
         "7": {"txt": "图片", "api": ""},
         "8": {"txt": "视频", "api": ""},
         "9": {"txt": "段子", "api": ""},
         "10": {"txt": "时尚", "api": ""},
         "11": {"txt": "本地", "api": ""},
         "12": {"txt": "网易号", "api": ""},
         "13": {"txt": "手机", "api": ""},
         "14": {"txt": "公开课", "api": ""},
         "15": {"txt": "科技", "api": ""},
         "16": {"txt": "跟贴", "api": ""},
         "17": {"txt": "游戏", "api": ""},
         "18": {"txt": "数码", "api": ""},
         "19": {"txt": "教育", "api": ""},
         "20": {"txt": "健康", "api": ""},
         "21": {"txt": "独家", "api": ""},
         "22": {"txt": "旅游", "api": ""},
         "23": {"txt": "亲子", "api": ""},
         "24": {"txt": "彩票", "api": ""},
         "25": {"txt": "星闻", "api": ""},
         "26": {"txt": "房产", "api": ""},
         "27": {"txt": "家居", "api": ""},
         "28": {"txt": "小说", "api": ""},
         "29": {"txt": "漫画", "api": ""},
         "30": {"txt": "BoBo", "api": ""}
         };
         return {apies: apies}
         })*/
    });
angular.module('starter')
    .factory('dataService', ['$http', '$q', function ($http,$q) {


            var service = {
                getTopic: function () {
                    var url = '/163topic';
                    var favurl = '/favor';


                    var rdefer = $q.defer();
                    var deferTopic = $http.get(url, {cache: true});
                    var deferFavor = $http.get(favurl, {cache: true});
                    $q.all([deferTopic, deferFavor]).then(function (res) {

                        var topics = res[0].data.tList;
                        var favors = res[1].data;
                        angular.forEach(favors,function(favor,i){

                            var topic = topics.find(function(e){return e.ename== favor});
                            topic && (topic._order = i);


                        })

                        var toutiao = topics.find(function(e){return e.ename== 'iosnews'});
                        toutiao._order = -1;
                        rdefer.resolve(topics);
                    })

                    return rdefer.promise;
                }
            }

            return service;
        }
        ]
    )





