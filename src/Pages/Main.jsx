import React from 'react'
import Calendar from '../Components/Calendar.jsx'

const Main = () => {
  return (
    <div>
      <div id='main'>
        <h1>Reservation system</h1>
        <Calendar />
      </div>
      
      <p id='copyright'>&copy; CodeWeek 2019</p>
  </div>
  );
}

export default Main
