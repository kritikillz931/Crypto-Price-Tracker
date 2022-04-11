import React, { useState } from 'react';
import  Axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { Coin } from './Components/Coin';

function App() {
  const [listOfCoins, setListOfCoins] = useState([])
  const [searchWord, setSearchWord] = useState("")
  
  
  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase())
  })


  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&").then((response) => {
      setListOfCoins(response.data.coins)
    })
  },[])

  return (
    <div className="App">
      <div className='cryptoHeader'>
        <input type="text" placeholder='Bitcoin...' onChange={(event) => {setSearchWord(event.target.value)}} />
      </div>
      <div className='cryptoDisplay'>
        {filteredCoins.map((coin) => {
        return <Coin 
        name={coin.name}
        icon={coin.icon}
        price={coin.price}
        symbol={coin.symbol}/>
      })}
      </div>
    </div>
  );
}

export default App;
