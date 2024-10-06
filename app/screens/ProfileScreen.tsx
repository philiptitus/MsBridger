import React, { FC, useEffect, useState, useMemo, useRef, ComponentType } from "react"
import { TextInput, TextStyle, ViewStyle, View, ActivityIndicator, ScrollView } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile as updateUserProfileAction, logout as logoutAction } from '../../server/actions/userAction'
import { RootState } from '../store'
import { colors, spacing } from "../theme"
import { navigate } from "app/navigators"

export const EditProfile: FC = () => {
  const passwordInput = useRef<TextInput>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)

  const dispatch = useDispatch()
  const userUpdateProfile = useSelector((state: RootState) => state.userUpdateProfile)
  const userLogin = useSelector((state: RootState) => state.userLogin)
  const { userInfo } = userLogin
  const { loading, error, success } = userUpdateProfile

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo])

  const handleSubmit = () => {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    dispatch(updateUserProfileAction({ id: userInfo._id, name, email, password }))
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate("Login")
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
      <ScrollView contentContainerStyle={$scrollContainer}>
        <Text preset="heading" tx="editProfile.title" style={$title} />
       
        <View style={$currentInfoContainer}>
          <Text style={$currentInfoText}>Name: {name}</Text>
          <Text style={$currentInfoText}>Email: {email}</Text>
        </View>
        <Text tx="editProfile.enterDetails" style={$tagline} />
        {attemptsCount > 2 && <Text tx="editProfile.hint" size="sm" weight="light" style={$hint} />}
        {error && <Text style={$error}>{error}</Text>}
        {success && <Text style={$success}>Profile Updated Successfully!</Text>}

        <TextField
          value={name}
          onChangeText={setName}
          containerStyle={$textField}
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect={false}
          labelTx="editProfile.nameFieldLabel"
          placeholderTx="editProfile.nameFieldPlaceholder"
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

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={$loading} />
        ) : (
          <Button
            testID="updateProfile-button"
            tx="editProfile.tapToUpdate"
            style={$tapButton}
            preset="reversed"
            onPress={handleSubmit}
          />
        )}

        <Button
          testID="logout-button"
          tx="editProfile.logout"
          style={$logoutButton}
          preset="default"
          onPress={handleLogout}
        />
      </ScrollView>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
  flex: 1,
  justifyContent: 'space-between',
}

const $scrollContainer: ViewStyle = {
  paddingBottom: spacing.xxl,
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

const $loading: ViewStyle = {
  marginVertical: spacing.md,
  alignSelf: "center",
}

const $error: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $success: TextStyle = {
  color: "green",
  marginBottom: spacing.md,
}

const $currentInfoContainer: ViewStyle = {
  marginBottom: spacing.lg,
}

const $currentInfoText: TextStyle = {
  marginBottom: spacing.sm,
  color: colors.palette.neutral800,
}

const $logoutButton: ViewStyle = {
  marginTop: spacing.lg,
  backgroundColor: colors.error,
}
