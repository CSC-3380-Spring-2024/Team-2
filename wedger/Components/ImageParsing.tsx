import TextRecognition from 'react-native-text-recognition';

export async function parsedData() {
  const result = await TextRecognition.recognize(imagePath);
}
