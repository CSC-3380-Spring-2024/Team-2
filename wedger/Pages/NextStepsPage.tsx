import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {imageParsing} from '../Components/imageParsing';
import {imageUpload} from '../Components/imageUpload.tsx';

const NextStepsPage = ({route}) => {
  const {imageURL, userUid, budgetUid} = route.params;

  useEffect(() => {
    imageUpload(image);
  }, [imageURL, userUid, budgetUid]);

  return (
    <View>
      <Text>Display Recognized Text Here</Text>
    </View>
  );
};

export default NextStepsPage;
