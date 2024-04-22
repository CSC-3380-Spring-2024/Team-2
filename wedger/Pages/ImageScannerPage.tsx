import {Text, View, Image, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import StyledButton from '../Components/StyledButton';
import {LinearGradient} from 'react-native-linear-gradient';
import ImageView from '../Components/ImageView.tsx';

export function ImageScannerPage() {
  const [image, setImage] = useState<any>(null);
  const openGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.5,
      includeBase64: true,
      useFrontCamera: false,
    })
      .then(image => {
        setImage(image);
        console.log(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.5,
      includeBase64: true,
      useNativeDriver: false,
      cancelButtonTitle: 'Cancel',
    })
      .then(image => {
        setImage(image);
        console.log(image);
      })
      .catch(error => {
        console.log('Cancelled camera operation', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#EBF8FE', '#8eb2c0']}
        style={styles.linearGradient}>
        <View style={styles.headerContainer}>
          <Text style={styles.header1}>Receipt Scanner</Text>
        </View>
        <View style={styles.content}>
          <ImageView image={image} />
        </View>
        <View style={styles.buttonContainer}>
          <StyledButton
            style={styles.cameraButton}
            onPress={() => {
              openCamera();
            }}>
            Open Camera
          </StyledButton>
          <StyledButton
            style={styles.galleryButton}
            onPress={() => {
              openGallery();
            }}>
            Open Gallery
          </StyledButton>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 0,
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
    width: null,
    height: null,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    width: 300,
    height: 380,
    alignItems: 'center',
    alignContent: 'center',
  },
  imageBox: {
    marginTop: 32,
    marginBottom: 8,
    borderWidth: 8,
    borderColor: '#FFFFFF',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: 240,
    height: 320,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  galleryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cameraButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default ImageScannerPage;
