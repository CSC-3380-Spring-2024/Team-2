import {Text, View} from 'react-native';
import React from 'react';

function ShoppingListPage() {
  return (
    <View>
      <Text>ShoppingListPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 0,
  },
  ScrollView: {
    marginHorizontal: 0,
  },
  listBox: {
    alignSelf: 'center',
    width: 360,
    height: 50,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 0,
    borderColor: '#20232a',
    color: '#2c3135',
    textAlign: 'center',
    fontSize: 39,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    color: '#2c3135',
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default ShoppingListPage;
