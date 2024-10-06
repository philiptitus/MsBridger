import React, { FC, useEffect, useState } from "react";
import { ScrollView, TextStyle, ViewStyle, View, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import { observer } from "mobx-react-lite";
import { useDispatch, useSelector } from "react-redux";
import { Screen, Text } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootState } from "../store";
import { getUserSavingsDetails } from '../../server/actions/postActions';
import { useRoute } from "@react-navigation/native";
import EditSavingsModal from "./DemoShowroomScreen/components/EditSavings";
import { formatDate } from "app/utils/formatDate";

interface SavingsDetailScreenProps extends AppStackScreenProps<"SavingsDetail"> {}

export const SavingsDetail: FC<SavingsDetailScreenProps> = observer(function SavingsDetail(props) {
  const { navigation } = props;
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();

  const savingsUpdate = useSelector((state: RootState) => state.savingsUpdate);
  const { success } = savingsUpdate;

  const userSavingsDetail = useSelector((state: RootState) => state.userSavingsDetail);
  const { loading, error, savings } = userSavingsDetail;

  useEffect(() => {
    dispatch(getUserSavingsDetails(id));
  }, [dispatch, id, success]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goalName, setGoalName] = useState(savings?.goal_name || "");
  const [description, setDescription] = useState(savings?.description || "");
  const [targetAmount, setTargetAmount] = useState(savings?.target_amount || "");

  const handleSave = (newGoalName: string, newDescription: string, newTargetAmount: string) => {
    setGoalName(newGoalName);
    setDescription(newDescription);
    setTargetAmount(newTargetAmount);
  };

  return (
    <Screen style={$container} preset="scroll">
      <ScrollView>
        {loading ? (
          <Text style={$loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={$errorText}>{error}</Text>
        ) : (
          <View style={$section}>
            <View style={$sectionHeader}>
              <Text style={$heading}>{goalName}</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(true)} style={$editIcon}>
                <Icon name="pencil" size={20} color={colors.palette.primary} />
              </TouchableOpacity>
            </View>
            <View style={$content}>
              <Text style={$label}>Goal Name:</Text>
              <Text style={$value}>{savings?.goal_name}</Text>
              <Text style={$label}>Target Amount:</Text>
              <Text style={$value}>{savings?.target_amount}</Text>
              <Text style={$label}>Amount Saved:</Text>
              <Text style={$value}>{savings?.amount_saved}</Text>
              <Text style={$label}>Description:</Text>
              <Text style={$value}>{savings?.description}</Text>
              <Text style={$label}>Created At:</Text>
              <Text style={$value}>{savings?.created_at}</Text>
              <Text style={$label}>Updated At:</Text>
              <Text style={$value}>{savings?.updated_at}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <EditSavingsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialGoalName={savings.goal_name}
        initialDescription={savings.description}
        initialTargetAmount={savings.target_amount}
        savingsId={savings.id}
      />
    </Screen>
  );
});

const $container: ViewStyle = {
  flex: 1,
  padding: spacing.lg,
  backgroundColor: colors.background,
};

const $title: TextStyle = {
  marginBottom: spacing.md,
  color: colors.palette.primary,
  textAlign: "center",
  fontSize: 24,
  fontWeight: "bold",
};

const $label: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary,
  fontSize: 16,
  marginBottom: spacing.sm,
};

const $value: TextStyle = {
  fontSize: 16,
  color: colors.text,
  marginBottom: spacing.md,
};

const $section: ViewStyle = {
  marginBottom: spacing.md,
  padding: spacing.md,
  backgroundColor: colors.palette.white,
  borderRadius: spacing.sm,
  shadowColor: colors.palette.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};

const $sectionHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const $heading: TextStyle = {
  fontWeight: "bold",
  marginBottom: spacing.sm,
  fontSize: 20,
  color: colors.palette.primary,
};

const $editIcon: ViewStyle = {
  marginLeft: spacing.sm,
};

const $loadingText: TextStyle = {
  textAlign: "center",
  color: colors.palette.primary,
  marginTop: spacing.xl,
  fontSize: 18,
};

const $errorText: TextStyle = {
  textAlign: "center",
  color: colors.error,
  marginTop: spacing.xl,
  fontSize: 18,
};

const $content: ViewStyle = {
  backgroundColor: colors.backgroundLight,
  borderRadius: spacing.sm,
  padding: spacing.md,
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default SavingsDetail;
