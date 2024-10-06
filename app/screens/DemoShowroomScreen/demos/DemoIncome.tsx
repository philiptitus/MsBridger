import React, { FC, useState, useRef } from "react"
import { Modal, TextInput, TextStyle, View, ViewStyle, ScrollView, ActivityIndicator } from "react-native"
import { Button, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { useDispatch, useSelector } from 'react-redux'
import { createIncome as createIncomeAction } from '../../../../server/actions/postActions'
import { RootState } from '../store'

const IncomeForm: FC = () => {
  const [amount, setAmount] = useState("")
  const [source, setSource] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [step, setStep] = useState(0)

  const passwordInput = useRef<TextInput>(null)
  const dispatch = useDispatch()
  const incomeCreate = useSelector((state: RootState) => state.incomeCreate)
  const { loading, error, success } = incomeCreate

  const errorMessage = isSubmitted && (!amount || !source || !description) ? "All fields are required." : ""

  function handleSubmit() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (!amount || !source || !description) return

    dispatch(createIncomeAction({ amount, source, description }))

    // Reset form fields if submission is successful
    if (success) {
      setIsSubmitted(false)
      setAmount("")
      setSource("")
      setDescription("")
      setStep(0)
      // setIsModalVisible(false) // Close modal after submission
    }
  }

  function openModal() {
    setIsModalVisible(true)
  }

  function closeModal() {
    setIsModalVisible(false)
    setStep(0)
  }

  function nextStep() {
    if (step < 2) {
      setStep(step + 1)
    }
  }

  function prevStep() {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <View style={$root}>
      <Button
        text="Add an Income Source"
        onPress={openModal}
        style={$openButton}
      />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={$modalBackground}>
          <View style={$modalContainer}>
            <View style={$progressBarContainer}>
              <View style={[
                $progressBar,
                step === 0 && $progressBarActive,
                step > 0 && $progressBarCompleted
              ]} />
              <View style={[
                $progressBar,
                step === 1 && $progressBarActive,
                step > 1 && $progressBarCompleted
              ]} />
              <View style={[
                $progressBar,
                step === 2 && $progressBarActive,
                step > 2 && $progressBarCompleted
              ]} />
            </View>
            <Text preset="heading" text="Add Income Source" style={$title} />
            <Text text="Enter income details below" style={$tagline} />
            {attemptsCount > 2 && <Text text="Please fill in all fields" size="sm" weight="light" style={$hint} />}
            {errorMessage && <Text style={$error}>{errorMessage}</Text>}
            {error && <Text style={$error}>{error}</Text>}
            {success && <Text style={$success}>Income added successfully!</Text>}

            {step === 0 && (
              <TextInput
                value={amount}
                onChangeText={setAmount}
                containerStyle={$textField}
                label="Amount"
                placeholder="Enter amount"
                helper={errorMessage}
                status={errorMessage ? "error" : undefined}
                keyboardType="numeric"
                style={$inputField}
              />
            )}

            {step === 1 && (
              <TextInput
                value={source}
                onChangeText={setSource}
                containerStyle={$textField}
                label="Source"
                placeholder="Enter source"
                helper={errorMessage}
                status={errorMessage ? "error" : undefined}
                style={$inputField}
              />
            )}

            {step === 2 && (
              <TextInput
                value={description}
                onChangeText={setDescription}
                containerStyle={$textField}
                label="Description"
                placeholder="Enter description"
                helper={errorMessage}
                status={errorMessage ? "error" : undefined}
                style={$inputField}
              />
            )}

            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} style={$loadingIndicator} />
            ) : (
              <View style={$buttonContainer}>
                {step > 0 && (
                  <Button
                    text="Previous"
                    style={$prevButton}
                    onPress={prevStep}
                  />
                )}
                {step < 2 ? (
                  <Button
                    text="Next"
                    style={$nextButton}
                    onPress={nextStep}
                  />
                ) : (
                  <Button
                    testID="submitIncome-button"
                    text="Submit"
                    style={$tapButton}
                    preset="reversed"
                    onPress={handleSubmit}
                  />
                )}
                <Button
                  text="Close"
                  onPress={closeModal}
                  style={$closeButton}
                />
              </View>
            )}
          </View>
          <View style={$dropsContainer}>
            <View style={$drop1} />
            <View style={$drop2} />
            <View style={$drop3} />
            <View style={$drop4} />
            <View style={$drop5} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export const DemoIncome: Demo = {
  name: "New Income",
  description: "Do you have a new Income source?.",
  data: [
    <IncomeForm />
  ],
}

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $modalBackground: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
}

const $modalContainer: ViewStyle = {
  width: '90%',
  backgroundColor: 'rgba(255,255,255,0.5)', // Increased opacity
  borderRadius: 20,
  padding: spacing.lg,
  alignItems: "center",
  borderWidth: 2, // Increased border width
  borderColor: 'rgba(255,255,255,0.5)', // Increased border opacity
  backdropFilter: 'blur(20px)', // Increased blur
  boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
}

const $title: TextStyle = {
  fontWeight: '500',
  color: '#fff',
  opacity: 0.7,
  fontSize: 18,
  marginTop: 0,
  marginBottom: spacing.xxl,
  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
  margin: spacing.xxl,

}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,

}

const $inputField: TextStyle = {
  padding: spacing.md,
  borderRadius: 10, // Curved input fields
  backgroundColor: 'rgba(255,255,255,0.2)', // Slightly opaque background
  color: '#fff',
  fontSize: 16,

}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  borderRadius: 10, // Curved buttons
}

const $openButton: ViewStyle = {
  margin: spacing.lg,
  borderRadius: 10, // Curved buttons
}

const $closeButton: ViewStyle = {
  marginTop: spacing.sm,
  borderRadius: 10, // Curved buttons
}

const $progressBarContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: spacing.lg,
}

const $progressBar: ViewStyle = {
  height: 5,
  width: '30%',
  backgroundColor: 'rgba(255,255,255,0.5)', // Increased opacity
  borderRadius: 5,
}

const $progressBarActive: ViewStyle = {
  backgroundColor: 'purple', // Active step color
}

const $progressBarCompleted: ViewStyle = {
  backgroundColor: 'purple', // Completed step color
}

const $prevButton: ViewStyle = {
  marginTop: spacing.sm,
  marginRight: spacing.sm,
  borderRadius: 10, // Curved buttons
}

const $nextButton: ViewStyle = {
  marginTop: spacing.sm,
  marginLeft: spacing.sm,
  borderRadius: 10, // Curved buttons
}

const $loadingIndicator: ViewStyle = {
  marginVertical: spacing.md,
}

const $dropsContainer: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const $drop: ViewStyle = {
  backgroundColor: 'rgba(255,255,255,0.5)', // Increased opacity
  backdropFilter: 'blur(20px)', // Increased blur
  borderRadius: 10,
  borderWidth: 2, // Increased border width
  borderColor: 'rgba(255,255,255,0.5)', // Increased border opacity
  boxShadow: '10px 10px 60px -8px rgba(0,0,0,0.2)',
  position: 'absolute',
  transition: 'all 0.2s ease',
}

const $drop1: ViewStyle = {
  height: 80,
  width: 80,
  top: -20,
  left: -40,
  zIndex: -1,
}

const $drop2: ViewStyle = {
  height: 80,
  width: 80,
  bottom: -30,
  right: -10,
}

const $drop3: ViewStyle = {
  height: 100,
  width: 100,
  bottom: 120,
  right: -50,
  zIndex: -1,
}

const $drop4: ViewStyle = {
  height: 120,
  width: 120,
  top: -60,
  right: -60,
}

const $drop5: ViewStyle = {
  height: 60,
  width: 60,
  bottom: 170,
  left: 90,
  zIndex: -1,
}

const $error: TextStyle = {
  color: "red",
  marginBottom: spacing.md,
}

const $success: TextStyle = {
  color: "green",
  marginBottom: spacing.md,
}

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: spacing.sm,
}

export default IncomeForm
