(function (){
	angular.module('aanZeeDirectives', [
		// All the directives
		'aanZeeDirectives.inputStepper'
	])
	// Add the options to the module
	.value('options', {viewPath: '/views/aanzee/directives/'});
})();