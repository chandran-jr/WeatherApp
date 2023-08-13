import { useState } from 'react';
import './InputCard.css'
import { toast } from 'react-toastify';

const InputCard = ({setShowInput, setCity, setWeatherData}) => {

  const apiKey = '8590762744d157aa90900e86a6506383';
  

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        toast.success("Success!")
        setWeatherData(data);
        setShowInput(false)
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${apiKey}`;
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if(!data.name){
          throw new Error('API call failed');
        }
        else{
          toast.success("Success!")
        console.log("SUHHH", data)
        setCity(event.target.value)
        setShowInput(false)
        }
      })
  .catch(error => {
    console.error('Error fetching data:', error);
    toast.error("Please enter valid city name");
  });   
    }
  }

  const [inputValue, setInputValue] = useState();

  return (
    <div className="InputCard">

        <div className="InputCard__Header"><h3 className="InputCard__Title">Weather App</h3></div>

        <div className="InputCard__Content">

          <div className="InputCard__InputDiv">
            <input placeholder="Enter city name" type="text" value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown} 
                  className="InputCard__InputField"/>
          </div>

          <div className="InputCard__OrDiv">
            <div className="InputCard__OrBar"></div>
            <div className="InputCard__Or">or</div>
            <div className="InputCard__OrBar"></div>
          </div>


          <div onClick={getDeviceLocation} className="InputCard__GetLocation">
            Get Device Location
          </div>

        </div>

    </div>
  )
}

export default InputCard
