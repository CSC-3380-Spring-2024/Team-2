import {Card} from '@rneui/base';
import {makeStyles, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import {addItemObject, ItemObject} from '../Types/BudgetTypes';
import StyledButton from './StyledButton';
import Error from './Error';
import TextInputField from './TextInputField';
import DropDownPicker from 'react-native-dropdown-picker';
import Dropdown from './Dropdown/Dropdown';

interface Props {
  itemData: ItemObject | addItemObject | undefined;
  editMode: boolean;
  isVisible: boolean;
  cancelButtonPress: () => void;
  cancelButtonText: string;
  firstButtonPress?: () => void;
  firstButtonText?: string;
  description: string;
  buttonsLoading: boolean;
  errorMessage: string;
}

export default function ExpenseItemModal(props: Props) {
  const {
    itemData,
    editMode,
    isVisible,
    cancelButtonPress,
    description,
    buttonsLoading,
    cancelButtonText,
    firstButtonPress,
    firstButtonText,
    errorMessage,
  } = props;
  const styles = useStyles();

  const [tempName, setTempName] = useState(itemData?.name ? itemData.name : '');
  const [tempCost, setTempCost] = useState(itemData?.cost ? itemData.cost : 0);
  const [tempQuantity, setTempQuantity] = useState(
    itemData?.quantity ? itemData.quantity : 0,
  );
  const [tempUnitCost, setTempUnitCost] = useState(
    itemData?.unitCost ? itemData.unitCost : 0,
  );
  const [tempDate, setTempDate] = useState(itemData?.date ? itemData.date : '');
  const [tempCategory, setTempCategory] = useState(
    itemData?.category ? itemData.category : '',
  );
  const [tempPaymentType, setTempPaymentType] = useState(
    itemData?.paymentType ? itemData.paymentType : 'cash',
  );
  const [tempAddMethod, setTempAddMethod] = useState(
    itemData?.addMethod ? itemData.addMethod : 'manual',
  );
  const [tempReoccurring, setTempReoccurring] = useState(
    itemData?.Reoccurring ? itemData.Reoccurring : false,
  );
  const [tempReceptRef, setTempReceptRef] = useState(
    itemData?.receptRefId ? itemData.receptRefId : '',
  );

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <TouchableOpacity onPress={cancelButtonPress}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <Card containerStyle={styles.card}>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.dataContainer}>
                {editMode ? (
                  <View>
                    <View>
                      <Text h4 style={styles.label}>
                        Item Name
                      </Text>
                      <TextInputField
                        style={styles.content}
                        inputMode="text"
                        defaultValue={tempName}
                        onChangeText={setTempName}
                      />
                      <Text h4 style={styles.label}>
                        Item Cost
                      </Text>
                      <TextInputField
                        style={styles.content}
                        inputMode="decimal"
                        defaultValue={tempCost.toString()}
                        onChangeText={e => setTempCost(+e)}
                      />
                      <Text h4 style={styles.label}>
                        Quantity
                      </Text>
                      <TextInputField
                        style={styles.content}
                        inputMode="numeric"
                        defaultValue={tempQuantity?.toString()}
                        onChangeText={e => setTempQuantity(+e)}
                      />
                      <Text h4 style={styles.label}>
                        Unit Cost
                      </Text>
                      <Text style={styles.content}>
                        $ {tempCost / (tempQuantity ? tempQuantity : 1)}
                      </Text>
                      <Text h4 style={styles.label}>
                        Purchase Date
                      </Text>
                      {/* TODO: Date Picker */}

                      {/* <Text h4 style={styles.label}>
                        Category
                      </Text>
                      <Dropdown
                        style={styles.content}
                        initialValue={tempCategory}
                        onChangeValue={e => setTempCategory(e)}
                        options={[]}
                      />
                      <Text h4 style={styles.label}>
                        Paid With
                      </Text>
                      <Dropdown
                        style={styles.content}
                        initialValue={
                          itemData.paymentType
                            ? itemData.paymentType.toString()
                            : 'unknown'
                        }
                        onChangeValue={setTempPaymentType}
                        options={[]}
                      />

                      <Text h4 style={styles.label}>
                        Item Was Added
                      </Text>
                      <Dropdown
                        style={styles.content}
                        initialValue={itemData.addMethod}
                        onChangeValue={setTempAddMethod}
                        options={[]}
                      />
                      {itemData.Reoccurring && (
                        <>
                          <Text h4 style={styles.label}>
                            This item is a reoccurring cost that repeats:
                          </Text>
                          <Dropdown
                            style={styles.content}
                            initialValue={itemData.Reoccurring}
                            onChangeValue={setTempReoccurring}
                            options={[]}
                          />
                        </>
                      )}
                      <Text h4 style={styles.label}>
                        Recept Attachment
                      </Text>
                      <TextInputField
                        style={styles.content}
                        inputMode="text"
                        defaultValue={itemData.receptRefId}
                        onChangeText={setTempReceptRef}
                      /> */}
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text h4 style={styles.label}>
                      Item Name
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.name}
                    <Text h4 style={styles.label}>
                      Item Cost
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.cost}
                    <Text h4 style={styles.label}>
                      Quantity
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.quantity}
                    <Text h4 style={styles.label}>
                      Unit Cost
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.unitCost}
                    <Text h4 style={styles.label}>
                      Purchase Date
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.date ? itemData.date.toISOString() : 'unknown'}

                    <Text h4 style={styles.label}>
                      Category
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.category
                      ? itemData.category.categoryName
                      : 'other'}

                    <Text h4 style={styles.label}>
                      Paid With
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.paymentType
                      ? itemData.paymentType.toString()
                      : 'unknown'}

                    <Text h4 style={styles.label}>
                      Item Was Added
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.addMethod}
                    {itemData.Reoccurring && (
                      <>
                        <Text h4 style={styles.label}>
                          This item is a reoccurring cost that repeats:
                        </Text>
                        <TextInputField style={styles.content} />
                        {itemData.Reoccurring}
                      </>
                    )}
                    <Text h4 style={styles.label}>
                      Recept Attachment
                    </Text>
                    <TextInputField style={styles.content} />
                    {itemData.receptRefId}
                  </View>
                )}
              </View>

              <View style={styles.buttonContainer}>
                {cancelButtonPress && (
                  <StyledButton
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                    onPress={cancelButtonPress}
                    loading={buttonsLoading}>
                    {cancelButtonText}
                  </StyledButton>
                )}
                {firstButtonPress && (
                  <StyledButton
                    loading={buttonsLoading}
                    buttonStyle={styles.button}
                    titleStyle={styles.button}
                    loadingProps={{color: 'white'}}
                    onPress={firstButtonPress}>
                    {firstButtonText}
                  </StyledButton>
                )}
              </View>
              {errorMessage && (
                <Error align="center" topPadding={16} error={errorMessage} />
              )}
            </Card>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const useStyles = makeStyles(theme => ({
  modal: {},
  container: {width: '100%', height: '100%', marginTop: '40%'},
  dataContainer: {},
  label: {color: theme.colors.black, fontWeight: 'bold', padding: 3},
  content: {
    color: theme.colors.black,
    paddingLeft: 20,
    paddingBottom: 5,
    fontSize: 14,
  },
  card: {borderRadius: 20},
  header: {
    textAlign: 'center',
    width: '100%',
  },
  description: {padding: 10, color: theme.colors.black},
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
  },
}));
