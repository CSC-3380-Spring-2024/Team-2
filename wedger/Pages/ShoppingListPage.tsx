import {StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView, 
  Pressable, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, 
  Keyboard,SwipeListView } from 'react-native';
import React, {Component, useState} from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import { useShoppingList } from '../Context/userShoppingListContext'
import GroupName from '../Components/GroupName.js';

function shoppingListPage(){
const {usersShoppingLists} = useShoppingList();

const [group,setGroup] = useState();
const [groupItems, setGroupItems] = useState([]);

const handleAddGroup = () => {
  Keyboard.dismiss();
  setGroupItems([...groupItems, group])
  setGroup(null); 
}

const completeGroup = (index: number) => {
  let itemsCopy = [...groupItems];
  itemsCopy.splice(index, 1);
  setGroupItems(itemsCopy); 
}
    return (

      <View style = {styles.container}>
      <LinearGradient
          colors={['#EBF8FE', '#8eb2c0']}
          style={styles.linearGradient}>
      <ScrollView 
        contentContainerStyle ={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps ='handled'
        >
      <View style = {styles.listsWrapper}>
          <Text style = {styles.title}>Your Shopping Lists</Text>
          <View style = {styles.items}>

             {/* This is where the groups will go */}
             {
              groupItems.map((item, index) => {
                return(
                  <TouchableOpacity key = {index}  
                      onPress= {() => completeGroup(index)}>
                 <GroupName text = {item} />
                  </TouchableOpacity>
                )    
              })
             }
          </View>
      </View>

      </ScrollView>


          {/* the "make a group" section */}
          <KeyboardAvoidingView 
            behavior = {Platform.OS === "ios" ? "padding" : "height"}
            style = {styles.writeGroupWrapper}>

              <TextInput style = {styles.input} placeholder = {"Create a Group"} 
                    value = {group}
                    onChangeText = {text => setGroup(text)} /> 
              <TouchableOpacity onPress = {() => handleAddGroup()} >
                <View style = {styles.addWrapper}>
                  <Text style = {styles.addText}>+</Text>
                </View>
              </TouchableOpacity>

          </KeyboardAvoidingView>
      </LinearGradient>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
          flex: 1,
          marginVertical: 0,
        },
        ScrollView: {
          marginHorizontal:0,
        },
        title: {
          borderColor: '#20232a',
          color: '#2c3135',
          textAlign: 'center',
          fontSize: 30,
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
        },
        listsWrapper: {
          paddingTop: 30,
          paddingHorizontal: 20,
        },
        sectionTitle:{},
        items: {
          marginTop: 30, 
        },
        writeGroupWrapper: {
          position: 'absolute',
          bottom: 50,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        },
        input: {
          paddingVertical: 15,
          paddingHorizontal: 15,
          backgroundColor: '#EEEEEE',
          borderRadius: 60,
          borderColor: '#C0C0C0',
          borderWidth: 1,
          width: 250,
        },
        addWrapper: {
          width: 60,
          height: 60,
          backgroundColor: 'white',
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#C0C0C0',
          borderWidth: 1,
        },
        addText: {
          fontSize: 40,
          alignContent: 'center',
        },
});

export default shoppingListPage;
