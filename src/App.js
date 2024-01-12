import React from "react";
import { useState } from "react";
import Time from "./components/Time"
import Weather from "./components/Weather"

const App = () => {

  return (
    <div className="mx-auto sm:max-w-screen-md mt-4 py-5 sm:px-32 min-h-screen bg-[url('./images/sun.webp')] bg-cover bg-center shadow-xl shadow-gray-400 text-white">
      <Time />
      <Weather/>
    </div>
  )
    
}

export default App;

