import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, makeStyles} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Components/Header';
import SubscriptionButton from '../Components/SubscriptionButton';

const UpgradePage = () => {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#8eb2c0']}>
        <Header logo marginTop backButton />
        <Text>Upgrade Now</Text>
        <SubscriptionButton />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UpgradePage;

const useStyles = makeStyles(theme => ({
  inputError: {
    borderBottomColor: theme.colors.error,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  root: {
    paddingBottom: 53,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  forgotPasswordText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.black,
  },
  container: {
    gap: 10,
  },
}));
