var appServices = angular.module('appServices', []);

appServices.factory('tmpData', function() {
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

appServices.factory('mainData', function() {
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
			console.log(data);
		}
	}
});

appServices.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated'
});

appServices.factory('AuthService', ['$http', 'Session', function($http, Session) {
	
	var authService = {};

	authService.login = function(credentials) {
		return $http.get('api/customers/auth/get.json', credentials).then(function(res) {
			Session.create(res.id, res.user.id);
			return res.user;
		});
	};

	authService.isAuthenticated = function() {
		return !!Session.userId;
	};

	return authService;

}]);

appServices.service('Session', [function() {
	this.create = function(sessionId, userId) {
		this.id = sessionId;
		this.userId = userId;
	};
	this.destroy = function() {
		this.id = null;
		this.userId = null;
	};
	return this;
}]);



