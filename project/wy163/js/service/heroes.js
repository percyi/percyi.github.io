function HeroService($q, $http) {


    var offset = 0;
    var size = 10;
    var id;

    var isRequesting = false;

    this.getHeroes = function (from) {
        var url = '/163/getSubDocPic?from=' + from + '&fn=1&prog=LMA1&passport=&devId=xoedrIW%2B3Rt4l8pUvGdOEKpf1EYb5T9gRf4fBOGROoFb3mnQy%2F8LrNIu7bfDsCH%2B&offset=' + offset + '&size='
            + size + '&version=15.1&spever=false&net=wifi&lat=34qUv%2FiF8%2BeVafFPTTydOQ%3D%3D&lon=J3FWwuNJ4%2FX4l6tN03aQxg%3D%3D&ts=1474183347&sign=8gjKE6Eq98IRhHe3q%2B%2FWkspM8xdvXbcOMDCWpbUFa4548ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';

        var deferred = $q.defer();

        $http.get(url, {cache: true}).success(function (resp) {
            deferred.resolve(resp.tid);
        });

        return deferred.promise;

    }

    /**
     * 获取下 10(size)条数据
     */
    var _from;
    this.getNext = function (from) {
        _curInterface = this.getNext;
        from = from || _from;
        if (!isRequesting) {
            isRequesting = true;
            offset += size;
            _from = from;
            return this.getHeroes(from);
        }
    }

    this.getNewDetail = function (id) {
        var detailUrl = '/163detail/' + id + '/full.html';
        return $http.get(detailUrl);
    }


    this.setReqState = function (state) {
        isRequesting = state;
    }


    var offset = -10,
        limit = 10;
    var recodeSet = {offset: -10, limit: 10};
    var _curRecords = {};
    var _curInterface;



    var _id;
    this.getArticle = function (id,isBegin) {
        _curInterface = this.getArticle;
        id = id || _id;
        var curRecord = _curRecords[id] || (
                _curRecords[id] = {offset: 0, limit: 10},
                    _curRecords[id].offset += _curRecords[id].limit, _curRecords[id]
            );
        if(isBegin){
            curRecord.offset = 0;
        }
        var url = '/article/' + id + '/' + curRecord.offset + '-' + (curRecord.offset + curRecord.limit ) + '.html';

        var deferred = $q.defer();
        $http({method: 'GET', url: url}).then(function (res) {
            deferred.resolve(res.data[id]);
        })

        _id = id;
        _curRecords[id].offset += _curRecords[id].limit;
        return deferred.promise;
    }

    this.getMore = function () {
        return _curInterface&&_curInterface.call(this);
    }
}


angular.module('starter')
    .service('heroService', HeroService)


angular.module('starter')
    .service('commentService', ['$http', function ($http) {

        var offset = 0, limit = 10;
        var last_id;
        this.getComment = function (id) {
            offset += limit;
            id && (last_id = id.trim());
            var url = '/comment/' + last_id + '/app/comments/newList?format=building&headLimit=3&ibc=newsappios&limit=' + limit + '&offset=' + offset + '&showLevelThreshold=5&tailLimit=2';
            return $http.get(url);
        }

        this.get = function (id) {
            last_id = id && id.trim();

            var url = '/comment/' + id + '/app/comments/hotList?format=building&headLimit=3&ibc=newsappios&limit=10&offset=0&showLevelThreshold=5&tailLimit=2';

            return $http.get(url);

        }


    }])




