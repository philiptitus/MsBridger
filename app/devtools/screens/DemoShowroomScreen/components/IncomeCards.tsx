import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Card } from "../../../components"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import { navigate } from "app/navigators"
import Icon from "react-native-vector-icons/FontAwesome"

const IncomeCards = () => {
  const [searchQuery, setSearchQuery] = useState("")

  function goToRegister() {
    navigate('Income') // Navigate to 'Income' screen
  }

  function handleDelete() {
    // Implement your delete logic here
    console.log("Delete action triggered")
  }

  function handleSearch(text) {
    setSearchQuery(text)
    // Implement your search logic here
    console.log("Search query:", text)
  }

  return (
    <DemoUseCase name="Incomes" description="Click On An Income To Customize">
      <TextInput
        style={styles.searchInput}
        placeholder="Search Incomes"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.cardContainer}>
        <Card
          heading="Default Preset (default)"
          content="Incididunt magna ut aliquip consectetur mollit dolor."
          footer="Consectetur nulla non aliquip velit."
        />
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <DemoDivider />
      <View style={styles.cardContainer}>
        <Card
          onPress={goToRegister}
          heading="Reversed Preset"
          content="Reprehenderit occaecat proident amet id laboris."
          footer="Consectetur tempor ea non labore anim."
          preset="reversed"
        />
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </DemoUseCase>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  deleteIcon: {
    paddingHorizontal: 10,
  },
})

export default IncomeCards
