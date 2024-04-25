import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ImageUpload} from '../Components/imageUpload.tsx';
import getImage from '../Components/getImage';
import {LinearGradient} from 'react-native-linear-gradient';

const NextStepsPage = ({route}) => {
  useEffect(() => {
    const {imageURL} = route.params || {};
    if (imageURL) {
      processImageData(imageURL);
    } else {
      console.error('No imageURL provided in route params.');
    }
  }, [route.params]);

  const processImageData = async (imageURL: string) => {
    try {
      const data = await getImage(imageURL);
      if (data) {
        await ImageUpload(data);
        console.log('Image uploaded successfully.');
      } else {
        console.error('No image data received.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FE', '#8eb2c0']}
        style={styles.linearGradient}>
        <View style={styles.headerContainer}>
          <Text style={styles.header1}>Preview Expenses</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  header1: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default NextStepsPage;
