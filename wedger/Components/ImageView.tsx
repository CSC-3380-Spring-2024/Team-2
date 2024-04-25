import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';

const ImageView = ({image, imageURL}) => {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{uri: image.path}}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {imageURL && <Text style={styles.imageURL}>{imageURL}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  imageURL: {
    fontSize: 14,
    color: 'blue',
  },
});

export default ImageView;
