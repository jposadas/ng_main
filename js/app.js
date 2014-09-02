var app = angular.module('outfittery', ['ui.router', 'appControllers', 'appServices']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.when('', 'login');

	$stateProvider
		.state('questionnaire', {
			url: '/questionnaire',
			templateUrl: 'templates/questionnaire.html',
			controller: 'questionnaireCtrl',
			data: {
				auth: false
			}
		})
		.state('questionnaire.question1', {
			url: '/question1',
			templateUrl: 'templates/questionnaire.question1.html',
			controller: 'questionCtrl',
			data: {
				auth: false
			}
		})
		.state('questionnaire.question2', {
			url: '/question2',
			templateUrl: 'templates/questionnaire.question2.html',
			controller: 'questionCtrl',
			data: {
				auth: false
			}
		})
		.state('questionnaire.question3', {
			url: '/question3',
			templateUrl: 'templates/questionnaire.question3.html',
			controller: 'questionCtrl',
			data: {
				auth: false
			}
		})
		.state('questionnaire.submit', {
			url: '/submit',
			templateUrl: 'templates/questionnaire.submit.html',
			controller: 'submitCtrl',
			data: {
				auth: false
			}
		})
		.state('registration', {
			url: '/registration',
			templateUrl: 'templates/registration.html',
			controller: 'registrationCtrl',
			data: {
				auth: false
			}
		})
		.state('registration.reg1', {
			url: '/reg1',
			templateUrl: 'templates/registration.reg1.html',
			data: {
				auth: false
			}			
		})
		.state('registration.reg2', {
			url: '/reg2',
			templateUrl: 'templates/registration.reg2.html',
			data: {
				auth: false
			}
		})
		.state('banner', {
			url: '/banner',
			templateUrl: 'templates/banner.html',
			data: {
				auth: true
			}
		})
		.state('banner.list', {
			url: '/list',
			templateUrl: 'templates/banner.list.html',
			data: {
				auth: true
			}
		})
		.state('banner.outfit', {
			url: '/outfit/:id',
			templateUrl: 'templates/banner.outfit.html',
			data: {
				auth: true
			}
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			data: {
				auth: false
			}
		});

}]);

app.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		console.log('Changing state');
		console.log(toState);
		if (toState.name === 'login' && Auth.isAuthenticated()) $state.go('banner.list');
		if (toState.data.auth) {
			console.log(Auth.isAuthenticated());
			if (!Auth.isAuthenticated()) {
				console.log('Going to login!! wiii');
				event.preventDefault();
				$state.go('login');
			}
		}
  	});

}]);