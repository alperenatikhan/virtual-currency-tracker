import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import Pricerow from './Pricerow.js';

export default function App() {
  let [searchCurrency, setSearchCurrency] = useState('');
  let [searchState, setSearchState] = useState(false);
  let [showSearch, setShowSearch] = useState(false);
  let [base, setBase] = useState('8000');

  const newSearch = searchCurrency => {
    return <Pricerow name={searchCurrency} interval={base} />;
  };

  const handleSearch = item => {
    setShowSearch(true);
    setSearchCurrency(item.toLowerCase());
    setSearchState(true);
  };

  return (
    <div>
      <div className="container-fluid">
        <nav className="navbar navbar-primary bg-dark">
          <div class="container-fluid">
            <a className="navbar-brand">Virtual-Currency-Tracker</a>

            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="searcher"
            />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() =>
                handleSearch(document.getElementById('searcher').value)
              }
            >
              Search
            </button>
          </div>
        </nav>
      </div>

      <div style={{ width: '90vw', margin: 'auto' }}>
        <select name="" id="base" onChange={el => setBase(el.target.value)}>
          <option value="10000">Refresh Every</option>
          <option value="120000"> 2 minutes</option>
          <option value="60000"> 1 minute</option>
          <option value="30000"> 30 seconds</option>
          <option value="15000"> 15 seconds</option>
          <option value="10000"> 10 seconds</option>
          <option value="5000"> 5 seconds</option>
        </select>
        <div className="container-fluid">
          {base}
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
                  <th> Icon </th>
                  <th> Name of the Coin </th> <th> Unit Price per USD</th>{' '}
                  <th> Monthly Price change (%) </th>{' '}
                  <th> Annual Price change (%) </th>
                </thead>
                <tbody>
                  {showSearch && newSearch(searchCurrency)}

                  {[
                    'dogecoin',
                    'bitcoin',
                    'ethereum',
                    'litecoin',
                    'ripple',
                    'monero',
                    'cardano',
                    'stellar',
                    'chainlink',
                    'uniswap',
                    'tether'
                  ].map(item => (
                    <Pricerow name={item} interval={base} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
