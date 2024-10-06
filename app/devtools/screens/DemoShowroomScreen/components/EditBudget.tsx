import React, { FC, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors, spacing } from "app/theme";

interface EditBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: BudgetData) => void;
  initialData: BudgetData;
}

interface BudgetData {
  totalExpenses: string;
  startDate: string;
  endDate: string;
  description: string;
}

const EditBudgetModal: FC<EditBudgetModalProps> = ({ visible, onClose, onSave, initialData }) => {
  const [editedData, setEditedData] = useState(initialData);

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>Edit Budget</Text>
          <TextInput
            style={styles.input}
            value={editedData.totalExpenses}
            onChangeText={(text) => setEditedData({ ...editedData, totalExpenses: text })}
            placeholder="Total Expenses"
          />
          <TextInput
            style={styles.input}
            value={editedData.startDate}
            onChangeText={(text) => setEditedData({ ...editedData, startDate: text })}
            placeholder="Start Date"
          />
          <TextInput
            style={styles.input}
            value={editedData.endDate}
            onChangeText={(text) => setEditedData({ ...editedData, endDate: text })}
            placeholder="End Date"
          />
          <TextInput
            style={styles.input}
            value={editedData.description}
            onChangeText={(text) => setEditedData({ ...editedData, description: text })}
            placeholder="Description"
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: spacing.sm,
    padding: spacing.md,
    width: "80%",
    maxWidth: 400,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: spacing.md,
    color: colors.palette.primary,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.palette.lightGrey,
    borderRadius: spacing.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.palette.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.palette.white,
    fontWeight: "bold",
  },
});

export default EditBudgetModal;
