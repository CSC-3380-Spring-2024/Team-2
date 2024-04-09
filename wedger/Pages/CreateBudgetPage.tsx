import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../Components/TextInputField';
import Dropdown from '../Components/Dropdown/Dropdown';
import ColorPickerModal from '../Components/ColorPickerModal';
import StyledButton from '../Components/StyledButton';
import {useBudget} from '../Context/userBudgetContext';
import {createBudgetType} from '../Types/BudgetTypes';
import {useNavigation} from '@react-navigation/native';
import PopupModal from '../Components/PopupModal';

interface DropDownOption {
  label: string;
  value: 'monthly' | 'weekly' | 'bi-weekly' | 'daily';
}

const timeFrameBudgetOptions: DropDownOption[] = [
  {label: 'Monthly', value: 'monthly'},
  {label: 'Bi-Weekly', value: 'bi-weekly'},
  {label: 'Weekly', value: 'weekly'},
  {label: 'Daily', value: 'daily'},
];

const CreateBudgetPage = () => {
  const {createBudget, loadingBudget} = useBudget();
  const navigator = useNavigation();
  const [budgetName, setBudgetName] = useState<string | undefined>();
  const [spendGoal, setSpendGoal] = useState<number | undefined>();
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [labelColor, setLabelColor] = useState('#561ecb');
  const [timeFrame, setTimeFrame] = useState<DropDownOption | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const submitBudget = async () => {
    if (validateInputs()) {
      if (budgetName && spendGoal && labelColor && timeFrame) {
        const budgetObjBuild: createBudgetType = {
          labelColor: labelColor,
          budgetName: budgetName,
          spendTarget: spendGoal,
          timeFrame: timeFrame.value,
        };
        await createBudget(budgetObjBuild);
        setModalOpen(true);
      }
    }
  };

  const validateInputs = () => {
    //TODO: form validation
    if (budgetName && spendGoal && labelColor && timeFrame) {
      return true;
    } else return false;
  };
  return (
    <View>
      <TextInputField placeholder="Budget Name" onChangeText={setBudgetName} />
      <TextInputField
        placeholder="Spend Goal"
        inputMode="numeric"
        onChangeText={e => setSpendGoal(e as unknown as number)}
      />
      <View>
        <StyledButton
          onPress={() => setShowColorPicker(true)}
          buttonStyle={{backgroundColor: labelColor}}>
          Pick A Color For Your Budget
        </StyledButton>
      </View>
      <ColorPickerModal
        showModal={showColorPicker}
        colorHex={labelColor}
        setShowModal={setShowColorPicker}
        onSelectColor={setLabelColor}
      />
      <View>
        <Text>Select the time frame for your budget</Text>
        <Dropdown
          options={timeFrameBudgetOptions}
          onChangeValue={value => setTimeFrame}
        />
      </View>
      <StyledButton onPress={submitBudget} loading={loadingBudget}>
        Start Saving!
      </StyledButton>
      <PopupModal
        isVisible={modalOpen}
        header="YAY!"
        description="Your budget was created! you will now see in on your overview page. Budget info can be edited any time by clicking the budget edit button"
        firstButtonPress={() => {
          setModalOpen(!modalOpen);
          navigator.navigate('OverviewHome');
        }}
        firstButtonText="Continue"
      />
    </View>
  );
};

export default CreateBudgetPage;
