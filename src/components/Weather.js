import { useState, useEffect } from "react";
import React from "react";
import AirIcon from '@mui/icons-material/Air';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Visibility } from "@mui/icons-material";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ClipLoader from "react-spinners/ClipLoader";


const Weather = () => {


    const [lat, setLat] = useState(undefined);
    const [long, setLong] = useState(undefined);
    const [data, setData] = useState({
        temp: undefined,
        condition:undefined,
        humidity: undefined,
        icon: `https://openweathermap.org/img/wn/04n@2x.png`,
        speed: undefined,
        sunrise: undefined,
        sunset: undefined,
        visible: undefined,
        feels: undefined,
        time:undefined
        
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        const fetchData = async () => {
            if (lat && long) {

                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=477fbeb66cf6b1518af1c9f12116171a&units=metric`;
                
                await fetch(url).then(res => res.json()).then(res => {
                    console.log(res);
                    setData({
                        temp: res.main.temp,
                        feels: res.main.feels_like,
                        humidity: res.main.humidity,
                        sunrise: res.sys.sunrise,
                        sunset: res.sys.sunset,
                        speed: res.wind.speed,
                        condition: res.weather[0].description,
                        icon: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,
                        visible: (res.visibility) / 1000,
                        time:res.timezone
                        
                    });
                    setLoading(false);
                    
                });
    
    
            }
        }

        fetchData();

    }, [lat, long]);


    if (!loading) {
        return (
            <div className="flex justify-evenly flex-col min-h-[500px]">
                <div className="flex flex-col gap-5 items-center capitalize">
                    <div>
                        <img src={data.icon} alt ="" className="w-[100px] lg:w-[150px]"></img>
                    </div>
                    <div className="text-2xl">
                        <p>{ data.condition}</p>
                    </div>
                    <div className="text-3xl">
                        <p>{ data.temp}&#x2103;</p>
                    </div>
                </div>
                <div className="mt-20 grid md:p-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 justify-items-center bg-[rgba(255,255,255,0.2)] text-center rounded-2xl border-solid border-2 border-white">
                    <div>
                        <DeviceThermostatIcon />
                        <p>Feels</p>
                        <p>{data.feels}&#x2103;</p>
                    </div>
                    <div>
                        <WbSunnyIcon/>
                        <p>Sunrise</p>
                        <p>{new Date(data.sunrise*1000).toLocaleTimeString()}</p>
                    </div>
                    <div>
                        <DarkModeIcon />
                        <p>Sunset</p>
                        <p>{new Date(data.sunset*1000).toLocaleTimeString()}</p>
                    </div>
                    <div>
                        <InvertColorsIcon />
                        <p>Humidity</p>
                        <p>{ data.humidity}%</p>
                    </div>
                    <div>
                        <AirIcon />
                        <p>Wind</p>
                        <p>{ data.speed} m/s</p>
                    </div>
                    <div>
                        <Visibility/>
                        <p>Visibility</p>
                        <p>{ data.visible} KM</p>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex justify-center items-center min-h-[500px] flex-col gap-3">
                <ClipLoader
                color={'#ffffff'}
                loading={loading}
                size={50}
                />
                <p>Fetching Location</p>
            </div>
        )
        }

    
    

   
}
export default Weather;
