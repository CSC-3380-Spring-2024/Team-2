import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import StyledButton from '../Components/StyledButton';
import {LinearGradient} from 'react-native-linear-gradient';
import ImageView from '../Components/ImageView.tsx';
import {useNavigation} from '@react-navigation/native';

export function ImageScannerPage() {
  const [image, setImage] = useState<any>(null);
  const navigation = useNavigation();
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

  const sailTo = () => {
    navigation.navigate('AddExpensePage'); // normally this needs to go to NextSteps for user selection/filtering (not currently implemented)
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
        {image && (
          <TouchableOpacity style={styles.button} onPress={sailTo}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        )}
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
  content: {
    flex: 1,
    justifyContent: 'center',
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
  button: {
    alignSelf: 'center',
    backgroundColor: '#0080ff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageScannerPage;
