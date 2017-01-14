'use strict';

angular
.module('libraryApp.book')
.service('bookService',  ['$http','CONSTANT', function ($http, CONSTANT) {
		var me = this;
		
        this.query = function() {
            return $http.get(CONSTANT.SERVER +'api/Books' )
                .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                        }
                );
        }

        this.find = function(data) {
            return $http.post(CONSTANT.SERVER +'api/Books?filter='+data )
                .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                        }
                );
        }

        this.authors = function() {
	        return $http.get(CONSTANT.SERVER +'api/Authors' )
                .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                        }
                );
	    }

        this.get = function(id) {
            return $http.get(CONSTANT.SERVER +'api/Books/'+id )
                .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                        }
                );
        }

        this.create = function(data) {
            return $http.post(CONSTANT.SERVER +'api/Books', data)
                    .then(
                            function (response) {
                                return response.data;
                            },
                            function (errResponse) {
                            }
                    );
        }

        this.edit = function(data) {
            return $http.put(CONSTANT.SERVER +'api/Books/'+data.id, data)
                    .then(
                            function (response) {
                                return response.data;
                            },
                            function (errResponse) {
                            }
                    );
        }

        this.delete = function(id) {
            return $http.delete(CONSTANT.SERVER +'api/Books/'+id)
                    .then(
                            function (response) {
                                return response.data;
                            },
                            function (errResponse) {
                            }
                    );
        }
	}
]);
