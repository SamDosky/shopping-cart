import React, { Component } from "react";
import "./App.css";
import Item from "./Item.jsx";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Item />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
