import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, ActivityIndicator, View, Text } from "react-native"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useDispatch, useSelector } from 'react-redux'
import { register as registerAction } from '../../server/actions/userAction'
import { RootState } from '../store'

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const authEmailInput = useRef<TextInput>(null)
  const { navigation } = _props

  const [username, setUsername] = useState("")
  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

  const dispatch = useDispatch()
  const userRegister = useSelector((state: RootState) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  function goToLogin() {
    navigation.navigate("Login", { screen: "LoginScreen", params: {} })
  }

  function goToHome() {
    navigation.navigate("Welcome", { screen: "WelcomeScreen", params: {} })
  }

  useEffect(() => {
    setUsername("")
    setAuthEmail("")
    setAuthPassword("")

    return () => {
      setUsername("")
      setAuthEmail("")
      setAuthPassword("")
    }
  }, [])

  useEffect(() => {
    if (userInfo) {
      goToHome()
    }
  }, [userInfo])

  const handleSubmit = () => {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    dispatch(registerAction(username, authEmail, authPassword))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen preset="fixed" style={$screenContainer}>
      <View style={$screenBackground}>
        <View style={$shape1} />
        <View style={$shape2} />
        <View style={$shape3} />
        <View style={$shape4} />
      </View>
      <View style={$screenContent}>
        <View style={$register}>
          {error && <Text style={$error}>{error}</Text>}
          <TextField
            value={username}
            onChangeText={setUsername}
            containerStyle={$registerField}
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect={false}
            placeholderTx="signUpScreen.usernameFieldPlaceholder"
            onSubmitEditing={() => authEmailInput.current?.focus()}
          />
          <TextField
            ref={authEmailInput}
            value={authEmail}
            onChangeText={setAuthEmail}
            containerStyle={$registerField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTx="signUpScreen.emailFieldPlaceholder"
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />
          <TextField
            ref={authPasswordInput}
            value={authPassword}
            onChangeText={setAuthPassword}
            containerStyle={$registerField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            placeholderTx="signUpScreen.passwordFieldPlaceholder"
            onSubmitEditing={handleSubmit}
            RightAccessory={PasswordRightAccessory}
          />

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={$loading} />
          ) : (
            <Button style={$registerSubmit} onPress={handleSubmit}>
              <Text style={$registerSubmitText}>Sign Up Now</Text>
              <Icon icon="chevronRight" size={24} style={$buttonIcon} />
            </Button>
          )}
          <Button
            testID="login-button"
            tx="signUpScreen.tapToSignIn"
            style={$loginButton}
            preset="reversed"
            onPress={goToLogin}
          />
        </View>
      </View>
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "2E073F",
}

const $screenBackground: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const $shape1: ViewStyle = {
  height: 520,
  width: 520,
  backgroundColor: "#7A1CAC",
  position: "absolute",
  top: -50,
  right: 120,
  borderRadius: 72,
  transform: [{ rotate: "45deg" }],
}

const $shape2: ViewStyle = {
  height: 220,
  width: 220,
  backgroundColor: "#AD49E1",
  position: "absolute",
  top: -172,
  right: 0,
  borderRadius: 32,
}

const $shape3: ViewStyle = {
  height: 540,
  width: 190,
  backgroundColor: "#AD49E1",
  position: "absolute",
  top: -24,
  right: 0,
  borderRadius: 32,
}

const $shape4: ViewStyle = {
  height: 400,
  width: 200,
  backgroundColor: "#7A1CAC",
  position: "absolute",
  top: 420,
  right: 50,
  borderRadius: 60,
}

const $screenContent: ViewStyle = {
  zIndex: 1,
  width: 360,
  backgroundColor: "#EBD3F8",
  borderRadius: 24,
  boxShadow: "0px 0px 24px #5C5696",
  overflow: "hidden",
}

const $register: ViewStyle = {
  padding: spacing.xl,
  paddingTop: 156,
}

const $registerField: ViewStyle = {
  marginBottom: spacing.lg,
  position: "relative",
}

const $registerSubmit: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  fontSize: 14,
  marginTop: spacing.xl,
  paddingVertical: spacing.md,
  borderRadius: 26,
  borderColor: colors.palette.primary300,
  borderWidth: 1,
  display: "flex",
  alignItems: "center",
  width: "100%",
  color: colors.palette.primary700,
  boxShadow: "0px 2px 2px #5C5696",
  flexDirection: "row",
  justifyContent: "center",
}

const $registerSubmitText: TextStyle = {
  color: colors.palette.primary700,
  fontWeight: "700",
  textTransform: "uppercase",
}

const $buttonIcon: ViewStyle = {
  fontSize: 24,
  marginLeft: "auto",
  color: colors.palette.neutral800,
}

const $loginButton: ViewStyle = {
  marginTop: spacing.md,
  backgroundColor: colors.palette.primary100,
  color: colors.palette.primary700,
}

const $loading: ViewStyle = {
  marginVertical: spacing.md,
  alignSelf: "center",
}

const $error: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}
