import React, { useState } from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const handleTakePicture = () => {
    // code here for taking picture
  };

  const handleChooseFromGallery = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        processImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageData) => {
    // image processing logic goes here
  };

  const handleClear = () => {
    setSelectedImage(null);
    setRecognizedText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={handleTakePicture} />
        <input type="file" accept="image/*" onChange={handleChooseFromGallery} />
        <Button title="Clear" onPress={handleClear} />
      </View>
      {recognizedText ? (
        <View style={styles.textContainer}>
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  recognizedText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;