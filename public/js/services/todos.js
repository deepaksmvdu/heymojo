angular.module('todoService', [])

	.factory('Todos', ['$http',function($http) {
		return {
			get : function(text) {
				if (text==undefined)
					return $http.get('/api/todos');
				else
					return $http.get('/api/todos/' + text);	
			},
			create : function(inputs) {
				return $http.post('/api/todos', inputs);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			putreq    :  function(data){
				return $http.post('/api/todos/put', data)
			}
		}
	}]);