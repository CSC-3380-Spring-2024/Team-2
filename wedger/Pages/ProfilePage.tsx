import {Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../Context/userAuthContext';
import StyledButton from '../Components/StyledButton';
import {useNavigation} from '@react-navigation/native';

function ProfilePage() {
  const {logout} = useAuth();
  const navigator = useNavigation();

  return (
    <View>
      <Text>ProfilePage</Text>
      <StyledButton
        onPress={() => {
          logout();
        }}>
        Logout
      </StyledButton>
      <StyledButton
        onPress={() => {
          navigator.navigate('Loading');
        }}>
        TO LOADING
      </StyledButton>
    </View>
  );
}

export default ProfilePage;
