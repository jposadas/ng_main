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

appServices.factory('Auth', ['$http', '$q', 'Session', function($http, $q, Session) {

	var Authentication = {};

	Authentication.login = function(credentials) {

		var deferred = $q.defer();
		$http.get('api/customers/auth/get.json', credentials)
			.then(function(result) {

				$http.get('api/customers/get.json', {id: result.data.payload.id})
					.then(function(result) {
						Session.create(result.data.payload);
						deferred.resolve(Session.getUser());
					}, function(error) {
						deferred.reject(error);
					});
				
			}, function(error) {
				deferred.reject(error);
			});

		return deferred.promise;

	};

	Authentication.logout = function() {
		Session.destroy();
	};

	Authentication.isAuthenticated = function() {
		return !!Session.getUser();
	};

	return Authentication;

}]);

appServices.factory('Session', ['$window', function($window) {
	
	var key = "userInfo";
	var Session = {};

	Session.create = function(userInfo) {
		$window.sessionStorage.setItem(key, JSON.stringify(userInfo));
	};

	Session.getUser = function() {
		return JSON.parse($window.sessionStorage.getItem(key));
	};
	Session.destroy = function() {
		$window.sessionStorage[key] = null;
	};

	return Session;

}]);



