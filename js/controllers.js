var appControllers = angular.module('appControllers', []);

appControllers.controller('main', ['$scope', '$rootScope', '$state', 'mainData', 'AUTH_EVENTS', 'Auth', 'Session',
	function($scope, $rootScope, $state, mainData, AUTH_EVENTS, Auth, Session) {

	// Authentication
	$scope.currentUser = Session.getUser() || null;
	console.log(typeof $scope.currentUser);
	$scope.authEvents = AUTH_EVENTS;
	$scope.setCurrentUser = function(user) {
		console.log(user);
		$scope.currentUser = user;
	};

	$scope.changeState = function(state) {
		$state.go(state);
	};

	$scope.isStateLoading = false;

	$rootScope.$on($scope.authEvents.loginSuccess, function() {
		$state.go('banner.list');
	});

	$scope.$on('switchingRegistrationPart', function(event, args) {
		for(key in args) {
			mainData.pushData(key, args[key]);
		}
	});

}]);

appControllers.controller('registrationCtrl', ['$scope', '$rootScope', 'tmpData', '$state', 
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

appControllers.controller('regStep', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
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

appControllers.controller('regStep2', ['$scope', '$rootScope', function($scope, $rootScope) {
	$scope.addInfo = function(email, password) {
		$rootScope.$broadcast('regInfoEntered', {
			email: email, 
			password: password
		});
		window.alert("Thanks for registering!");
		$rootScope.$broadcast('finishedRegistration');
	};	
}]);

appControllers.controller('questionnaireCtrl', ['$scope', '$state', 'tmpData', function($scope, $state, tmpData) {

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

appControllers.controller('questionCtrl', ['$scope', '$rootScope', 'tmpData', function($scope, $rootScope, tmpData) {

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

appControllers.controller('submitCtrl', ['$scope', '$rootScope',  '$window', '$state', 'tmpData',
	function($scope, $rootScope, $window, $state, tmpData) {

	$scope.data = tmpData.getData();
	$scope.submit = function() {
		$window.alert('Preferences submitted');
		$rootScope.$broadcast('switchingRegistrationPart', {questionnaire: $scope.data});
		$state.go('registration.reg1');
	};

}]);

appControllers.controller('bannerCtrl', ['$scope', 'tmpData', 'Auth', function($scope, tmpData, Auth) {
	tmpData.clearData();
	$scope.logout = function() {
		Auth.logout();
		$scope.setCurrentUser(null);
		$scope.changeState('login');
	};
}]);

appControllers.controller('bannerListCtrl', ['$scope', '$http', 'tmpData', function($scope, $http, tmpData) {
	$http.get('api/topicboxes.json').success(function(data) {
		$scope.previews = data.payload;
	});
}]);

appControllers.controller('bannerOutfitCtrl', ['$scope', '$stateParams', '$http', 'tmpData', '$rootScope', function($scope, $stateParams, $http, tmpData, $rootScope) {
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
		return tmpData.getValue(id)
	};

}]);

appControllers.controller('loginCtrl', ['$scope', '$rootScope', 'Auth', function($scope, $rootScope, Auth) {
	$scope.login = function(credentials) {
		Auth.login(credentials)
			.then(function(data) {
				$scope.setCurrentUser(data);
				$rootScope.$broadcast($scope.authEvents.loginSuccess);
			}, function(error) {
				console.log(error);
			});
	};
}]);