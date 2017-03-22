var app = angular.module('locateMeApp', []);

app.controller('mainController', function($scope, $http) {
	$scope.posts = [];
	$scope.newPost = {"created_by": "", "text": "", "created_at": ""};
	$scope.locationObject = {
          center: {lat: null, lng: null},
          zoom: 8
        };
    
    $http({
    	method: 'GET',
    	url: 'http://ip-api.com/json'
    }).then(function (response) {
    	$scope.locationObject.center.lat = response.data.lat;
    	$scope.locationObject.center.lng = response.data.lon;
    	$scope.ipAddress = response.data.query;
    	//debugger;
    	//window.alert(response);
    	console.log(response);
    }, function(err) {
    	window.alert("Failed to get any response from the api");
    });
    $scope.loadMap = ()=>{
    	var map;
    	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });	
    }
	$scope.post = () => {
		$scope.newPost.created_at = Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost = {"created_by": "", "text": "", "created_at": ""};
	};
	
})

app.controller('authController', function($scope) {
	$scope.user = {"username": "", "password": ""};
	$scope.error_message = "";
	$scope.login = () => {
		$scope.error_message = "Login request for " + $scope.user.username;
	}
	$scope.register = () => {
		$scope.error_message = "Registration request for " + $scope.user.username;
	}
})