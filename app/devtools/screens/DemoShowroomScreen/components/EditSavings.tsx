import React, { FC, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface EditSavingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (goalName: string, description: string, targetAmount: string) => void;
  initialGoalName: string;
  initialDescription: string;
  initialTargetAmount: string;
}

const EditSavingsModal: FC<EditSavingsModalProps> = ({
  visible,
  onClose,
  onSave,
  initialGoalName,
  initialDescription,
  initialTargetAmount,
}) => {
  const [goalName, setGoalName] = useState(initialGoalName);
  const [description, setDescription] = useState(initialDescription);
  const [targetAmount, setTargetAmount] = useState(initialTargetAmount);

  const handleSave = () => {
    onSave(goalName, description, targetAmount);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
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

export default EditSavingsModal;
