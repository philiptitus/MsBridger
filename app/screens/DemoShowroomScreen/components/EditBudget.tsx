import React, { FC, useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors, spacing } from "app/theme";
import { updateBudget } from '../../../../server/actions/postActions';
import { RootState } from '../../store';

interface EditBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  initialData: BudgetData;
  budgetId: string;
}

interface BudgetData {
  totalExpenses: string;
  startDate: string;
  endDate: string;
  description: string;
}

const EditBudgetModal: FC<EditBudgetModalProps> = ({ visible, onClose, initialData, budgetId }) => {
  const [editedData, setEditedData] = useState(initialData);
  const dispatch = useDispatch();

  const budgetUpdate = useSelector((state: RootState) => state.budgetUpdate);
  const { loading, error, success } = budgetUpdate;

  useEffect(() => {
    if (success) {
      Alert.alert("Success", "Budget updated successfully");
      onClose();
    }
    if (error) {
      Alert.alert("Error", error);
    }
  }, [success, error]);

  const handleSave = () => {
    dispatch(updateBudget(budgetId, editedData));
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
          <Text style={styles.modalTitle}>Edit Budget Description</Text>
          {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            value={editedData.description}
            onChangeText={(text) => setEditedData({ ...editedData, description: text })}
            placeholder="Description"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
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

export default EditBudgetModal;
