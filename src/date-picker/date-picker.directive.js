(function (){
    angular.module('aanZeeDirectives.datePicker', [])
    .directive('datePicker', ['options', '$timeout', function (options, $timeout) {
        return {
            restrict: 'AE',
            require: ['ngModel', '?^ngDisabled'],
            templateUrl: options.viewPath + 'date-picker/date-picker.view.html',
            replace: true,
            scope: {
                ngModel: '=',
                ngDisabled: '@?',
                ngReadOnly: '@?',
                classes: '@?',
                format: '@?',
                defaultDate: '@?',
                minDate: '@?',
                maxDate: '@?',
                locale: '@?',
                locales: '@?',
                numberOfMonths: '@?',
                disableWeekends: '@?',
                firstDay: '@?',
                icon: '@?'
            },
            controller: ['$scope', '$element', function($scope, $element) {
                $scope.$on('dateSelected', function(event, date){
                    $scope.ngModel = moment(date).locale($scope.locale).format($scope.format);
                    $timeout(function() {
                        $scope.$digest();
                    });
                });
                if (angular.isUndefined($scope.ngReadOnly)) {
                    $scope.ngReadOnly = false;
                }
            }],
            link: function(scope, elem, attr) {
                console.log(attr);

                if (elem[0]) {
                    scope.classes = {
                        pickerWrapper: '',
                        pickerInput: ''
                    };

                    scope.icon = '';
                    if (attr.icon) {
                        scope.icon = attr.icon;
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

                    // Determine the date format
                    scope.format = 'YYYY-MM-DD';
                    if (attr.format) {
                        scope.format = attr.format;
                    }

                    // Set Pikaday library options
                    var pikadayOptions = {
                        field: elem[0],
                        format: scope.format,
                        onSelect: function(date){
                            if (attr.ngDisabled) {
                                return;
                            }
                            scope.$emit('dateSelected', date);
                        },
                        onOpen: function(picker){
                            scope.$emit('pickerOpen', picker);
                        },
                        onClose: function(picker){
                            scope.$emit('pickerClose', picker);
                        },
                        onDraw: function(picker){
                            scope.$emit('pickerDraw', picker);
                        }
                    };

                    // Set locales
                    if (scope.$parent.locales) {
                        pikadayOptions.locales = scope.$parent.locales;
                    }

                    // Show x number of months
                    if (attr.numberOfMonths) {
                        pikadayOptions.numberOfMonths = attr.numberOfMonths;
                    }

                    // Disable weekends
                    if (attr.disableWeekends) {
                        pikadayOptions.disableWeekends = attr.disableWeekends;
                    }

                    // Disable weekends
                    if (attr.firstDay) {
                        pikadayOptions.firstDay = scope.$eval(attr.firstDay);
                    }

                    // Check if the property exists, if so readonly is true.
                    if (typeof attr.readonly !== 'undefined') {
                        scope.ngReadOnly = true;
                    }

                    // Set locale default locale is en
                    scope.locale = 'en';
                    if (attr.locale && scope.$parent.locales) {
                        scope.locale = attr.locale;
                        pikadayOptions.i18n = pikadayOptions.locales[scope.locale];
                    }

                    // Initialize picker
                    var picker = new Pikaday(pikadayOptions);

                    // Set default date
                    if (attr.defaultDate) {
                        picker.setDate(new Date(attr.defaultDate));
                    }

                    // Set default date
                    if (attr.minDate) {
                        picker.setMinDate(new Date(attr.minDate));
                    }

                    // Set default date
                    if (attr.maxDate) {
                        picker.setMaxDate(new Date(attr.maxDate));
                    }

                    // Add the picker to the parent controller so we can do 'things' with it
                    if (!scope.$parent.pickers) {
                        scope.$parent.pickers = {};
                    }
                    scope.$parent.pickers[attr.ngModel] = picker;
                    $timeout(function() {
                        scope.$parent.$digest();
                    });
                }
            }
        };
    }]);
})();
