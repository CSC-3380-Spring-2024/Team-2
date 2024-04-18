import {StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {Component, useState} from 'react';
import StyledButton from '../Components/StyledButton';
import PopupModal from '../Components/PopupModal';
import { color } from '@rneui/base';
import { LinearGradient } from 'react-native-linear-gradient';


export class ShoppingListPage extends Component {
  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <LinearGradient colors = {['#EEEEEE', '#2F88bd',]} style = {styles.linearGradient}>
          
          <ScrollView style = {styles.ScrollView}>
            <Text style = {styles.title}>Shopping Lists</Text>
            <View style = {styles.container}>
              {/* <View style={styles.listBox}>
                        <Text style={styles.text}>Shopping List 1</Text>
              </View> */}
              <StyledButton>Shopping List 1 </StyledButton>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          marginVertical: 0,
        },
        ScrollView: {
          marginHorizontal:0,
        },
        listBox: { 
          alignSelf: 'center',
          width: 360,
          height: 50,
          backgroundColor: '#EEEEEE',
          borderRadius: 10,
        },
        title: {
          marginTop: 20,
          marginBottom: 20,
          paddingVertical: 0,
          borderColor: '#20232a',
          color: '#2c3135',
          textAlign: 'center',
          fontSize: 39,
          fontWeight: 'bold',
        },
        text: {
          fontSize: 20, 
          color: '#2c3135',
        },
        linearGradient: {
          flex: 1, 
          width: null,
          height: null, 
        }
})

export default ShoppingListPage;
