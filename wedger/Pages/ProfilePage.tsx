import React from 'react';
import {StyleSheet,Text,View,ScrollView} from 'react-native';
import {useAuth} from '../Context/userAuthContext';
import StyledButton from '../Components/StyledButton';
import {Button, Icon} from '@rneui/base';
import ProfileIconButton from '../Components/StyledButton';

const ProfilePage = () => {
  const {logout} = useAuth();

  // functionality code goes here, read all comments on this page

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, User</Text>
          {/* User Name and other data is dynamic, Fetch using functions from useAuth => example; LogOut function */}
          <Text style={styles.theFeatures}>Features</Text>
          <ProfileIconButton 
            onPress={() => { /*add functionality*/}}
            icon={<Icon name="notifications"/>}
            text="Notifications"
          />
          <Button title="Edit Info" />
          <Button title="App Settings" />
          <Button title="Appearance" />
          {/* Make a new component for these buttons, take inspiration from styledButton.tsx, also add functionality  */}
          <Text style={styles.thePrivacy}>Privacy</Text>
          <Button title="Devices" />
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton onPress={() => logout()}>Logout</StyledButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // use the theme!!!!!! please! -> see any file that has styling so far on how to do this
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  header: {
    width: '100%',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 50,
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
  },
  theFeatures: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 20,
  },
  thePrivacy: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 20,
  },
  openModalButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  openModalButtonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default ProfilePage;
