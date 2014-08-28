var app = angular.module('outfittery', ['ui.router', 'appControllers', 'appServices']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.when('', 'signin');

	$stateProvider
		.state('questionnaire', {
			url: '/questionnaire',
			templateUrl: 'templates/questionnaire.html',
			controller: 'questionnaireCtrl'
		})
		.state('questionnaire.question1', {
			url: '/question1',
			templateUrl: 'templates/questionnaire.question1.html',
			controller: 'questionCtrl'
		})
		.state('questionnaire.question2', {
			url: '/question2',
			templateUrl: 'templates/questionnaire.question2.html',
			controller: 'questionCtrl'
		})
		.state('questionnaire.question3', {
			url: '/question3',
			templateUrl: 'templates/questionnaire.question3.html',
			controller: 'questionCtrl'
		})
		.state('questionnaire.submit', {
			url: '/submit',
			templateUrl: 'templates/questionnaire.submit.html',
			controller: 'submitCtrl'
		})
		.state('registration', {
			url: '/registration',
			templateUrl: 'templates/registration.html',
			controller: 'registrationCtrl'
		})
		.state('registration.reg1', {
			url: '/reg1',
			templateUrl: 'templates/registration.reg1.html'
		})
		.state('registration.reg2', {
			url: '/reg2',
			templateUrl: 'templates/registration.reg2.html'
		})
		.state('banner', {
			url: '/banner',
			templateUrl: 'templates/banner.html'
		})
		.state('banner.list', {
			url: '/list',
			templateUrl: 'templates/banner.list.html'
		})
		.state('banner.outfit', {
			url: '/outfit/:id',
			templateUrl: 'templates/banner.outfit.html'
		})
		.state('signin', {
			url: '/signin',
			templateUrl: 'templates/signin.html'
		});

}]);