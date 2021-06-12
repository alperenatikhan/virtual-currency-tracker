import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import Pricerow from './Pricerow.js';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>

      <div style={{ width: '80vw', margin: 'auto' }}>
        <select name="" id="base" onChange={el => setBase(el.target.value)}>
          <option value="bitcoin">Bitcoin</option>
          <option value="ripple">Ripple</option>
          <option value="ethereum">Ethereum</option>
          <option value="monero">Monero</option>
          <option value="pln">PLN</option>
        </select>
          
            <Pricerow name="dogecoin" />
            <Pricerow name="bitcoin" />
            <Pricerow name="ethereum" />
            <Pricerow name="ripple" />
            <Pricerow name="monero" />
       
        
      </div>
    </div>
  );
}
