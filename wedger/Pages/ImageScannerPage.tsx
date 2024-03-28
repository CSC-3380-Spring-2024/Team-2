import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import React, {Component, useEffect} from 'react';
async function checkCameraPermission() {
  if (Platform.OS === 'android') {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
  } else {
    // iOS permissions check
  }
}

async function requestCameraPermission() {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Camera permissions are required for functionality',
          buttonPositive: 'Allow',
          buttonNegative: 'Refuse',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // IOS permissions request here
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export function ImageScannerPage() = () => {
  useEffect(() => {
    async function checkAndRequestPermissions() {
      if (Platform.OS === 'android') {
        const cameraGranted = await checkCameraPermission();
        if (!cameraGranted) {
          const cameraPermissionGranted = await requestCameraPermission();
          if (!cameraPermissionGranted) {
            await requestCameraPermission();
          }
        }
      } else {
        // iOS permissions
      }
    }

    checkAndRequestPermissions();
  }, []);
  return (
      <View>
          <Text>
              ImageScannerPage
          </Text>
      </View>
  )
  // Render your app's UI
};

export default ImageScannerPage;
