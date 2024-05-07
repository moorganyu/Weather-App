import React, {useState} from 'react';
import axios from 'axios'

function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    description: 'Cloudy',
    feels: 10,
    humidity: 10,
    speed: 3,
    
  })

const [name, setName] = useState('');

const handleClick = (e) => {


  if(name !== "" && e.key === 'Enter'){
          
    const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=01d81893fbd4f87621b3a4e2e0fc7ca4`
    axios.get(apiurl)
    .then(res => {

      setData({...data, celcius: res.data.main.temp, name: res.data.name, feels: res.data.main.feels_like, humidity: res.data.main.humidity, speed:res.data.wind.speed})
    })
    .catch(err => console.log(err));
    }
  }

  

  return (
    <div className="app">
      
      <div className="search">
        <input className="input" onChange={e => setName(e.target.value)}
        placeholder='Enter location' type="text"  onKeyDown = {handleClick}/>
      </div>
      <div className="container">
        <div classname="top">
          <div className="location">
          <p>{data.name}</p>
          </div>
          <div className="temp">
           <h1>{data.celcius.toFixed()} °C</h1>
          </div>
          <div className="description">
          <p>{data.weather && data.weather[0].main} </p>
          </div>
        </div>

         <div className="bottom"> 
         <div className="feels">
          <p className='bold'>{data.feels.toFixed()}° C</p>
           <p>Feels Like</p>
         </div>
         <div className="humidity">
           <p className='bold'>{data.humidity}%</p> 
           <p>Humidity</p>
         </div>
         <div className="wind">
           <p className='bold'>{data.speed.toFixed()} Km/hr</p> 
           <p>Wind Speed</p>
         </div>
       </div>
       
      </div>
    </div>
  );
}

export default App;
