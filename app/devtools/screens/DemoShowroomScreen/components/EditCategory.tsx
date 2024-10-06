import React, { FC, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { spacing, colors } from "app/theme";

interface EditCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  initialName: string;
  initialDescription: string;
}

const EditCategoryModal: FC<EditCategoryModalProps> = ({
  visible,
  onClose,
  onSave,
  initialName,
  initialDescription,
}) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(name, description);
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
          <Text style={styles.modalHeading}>Edit Category</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Category Name"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Category Description"
            multiline
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
    color: "blue",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: spacing.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditCategoryModal;
