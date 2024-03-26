/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, useColorScheme} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OverviewPage from './Pages/OverviewPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './Types/RootStackParamList';
import {LoadingPage} from './Pages/LoadingPage';
import WelcomePage from './Pages/WelcomePage';
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import SignUpPage from './Pages/SignUpPage';
import {useGetProfile} from './api/hooks/profile';
import NextStepsPage from './Pages/NextStepsPage';
// import {useAuth} from './Context/AuthContext';
import {Icon, Text} from '@rneui/base';
import customTheme from './theme';
import ProfilePage from './Pages/ProfilePage';
import AnalyticsPage from './Pages/AnalyticsPage';
import ImageScannerPage from './Pages/ImageScannerPage';
import ShoppingListPage from './Pages/ShoppingListPage';

const ContentStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();
const defaultScreenOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: '#161618'},
};

function OverviewScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="OverviewHome" component={OverviewPage} />
    </ContentStack.Navigator>
  );
}
function ShoppingListScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen
        name="ShoppingListHome"
        component={ShoppingListPage}
      />
    </ContentStack.Navigator>
  );
}
function ScannerScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="ScannerHome" component={ImageScannerPage} />
    </ContentStack.Navigator>
  );
}
function AnalyticsScreen() {
  return (
    // subscription show page else call to action to subscribe
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="AnalyticsHome" component={AnalyticsPage} />
    </ContentStack.Navigator>
  );
}
function ProfileScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="ProfileHome" component={ProfilePage} />
    </ContentStack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="Loading" component={LoadingPage} />
    </ContentStack.Navigator>
  );
}
function TabsScreen() {
  const {theme} = useTheme();
  return (
    <Tabs.Navigator
      initialRouteName="OverviewTab"
      screenOptions={{
        lazy: false,
        headerShown: false,
        tabBarActiveTintColor: theme.colors.grey5,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveTintColor: theme.colors.grey5,
        tabBarInactiveBackgroundColor: theme.colors.background,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          shadowOffset: {width: 0, height: -10},
          shadowRadius: 10,
          shadowOpacity: 0.1,
          elevation: 1,
          borderTopWidth: 1,
          borderColor: theme.colors.grey5,
          paddingBottom: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          position: 'relative',
          bottom: 4,
        },
      }}>
      <Tabs.Screen
        name="OverviewTab"
        component={OverviewScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Overview',
          tabBarIcon: ({focused}) => (
            <Icon
              name="view-dashboard"
              type="material-community"
              color={focused ? theme.colors.white : theme.colors.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ShoppingListTab"
        component={ShoppingListScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'ShoppingList',
          tabBarIcon: ({focused}) => (
            <Icon
              name="list"
              type="font-awesome-5"
              color={focused ? theme.colors.white : theme.colors.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ScannerTab"
        component={ScannerScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Scanner',
          tabBarIcon: ({focused}) => (
            <Icon
              name="scan1"
              type="antdesign"
              color={focused ? theme.colors.white : theme.colors.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AnalyticsTab"
        component={AnalyticsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Analytics',
          tabBarIcon: ({focused}) => (
            <Icon
              name="analytics"
              type="ionicon"
              color={focused ? theme.colors.white : theme.colors.grey3}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              type="font-awesome"
              color={focused ? theme.colors.white : theme.colors.grey3}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function AuthScreen() {
  return (
    <ContentStack.Navigator screenOptions={defaultScreenOptions}>
      <ContentStack.Screen name="Welcome" component={WelcomePage} />
      <ContentStack.Screen name="Login" component={LoginPage} />
      <ContentStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPage}
      />
      <ContentStack.Screen name="SignUp" component={SignUpPage} />
    </ContentStack.Navigator>
  );
}

function OnboardingNavigator() {
  return (
    <ContentStack.Navigator
      screenOptions={{...defaultScreenOptions, gestureEnabled: false}}>
      <ContentStack.Screen name="NextSteps" component={NextStepsPage} />
    </ContentStack.Navigator>
  );
}

function Navigator() {
  //TODO: lots of backend stuff

  // const {isLoggedIn, checkingAuthStatus, accessToken} = useAuth();
  // const isLoggedIn = true;
  // const checkingAuthStatus = false;
  // const accessToken = 'true';

  // const {data: profile, isFetching, isLoading} = useGetProfile(accessToken);

  // const [initialLoadFinished, setInitialLoadFinished] = useState(false);

  // useEffect(() => {
  //   //Brief initial load period so API requests can start being made.
  //   setTimeout(() => setInitialLoadFinished(true), 100);
  // }, []);

  // useEffect(() => {
  //   console.log('Base API Path: ', process.env.REACT_APP_API_URL);
  // }, [isLoading]);

  const getScreen = () => {
    // if (isFetching || isLoading || profile === undefined) {
    //   return <ContentStack.Screen name="Loading" component={LoadingScreen} />;
    // }

    // if (!isLoggedIn) {
    //   return <ContentStack.Screen name="Auth" component={AuthScreen} />;
    // }

    // if (!profile) {
    //   return (
    //     <ContentStack.Screen
    //       name="Onboarding"
    //       component={OnboardingNavigator}
    //     />
    //   );
    // }

    return <ContentStack.Screen name="Tabs" component={TabsScreen} />;
  };

  return (
    <ContentStack.Navigator
      screenOptions={{...defaultScreenOptions, gestureEnabled: false}}>
      {getScreen()}
    </ContentStack.Navigator>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider theme={customTheme}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
