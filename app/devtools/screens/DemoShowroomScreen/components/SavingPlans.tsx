import React, { FC, useState } from "react"
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Card } from "../../../components"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import { AppStackScreenProps, navigate } from "app/navigators"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/FontAwesome"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const SavingPlans: FC<LoginScreenProps> = observer(function SavingPlans(_props: any) {
  const { navigation } = _props
  const [searchQuery, setSearchQuery] = useState("")

  function goToRegister() {
    navigate('Saving'); // Navigate to 'Saving' screen
  }

  function handleDelete() {
    // Implement your delete logic here
    console.log("Delete action triggered")
  }

  function handleSearch(text: string) {
    setSearchQuery(text)
    // Implement your search logic here
    console.log("Search query:", text)
  }

  return (
    <DemoUseCase name="Saving Plans" description="Click On A Savings Plan To Customize">
      <TextInput
        style={styles.searchInput}
        placeholder="Search Savings Plans"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.cardContainer}>
        <Card
          heading="Top (default)"
          content="All content is automatically aligned to the top."
          footer="Even the footer"
          style={{ minHeight: 160 }}
          onPress={goToRegister}
        />
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <DemoDivider />
      <View style={styles.cardContainer}>
        <Card
          heading="Center"
          verticalAlignment="center"
          preset="reversed"
          content="Content is centered relative to the card's height."
          footer="Me too!"
          style={{ minHeight: 160 }}
        />
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <DemoDivider />
      <View style={styles.cardContainer}>
        <Card
          heading="Space Between"
          verticalAlignment="space-between"
          content="All content is spaced out evenly."
          footer="I am where I want to be."
          style={{ minHeight: 160 }}
        />
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <DemoDivider />
      <View style={styles.cardContainer}>
        <Card
          preset="reversed"
          heading="Force Footer Bottom"
          verticalAlignment="force-footer-bottom"
          content="This pushes the footer where it belongs."
          footer="I'm so lonely down here."
          style={{ minHeight: 160 }}
        />
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </DemoUseCase>
  )
})

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

export default SavingPlans
