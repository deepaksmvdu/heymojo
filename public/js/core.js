var heyMojoApp = angular.module('heyMojoApp', ['ngRoute','todoService']);

	// configure our routes
	heyMojoApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/view1.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/details', {
				templateUrl : 'views/view2.html',
				controller  : 'controllertwo'
			})

			// // route for the contact page
			.when('/contact', {
				templateUrl : 'views/view3.html',
				controller  : 'controllerthree'
			});
	});

	heyMojoApp.controller('mainController', ['$scope','$http','Todos','$rootScope','$location', function($scope, $http,Todos,$rootScope,$location) {
		$rootScope.val = undefined
		$scope.formData = {};
		$scope.loading = true;
		$scope.values = false;

		Todos.get(undefined)
			.success(function(data) {
				console.log(data)
				$scope.todos = data;

				$scope.loading = false;

			});

		$scope.createTodo = function() {

			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				Todos.create($scope.formData)

					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; 
						$scope.todos = data; 
					});
			}
		};

		$scope.activate = function(text) {
			console.log(text)
			Todos.get(text)

				.success(function(data) {
					console.log("DATA")
					$rootScope.val = data
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
					$location.path('/details');
				});
			$scope.values = true;
			$scope.details = text
		};

		$scope.delete = function(id,ind) {
			$scope.loading = true;

			Todos.delete(id)
				
				.success(function(data) {
					if (data.status.code==200){
						Todos.get(undefined)
							.success(function(data) {
								$scope.todos = data;

								$scope.loading = false;

							});
						
					}
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};


	}]);

	heyMojoApp.controller('controllertwo', ['$scope','$http','Todos','$rootScope', function($scope, $http,Todos,$rootScope) {
		$scope.inputs = [];
		if ($rootScope.val!=undefined){
			$scope.inputs.name =$rootScope.val.name
			$scope.inputs.id = $rootScope.val.id
			$scope.inputs.entries = $rootScope.val.entries  
			console.log($scope.inputs)
		}
		else{
			$scope.inputs.entries=[]
			$scope.inputs.id = undefined
			$scope.inputs["entries"].push({})

		}
  		$scope.addfield=function(){
  			$scope.inputs["entries"].push({})
  		}
  		$scope.delete=function(data){
  			console.log(data)
  			$scope.inputs.entries.splice(data,1);
    		// $scope.inputs.push({})
  		}
  		$scope.saveEntity=function(getid){
  			if (getid.id!=undefined){
  				console.log(getid)
  				var data = {}
  				data["name"] 		= getid["name"]
  				data["id"]   		= getid["id"]
  				data["entries"] 	= getid["entries"]
  				for (p in data.entries){
  					if (typeof(data.entries[p].synonyms)=="string"){
	  				data["entries"][p]["synonyms"] = data.entries[p]["synonyms"].split(",") }}
  				Todos.putreq(data)
				.success(function(data) {
					if (data.status.code==200){
						$scope.inputs.entries=[]
						$scope.inputs.id = undefined
						$scope.inputs.name = undefined
						$scope.inputs["entries"].push({})
						console.log(data)
						
					}
				});
  			}
  			else {
	  			sendData = {}
	  			console.log("HERE")
	  			console.log($scope.inputs)
	  			sendData["name"] = $scope.inputs.name
	  			delete $scope.inputs.name
	  			sendData.entries = $scope.inputs.entries
	  			for (p in sendData.entries){
	  					sendData["entries"][p]["synonyms"] = sendData.entries[p]["synonyms"].split(",") }
	    		Todos.create(sendData)
						.success(function(inputs) {
							$scope.inputs.entries=[{}]
							$scope.inputs = undefined
						});
	  			}
  			}
  			
  		


	}]);
