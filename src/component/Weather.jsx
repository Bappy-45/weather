import React, { useState } from 'react';

import { useTypewriter } from 'react-simple-typewriter';
import search_icon from '../assets/search.png';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';

import './weather.css';

const api = {
  key: "5da90e65569248abbc7d88391ed06f52",
  base: "https://api.openweathermap.org/data/2.5/"
};

function Weather() {
  const [todo, setTodo] = useState({});
  const [search, setSearch] = useState('');
  
  const handleChange = (e) => {
    setSearch(e.target.value); 
  };

  const searchPressed = () => {
    if (search) { 
      fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then((result) => {
          if (result.cod === 200) {
            setTodo(result);
          } else {
            alert('City not found!');
          }
        })
        .catch(err => console.error(err)); 
    } else {
      alert('Please enter a city name!');
    }
  };

  const allIcons = { 
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13n": snow, 
    "13d": snow,
  };

  const weatherIcon = todo.weather && allIcons[todo.weather[0].icon]
    ? allIcons[todo.weather[0].icon]
    : clear; 


  const[text]=useTypewriter({
    words: ["Web Designer", " Front End Developer","Freelancer"], 
    loop: true, 
    typeSpeed: 90,
    deleteSpeed: 90, 
  })


  return (
    <div>
      <h1 className='h1'>This is a weather App</h1>
      <h3 className='h1'>Developed by MH-Bappy <br /> <br /><span className='span'>{text}|</span></h3>
    <div className='weather'>
    
      <div className='search'>
        <input 
          type="text" 
          placeholder='Search city'
          onChange={handleChange}
          value={search} 
        />
        <img 
          src={search_icon} 
          alt="search icon" 
          onClick={searchPressed}
        />
      </div> 
      
      <img 
        src={weatherIcon} 
        alt="weather icon" 
        className='weather-icon' 
      />
      
      <p className='temperature'>{todo.main ? `${Math.round(todo.main.temp)}°C` : 'N/A'}</p>
      <p className='location'>{todo.name || 'Location'}</p>
      
      <div className='weather-data'>
        <div className="col">
          <img src={humidity} alt="humidity icon" />
          <div>
            <p>{todo.main ? `${todo.main.humidity} %` : 'N/A'}</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind} alt="wind icon" />
          <div>
            <p>{todo.wind ? `${todo.wind.speed} km/h` : 'N/A'}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Weather;
