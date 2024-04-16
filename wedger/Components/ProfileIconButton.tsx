import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import StyledButton from './StyledButton.tsx';

interface IconButtonProps {
  onPress: () => void;
  iconName: string;
  iconSize: number;
  iconColor: string;
  text: string;
}

const ProfileIconButton: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  iconSize = 20,
  iconColor = '#000',
  text,
}) => {
  return (
    <StyledButton style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </StyledButton> // changed this to styled button component
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
  },
});

export default ProfileIconButton;
