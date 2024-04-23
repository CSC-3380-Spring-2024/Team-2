import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export function imageView({image}) {
  return (
    <View style={styles.imageContainer}>
      {image && (
        <Image
          style={styles.imageBox}
          source={{uri: `data:${image.mime};base64,${image.data}`}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default imageView;
