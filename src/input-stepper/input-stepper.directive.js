(function (){
    angular.module('aanZeeDirectives.inputStepper', [])
    .directive('inputStepper', ['options', function (options) {
        return {
            restrict: 'AE',
            require: ['ngModel', '?^ngDisabled'],
            replace: true,
            templateUrl: options.viewPath + 'input-stepper/input-stepper.view.html',
            scope: {
                ngModel: '=',
                ngDisabled: '@?',
                label: '@?',
                minimum: '@?',
                maximum: '@?',
                step: '@?',
                disabled: '@?',
                classes: '@?',
                iconIncrease: '@?',
                iconDecrease: '@?'
            },
            controller: ['$scope', '$element', function($scope, $element) {
                $scope.decrease = function(){
                    if ($scope.minimum){
                        if (($scope.ngModel - parseInt($scope.step, 10)) >= $scope.minimum){
                            $scope.ngModel -= parseInt($scope.step, 10);
                        }
                    } else {
                        $scope.ngModel -= parseInt($scope.step, 10);
                    }
                };
                $scope.increase = function(){
                    if ($scope.maximum){
                        if (($scope.ngModel + parseInt($scope.step, 10)) <= $scope.maximum){
                            $scope.ngModel += parseInt($scope.step,10);
                        }
                    } else {
                        $scope.ngModel += parseInt($scope.step,10);
                    }
                };
            }],
            link: function(scope, elem, attr) {
                scope.step = parseInt(attr.step, 10) || 1;
                scope.minimum = undefined;
                scope.maximum = undefined;
                scope.iconIncrease = '+';
                scope.iconDecrease = '-';
                scope.classes = {
                    increaseButton: '',
                    decreaseButton: '',
                    input: '',
                    label: '',
                    wrapper: ''
                };

                if (attr.max){
                    scope.maximum = parseInt(attr.max, 10);
                }
                if (attr.min){
                    scope.minimum = parseInt(attr.min, 10);
                }
                if (!scope.ngModel){
                    scope.ngModel = scope.minimum || 0;
                }
                if (attr.iconIncrease) {
                    scope.iconIncrease = attr.iconIncrease;
                }
                if (attr.iconDecrease) {
                    scope.iconDecrease = attr.iconDecrease;
                }

                // Add classes to classes object
                attr.classes = scope.$eval(attr.classes);
                if (attr.classes) {
                    for (var classKey in scope.classes){
                        if (attr.classes[classKey]){
                            scope.classes[classKey] = attr.classes[classKey];
                        }
                    }
                }

                var upKey = 38,
                    downKey = 40;

                scope.validate = function(value){
                    scope.ngModel = parseInt(value, 10);

                    if (value === undefined || value === null){
                        scope.ngModel = scope.minimum || 0;
                    }

                    if (scope.maximum && (value > scope.maximum)){
                        scope.ngModel = scope.maximum;
                    }

                    if (scope.minimum && (value < scope.minimum)){
                        scope.ngModel = scope.minimum;
                    }
                };

                scope.keyHandler = function($event){
                    $event.preventDefault();
                    if ($event.keyCode == upKey){
                        scope.increase();
                    }
                    if ($event.keyCode == downKey){
                        scope.decrease();
                    }
                };
            }
        };
    }]);
})();