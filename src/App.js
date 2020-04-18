import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Cards, Charts, CountryPicker } from './components';
import { fetchData } from './api'

function App() {
  const [ data, setData ] = useState({});
  const [ country, setCountry ] = useState('');
  const [ reload, setReload] = useState(false);
  
  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);    
  }
  useEffect(()=> {
    handleCountryChange();
  }, [reload]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetchData();
    setData(data);
  }

  return (
    <div className={styles.container}>
      <Cards data={data}/>
      <CountryPicker handleCountryChange={handleCountryChange} setReload={setReload}/>
      <Charts data={data} country={country}/>
    </div>
  );
}

export default App;
