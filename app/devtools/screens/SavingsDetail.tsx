import React, { FC, useState } from "react";
import { ScrollView, TextStyle, ViewStyle, View, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Text } from "../components";
import { useStores } from "../models";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const EditSavingsModal: FC<{
  visible: boolean;
  onClose: () => void;
  onSave: (goalName: string, description: string, targetAmount: string) => void;
  initialGoalName: string;
  initialDescription: string;
  initialTargetAmount: string;
}> = ({ visible, onClose, onSave, initialGoalName, initialDescription, initialTargetAmount }) => {
  const [goalName, setGoalName] = useState(initialGoalName);
  const [description, setDescription] = useState(initialDescription);
  const [targetAmount, setTargetAmount] = useState(initialTargetAmount);

  const handleSave = () => {
    onSave(goalName, description, targetAmount);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalHeading}>Edit Savings Goal</Text>
          <TextInput
            style={modalStyles.input}
            value={goalName}
            onChangeText={setGoalName}
            placeholder="Goal Name"
          />
          <TextInput
            style={modalStyles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
          />
          <TextInput
            style={modalStyles.input}
            value={targetAmount}
            onChangeText={setTargetAmount}
            placeholder="Target Amount"
            keyboardType="numeric"
          />
          <TouchableOpacity style={modalStyles.button} onPress={handleSave}>
            <Text style={modalStyles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.button} onPress={onClose}>
            <Text style={modalStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const SavingsDetail: FC<LoginScreenProps> = observer(function SavingsDetail(_props) {
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores();

  const error = false;

  const data = {
    goal_name: "Kennantra",
    target_amount: "6000000.00",
    amount_saved: "0.00",
    description: "**Education Savings:** A seed fund for your future, nurturing the growth of knowledge and illuminating the path towards lifelong learning. Every contribution is an investment in your brightest potential, shaping tomorrow's aspirations and empowering you to scale the heights of intellectual achievement.",
    created_at: "2024-06-30T13:29:49.681151Z",
    updated_at: "2024-06-30T14:21:45.717166Z",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goalName, setGoalName] = useState(data.goal_name);
  const [description, setDescription] = useState(data.description);
  const [targetAmount, setTargetAmount] = useState(data.target_amount);

  const handleSave = (newGoalName: string, newDescription: string, newTargetAmount: string) => {
    setGoalName(newGoalName);
    setDescription(newDescription);
    setTargetAmount(newTargetAmount);
  };

  return (
    <Screen style={$container} preset="scroll">
      <ScrollView>
        <View style={$section}>
          <View style={$sectionHeader}>
            <Text style={$heading}>{goalName}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={$editIcon}>
              <Icon name="pencil" size={20} color={colors.palette.primary} />
            </TouchableOpacity>
          </View>
          <Text style={$label}>Target Amount: {targetAmount}</Text>
          <Text style={$label}>Amount Saved: {data.amount_saved}</Text>
          <Text style={$label}>Description:</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={$label}>Created At: {data.created_at}</Text>
          <Text style={$label}>Updated At: {data.updated_at}</Text>
        </View>
      </ScrollView>

      <EditSavingsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialGoalName={goalName}
        initialDescription={description}
        initialTargetAmount={targetAmount}
      />
    </Screen>
  );
});

const $container: ViewStyle = {
  padding: spacing.lg,
};

const $title: TextStyle = {
  marginBottom: spacing.md,
  color: colors.palette.primary,
  textAlign: "center",
};

const $label: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary,
};

const $section: ViewStyle = {
  marginBottom: spacing.md,
  padding: spacing.md,
  backgroundColor: colors.palette.white,
  borderRadius: spacing.sm,
  shadowColor: colors.palette.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

const $sectionHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const $heading: TextStyle = {
  fontWeight: "bold",
  marginBottom: spacing.sm,
  fontSize: 16,
  color: colors.palette.primary,
};

const $editIcon: ViewStyle = {
  marginLeft: spacing.sm,
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default SavingsDetail;
