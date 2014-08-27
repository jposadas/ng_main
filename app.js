var app = angular.module('outfittery', ['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.when('', 'questionnaire/question1');

	$stateProvider
		.state('questionnaire', {
			url: '/questionnaire',
			templateUrl: 'questionnaire.html',
			controller: 'questionnaireCtrl'
		})
		.state('questionnaire.question1', {
			url: '/question1',
			templateUrl: 'questionnaire.question1.html',
			controller: 'questionCtrl'
		})
		.state('questionnaire.question2', {
			url: '/question2',
			templateUrl: 'questionnaire.question2.html',
			controller: 'questionCtrl'
		})
		.state('questionnaire.question3', {
			url: '/question3',
			templateUrl: 'questionnaire.question3.html',
			controller: 'questionCtrl'
		})
		.state('questionnaire.submit', {
			url: '/submit',
			templateUrl: 'questionnaire.submit.html',
			controller: 'submitCtrl'
		})
		.state('registration', {
			url: '/registration',
			templateUrl: 'registration.html',
			controller: 'registrationCtrl'
		})
		.state('registration.reg1', {
			url: '/reg1',
			templateUrl: 'registration.reg1.html'
		})
		.state('registration.reg2', {
			url: '/reg2',
			templateUrl: 'registration.reg2.html'
		})
		.state('banner', {
			url: '/banner',
			templateUrl: 'banner.html'
		})
		.state('banner.list', {
			url: '/list',
			templateUrl: 'banner.list.html'
		})
		.state('banner.outfit', {
			url: '/outfit/:id',
			templateUrl: 'banner.outfit.html'
		});

}]);

app.controller('main', ['$scope', '$rootScope', 'mainData', function($scope, $rootScope, mainData) {

	$scope.isStateLoading = true;

	$scope.$on('switchingRegistrationPart', function(event, args) {
		for(key in args) {
			mainData.pushData(key, args[key]);
		}
	});

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){
			console.log("CHANGING STATES");
			$scope.isStateLoading = true;
		});
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){
			console.log("CHANGING STATES FINISHED");
			$scope.isStateLoading = false;
		});

}]);

app.controller('registrationCtrl', ['$scope', '$rootScope', 'tmpData', '$state', 
	function($scope, $rootScope, tmpData, $state) {
	
	tmpData.clearData();

	//Listeners
	$scope.$on('regInfoEntered', function(event, args) {
		for (key in args) {
			tmpData.pushData(key, args[key]);
		}
	});

	$scope.$on('finishedRegistration', function(event) {
		$rootScope.$broadcast('switchingRegistrationPart', {registration: tmpData.getData()});
		$state.go('banner.list');
	});

}]);

app.controller('regStep', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
	$scope.salutation = 'Herr';
	$scope.addInfo = function(salutation, firstName, lastName) {
		$rootScope.$broadcast('regInfoEntered', {
			salutation: salutation, 
			firstName: firstName, 
			lastName: lastName
		});
		$state.go('registration.reg2');
	};	
}]);

app.controller('regStep2', ['$scope', '$rootScope', function($scope, $rootScope) {
	$scope.addInfo = function(email, password) {
		$rootScope.$broadcast('regInfoEntered', {
			email: email, 
			password: password
		});
		window.alert("Thanks for registering!");
		$rootScope.$broadcast('finishedRegistration');
	};	
}]);

app.controller('questionnaireCtrl', ['$scope', '$state', 'tmpData', function($scope, $state, tmpData) {

	tmpData.clearData();

	var numQuestions = parseInt(document.getElementById('header').getAttribute('data-num-questions'));

	$scope.$on('questionAnswered', function(event, args) {

		tmpData.pushData(args.questionID, args.answer);
		
		var order = parseInt(args.order);
		if (order < numQuestions && tmpData.length() < numQuestions) {
			$state.go('questionnaire.question' + (order + 1));
		} else {
			$state.go('questionnaire.submit');
		}

	});


}]);

app.controller('questionCtrl', ['$scope', '$rootScope', 'tmpData', function($scope, $rootScope, tmpData) {

	var elem = document.getElementById('currentQuestion');
	var questionID = elem.getAttribute('data-question-id');
	var questionOrder = elem.getAttribute('data-question-order');
	
	$scope.questionID = questionID;
	$scope.answer = tmpData.getValue(questionID);
	$scope.submit = function(answer) {
		// console.log('trying to submit ' + answer);
		$rootScope.$broadcast('questionAnswered', {questionID: questionID, answer: answer, order: questionOrder});
	};
}]);

app.controller('submitCtrl', ['$scope', '$rootScope',  '$window', '$state', 'tmpData',
	function($scope, $rootScope, $window, $state, tmpData) {

	$scope.data = tmpData.getData();
	$scope.submit = function() {
		$window.alert('Preferences submitted');
		$rootScope.$broadcast('switchingRegistrationPart', {questionnaire: $scope.data});
		$state.go('registration.reg1');
	};

}]);

app.controller('bannerCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('api/topicboxes.json').success(function(data) {
		$scope.previews = data.payload;
	});
}]);

app.controller('bannerOutfitCtrl', ['$scope', '$stateParams', '$http', 'tmpData', function($scope, $stateParams, $http, tmpData) {
	var url = 'api/customerpreviewget/' + $stateParams.id + '.json';
	$http.get(url).success(function(data) {
		$scope.data = data.payload;
	});

	$scope.dislike = function(id) {
		tmpData.pushData(id, false);
	};
	$scope.like = function(id) {
		tmpData.pushData(id, true);
	};
	$scope.itemStatus = function(id) {
		// return !!tmpData.getData(id);
		// console.log(id + ': ' + !!tmpData.getValue(id));
		return tmpData.getValue(id)
	};

}]);

app.factory('tmpData', function() {
	var data = {};
	return {
		getData: function() {
			return data;
		},
		getValue: function(key) {
			return data[key];
		},
		length: function() {
			return Object.keys(data).length;
		},
		pushData: function(key, value) {
			data[key] = value;
			console.log(data);
		},
		clearData: function() {
			data = {};
		}
	};
});

app.factory('mainData', function() {
	var data = {};
	return {
		getData: function() {
			return data;
		},
		getValue: function(key) {
			return data[key];
		},
		pushData: function(key, value) {
			data[key] = value;
			// console.log(data);
		}
	}
});
