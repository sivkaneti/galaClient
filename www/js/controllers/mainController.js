
angular.module('mainController', [])
    .controller('mainController', [ '$scope','$location','$window' ,'serverService', function ($scope,$location,$window ,serverService) {

      $scope.form = {};

      //submit form
      $scope.submitForm = function(form){
        if(form.url){
          if(!form.redirect){
            redirectToUrl(form.url);
          }else{
            getDefaultUrl();
          }
        }else{
          $scope.form.url = "EMPTY URL - PLEASE ENTER A URL"
        }
      };

      //redirect to external url
      var redirectToUrl = function(url){
        if(url.startsWith('http://')){
          $scope.form.url=`REDIRECT TO: ${url}`;
          setTimeout(function(){
             $window.location.href = url;
          }, 1500);
        }else{
           $scope.form.url=`REDIRECT TO: ${url}`;
           setTimeout(function(){
               $window.location.href = `http://${url}`;
           }, 1500);
        }
      };

      //get default url from db
      function getDefaultUrl() {
        serverService.getDefaultUrl()
          .then(function (response) {
              if(response.data){
                redirectToUrl(response.data);
              }else{
                  $scope.form.url = "NO URL FOUND IN THE SERVER"
              }
           }, function (error) {
                alert(`ERROR: ${JSON.stringify(error.data)}`)
           });
       }
}]);
