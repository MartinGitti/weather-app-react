import React from "react"; // Import React library.
import "../App.css"; // Import React Stylesheet.

// From component that takes user input:
const Form = props => {
  return (
    <div className="container h-100">
      <form onSubmit={props.loadweather}>
        <div>{props.error ? error() : ""}</div>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="country"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
            <button className="btn btn-warning">See Weather!</button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Function that informs user to input data if left unfilled.
const error = props => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please enter your city and country below to continue!
    </div>
  );
};

export default Form;