import storage from '@react-native-firebase/storage';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export async function ImageUpload(image: string): Promise<string> {
  try {
    const reference = storage().ref('images').child(Date.now().toString());

    await reference.putString(image, 'base64');

    const imageURL = await reference.getDownloadURL();
    return imageURL;
  } catch (error) {
    throw new Error('Error uploading image: ' + error);
  }
}

export async function ImageParsing(imageURL: any): Promise<string[]> {
  try {
    if (imageURL) {
      console.log('Retrieved imageURL:', imageURL);

      const result = await TextRecognition.recognize(imageURL);
      const recognizedLines: string[] = [];

      for (let block of result.blocks) {
        for (let line of block.lines) {
          recognizedLines.push(line.text);
        }
      }

      console.log('Recognized text lines:', recognizedLines);

      return recognizedLines;
    } else {
      console.error('Invalid data structure or imageURL not found');
      return [];
    }
  } catch (error) {
    console.error('Error parsing image:', error);
    return [];
  }
}
