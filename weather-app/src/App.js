import React from 'react'; // React Library.
import './App.css'; // React Styling Sheet.
import logo from "./Images/weatherLogo.png"; // Import image for web page.
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap Css classes.

// Import all created components:
import Weather from './Components/Weather';
import Form from "./Components/Form";

import "weather-icons/css/weather-icons.css"; // Import Weather Icons from Github.

const Api_Key = "c5f4a3fa7a9bc8983ea5b48d1f35eeb3"; // Generated API key from Open Weather Map.   

// Main React Component:
class App extends React.Component {
  constructor() {
    super();
    // State added:
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };

    // Weather Icons:
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) { // Switch statement that replaces multiple variants.
      // Case blocks & an optional default below:
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  // Calculate Celsius as per Kelvin thermodynamic temperature scale:
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15); // Return largest integer less than or equal to given number.
    return cell;
  }

  // Async function to fetch data from API. (Alternative method to ComponentDidMount().)
  // This function allows a user to check the weather for their specified area.
  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}` // API Link.
      );

      const response = await api_call.json();

      // Depending on user input, state will change accordingly:
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      // Setting Icons:
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };
  render() {
    return (
      <div className="App" >
        <div className="App-container">
          <h1>React Weather App</h1>
          <img src={logo} className="App-image" alt="logo" />
          <h2>Let's tell what the weather is like in your area!</h2>
          <p>
            Look at the largest tree in your garden:<br />
            If leaves are wet, it's raining,<br />
            If they cast shadows, it's sunny,<br />
            If the leaves are active, it's windy,<br />
            If the leaves are white, it's snowing,<br />
            If the leaves are under water, it's flooding,<br />
            If the leaves are missing, it could be a tornado!<br />
          </p>
          <p>
            But don't panic, check our app for the most accurate result...
            <span className="weatherIcon" role="img" aria-label="emoji">🌧️</span>
          </p>
          <img src={require('./Images/tornado.gif')} alt="Tornado Gif" className="tornadoGif"/>
          <main className="App-main">
            {/* Form component: */}
            <Form loadweather={this.getWeather} error={this.state.error} />
            {/* Weather component: */}
            <Weather
              cityname={this.state.city}
              weatherIcon={this.state.icon}
              temp_celsius={this.state.celsius}
              temp_max={this.state.temp_max}
              temp_min={this.state.temp_min}
              description={this.state.description}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;


