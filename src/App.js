import './App.css';
import React, { useState, useEffect } from 'react';
import CardLyon from './components/Weather';
import Headers from './components/Header';
import Days from './components/Days';
import Formulaire from './components/Formulaire';

function App() {

  const [name, setName] = useState('');
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [date, setDate] = useState('');
  const [icon, setIcon] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windDeg, setwindDeg] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState({});
  const [userInput, setUserInput] = useState('');

  // const [requestOn, setrequestOn] = useState(true)

  if (name === "") {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
    function getPosition(position) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c84574af341d7c9f22871fa13b39eb41&units=metric`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setData(data)
        });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput !== '') {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=c84574af341d7c9f22871fa13b39eb41&units=metric`)
        .then(res => res.json())
        .then(data => {
          setData(data)
        });
    } else {
      alert('Merci de renseigner une ville')
    }
  }

  const setData = (data) => {

    setName(data.city.name)
    setTemp(data.list[0].main.temp)
    setWind(data.list[0].wind.speed)
    setResult(data)
    setDate(data.list[0].dt)
    setMaxTemp(data.list[0].main.temp_max)
    setMinTemp(data.list[0].main.temp_min)
    setHumidity(data.list[0].main.humidity)
    setwindDeg(data.list[0].wind.deg)
    setDays([
      data.list[0].dt + 86400,
      data.list[0].dt + (86400 * 2),
      data.list[0].dt + (86400 * 3),
      data.list[0].dt + (86400 * 4),
    ])
    setIcon(data.list[0].weather[0].icon)
  };

  function changeDay(timestamp) {
    result.list.forEach(element => {

      if (element.dt == timestamp) {
        setTemp(element.main.temp)
        setWind(element.wind.speed)
        setIcon(element.weather[0].icon)
        setMaxTemp(element.main.temp_max)
        setMinTemp(element.main.temp_min)
        setHumidity(element.main.humidity)
        setwindDeg(element.wind.deg)
      }
    });
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setUserInput(e.target.value)
  }

  return (
    <div>

      <div>
        <Headers />
      </div>
      <div className="search">
        < Formulaire search={handleSearch} submit={handleSubmit} />
      </div>
      <div>
        < CardLyon name={name} temp={temp} wind={wind} icon={icon} minTemp={minTemp} maxTemp={maxTemp} humidity={humidity} windDeg={windDeg} />
      </div>
      <div>
        < Days date={date} changeDay={changeDay} nextDays={days} />
      </div>
    </div>
  )
}

export default App;
