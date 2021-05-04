import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';


export default function currencyTable() {
  const [selectedCurrency, setSelectedCurrency] = useState([]);

  axios
  .get('http://api.exchangeratesapi.io/v1/latest?access_key=00c1a1fb6a467269e7afcb0af8816bf1&symbols=USD,AUD,CAD,PLN,MXN&format=1')
  .then(function (response) {
    setSelectedCurrency(response.data.rates)
  })
  .catch(function (error) {
    console.log(error.message);
  })

  const array = [
    {
      currency: "USD",
      Val: selectedCurrency.USD,
    },
    {
      currency: "AUD",
      Val: selectedCurrency.AUD,
    },
    {
      currency: "CAD",
      Val: selectedCurrency.CAD,
    },
    {
      currency: "MXN",
      Val: selectedCurrency.MXN,
    },
    {
      currency: "PLN",
      Val: selectedCurrency.PLN,
    },
  ];

  let list = () => {
    return array.map((element, key) => {
      return (
        <View key={key} style={{margin: 10}}>
           <Text>{element.currency}</Text>
          <Text>{element.Val}</Text>
        </View>
      );
    });
  };

  return (
    <View>
        {list()}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
