import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from '../models/WeatherForecast';
import { FiveDayForecast } from '../models/FiveDayForecast';
import { DayForcast } from '../models/DayForecast';

//Variables for the weather API
const API_URL = environment.API_URL;
const MyAPI_KEY = environment.MyAPI_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //////////today's weather object//////////////////////////////////
  todayWeather: WeatherForecast = {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: '',
      },
    ],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0,
    },
    rain: {
      oneHour: 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  };

  ////////////////////////////////////////////////////////////////

  // ---------------------5 day forecast object ----------------//
  fiveDayForecast: FiveDayForecast = {
    cod: 0,
    message: 0,
    cnt: 0,
    list: [
      {
        dt: 0,
        main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          sea_level: 0,
          grnd_level: 0,
          humidity: 0,
          temp_kf: 0,
        },
        weather: [
          {
            id: 0,
            main: '',
            description: '',
            icon: '',
          },
        ],
        clouds: {
          all: 0,
        },
        wind: {
          speed: 0,
          deg: 0,
          gust: 0,
        },
        visibility: 0,
        pop: 0,
        rain: {
          threeHour: 0,
        },
        sys: {
          pod: '',
        },
        dt_txt: '',
      },
    ],
    city: {
      id: 0,
      name: '',
      coord: {
        lat: 0,
        lon: 0,
      },
      country: '',
      population: 0,
      timezone: 0,
      sunrise: 0,
      sunset: 0,
    },
  };

  // ---------------------------------------------------------//

  // ***************Today's Forecast Card ******************//
  currentDate = new Date(); //today's date
  currentWeatherIcon = ''; //current weather icon
  CityName = ''; //currentCity
  currentTemp = 0; //current temperature
  high = 0; //max temp
  low = 0; //min temp
  weatherDescr = ''; //weather desription
  feelsLike = 0; //how it feels
  humidity = 0; //humidity
  clouds = 0; // Cloudiness, %
  wind = 0; //wind speed in km/h
  visibility = 0; //visibility
  sunrise = 0; //Sunrise time, unix, UTC
  sunset = 0; // Sunset time, unix, UTC

  // **********************************************************//

  // ############# day forecast object ########################//
  DayForecast: DayForcast = {
    date: '',
    weatherIcon: ``,
    minTemp: 0,
    maxTemp: 0,
  };
  // ##########################################################//

  //array to hold 5 day weather forecast
  dFiveDayForecast: DayForcast[] = [];

  constructor(public httpClient: HttpClient) {
    //when the page is intialized, call the loadWeatherData function
    //this.loadWeatherData();
  }

  //function to that will make a call to API and load data to populate the home screen
  loadWeatherData() {
    this.httpClient
      .get(`${API_URL}/weather?q=${this.CityName}&appid=${MyAPI_KEY}`)
      .subscribe((weatherData: any) => {
        //store the retreived data into our todayWeather object
        this.todayWeather = weatherData;

        this.CityName = this.todayWeather.name;

        //store the rerteived weather details in the respective variable  - showed in card
        this.currentWeatherIcon = `https://openweathermap.org/img/wn/${this.todayWeather.weather[0].icon}@4x.png`;
        this.currentTemp = this.todayWeather.main.temp;
        this.high = this.todayWeather.main.temp_max;
        this.low = this.todayWeather.main.temp_min;
        this.feelsLike = this.todayWeather.main.feels_like;
        this.humidity = this.todayWeather.main.humidity;
        this.clouds = this.todayWeather.clouds.all;
        this.wind = this.todayWeather.wind.speed;
        this.visibility = this.todayWeather.visibility;
        this.weatherDescr = this.todayWeather.weather[0].description;
        this.sunrise = this.todayWeather.sys.sunrise;
        this.sunset = this.todayWeather.sys.sunset;

        //5 day weather forcast API call
        this.httpClient
          .get(
            `${API_URL}/forecast?lat=${this.todayWeather.coord.lat}&lon=${this.todayWeather.coord.lon}&appid=${MyAPI_KEY}`
          )
          .subscribe((xFiveDayForecast: any) => {
            this.fiveDayForecast = xFiveDayForecast;
            let forecastList: any[] = this.fiveDayForecast.list;

            // console.log(
            //   'temp max of 0 entry in list: ' +
            //     this.fiveDayForecast.list[0].main.temp_max
            // );

            forecastList.forEach((iDay) => {
              //an object to hold the data I need - then im gonna push this object into a list which i will itrerate through in the frontend
              const dateObj: Date = new Date(iDay.dt_txt);

              // Extract the date part
              const dateOnly: string = dateObj.toISOString().split('T')[0];

              const currDateOnly: string = new Date()
                .toISOString()
                .split('T')[0];

              var tempIconHolder = `https://openweathermap.org/img/wn/${iDay.weather[0].icon}@4x.png`;

              var iDayWeatherForecast: DayForcast = {
                date: dateOnly,
                weatherIcon: tempIconHolder,
                minTemp: iDay.main.temp_min,
                maxTemp: iDay.main.temp_max,
              };

              // Check if the date is not already in dFiveDayForecast and is not equal to currDateOnly
              if (
                iDayWeatherForecast.date !== currDateOnly &&
                !this.dFiveDayForecast.some(
                  (item) => item.date === iDayWeatherForecast.date
                )
              ) {
                this.dFiveDayForecast.push(iDayWeatherForecast);
                console.log('iDay Pretoria: ' + iDayWeatherForecast.date);
              }
            });
          });
      });
  }
}
