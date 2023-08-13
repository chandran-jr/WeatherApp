
import { useEffect, useState } from 'react';
import './WeatherCard.css';
import { BiArrowBack } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';
import { BsThermometerSun } from 'react-icons/bs';
import { BsDropletHalf } from 'react-icons/bs';
import  WeatherImage from '../assets/weatherimage.png'
import { toast } from 'react-toastify';


const WeatherCard = ({setShowInput, city, setCity, weatherData, setWeatherData}) => {

  const apiKey = '8590762744d157aa90900e86a6506383';

  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState('');
  const [feels, setFeels] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [icon,setIcon] = useState(null)

  function capitalizeWords(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, function(match) {
      return match.toUpperCase();
    });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    if(city) {
      fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    var number = data.main.temp - 273.15;
    var roundedNumber = number.toFixed(1);
    setTemp(roundedNumber)

    const text = capitalizeWords(data.weather[0].description)
    setDesc(text);

    number = data.main.feels_like - 273.15;
    roundedNumber = number.toFixed(1);
    setFeels(roundedNumber)

    setHumidity(data.main.humidity)
    setIcon(data.weather[0].icon)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    toast("Default Notification !");
  });

    }
    else {
      var number = weatherData.main.temp - 273.15;
    var roundedNumber = number.toFixed(1);
    setTemp(roundedNumber)

    const text = capitalizeWords(weatherData.weather[0].description)
    setDesc(text);

    number = weatherData.main.feels_like - 273.15;
    roundedNumber = number.toFixed(1);
    setFeels(roundedNumber)

    setHumidity(weatherData.main.humidity)
    setIcon(weatherData.weather[0].icon)
    }
  }, [city, apiUrl, weatherData])

  return (
    <div className="WeatherCard">

    <div className="WeatherCard__Header"> <BiArrowBack onClick={() => {setShowInput(true); setCity(null)}} className="WeatherCard__Back" /><h3 className="WeatherCard__Title">Weather App</h3></div>

    <div className="WeatherCard__Data">

      <img className="WeatherCard__Image" src={WeatherImage} />

      <h2 className='WeatherCard__Temp'>{temp}<span style={{marginLeft: "5px", fontSize: "30px", position: "relative", bottom: "20px"}}>°</span>C</h2>

      <h2 className='WeatherCard__Desc'>{desc}</h2>

      <div className='WeatherCard__Location'> <ImLocation className="WeatherCard__LocationIcon" /><h3 className="WeatherCard__LocationTitle">{city || weatherData.name}</h3></div>

    </div>


    <div className="WeatherCard__OtherData">
      <div className="WeatherCard__Feels"><BsThermometerSun className="WeatherCard__DataIcon" /> <div style={{marginBottom: "12px", height: "20px", display: "grid", placeItems: "center", fontSize: "15px", fontWeight: "bold", fontFamily: "cursive"}}>{feels}°C <h2 style={{marginTop: "-3px",fontSize: "10px", fontFamily: "cursive"}}>Feels like</h2></div></div>
      <div className="WeatherCard__OtherDataSplit"></div>
      <div className="WeatherCard__Feels"><BsDropletHalf className="WeatherCard__DataIcon" /> <div style={{marginBottom: "12px", height: "20px", display: "grid", placeItems: "center", fontSize: "15px", fontWeight: "bold", fontFamily: "cursive"}}>{humidity}% <h2 style={{marginTop: "-3px",fontSize: "10px", fontFamily: "cursive"}}>Humidity</h2></div></div>
    </div>   

</div>
  )
}

export default WeatherCard