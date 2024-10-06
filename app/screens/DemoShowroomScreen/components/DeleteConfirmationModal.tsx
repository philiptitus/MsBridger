import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing } from "app/theme";

const DeleteConfirmationModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Are you sure you want to delete this budget?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Delete</Text>
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
    textAlign: 'center',
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
});

export default DeleteConfirmationModal;
