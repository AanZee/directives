# Aan Zee - Directives
A whole bunch of Angular directives made by Aan Zee.
The main purpose of this repository is to create standard directives which we use in numerous projects.

*Version: 0.2.2*

### Usage
1. Include the `dist/js/directives.min.js` in your HTML page after you have declared Angular and copy `dist/views` to a location you prefer.
2. Alter some additional configuration as shown in the example html files.
3. Now you are ready to use our directives in your project.

## Configuration
In some projects you just want all directives to be included, this can be done by the following piece of code

```js
angular.module('myApp', ['aanZeeDirectives']);

// If you need to change some options like for example you want the views in a different location, you'll need to override the angular value 'options'
angular.module('myApp', ['aanZeeDirectives']).value('options', {viewPath: '../dist/views/aanzee/directives/'});
```

You could also choose to just use one directive, all directives are modules as well. So if you want to only use the input-stepper directive you need to code it like this:

```js
// With this setup the value 'options' is MANDATORY! Because the default options are only set in the main module 'AanZeeDirectives'
angular.module('myApp', ['aanZeeDirectives.inputStepper']).value('options', {viewPath: '../dist/views/aanzee/directives/'});
```

### Versioning
VX.0.0 Is a **major** release<br>
V0.X.0 Is a **structure** release, in these releases the structure of a directive could be changed<br>
V0.0.X Is a **minor** release, nothing changes in te structure only bug fixes and minor changes with no impact for other versions.

### Author
Aan Zee Interactive
- Raoul de Best
- Sven Buijsrogge
