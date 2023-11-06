export interface WeatherCity {
    main: Main,
    weather: Weather[],
    wind: Wind,
    precipitation: number,
    dateTime: string 
}

interface Main {
    temp: number;
    feelsLike: number;
    humidity: number;
 }
 
 interface Weather {
    main: string;
    icon: string;
 }
 
 interface Wind {
    speed: number;
 }