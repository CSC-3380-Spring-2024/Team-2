import {Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../Assets/Animations/Animation.json'
import React, { useEffect, useRef } from 'react';

export function LoadingPage() {

  const animationRef = useRef<LottieView | null>();

  useEffect(() => {
    animationRef.current?.play();
  }, []);
  return (
    <View>
      <Text> Loading .....</Text>
      <LottieView ref={(animation) => {
        animationRef.current = animation;
      }}
      source={require('../Assets/Animations/LoadingAnimation.json')}
      autoPlay
      loop
      style={{ width: '90%', height: 300 }} />
    </View>
  );
}

export default LoadingPage;
