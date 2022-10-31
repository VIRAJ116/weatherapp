import React, { useEffect, useState } from 'react'
import Weathercard from './weathercard';
import './style.css'

const Temp = () => {
    const[searchValue, setSearchValue] = useState("Dhoraji");

    const[tempInfo, setTempinfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=71e2f0083087eec0f087d13c7bb217b0`;

            const res = await fetch(url);
            const data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp, 
                humidity, 
                pressure, 
                weathermood, 
                name, 
                speed, 
                country, 
                sunset
                };

                setTempinfo(myNewWeatherInfo)
        } catch (error) {
            console.log(error);
        }
    }

     useEffect(() => {
        getWeatherInfo();
     }, []);
  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input 
            type="search..." 
            autoFocus
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className='searchButton' 
                    type='button' 
                    onClick={getWeatherInfo}>
                    Search
            </button>
        </div>
      </div>
      {/* our temp card */}
       <Weathercard {...tempInfo} />
    </>
  )
}

export default Temp
