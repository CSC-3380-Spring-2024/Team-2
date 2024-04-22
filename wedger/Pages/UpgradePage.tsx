/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Header from '../Components/Header';
import SubscriptionButton from '../Components/SubscriptionButton/SubscriptionButton';
import {makeStyles, Text} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const UpgradePage = () => {
  const styles = useStyles();
  // something on this page breaks everything
  return (
    <View>
      {/* <LinearGradient
        colors={['#EBF8FE', '#e9dab7']}
        style={styles.linearGradient}> */}
      <Header logo paddingTop backButton />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text h2 style={{textAlign: 'center', color: 'black'}}>
            Unlock the full potential of your finances with Wedger+! This
            premium upgrade offers advanced insights into your spending habits,
            helping you identify where your money goes and how you can save more
            effectively.
          </Text>
          {/* <SubscriptionButton /> */}
        </View>
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};

export default UpgradePage;

const useStyles = makeStyles(theme => ({
  container: {height: '90%'},
  linearGradient: {},
  textContainer: {
    backgroundColor: theme.colors.background,
    marginTop: 100,
    marginHorizontal: 20,
    padding: 40,
    borderRadius: 15,
    gap: 40,
  },
}));
