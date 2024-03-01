import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image, Text, Platform } from 'react-native';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState('');

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
    try {
      const { data: { text } } = await worker.recognize(imageData);
      console.log('Recognized text:', text);
      setRecognizedText(text);
      setError('');
    } catch (error) {
      console.error('Error processing image:', error);
      setRecognizedText('Error processing image');
      setError('Error processing image');
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setRecognizedText('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Slapcheck</Text>
      </View>
      <View style={styles.imageContainer}>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      </View>
      <View style={styles.buttonContainer}>
        {Platform.OS === 'web' ? (
          <input type="file" accept="image/*" onChange={handleChooseFromGallery} />
        ) : (
          <Button title="Take Picture" onPress={() => {}} />
        )}
        <Button title="Clear" onPress={handleClear} />
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        </View>
      )}
      <View style={styles.footer}>
        <Text style={styles.description}>Upload a receipt image to analyze expenses.</Text>
      </View>
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
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  appName: {
    fontSize: 60,
    fontWeight: 'bold',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  recognizedText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: '#FFCCCC',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  footer: {
    marginVertical: 20,
  },
  description: {
    fontSize: 12,
    color: '#888',
  },
});

export default App;