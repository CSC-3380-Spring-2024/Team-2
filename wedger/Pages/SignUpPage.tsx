import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../Components/TextInputField';
import StyledButton from '../Components/StyledButton';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../Context/userAuthContext';
import AuthContainer from '../Components/AuthContainer';
import {makeStyles} from '@rneui/themed';
import Error from '../Components/Error';

type SignUpError =
  | 'NoError'
  | 'IncompleteFields'
  | 'PasswordNoMatch'
  | 'InvalidPasswordException'
  | 'UsernameExistsException'
  | 'Other';
export function SignUpPage() {
  const navigator = useNavigation();
  const styles = useStyles();
  const {createEmailAccount, userAuthError} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorOptions, setErrorOptions] = useState<{
    underlineEmail?: boolean;
    underlinePassword?: boolean;
    underlineConfirmPassword?: boolean;
    errorMessage?: string;
  }>({});

  const setError = (error: SignUpError, payload?: string) => {
    switch (error) {
      case 'NoError': {
        setErrorOptions({});

        break;
      }
      case 'IncompleteFields': {
        setErrorOptions({
          underlineEmail: !email,
          underlinePassword: !password,
          underlineConfirmPassword: !confirmPassword,
          errorMessage: 'All fields must be complete to register.',
        });

        break;
      }
      case 'UsernameExistsException': {
        setErrorOptions({
          underlineEmail: true,
          errorMessage: payload,
        });

        break;
      }
      case 'InvalidPasswordException': {
        setErrorOptions({
          underlinePassword: true,
          underlineConfirmPassword: true,
          errorMessage: payload,
        });

        break;
      }
      case 'Other': {
        setErrorOptions({
          errorMessage: `Something went wrong... (${payload})`,
        });

        break;
      }
      case 'PasswordNoMatch': {
        setErrorOptions({
          errorMessage: 'error: passwords do not match',
          underlinePassword: true,
          underlineConfirmPassword: true,
        });
      }
      default: {
        setErrorOptions({
          errorMessage: `Something went wrong... (${payload})`,
        });
      }
    }
  };

  const checkInputs = (): boolean => {
    let isValid = true;
    let newError: SignUpError = 'NoError';

    if (!(email && password && confirmPassword)) {
      newError = 'IncompleteFields';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSighup = async () => {
    console.log('handle sign up');
    if (checkInputs()) {
      try {
        await createEmailAccount(email, password, confirmPassword);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <AuthContainer
      switchPagePlainText="Already have an account? "
      switchPageLinkText="Log in"
      handleSwitchAuthPage={() => navigator.navigate('Login')}>
      <View>
        <View>
          <Text>Wedger</Text>
          <Text>The Budgeting App</Text>
        </View>
        <View>
          <TextInputField
            placeholder="Email"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            style={errorOptions?.underlineEmail ? styles.inputError : {}}
          />
          <TextInputField
            placeholder="Password"
            autoComplete="password"
            textContentType="password"
            onChangeText={setPassword}
            password
            style={errorOptions?.underlinePassword ? styles.inputError : {}}
          />
          <TextInputField
            placeholder="Confirm Password"
            autoComplete="password"
            textContentType="password"
            onChangeText={setConfirmPassword}
            password
            style={
              errorOptions?.underlineConfirmPassword ? styles.inputError : {}
            }
          />
        </View>
        <StyledButton onPress={handleSighup}>Sign Up</StyledButton>
        <Error align="center" topPadding={16} error={userAuthError} />
      </View>
    </AuthContainer>
  );
}

export default SignUpPage;

const useStyles = makeStyles(theme => ({
  headerText: {
    marginBottom: 25,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: theme.colors.grey3,
    marginBottom: 35,
  },
  linkText: {
    fontSize: 13,
    color: theme.colors.grey5,
    textDecorationLine: 'underline',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 15,
    marginBottom: 35,
  },
  error: {textAlign: 'center', color: theme.colors.error, marginBottom: 5},
  inputError: {
    borderBottomColor: theme.colors.error,
    borderBottomWidth: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
}));
