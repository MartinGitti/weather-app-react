import React from "react"; // Import React library.
import "../App.css"; // Import React Style Sheet.

// Weather component that returns the following depending on weather results:
const Weather = props => {
  return (
    <div className="container text-light">
      <div className="Card">
        <h1 className="text-white py-3">{props.cityname}</h1> {/* User City */}
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`} /> {/* Weather Icon */}
        </h5>

        {/* Get Celsius */}
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;</h1>
        ) : null}

        {/* Pass in function below to show min & max temp */}
        {maxminTemp(props.temp_min, props.temp_max)}
      </div>
    </div>
  );
};

export default Weather;

// Function that displays min and max temp on users city:
function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}