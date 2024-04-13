import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../Context/userAuthContext';
import StyledButton from '../Components/StyledButton';
import { Button } from '@rneui/base';

const Separator = () => <View style={styles.separator} />;

const ProfilePage = () => {
  const { logout } = useAuth(); // Assuming this hook provides logout functionality
  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Separator/>
          <Text style={styles.welcomeText}>Welcome, User</Text>
          <Separator />
          <Text style={styles.theFeatures}>Features</Text>
            <Button title = "Notifications"/>
            <Button title = "Edit Info"/>
            <Button title = "App Settings"/>
            <Button title = "Appearance"/>
          <Text style = {styles.thePrivacy}>Privacy</Text>
            <Button title = "Devices"/>
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton onPress={() => logout()}>
            Logout
          </StyledButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    alignSelf:'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
