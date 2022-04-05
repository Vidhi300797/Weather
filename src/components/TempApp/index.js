import react, { useEffect, useState } from "react";
import './tempApp.css';

import cloud_solid from '../../icons/cloud-solid.svg';
import cloud from '../../icons/cloud.svg';
import cloud_and_sun from '../../icons/clouds-and-sun.svg';
import clouds from '../../icons/clouds.svg';
import rain from '../../icons/rain.svg';
import snow from '../../icons/snow.svg';
import thunderstrom from '../../icons/thunderstorm.svg';


const Tempapp = () => {
    const [city, setCity] = useState("");
    const [weatherRes, setWeatherRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [iconValue, setIconValue] = useState(null);

    const apikey = "9577ed9712a7b415338789f085bfb72f";

    function getWeatherByGeoLoc(currLocation) {
        setIsLoading(true);
        console.log("pos", currLocation);
        var lat =currLocation && currLocation.coords && currLocation.coords.latitude;
        var lon =currLocation && currLocation.coords && currLocation.coords.longitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
        fetch(api)
        .then((res) => res.json())
        .then((result)=> {
            console.log("res",result);
            setWeatherRes(result);
            setIsLoading(false);
            if(result && result.weather && Object.keys(result.weather).length > 0 && result.weather[0] &&  result.weather[0].id ) {
                getWeatherIcon(result.weather[0].id);
            }
        });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getWeatherByGeoLoc, (err) => {
            console.log("err",err)
        })
    
      return () => {
        
      }
    }, [])
    

    const getWeatherIcon = (iconId) => {
        if (iconId < 300 && iconId > 200) {

            setIconValue(thunderstrom);
        }
        else if (iconId < 400 && iconId > 300) {
            setIconValue(cloud_solid);
        }
        else if (iconId < 600 && iconId > 500) {
            setIconValue(rain);
        }
        else if (iconId < 700 && iconId > 600) {
            setIconValue(snow);
        }
        else if (iconId < 800 && iconId > 700) {
            setIconValue(clouds);
        }
        else if (iconId == 800) {
            setIconValue(cloud_and_sun);
        }
    }

    const onSearch = (e) => {
        e.preventDefault();
        if (!city) {
            return
        }
        setIsLoading(true);
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
        //getting API response and returning it into object and in other then calling weatherDetails function by passing api result as an argument.
        fetch(api)
            .then(function (response) {
                return (response.json());
            })
            .then((result) => {
                setWeatherRes(result);
                setIsLoading(false);
                if(result && result.weather && Object.keys(result.weather).length > 0 && result.weather[0] &&  result.weather[0].id ) {
                    getWeatherIcon(result.weather[0].id);
                }
            })
            .catch((err) => {
                console.log("err", err);
            });

    }

    return (
        <div className="card-container">
            <form onSubmit={(e) => onSearch(e)} className="card-input-container">
                <input
                    type="text"
                    placeholder="Enter City Name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">SEARCH</button>
            </form>
            <div className="card">
                {!isLoading ? (weatherRes && <div>
                    <div id="location">
                        <p>{weatherRes && weatherRes.name || "-----"}</p>
                    </div>

                    <div id="temperature">
                        <img src={iconValue} alt="" height="100px" />
                        <p><span id="temperature-value">{weatherRes && weatherRes.main && weatherRes.main.temp &&  Math.round( weatherRes.main.temp - 273) || "-----" }</span>
                            <span id="temperature-unit">°C</span></p>
                    </div>

                    <div id="climate">
                        <p>{weatherRes && weatherRes.weather && Object.keys(weatherRes.weather).length > 0 && weatherRes.weather[0] && weatherRes.weather[0].description || "-----" }</p>
                    </div>
                </div>)
                :
                <h3>Loading...</h3>
                }
            </div>
        </div>
    )
}

export default Tempapp;