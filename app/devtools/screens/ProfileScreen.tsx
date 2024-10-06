import React, { FC, useEffect, useState, useMemo, useRef, ComponentType } from "react"
import { TextInput, TextStyle, ViewStyle, View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { RegisterScreen } from "./RegisterScreen"

export const EditProfile: FC = () => {
  const passwordInput = useRef<TextInput>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Fetch current user profile details
    // Example: setName(currentUser.name), setEmail(currentUser.email)
    setName("John Doe") // Dummy data
    setEmail("john.doe@example.com") // Dummy data
  }, [])

  const error = isSubmitted ? validationError : ""

  function updateProfile() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to update the user profile.
    // If successful, reset the fields.
    setIsSubmitted(false)
    setPassword("")
    setEmail("")
    setName("")

    // Mocking the successful update with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden],
  )

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>

      <Text preset="heading" tx="editProfile.title" style={$title} />
     
      <View style={$currentInfoContainer}>
        <Text style={$currentInfoText}>Name: {name}</Text>
        <Text style={$currentInfoText}>Email: {email}</Text>
      </View>
      <Text tx="editProfile.enterDetails" style={$tagline} />
      {attemptsCount > 2 && <Text tx="editProfile.hint" size="sm" weight="light" style={$hint} />}



      <TextField
        value={name}
        onChangeText={setName}
        containerStyle={$textField}
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        labelTx="editProfile.nameFieldLabel"
        placeholderTx="editProfile.nameFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="editProfile.emailFieldLabel"
        placeholderTx="editProfile.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
      />

      <TextField
        ref={passwordInput}
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        labelTx="editProfile.passwordFieldLabel"
        placeholderTx="editProfile.passwordFieldPlaceholder"
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="updateProfile-button"
        tx="editProfile.tapToUpdate"
        style={$tapButton}
        preset="reversed"
        onPress={updateProfile}
      />
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $currentInfoContainer: ViewStyle = {
  marginBottom: spacing.lg,
}

const $currentInfoText: TextStyle = {
  marginBottom: spacing.sm,
  color: colors.palette.neutral800,
}
