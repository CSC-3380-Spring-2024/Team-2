import {addDoc, collection, getDoc} from 'firebase/firestore';
import {db} from '../environment/firebase';

export const ImageUpload = async (setImage: string): Promise<string> => {
  try {
    const base64Data = setImage;

    const imagesCollectionRef = collection(db, 'images');
    const docRef = await addDoc(imagesCollectionRef, {imageData: base64Data});

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const imageURL = docSnapshot.data().imageData;
      console.log('Image URL:', imageURL);
      return imageURL;
    } else {
      throw new Error('Uploaded image document does not exist.');
    }
  } catch (error) {
    console.error('Cannot proceed:', error);
    throw error;
  }
};

export default ImageUpload;
