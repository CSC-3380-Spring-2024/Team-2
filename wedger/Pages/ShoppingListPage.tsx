import React, {useState} from 'react';
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
  Button,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useShoppingList} from '../Context/userShoppingListContext';
import GroupName from '../Components/GroupName';
import GroupItem from '../Components/GroupItems';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {ListItem} from '@rneui/themed';
// import Close_Delete from '..wedger/Assets/Static'
import{
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular,
} from '@expo-google-fonts/dev';
import { ShoppingListType, addListItemObject, createShoppingListType } from '../Types/ShoppingListTypes';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function ShoppingListPage() {


  const Seperator = () => <View style={seperatorStyles} />;

  const {usersShoppingLists} = useShoppingList();
  const [groupName, setGroupName] = useState('');
  const [groupItems, setGroupItems] = useState<string[]>([]);
  // const [groupItemMap, setGroupItemMap] = useState<string>({});
  const [text, setText] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [shoppingListArray, setShoopingListArray] = useState<createShoppingListType[]>([])

  // Adds a group
  const handleAddGroup = (item: string) => {
    Keyboard.dismiss();
    let temp = [...shoppingListArray];
    const val: createShoppingListType = {
      listName: item,
      itemsArray: []
    }
    temp.push(val);
    setShoopingListArray(temp);
    };

  // Adds an item to the currently open group
  const handleAddItem = (item: string, list:createShoppingListType) => {
    Keyboard.dismiss();
    let temp = [...shoppingListArray];
    const val: addListItemObject = {
      itemName: item,
      checked: false,
    };
    const index = temp.indexOf(list);
    temp[index].itemsArray.push(val);
    setShoopingListArray(temp);
  };

  const toggleGroup = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(index);
  };

  const setDeleteGroup = (index: number) => {
    let temp = [...shoppingListArray];
    temp.splice(index,1)
    setShoopingListArray(temp);
  }

  const setDeleteItem = (item: addListItemObject, listIndex:number) => {
    // let itemsCopy = shoppingListArray[listIndex].itemsArray;
    // itemsCopy.findIndex(item)
    // setGroupItems(itemsCopy);
    // const updatedGroupItemMap = {...groupItemMap};
    // delete updatedGroupItemMap[groupItems[index]];
    // setGroupItemMap(updatedGroupItemMap);
    // if (openIndex === index) {
    //   setOpenIndex(null);
    // }
  };

  const loseTheIntro = () => {

  }

  return (
    <LinearGradient
      colors={['#F6FBFD', '#5C8498']}
      style={styles.linearGradient}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="never">
        <View style={styles.container}>
          <Text style={styles.title}>Your Shopping Lists</Text>

          {[...shoppingListArray].map((list, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.group,
                  openIndex === index ? {height: 'auto'} : {height: 55},
                ]}
                onPress={() => toggleGroup(index)}
                activeOpacity={1}>
                <GroupName text={list.listName} />
                {openIndex === index && list.itemsArray && (
                  <>
                    <View style={styles.itemContainer}>
                      {list.itemsArray.map((item, itemIndex: number) => {
                        return <GroupItem key={itemIndex} text={item.itemName} />;
                      })}
                    </View>
                    <View style={styles.container}>
                      <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.writeItemWrapper}>
                        <TextInput
                          maxLength={20}
                          style={styles.inputItem}
                          placeholder={'Add an Item!'}
                          value={text}
                          onChangeText={text => setText(text)}
                        />
                        <TouchableOpacity onPress={() => handleAddItem(text, list)}>
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
              maxLength={20}
              style={styles.input}
              placeholder={'Create a Group!'}
              value={groupName}
              onChangeText={e => setGroupName(e)}
            />
            <TouchableOpacity onPress={() => handleAddGroup(groupName)}>
              <View style= {styles.addWrapper}>
                <Text style= {styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );



//This stuff is going to be the intro box but it doesn't work yet so don't think about it 
<View style={styles.introBox}>
          <TouchableOpacity onPress = {() => loseTheIntro()}>
            <View style={styles.closeTheIntroBoxButtonContainer}>
                {/* <Close_Delete/> */}
            </View>
            </TouchableOpacity>
            <Seperator />
            <View style={styles.container}>
              <Text style={styles.varelaRound}>
                Create a group for your first shopping list!
              </Text>

            </View>
          </View>




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
  },
  group: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#CCE1EC',
    borderRadius: 10,
  },
  title: {
    borderColor: '#20232a',
    color: '#2D373C',
    textAlign: 'center',
    fontSize: 40,
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
    bottom: 35,
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
    width: 250,
    marginLeft: 30,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 250,
    marginLeft: 30,
  },
  varelaRound: {
    fontFamily: 'varelaRound-Regular',
    fontSize: 18,
  },
  closeTheIntroBoxButtonContainer: {
    alignSelf: 'flex-end',
    height: 25,
    width: 25,
    marginRight: 5,
    paddingVertical: 5,
  },
  introBox: {
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
const seperatorStyles: ViewStyle = {
  height: 2,
  width: '100%',
  backgroundColor: '#C0C0C0',
};

export default ShoppingListPage;
