import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";

import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Pressable, Picker, TextInput, TextComponent } from 'react-native';
import axios from 'axios';

const image = { uri: "https://image.freepik.com/free-vector/bitcoin-blockchain-digital-coin-crypto-currency-concept-background_1017-30307.jpg" };

function HomeScreen({navigation}) {
  const [selectedFromValue, setSelectedFromValue] = useState("EUR");
  const [selectedToValue, setSelectedToValue] = useState(String);

  const [selectedCurrency, setSelectedCurrency] = useState([]);

  const [input, setInput] = useState()

  const [currencyVal, setCurrencyVal] = useState(0)

  const getDataUsingSimpleGetCall = async () => {
    let data = {currencyVal: currencyVal}
    let requestOptions = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json"
      }
    };

    await axios
      .get('http://api.exchangeratesapi.io/v1/latest?access_key=00c1a1fb6a467269e7afcb0af8816bf1&symbols=USD,AUD,CAD,PLN,MXN&format=1')
      .then(function (response) {
        setSelectedCurrency(response.data.rates)
        // console.log(selectedToValue)
      })
      .catch(function (error) {
        console.log(error.message);
      })

      if(selectedToValue == "USD")
        setCurrencyVal(selectedCurrency.USD * input)

      if(selectedToValue == "CAD")
        setCurrencyVal(selectedCurrency.CAD * input)

      if(selectedToValue == "AUD")
        setCurrencyVal(selectedCurrency.AUD * input)

      if(selectedToValue == "EUR")
        setCurrencyVal(selectedCurrency.EUR * input)

      if(selectedToValue == "MXN")
        setCurrencyVal(selectedCurrency.MXN * input)

      if(selectedToValue == "PLN")
        setCurrencyVal(selectedCurrency.PLN * input)

      console.log(currencyVal)

      await axios.post('https://currencyexchangeb.herokuapp.com/addData', data)
      .then(() => {
        console.log("data is inserted")
      })
      .catch((e) => {
        console.log("data is not inserted" + e)
      })
  };

  return (
    <View style={styles.container1}>
      <ImageBackground source={image} style={styles.image}>
        <SafeAreaView style={styles.container2}>
          <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FFFFFF" translucent = {false}/>

          <View style={styles.contents2}>
              <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>FROM</Text>
           
              <Picker
              
                selectedValue={selectedFromValue}
                style={{color: '#FFFFFF', height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) => setSelectedFromValue(itemValue)}
              >
                <Picker.Item label="EUR" value="EUR" />
              </Picker>
              <TextInput
                style={styles.default}
                onChangeText={(text) => setInput(text)}
                value={input}
                keyboardType="numeric"
              />


              <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>TO</Text>
              <Picker
                selectedValue={selectedToValue}
                style={{color: '#FFFFFF', height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) => setSelectedToValue(itemValue)}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="AUD" value="AUD" />
                <Picker.Item label="CAD" value="CAD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="MXN" value="MXN" />
                <Picker.Item label="PLN" value="PLN" />
                {/* AUD CAD EUR MXN PLN*/}
              </Picker>

              <Text style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>AMOUNT</Text>

              {/* <TextInput
                style={styles.default}
                onChangeText={(text) => setInput(text)}
                value={input}
                keyboardType="numeric"
              /> */}

              {selectedToValue == "USD" && (
                  <Text style={{color: 'red',margin:40, fontSize:30}}>USD: {selectedCurrency.USD * input}</Text>
              )}
              {selectedToValue == "CAD" && (
                  <Text style={{color: 'red',margin:40, fontSize:30}}>CAD: {selectedCurrency.CAD * input}</Text>
              )}
              {selectedToValue == "AUD" && (
                  <Text style={{color: 'red',margin:40, fontSize:30}}>AUD: {selectedCurrency.AUD * input}</Text>
              )}
              {selectedToValue == "EUR" && (
                  <Text style={{color: 'red',margin:40, fontSize:30}}>EUR: {selectedCurrency.EUR * input}</Text>
              )}
              {selectedToValue == "MXN" && (
                  <Text style={{color: 'red',margin:40, fontSize:30}}>MXN: {selectedCurrency.MXN * input}</Text>
              )}
              {selectedToValue == "PLN" && (
                  <Text style={{color: 'red',margin:40, fontSize:30}}>PLN: {selectedCurrency.PLN * input}</Text>
              )}

              {/* <Text style={{color: '#FFFFFF'}}>C: {currencyVal}</Text> */}
            
          </View>
          <View style={styles.contents}>

          <Pressable onPress={() => { getDataUsingSimpleGetCall() }} style={[styles.contentsText, styles.marginButtom]}>
            <Text style={[styles.contentsText2]}>CONVERT NOW</Text>
          </Pressable>


          {/* <Pressable onPress={() => { navigation.navigate('currencyTable') }} style={[styles.contentsText, styles.marginButtom]}>
            <Text style={[styles.contentsText2]}>TABLE CURRENCY</Text>
          </Pressable> */}

          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: '#000000',
    opacity: 0.6
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    zIndex: 2
  },
  contents: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  contents2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginButtom: {
    marginBottom: 10
  },
  contentsText: {
    color: '#000000',
    padding: 10,
    width: '80%',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 30
  },
  contentsText2: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 30
  },
  default: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 50,
    borderRadius:20,
  }
});

export default HomeScreen

//https://manage.exchangeratesapi.io/quickstart