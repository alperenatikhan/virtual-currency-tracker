import React, { useState, useEffect } from 'react';

export default function Pricerow(props) {
  let [price, setPrice] = useState('LOADING');
  let [monthlyChange, setMonthlyChange] = useState('LOADING');
  let [annualChange, setAnnualChange] = useState('loading');
  let [base, setBase] = useState(['bitcoin']);
  let [sparkline, setSparkline] = useState('');

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

  return (
    <tr>
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
  );
}
