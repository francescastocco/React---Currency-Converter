import React, { useEffect, useState } from 'react';
import './App.css';
import { CurrencyRow } from './CurrencyRow';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=23a4d25c1c8437fa2cd7f2fb98254722'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        const firstCurrency = data.rates[0]
        setCurrencyOptions([...Object.keys(data.rates)])
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates.firstCurrency)
      })
  }, [])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div>
    <h1>Convert</h1>
    <CurrencyRow 
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}  
      onChangeCurrency={e => setFromCurrency(e.target.value)}
      amount={fromAmount}
      onChangeAmount={handleFromAmountChange}
    />
    <div className="equals">=</div>
    <CurrencyRow 
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToAmountChange}
    />
    </div>
  );
}

export default App;
