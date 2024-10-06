import React, { FC, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors, spacing } from "app/theme";

interface EditIncomeModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: IncomeData) => void;
  initialData: IncomeData;
}

interface IncomeData {
  amount: string;
  source: string;
  dateReceived: string;
  description: string;
}

const EditIncomeModal: FC<EditIncomeModalProps> = ({ visible, onClose, onSave, initialData }) => {
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
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Income</Text>
            <TextInput
              style={styles.input}
              value={editedData.source}
              onChangeText={(text) => setEditedData({ ...editedData, source: text })}
              placeholder="Source"
            />
            <TextInput
              style={styles.input}
              value={editedData.amount}
              onChangeText={(text) => setEditedData({ ...editedData, amount: text })}
              placeholder="Amount"
            />
            <TextInput
              style={styles.input}
              value={editedData.dateReceived}
              onChangeText={(text) => setEditedData({ ...editedData, dateReceived: text })}
              placeholder="Date Received"
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity here
  },
  modalBackground: {
    backgroundColor: colors.palette.white,
    borderRadius: spacing.sm,
    padding: spacing.md,
    width: "80%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: spacing.sm,
    padding: spacing.md,
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

export default EditIncomeModal;
