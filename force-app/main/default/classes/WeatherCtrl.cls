public with sharing class WeatherCtrl {
 
    @AuraEnabled
    public static weatherData fetchWeatherInfo(String zipCode, String countryCode)
    {
        //String endPoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' +appId;
        String endPoint = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',' + countryCode +'&appid=fb8fb60af35feed835b598eb61e0cafc';
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();
        Http http = new Http();
        request.setEndpoint(endPoint);
        request.setMethod('POST');
        response = http.send(request);
        if (response.getStatusCode() == 200) {
            String jsonResponse = response.getBody();
            System.debug('Response-' + jsonResponse);
            fromJSON jsonParseData = (fromJSON)parse(jsonResponse);
            weatherData wrpData = new weatherData(jsonParseData);
            System.debug('Response-' + jsonParseData);
            return wrpData;
        } else{
            throw newMessageException('Error : Please check zipcode or country');
        }
    }
 
    private static AuraHandledException newMessageException(String message) {
        AuraHandledException e = new AuraHandledException(message);
        e.setMessage(message);
        return e;
    }
 
    public class weatherData{
        @AuraEnabled
        public String name;
        @AuraEnabled
        public Double temp;
        @AuraEnabled
        public Integer sunset;
        @AuraEnabled
        public Integer sunrise;
        @AuraEnabled
        public Integer humidity;
        @AuraEnabled
        public Integer pressure;
        public weatherData(fromJSON parseData){
            cls_main te = parseData.main;
            this.name = parseData.name;
            this.temp = te.temp;
            this.humidity = te.humidity;
            this.pressure = te.pressure;
            this.sunrise = parseData.sys.sunrise;
            this.sunset = parseData.sys.sunset;
        }
    }
 
    
    
    public class cls_weather {
        public Integer id;  //804
        public String main; //Clouds
        public String description;  //overcast clouds
        public String icon; //04n
    }
    public class cls_coord {
        public Double lon;  //-84.0379
        public Double lat;  //33.9604
    }
    public class cls_wind {
        public Double speed;    //0.89
        public Integer deg; //225
        public Double gust; //1.79
    }
    public class fromJSON{
        public cls_coord coord;
        public cls_weather[] weather;
        public String base; //stations
        public cls_main main;
        public Integer visibility;  //10000
        public cls_wind wind;
        public cls_clouds clouds;
        public Integer dt;  //1640777807
        public cls_sys sys;
        public Integer timezone;    //-18000
        public Integer id;  //0
        public String name; //Norcross
        public Integer cod; //200
    }
    
    public class cls_clouds {
        public Integer all; //90
    }
    public class cls_sys {
        public Integer type;    //2
        public Integer id;  //2032059
        public String country;  //US
        public Integer sunrise; //1640781647
        public Integer sunset;  //1640817337
    }

    public class cls_main {
        public Double temp; //291.86
        public Double feels_like;   //292.06
        public Double temp_min; //290.15
        public Double temp_max; //293.27
        public Integer pressure;    //1013
        public Integer humidity;    //87
    }

    public static fromJSON parse(String json){
        return (fromJSON) System.JSON.deserialize(json, fromJSON.class);
    }
}
