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

app.factory('variable', [function(){
	 var o = {
    posts: ['1','jeeee']
  };
	return o;
}]);