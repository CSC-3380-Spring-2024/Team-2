import storage from '@react-native-firebase/storage';
import {useAuth} from '../Context/userAuthContext.tsx';

async function ImageUpload(image: string) {
  const {userData} = useAuth();
  if (userData) {
    try {
      const reference = storage().ref('images').child(Date.now().toString());

      await reference.putString(image, 'base64');

      return await reference.getDownloadURL();
    } catch (error) {
      throw new Error('Error uploading image: ' + error);
    }
  } else {
    console.log('User auth check failed');
  }
};

export default ImageUpload;
