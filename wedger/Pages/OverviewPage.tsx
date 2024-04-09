import {Text, View} from 'react-native';
import React, {useState} from 'react';
import StyledButton from '../Components/StyledButton';
import PopupModal from '../Components/PopupModal';
import {useBudget} from '../Context/userBudgetContext';
import {createBudgetType} from '../Types/BudgetTypes';
import { useNavigation } from '@react-navigation/native';

function OverviewPage() {
  const navigator = useNavigation()
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
          navigator.navigate('CreateBudgetPage')
        }}>
        create new budget
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
