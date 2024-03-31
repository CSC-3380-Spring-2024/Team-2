import {Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../Context/userAuthContext';
import StyledButton from '../Components/StyledButton';

export function ProfilePage() {
  const {logout} = useAuth();
  return (
    <View>
      <Text>ProfilePage</Text>
      <StyledButton
        onPress={() => {
          logout();
        }}>
        Logout
      </StyledButton>
    </View>
  );
}

export default ProfilePage;
