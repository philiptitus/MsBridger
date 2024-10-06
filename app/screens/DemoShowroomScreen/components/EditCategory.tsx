import React, { FC, useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from '../../../../server/actions/postActions';
import { RootState } from '../../store';
import { spacing, colors } from "app/theme";

interface EditCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  initialName: string;
  initialDescription: string;
  categoryId: string;
}

const EditCategoryModal: FC<EditCategoryModalProps> = ({
  visible,
  onClose,
  initialName,
  initialDescription,
  categoryId,
}) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(""); // Local error state
  const dispatch = useDispatch();

  const categoryUpdate = useSelector((state: RootState) => state.categoryUpdate);
  const { error, success } = categoryUpdate;

  useEffect(() => {
    if (success) {
      setLocalLoading(false);
      Alert.alert("Success", "Category updated successfully");
      onClose();
    }
    if (error) {
      setLocalLoading(false);
      setLocalError(error);
      Alert.alert("Error", error);
    }
  }, [success, error]);

  useEffect(() => {
    if (visible) {
      setLocalError(""); // Reset local error state when modal is opened
      setLocalLoading(false); // Reset loading state when modal is opened
    }
  }, [visible]);

  const handleSave = () => {
    setLocalLoading(true);
    dispatch(updateCategory(categoryId, { name, description }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Category</Text>
          {localLoading && <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />}
          {localError && <Text style={styles.errorText}>{localError}</Text>}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={localLoading}>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContainer: {
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
  },
  modalTitle: {
    fontWeight: '500',
    color: '#fff',
    opacity: 0.7,
    fontSize: 18,
    marginTop: 0,
    marginBottom: spacing.xxl,
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  input: {
    padding: spacing.md,
    borderRadius: 10, // Curved input fields
    backgroundColor: 'rgba(255,255,255,0.2)', // Slightly opaque background
    color: '#fff',
    fontSize: 16,
    marginBottom: spacing.lg,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.sm,
  },
  button: {
    marginTop: spacing.sm,
    borderRadius: 10, // Curved buttons
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginVertical: spacing.md,
  },
});

export default EditCategoryModal;
