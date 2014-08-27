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
			// console.log(data);
		}
	}
});