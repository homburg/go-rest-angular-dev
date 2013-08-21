(function () {
	var app = angular.module("myApp", ["ngResource", "ngAnimate"]);

	app.factory("Persons", function ($resource) {
		return $resource("/persons/:id", {"id": "@id"});
	});

	app.directive("person", function() {
		return {
			restrict: "E",
			scope: {
				person: "=givenPerson",
				delete: "&"
			},
			templateUrl: "person.html"
		}
	});

	app.controller("HelloCtrl", function($scope, Persons) {

		$scope.persons = Persons.query(function () {
			$scope.activePerson = $scope.persons[0]
		})

		// Add person and refresh model
		$scope.addPerson = function () {
			var p = new Persons($scope.newPerson);
			p.$save(function (newResource) {
				$scope.persons.push(newResource)
			});
		};

		// Delete person and refresh model
		$scope.deletePerson = function (index) {
			$scope.persons[index].$remove(function () {
				$scope.persons.splice(index, 1)
			});
		};

		$scope.ixActivePerson = 0
			
		$scope.setActivePerson = function (index) {
			$scope.ixActivePerson = index
		}
	});
})();
