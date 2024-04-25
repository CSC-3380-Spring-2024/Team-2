import {doc, getDoc} from 'firebase/firestore';
import {db} from '../environment/firebase';

const GetImage = async (imageURL: string) => {
  try {
    const imageDocRef = doc(db, 'images', imageURL);

    const docSnapshot = await getDoc(imageDocRef);

    if (docSnapshot.exists()) {
      const imageData = docSnapshot.data().imageData;

      return imageData; // returns in base64 -- need to implement firebase storage
    } else {
      throw new Error('Image document does not exist');
    }
  } catch (error) {
    console.error('Error fetching image data from Firestore:', error);
    throw error;
  }
};

export default GetImage;
