import React, { useState } from 'react'
import './WeaterApp.css'
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeaterApp = () => {
  let api_key='415641458a36abf8b65e8cb753d90369';
  const [wicon,setwicon]=useState(cloud_icon )
  const search=async()=>{
    const element=document.getElementsByClassName('cityInput')
    if (element[0].value===''){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    
    let response = await fetch(url);
    let data= await response.json();
    const humidity = document.getElementsByClassName('humidity-petcent')
    const wind = document.getElementsByClassName('wind-rate')
    const temprature= document.getElementsByClassName('weather-temp')
    const location= document.getElementsByClassName('weather-location')

    humidity[0].innerHTML =data.main.humidity+"%";
    wind[0].innerHTML=data.wind.speed+'km/h';
    temprature[0].innerHTML=data.main.temp+'°C';
    location[0].innerHTML=data.name;
    if (data.weather[0].icon==='01d'|| data.weather[0].icon==='01n'){
      setwicon(clear_icon)
    }else if (data.weather[0].icon==='02d'|| data.weather[0].icon==='02n'){
      setwicon(cloud_icon)
    }else if(data.weather[0].icon==='03d'|| data.weather[0].icon==='03n'){
      setwicon(drizzle_icon)
    }else if(data.weather[0].icon==='04d'|| data.weather[0].icon==='04n'){
      setwicon(cloud_icon)
    }else if(data.weather[0].icon==='09d'|| data.weather[0].icon==='09n'){
      setwicon(rain_icon)
    }else if(data.weather[0].icon==='010d'|| data.weather[0].icon==='010n'){
      setwicon(rain_icon)
    }else if(data.weather[0].icon==='013d'|| data.weather[0].icon==='013n'){
      setwicon(snow_icon)
  
  }else{
    setwicon(clear_icon)
  }
}
  return (
    <div className='container'>
     <div className='top-bar'  >
     <input type='text' className='cityInput'placeholder='search'></input>
     <div className='search-icon'onClick={()=>{search()}}>
        <img src={search_icon}alt=""/>
     </div>
    </div>
    <div className='weather-image'>
     <img src={cloud_icon}alt=''/>
    </div>
    <div className='weather-temp'>24°c</div>
    <div className='weather-location'>London</div>
    <div className='data-container'>
    <div className='element'>
        <img src={humidity_icon} alt=''className='icon'/>
        <div className='data'>
         <div className='humidity-petcent' >64%</div>
         <div className='text'>Humidity</div>
    </div>
    </div> 
    <img src={wind_icon} alt=''className='icon'/>
        <div className='data'>
         <div className='wind-rate' >18 Km/h</div></div>
         <div className='text'>wind speed</div>
    </div>
    </div>
  )
}

export default WeaterApp