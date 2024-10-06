import React, { FC, useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createBudget } from '../../../../server/actions/postActions';
import { RootState } from '../../store';
import { BUDGET_CREATE_RESET } from '../../../../server/constants/postConstants';
import { colors, spacing } from 'app/theme';

interface CreateBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  income: number;
}

const CreateBudgetModal: FC<CreateBudgetModalProps> = ({ visible, onClose, income }) => {
  const [name, setName] = useState('');
  const [incomeId, setIncomeId] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const budgetCreate = useSelector((state: RootState) => state.budgetCreate);
  const { loading, error, success } = budgetCreate;

  useEffect(() => {
    if (success) {
      // onClose();
    }
  }, [success, onClose]);

  const handleSave = () => {
    const budgetData = { name, income, description };
    dispatch(createBudget(budgetData));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalBackground}>
        <View style={modalStyles.modalContainer}>
          <Text style={modalStyles.modalTitle}>Create Budget</Text>
          {loading && <ActivityIndicator size="large" color={colors.primary} style={modalStyles.loadingIndicator} />}
          {error && <Text style={modalStyles.errorText}>{error}</Text>}
          <TextInput
            style={modalStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Budget Name"
          />
          <TextInput
            style={modalStyles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
          />
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={modalStyles.button} onPress={handleSave} disabled={loading}>
              <Text style={modalStyles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modalStyles.button} onPress={onClose}>
              <Text style={modalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
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

export default CreateBudgetModal;
