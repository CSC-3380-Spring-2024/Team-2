import {Text, View} from 'react-native';
import React, {useState} from 'react';
import StyledButton from '../Components/StyledButton';
import PopupModal from '../Components/PopupModal';

function OverviewPage() {
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
