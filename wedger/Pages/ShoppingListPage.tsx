import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useShoppingList } from '../Context/userShoppingListContext';
import GroupName from '../Components/GroupName';
import GroupItem from '../Components/GroupItems';
import { PanGestureHandler } from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function ShoppingListPage() {
  const { usersShoppingLists } = useShoppingList();

  const [group, setGroup] = useState('');
  const [groupItems, setGroupItems] = useState([]);
  const [groupItemMap, setGroupItemMap] = useState({});
  const [item, setItem] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  // Adds a group
  const handleAddGroup = () => {
    Keyboard.dismiss();
    if (group.trim() !== '') {
      setGroupItems([...groupItems, group]);
      setGroupItemMap({ ...groupItemMap, [group]: [] });
      setGroup('');
    }
  };

  // Adds an item to the currently open group
  const handleAddItem = () => {
    Keyboard.dismiss();
    if (openIndex !== null && item.trim() !== '') {
      const updatedGroupItemMap = { ...groupItemMap };
      updatedGroupItemMap[groupItems[openIndex]].push(item);
      setGroupItemMap(updatedGroupItemMap);
      setItem('');
    }
  };

  // Deletes a group
  const completeGroup = (index: number) => {
    let itemsCopy = [...groupItems];
    itemsCopy.splice(index, 1);
    setGroupItems(itemsCopy);
    const updatedGroupItemMap = { ...groupItemMap };
    delete updatedGroupItemMap[groupItems[index]];
    setGroupItemMap(updatedGroupItemMap);
    if (openIndex === index) {
      setOpenIndex(null); 
    }
  };

  const toggleGroup = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  
  return (
    <LinearGradient
      colors={['#EBF8FE', '#8eb2c0']}
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="never">
        <View style={styles.container}>
          <Text style={styles.title}>Your Shopping Lists</Text>
          {groupItems.map((group, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.group, openIndex === index && { height: 'auto' }]}
                onPress={() => toggleGroup(index)}
                activeOpacity={1}>
                <GroupName text={group} />
                {openIndex === index && groupItemMap[group] && (
                  <>
                    <View style={styles.itemContainer}>
                      {groupItemMap[group].map((item, itemIndex) => {
                        return <GroupItem key={itemIndex} text={item} />;
                      })}
                    </View>
                    <View style={styles.container}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.writeItemWrapper}>
                        <TextInput
                          style={styles.inputItem}
                          placeholder={'Add an Item!'}
                          value={item}
                          onChangeText={text => setItem(text)}
                        />
                        <TouchableOpacity onPress={() => handleAddItem()}>
                          <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                          </View>
                        </TouchableOpacity>
                      </KeyboardAvoidingView>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        {/* Make a group section */}
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.writeGroupWrapper}>
            <TextInput
              style={styles.input}
              placeholder={'Create a Group'}
              value={group}
              onChangeText={text => setGroup(text)}
            />
            <TouchableOpacity onPress={() => handleAddGroup()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingTop: 23,
  },
  group: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  title: {
    borderColor: '#20232a',
    color: '#2c3135',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 35,
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
  itemContainer: {
    paddingBottom: 30,
  },
  writeGroupWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 40,
    alignContent: 'center',
  },
  writeItemWrapper: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
});

export default ShoppingListPage;
