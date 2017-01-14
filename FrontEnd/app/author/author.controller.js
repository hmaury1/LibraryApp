'use strict';

angular.module('libraryApp.author', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/author', {
    templateUrl: 'author/author.html',
    controller: 'authorController'
  });
  $routeProvider.when('/author/form/:author_id', {
    templateUrl: function(params){ return 'author/form.html#/' + params.author_id; },
    controller: 'authorController'
  });
}])

.controller('authorController', ['$scope', 'authorService', '$location','$routeParams', function($scope,authorService,$location,$routeParams) {

    $scope.author = {
      id:($routeParams.author_id ? $routeParams.author_id : 0),
      name: '',
      nationality: ''
    };

    if($scope.author.id > 0){
        authorService.get($scope.author.id).then(function(response){
            $scope.author = response;
        });
    }
  
  $scope.find = function(){
      authorService.find($scope.filtro).then(function(response){
          $scope.authors = response;
        });
  }

  $scope.createAuthor = function(){
      $location.path('/author/form/0');
  }

  $scope.editAuthor = function(id){
      $location.path('/author/form/'+id);
  }

  $scope.save = function(data){
      if(data.id > 0){
        if(data.books){
          delete data.books;
        }
        authorService.edit(data).then(function(response){
           $location.path('/author/');
        });
      }else{
        authorService.create(data).then(function(response){
           $location.path('/author/');
        });
      }
  }

  $scope.delete = function(id){
      authorService.delete(id).then(function(response){
           authorService.query().then(function(response){
              $scope.authors = response;
          });
        });
  }

	function show(){
        authorService.query().then(function(response){
            $scope.authors = response;
        });
    }	

  show();
}]);