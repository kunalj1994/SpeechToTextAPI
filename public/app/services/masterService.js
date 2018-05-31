app.service('masterService', function($http, $q){

    var service = {};
    service.calculate = function(path){
        var defered = $q.defer();
        var options = {
            headers: {
                'Content-Type': 'applicaation/json',
                'Accept': 'applicaation/json'
            }
        }
        $http.get(path, options).then(function(response){
            defered.resolve(response.data);
        }, function(err){
            defered.reject(err);
        });
        return defered.promise; 
    }
    return service;
});