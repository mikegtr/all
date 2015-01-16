/**
*  Module
*
* Description
*/
var app=angular.module('myApp', ['ui.router','angularFileUpload','ngResource','ngRoute']);

app.
config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
'$httpProvider',
function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider)
{


  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0')
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          }, 
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
          );
      }
    });




	  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'mainCtrl',
      resolve: {
          loggedin: checkLoggedin
        }
    })
    .state('tada', {
      url: '/tada',
      templateUrl: 'tada.html',

      
    }).
    state('tada.under', {
      url:'/under',
      templateUrl: 'tada.under.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).
    state('login', {
      url:'/login',
      templateUrl: 'login.html',
      controller: 'LoginCtrl'
      
    });;
 $locationProvider.html5Mode(true);
/* wywala hash z URL
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
*/
  $urlRouterProvider.otherwise('tada');
}])  .run(function($rootScope, $http){
    $rootScope.message = '';

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  });

 
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

/**********************************************************************
 * Admin controller
 **********************************************************************/
app.controller('AdminCtrl', function($scope, $http) {
  // List of users got from the server
  $scope.users = [];

  // Fill the array to display it in the page
  $http.get('/users').success(function(users){
    for (var i in users)
      $scope.users.push(users[i]);
  });
});

/**********************************************************************
 * Login controller
 **********************************************************************/
app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/home');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };
});
