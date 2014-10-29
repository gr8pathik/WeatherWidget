## WeatherWidget

A simple weather widget using jQuery.

![Weather Widget Preview](preview.png)

## Example

Simply add a div element to a page with either an id or class to identify it.
```html
<body>
    <div id="weather-widget"></div>
</body>
```

Call the WeatherWidget function on your element and pass in the **required zipCode** configuration property.
```js
$('#weather-widget').weatherWidget({
    zipCode: '22102'
});
```

## Installation

Ensure that you have jQuery referenced and add the weatherWidget.min.css stlye sheet and the weatherWidget.min.js script to the page.
```html
<link href="weatherWidget.min.css" rel="stylesheet" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="weatherWidget.min.js"></script>
```
