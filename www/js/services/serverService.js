angular.module('serverService', [])
.service('serverService', function ($http) {

      var url = 'http://localhost:3000';

      this.getDefaultUrl = function () {
       return $http.get(url + "/url");
     };
});
