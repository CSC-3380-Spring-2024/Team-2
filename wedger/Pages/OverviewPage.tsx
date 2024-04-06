import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyledButton from '../Components/StyledButton';
import PopupModal from '../Components/PopupModal';
import {useBudget} from '../Context/userBudgetContext';
import {
  EditBudgetType,
  ItemObject,
  addItemObject,
  createBudgetType,
} from '../Types/BudgetTypes';

function OverviewPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {createBudget, editBudget, usersBudgets, addExpendedItems} =
    useBudget();
  const testBudget: createBudgetType = {
    budgetName: 'fun Budget',
    labelColor: '#339922',
    spendTarget: 1000,
    timeFrame: 'daily',
  };
  const testBudgetUpdate: EditBudgetType = {
    docId: '3gj0EW7q5XG7Lwqbq2Au',
    budgetName: '111111111',
    labelColor: '#3399',
    spendTarget: 1200,
    timeFrame: 'daily',
    spendCurrent: 12,
  };

  const addExspenceArry: addItemObject[] = [
    {
      name: 'obj1',
      cost: 20.2,
      addMethod: 'manual',
    },
    {
      name: 'obj2',
      cost: 222,
      addMethod: 'manual',
    },
  ];

  console.log(usersBudgets);

  return (
    <View style={{backgroundColor: '#f00', height: 100}}>
      <Text style={{color: 'black'}}>OverviewPage</Text>
      <StyledButton
        onPress={() => {
          setModalOpen(true);
        }}>
        Test test
      </StyledButton>
      <StyledButton
        onPress={() => {
          createBudget(testBudget);
        }}>
        makeNewBudget
      </StyledButton>
      <StyledButton
        onPress={() => {
          editBudget(testBudgetUpdate);
        }}>
        UpdateDoc
      </StyledButton>
      <StyledButton
        onPress={() => {
          addExpendedItems(addExspenceArry, '3gj0EW7q5XG7Lwqbq2Au');
        }}>
        addItem
      </StyledButton>

      <PopupModal
        isVisible={modalOpen}
        description="Test popup"
        firstButtonPress={() => {
          setModalOpen(!modalOpen);
        }}
        firstButtonText="Continue"
      />
    </View>
  );
}

export default OverviewPage;
