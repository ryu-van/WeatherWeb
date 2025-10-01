
export const getWeatherIcon = (weather) =>{
    const iconMap = {
        Clear:"Sun",
        Clouds:"Cloud",
        Rain: "CloudRain",
        Drizzle:"CloudDrizzle",
        Thunderstorm:"CloudLightning",
        Snow:"CloudSnow",
        Mist:"CloudFog",
        Fog:"CloudFog",
        Haze:"CloudFog",        
        Dust:"Wind",
        Sand:"Wind",
        Ash:"Wind",
        squall:"Wind",
        Tornado:"Tornado"
    };
    return iconMap[weather.main||"Cloud"]
}
export const formatTemperature = (temp,unit)=>{
    if(unit==="F"){
        return Math.round((temp*9)/5+32);
    }
    return Math.round(temp);
}
export const formatTime = (timestamp)=>{
    return new Date(timestamp*1000).toLocaleTimeString("en-us",{
        hour:"2-digit",
        minute:"2-digit",
    });
}
export const getWindDirection = (deg) =>{
    const directions =[
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"

    ];
    return directions[Math.round(deg/22.5)%16];
}
