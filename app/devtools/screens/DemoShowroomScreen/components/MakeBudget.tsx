import React, { FC, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from 'app/theme';

interface CreateBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, incomeId: string, endDate: string, description: string) => void;
}

const CreateBudgetModal: FC<CreateBudgetModalProps> = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [incomeId, setIncomeId] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave(name, incomeId, endDate, description);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalHeading}>Create Budget</Text>
          <TextInput
            style={modalStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Budget Name"
          />
          <TextInput
            style={modalStyles.input}
            value={incomeId}
            onChangeText={setIncomeId}
            placeholder="Income ID"
            keyboardType="numeric"
          />
          <TextInput
            style={modalStyles.input}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="End Date (YYYY-MM-DD)"
          />
          <TextInput
            style={modalStyles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
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

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateBudgetModal;
