(function($) {
    'use strict';
    jQuery.support.cors = true;

    $.fn.weatherWidget = function(config) {
        config = $.extend({
            zipCode: ''
        }, config);

        var constants = {
            apiURL: 'http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%22{{zipCode}}%22&format=json',
            loadingTemplate: '<div class="weather-widget-loading">Loading...</div>',
            errorTemplate: '<div class="weather-widget-error"><strong>Error:</strong><br/>{{errorMessage}}</div>',
            htmlTemplate: '<div class="weather-widget-title">{{title}}</div>\
                           <div class="weather-widget-current-conditions">\
                               <div class="weather-widget-current-temp">{{currentTemp}}&deg;</div>\
                               <div class="weather-widget-current-image-container">\
                                   <div class="weather-widget-current-image"><img src="{{imageURL}}" /></div>\
                                   <div class="weather-widget-current-image-text">{{imageText}}</div>\
                               </div>\
                           </div>\
                           <div class="weather-widget-forecast">\
                               {{forecastItems}}\
                           </div>',
            forecastItemTemplate: '<div class="weather-widget-forecast-item">\
                                       <div class="weather-widget-forecast-day">{{forecastDay}}</div>\
                                       <div class="weather-widget-forecast-temp">{{forecastHigh}}&deg; / {{forecastLow}}&deg;</div>\
                                   </div>'
        };

        var init = function(i, element) {
            var $element = $(element);
            $element.addClass('weather-widget');
            $element.html(constants.loadingTemplate);
            process($element);
        }

        var process = function($element) {
            $.ajax({
                type: 'GET',
                url: constants.apiURL.replace('{{zipCode}}', config.zipCode),
                dataType: 'json',
                success: function(data) {
                    if (data.query && data.query.count > 0 && data.query.results && data.query.results.channel) {
                        var item = data.query.results.channel.item;
                        if (item && item.forecast && item.forecast.length == 5) {
                            render($element, item);
                        } else if (item && item.title) {
                            render($element, false, item.title);
                        } else {
                            render($element, false, "Weather information was not found.");
                        }
                    } else {
                        render($element, false, "Weather information was not found.");
                    }

                },
                error: function(data) {
                    render($element, false);
                }
            });
        }

        var render = function($element, item, errorMessage) {
            var html = '';
            if (item === false) {
                errorMessage = errorMessage ? errorMessage : 'Weather data could not be loaded.';
                html = constants.errorTemplate.replace("{{errorMessage}}", errorMessage);
            } else {
                var title = item.title;
                title = title.substring(title.indexOf('Conditions for') + 15, title.indexOf(' at '));

                var imageURL = item.description;
                var srcMatch = imageURL.match(/src\s*=\s*"(.+?)"/i);
                imageURL = srcMatch && srcMatch.length > 1 ? srcMatch[1] : '';

                var forecastItems = '';
                for (var i = 0; i < item.forecast.length; i++) {
                    var forecast = item.forecast[i];
                    forecastItems += constants.forecastItemTemplate
                                         .replace("{{forecastDay}}", forecast.day)
                                         .replace("{{forecastHigh}}", forecast.high)
                                         .replace("{{forecastLow}}", forecast.low);
                }

                html = constants.htmlTemplate
                           .replace("{{title}}", title)
                           .replace("{{currentTemp}}", item.condition.temp)
                           .replace("{{imageURL}}", imageURL)
                           .replace("{{imageText}}", item.condition.text)
                           .replace("{{forecastItems}}", forecastItems);
            }

            $element.html(html);
        }

        return this.each(init);
    }
})(jQuery);