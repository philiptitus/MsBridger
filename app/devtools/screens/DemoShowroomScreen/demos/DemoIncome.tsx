/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React, { FC, useState, useRef } from "react"
import { Modal, TextInput, TextStyle, View, ViewStyle, ScrollView, StyleSheet } from "react-native"
import { Button, Text, TextField } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"

const IncomeForm: FC = () => {
  const [amount, setAmount] = useState("")
  const [source, setSource] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const error = isSubmitted && (!amount || !source || !description) ? "All fields are required." : ""

  function handleSubmit() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (!amount || !source || !description) return

    // Handle form submission (e.g., send data to backend)
    console.log({ amount, source, description })

    // Reset form fields
    setIsSubmitted(false)
    setAmount("")
    setSource("")
    setDescription("")
    setIsModalVisible(false) // Close modal after submission
  }

  function openModal() {
    setIsModalVisible(true)
  }

  function closeModal() {
    setIsModalVisible(false)
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
            <ScrollView contentContainerStyle={$scrollViewContent}>
              <Text preset="heading" text="Add Income Source" style={$title} />
              <Text text="Enter income details below" style={$tagline} />
              {attemptsCount > 2 && <Text text="Please fill in all fields" size="sm" weight="light" style={$hint} />}
    
              <TextField
                value={amount}
                onChangeText={setAmount}
                containerStyle={$textField}
                label="Amount"
                placeholder="Enter amount"
                helper={error}
                status={error ? "error" : undefined}
                keyboardType="numeric"
              />
    
              <TextField
                value={source}
                onChangeText={setSource}
                containerStyle={$textField}
                label="Source"
                placeholder="Enter source"
                helper={error}
                status={error ? "error" : undefined}
              />
    
              <TextField
                value={description}
                onChangeText={setDescription}
                containerStyle={$textField}
                label="Description"
                placeholder="Enter description"
                helper={error}
                status={error ? "error" : undefined}
              />
    
              <Button
                testID="submitIncome-button"
                text="Submit"
                style={$tapButton}
                preset="reversed"
                onPress={handleSubmit}
              />
              <Button
                text="Close"
                onPress={closeModal}
                style={$closeButton}
              />
            </ScrollView>
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

const $openButton: ViewStyle = {
  margin: spacing.lg,
}

const $closeButton: ViewStyle = {
  marginTop: spacing.sm,
}

const $modalBackground: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}

const $modalContainer: ViewStyle = {
  width: '90%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Semi-transparent white for glass effect
  borderRadius: 10,
  padding: spacing.lg,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 8,
  backdropFilter: 'blur(10px)', // Apply blur for glass effect
}

const $scrollViewContent: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
}

export default IncomeForm
