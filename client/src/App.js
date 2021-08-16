//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Compiles pages with header, footer, and page routes

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header"

function App() {
  return (

      <div>
        <Header />
      </div>

  );
}

export default App;
