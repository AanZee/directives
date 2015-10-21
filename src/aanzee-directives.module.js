(function (){
	var options = {
		viewPath: '/views/aanzee/directives/'
	};

	/*  */
	if (window.aanzeeDirective !== undefined){
		for (var attribute in window.aanzeeDirective) {
			options[attribute] = window.aanzeeDirective[attribute];
		}
	}

	angular.module('aanZeeDirectives', [])
		.constant('options', options);
})();