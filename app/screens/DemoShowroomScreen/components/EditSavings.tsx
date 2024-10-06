import React, { FC, useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateSavings } from '../../../../server/actions/postActions';
import { RootState } from '../../store';

interface EditSavingsModalProps {
  visible: boolean;
  onClose: () => void;
  savingsId: string;
  initialGoalName: string;
  initialDescription: string;
  initialTargetAmount: string;
}

const EditSavingsModal: FC<EditSavingsModalProps> = ({
  visible,
  onClose,
  savingsId,
  initialGoalName,
  initialDescription,
  initialTargetAmount,
}) => {
  const [goal_name, setgoal_name] = useState(initialGoalName);
  const [description, setDescription] = useState(initialDescription);
  const [target_amount, settsrget_amount] = useState(initialTargetAmount);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();

  const savingsUpdate = useSelector((state: RootState) => state.savingsUpdate);
  const { loading, error, success } = savingsUpdate;

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  }, [success]);

  const handleSave = () => {
    const savingsData = { goal_name, description, target_amount };
    dispatch(updateSavings(savingsId, savingsData));
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
          <Text style={modalStyles.modalHeading}>Edit Savings Goalu</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#007BFF" />
          ) : (
            <>
              {error && <Text style={modalStyles.errorText}>{error}</Text>}
              {showSuccessMessage && <Text style={modalStyles.successText}>Savings goal updated successfully!</Text>}
              <TextInput
                style={modalStyles.input}
                value={goal_name}
                onChangeText={setgoal_name}
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
                value={target_amount}
                onChangeText={settsrget_amount}
                placeholder="Target Amount"
                keyboardType="numeric"
              />
              <TouchableOpacity style={modalStyles.button} onPress={handleSave}>
                <Text style={modalStyles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.button} onPress={onClose}>
                <Text style={modalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default EditSavingsModal;
