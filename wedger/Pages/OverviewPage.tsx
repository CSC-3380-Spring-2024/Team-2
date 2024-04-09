import {StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import StyledButton from '../Components/StyledButton';
import PopupModal from '../Components/PopupModal';
import { color } from '@rneui/base';
import { LinearGradient } from 'react-native-linear-gradient';

function OverviewPage() {
  const navigator = useNavigation()
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView style = {styles.ScrollView}>
      <LinearGradient colors = {['#2F88bd', '#8eb2c0',]} style = {styles.linearGradient}>
        <View style = {styles.container}>
          <Text style = {styles.header1}> Overview <Text style = {styles.header2}>{GetDate()}</Text></Text> 
            <StyledButton
              onPress={() => {
                setModalOpen(true);
            }}>
              Test test
            </StyledButton>
            <PopupModal
              isVisible={modalOpen}
              description="Test popup"
              firstButtonPress={() => {
                setModalOpen(!modalOpen);
            }}
              firstButtonText="Continue"
          />
          <Text style = {styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quisquam vero vitae eligendi, obcaecati deleniti voluptatum molestiae distinctio ab cum numquam nobis molestias! Voluptates fuga delectus eum nostrum quis assumenda!</Text>
          <Text style = {styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quisquam vero vitae eligendi, obcaecati deleniti voluptatum molestiae distinctio ab cum numquam nobis molestias! Voluptates fuga delectus eum nostrum quis assumenda!</Text>
          <Text style = {styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quisquam vero vitae eligendi, obcaecati deleniti voluptatum molestiae distinctio ab cum numquam nobis molestias! Voluptates fuga delectus eum nostrum quis assumenda!</Text>
        </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

function GetDate() {
  const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthIndex = (new Date().getMonth());
  let thisYear = (new Date().getFullYear());
  let monthName = monthNames[monthIndex];
  return monthName + " " + thisYear;

}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginVertical: 0,
  },
  ScrollView: {
    marginHorizontal: 0,
  },
  header1: {
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'left',
    fontSize: 32,
    fontWeight: 'bold',
  },
  header2: {
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 30,
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
})

export default OverviewPage;
