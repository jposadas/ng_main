var app = angular.module('outfittery', ['ui.router', 'appControllers', 'appServices']);

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