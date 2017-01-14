'use strict';

angular.module('libraryApp.book', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/book/', {
    templateUrl: 'book/book.html',
    controller: 'bookController'
  });
  $routeProvider.when('/book/form/:book_id', {
    templateUrl: function(params){ return 'book/form.html#/' + params.book_id; },
    controller: 'bookController'
  });
}])

.controller('bookController', ['$scope', 'bookService', '$location','$routeParams', function($scope,bookService,$location,$routeParams) {

    $scope.book = {
      id:($routeParams.book_id ? $routeParams.book_id : 0),
      name: '',
      nationality: ''
    };

    if($scope.book.id > 0){
        bookService.get($scope.book.id).then(function(response){
            $scope.book = response;
        });
    }

    $scope.authors = [];
    $scope.filtro = "";
  

  $scope.createBook = function(){
      $location.path('/book/form/0');
  }

  $scope.editBook = function(id){
      $location.path('/book/form/'+id);
  }

  $scope.save = function(data){
      if(data.id > 0){
        delete data.author;
        bookService.edit(data).then(function(response){
           $location.path('/book/');
        });
      }else{
        bookService.create(data).then(function(response){
           $location.path('/book/');
        });
      }
  }

  $scope.delete = function(id){
      bookService.delete(id).then(function(response){
          bookService.query().then(function(response){
              $scope.books = response;
          }); 
        });
  }

  $scope.find = function(){
      bookService.find($scope.filtro).then(function(response){
          $scope.books = response;
        });
  }

  $scope.encodeBase64 = function (input) {
        $scope.$apply(function() {            
            var file = input.files && input.files[0];            
            if (file) {                
                var type = file.type.split("/")[1].toLowerCase();                         
                if (file.type.startsWith("image") && (type === "png" || type === "jpg" || type === "jpeg")) {
                    if ((file.size / (1024 * 1024)) <= 1) {                        
                        var reader = new FileReader();
                        reader.onload = function(e) {                            
                            $scope.book.image = e.target.result; 
                        };
                        reader.readAsDataURL(input.files[0]);
                    } else {
                        alert("invalid file"); 
                        input.files=[];   
                    }
                } else {                    
                    alert(" invalid file");
                    input.files=[];
                }
            }
        });
    }

	function show(){
        bookService.query().then(function(response){
            $scope.books = response;
        }); 
        bookService.authors().then(function(response){
            $scope.authors = response;
        });
    }	

  show();
}]);