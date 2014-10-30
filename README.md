## WeatherWidget

A simple jQuery weather widget which uses the Yahoo Weather API.

![Weather Widget Preview](preview.png)

## Example

Add a div element to a page with either an id or class to identify it.
```html
<body>
    <div id="weather-widget"></div>
</body>
```

Call the WeatherWidget function on the element and specify the **required zipCode** configuration property.
```js
$('#weather-widget').weatherWidget({
    zipCode: '22102'
});
```

## Installation

Ensure that jQuery is referenced and add the weatherWidget.min.css stylesheet and the weatherWidget.min.js javascript to the page.
```html
<link href="weatherWidget.min.css" rel="stylesheet" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="weatherWidget.min.js"></script>
```
