import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../Components/TextInputField';
import {makeStyles} from '@rneui/themed';
import StyledButton from '../Components/StyledButton';
import {useAuth} from '../Context/userAuthContext';
import Error from '../Components/Error';
import PopupModal from '../Components/PopupModal';
import {useNavigation} from '@react-navigation/native';

export function ForgotPasswordPage() {
  const styles = useStyles();
  const navigator = useNavigation();
  const {forgotPassword, userAuthError} = useAuth();
  const [email, setEmail] = useState('');
  const [underlineEmail, setUnderlineEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    if (email) {
      await forgotPassword(email);
    } else {
      setUnderlineEmail(true);
      setFormError('Please provide the email used for your account');
    }
    setIsSubmitting(false);
    setModalOpen(true);
  }

  return (
    <View>
      <Text>Forgot Your Password Let us help you get back to budgeting</Text>
      <TextInputField
        placeholder="Email"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        style={underlineEmail ? styles.inputError : {}}
      />
      <StyledButton onPress={handleSubmit} loading={isSubmitting}>
        Send Email
      </StyledButton>
      <Error
        align="center"
        topPadding={16}
        error={formError ? formError : userAuthError}
      />
      <PopupModal
        isVisible={modalOpen}
        header="A password reset email has been sent!"
        description="Please wait up to 5 minutes for the email to arrive. If you do not see it please check your spam folder or try again"
        firstButtonPress={() => {
          navigator.navigate('Login');
        }}
        firstButtonText="Continue"
      />
    </View>
  );
}

export default ForgotPasswordPage;

const useStyles = makeStyles(theme => ({
  inputError: {
    borderBottomColor: theme.colors.error,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
}));
