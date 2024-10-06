/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React, { useEffect } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import Config from "./config"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ViewStyle, Alert, Platform } from "react-native"
import { Provider, useDispatch, useSelector } from "react-redux"
import store from '../server/store'
import { sendTokenToBackend } from '../server/actions/postActions'

import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import * as Updates from 'expo-updates' // Import expo-updates for OTA updates

// Function to register for push notifications and get the token
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notifications!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Function to check for and apply updates
async function checkForUpdates() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      // Notify user and reload the app
      Alert.alert('Update available', 'Restart the app to apply the update.', [
        { text: 'Restart now', onPress: () => Updates.reloadAsync() }
      ]);
    }
  } catch (e) {
    // Handle errors
    console.log(e);
  }
}

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<boolean>
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.

    // Slightly delaying splash screen hiding for better UX
    setTimeout(hideSplashScreen, 500)
  })

  useEffect(() => {
    checkForUpdates(); // Check for updates when the app loads
  }, [])

  if (!rehydrated || !isNavigationStateRestored || (!areFontsLoaded && !fontLoadError)) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  // Render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <GestureHandlerRootView style={$container}>

          <Provider store={store}>
            <PushNotificationSetup />
            <AppNavigator
              linking={linking}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </Provider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App

const $container: ViewStyle = {
  flex: 1,
}

// New component to handle push notification setup
const PushNotificationSetup = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user); // Adjust this selector based on your Redux state structure

  useEffect(() => {
    async function setupPushNotifications() {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await dispatch(sendTokenToBackend(token, userInfo));
      }
    }
    setupPushNotifications();

    // Handle notification received while the app is in the foreground
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);

      // Manually present the notification if the app is in the foreground
      if (Platform.OS === 'android') {
        Notifications.presentNotificationAsync(notification.request.content);
      }
    });

    // Cleanup the listener on unmount
    return () => subscription.remove();
  }, [dispatch, userInfo]);

  return null;
}
