(function() {
	'use strict';

	angular
		.module('aanZeeDirectives.sheet', [])
		.directive('sheet', sheet);

	sheet.$inject = ['options'];

	function sheet (options) {
		var directive = {
			bindToController: true,
			controller: Controller,
			controllerAs: 'sheet',
			link: link,
			restrict: 'E',
			templateUrl: options.viewPath + 'sheet/sheet.view.html',
			replace: true,
			transclude: true,
			scope: {
				isVisible: '=',
				bodyModifierClass: '@',
				sheetTitle: '@'
			}
		};
		return directive;

		function link (scope, element, attrs) {

			activate();

			function activate () {
				scope.$watch('sheet.isVisible', function(newValue, oldValue) {
					toggleSheet();
				});
			}

			/**
			 * Bugfix: When you accidentally
			 * scroll the body on touch devices
			 * - Remind scroll position after opening the sheet
			 * - Restore scroll position when closing the sheet
			 */
			function toggleSheet () {
				if (scope.sheet.isVisible) {
					scope.sheet.scrollPositionOnLastOpen = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
				} else {
					window.scrollTo(0, scope.sheet.scrollPositionOnLastOpen);
					document.activeElement.blur();
				}
			}
		}
	}

	function Controller ($scope) {
		$scope.closeSheet = closeSheet;

		function closeSheet ($event) {
			$event.preventDefault();
			$scope.sheet.isVisible = false;
		}
	}
})();