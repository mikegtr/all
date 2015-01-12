/**
*  Module
*
* Description
*/
var app=angular.module('myApp', ['ui.router','angularFileUpload']);

app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider,$locationProvider)
{
	  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'mainCtrl'
    })
    .state('tada', {
      url: '/tada',
      templateUrl: 'tada.html',
      
    }).
    state('tada.under', {
      url:'/under',
      templateUrl: 'tada.under.html'
    });
 $locationProvider.html5Mode(true);
/* wywala hash z URL
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
*/
  $urlRouterProvider.otherwise('tada');
}]);

 
 app.controller( 'mainCtrl', ['$scope','variable','$state',function($scope,variable,$state){
	$scope.randomy = variable.posts[1];
	
	$scope.random = Math.floor(Math.random()*100000);
 
}]);

app.controller('AppController', ['$scope', 'FileUploader','variable', function($scope, FileUploader,variable) {
        var uploader = $scope.uploader = new FileUploader({
            url: '/upload'
        });
  $scope.randomy = variable.posts[1];
  
  $scope.random = Math.floor(Math.random()*100000);
 
        // FILTERS

      //  uploader.filters.push({
      //      name: 'imageFilter',
      //     fn: function(item /*{File|FileLikeObject}*/, options) {
      //          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      //          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      //      }
     //   });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);


app.factory('variable', [function(){
	 var o = {
    posts: ['1','jeeee']
  };
	return o;
}]);