import { useState } from 'react'
import './App.css'
import InputCard from './Components/InputCard'
import  WeatherCard  from './Components/WeatherCard'

function App() {

  const [showInput, setShowInput] = useState(true);
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="App">
      {showInput ? <InputCard setShowInput={setShowInput} setCity={setCity} setWeatherData={setWeatherData} /> : <WeatherCard setShowInput={setShowInput} city={city} setCity={setCity} setWeatherData={setWeatherData} weatherData={weatherData}  />}
    </div>
  )
}

export default App
