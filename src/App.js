import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import Pricerow from './Pricerow.js';

export default function App() {
  return (
    <div>
      <div className="container-fluid">
        <nav className="navbar navbar-primary bg-dark">
          <div class="container-fluid">
            <a className="navbar-brand">Virtual-Currency-Tracker</a>

            <form class="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>

      <div style={{ width: '90vw', margin: 'auto' }}>
        <select name="" id="base" onChange={el => setBase(el.target.value)}>
          <option value="bitcoin">Bitcoin</option>
          <option value="ripple">Ripple</option>
          <option value="ethereum">Ethereum</option>
          <option value="monero">Monero</option>
          <option value="pln">PLN</option>
        </select>
        <div className="container-fluid">
          <div
            className="row"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="col-9">
              <table className="table table-striped table-light table-hover table-borderless">
                <thead>
                  <th> Name of the Coin </th> <th> Unit Price per USD</th>{' '}
                  <th> Monthly Price change (%) </th>{' '}
                  <th> Annual Price change (%) </th>
                </thead>
                <tbody>
                  <Pricerow name="dogecoin" />
                  <Pricerow name="bitcoin" />
                  <Pricerow name="ethereum" />
                  <Pricerow name="ripple" />
                  <Pricerow name="monero" />
                  <Pricerow name="cardano" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
