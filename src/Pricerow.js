import React, { useState, useEffect } from 'react';

export default function Pricerow(props) {
  let [price, setPrice] = useState('LOADING');
  let [monthlyChange, setMonthlyChange] = useState('LOADING');
  let [annualChange, setAnnualChange] = useState('loading');
  let [base, setBase] = useState(['bitcoin']);
  let [sparkline, setSparkline] = useState('');
  let [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${props.name}?sparkline=true`)
      .then(res => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert(`Oops, there seems to be an error`);
          }
          alert('Oops, there seems to be an error!');
          throw new Error('You have an error');
        }
      })
      .then(object => {
        setPrice(object.market_data.current_price);
        setMonthlyChange(object.market_data.price_change_percentage_30d);
        setAnnualChange(object.market_data.price_change_percentage_1y);
        setSparkline(object.market_data.sparkline_7d.price);
      })

      .catch(error => console.log(error));
  }, []);

  let generateGraph = item =>
    `https://quickchart.io/chart?bkg=white&c={type:'sparkline',data:{datasets:[{fill:true,borderColor:'red',data:[${sparkline}]}]}}`;

  let extendScreen = item => {
    if (showInfo == true) {
      document.getElementById(item).style.height = '15rem';
    }
  };

  let shrinkScreen = item => {
    if (showInfo == false) {
      document.getElementById(item).style.height = '5rem';
    }
  };

  return (
    <>
      <tr id={props.name} onClick={() => setShowInfo(!showInfo)}>
        {' '}
        <td>
          {' '}
          <tr>{props.name} </tr>{' '}
          <tr>
            {' '}
            <img className="spark" src={generateGraph(sparkline)} />{' '}
          </tr>{' '}
        </td>{' '}
        <td> {price.usd} USD</td>{' '}
        {monthlyChange >= 0 ? (
          <td style={{ color: 'green' }}> {monthlyChange} </td>
        ) : (
          <td style={{ color: 'red' }}> {monthlyChange} </td>
        )}
        {annualChange >= 0 ? (
          <td style={{ color: 'green' }}> {annualChange} </td>
        ) : (
          <td style={{ color: 'red' }}> {annualChange} % </td>
        )}
      </tr>

      {showInfo && (
        <tr className="info-col">
          {' '}
          <td colspan="4">
            {' '}
            <h4 className="text-center"> Summary of {props.name}</h4>
            {props.name} is sold from {price.usd} USD or {price.eur} EUR .{' '}
            Compared to the last year, its price{' '}
            {annualChange > 0 ? 'increased' : 'decreased'} by {annualChange} %.{' '}
            .This means in one year it {annualChange > 0 ? 'gained' : 'lost'}{' '}
            value by {Math.floor(annualChange / 100)} times.
            <br />
            <img src={generateGraph(sparkline)} style={{ width: '80%' }} />
          </td>
        </tr>
      )}
    </>
  );
}
