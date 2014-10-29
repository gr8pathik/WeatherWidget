## WeatherWidget

A simple weather widget using jQuery.

![Weather Widget Preview](preview.png)

## Example

```html
...
<body>
    ...
    <div id="weather-widget"></div>
    ...
</body>
...
```

```js
<script>
    $(document).ready(function () {
        $('#weather-widget').weatherWidget({
            zipCode: '22102'
        });
    });
</script>
```
