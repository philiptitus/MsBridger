import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator, TextStyle, ViewStyle } from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Text } from "../components";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import ChatComponent from "./DemoShowroomScreen/components/ChatComponent";
import BarChart from "./DemoShowroomScreen/components/PieChartComponent";
import EditBudgetModal from "./DemoShowroomScreen/components/EditBudget";
import Icon from "react-native-vector-icons/FontAwesome";
import EditIncomeModal from "./DemoShowroomScreen/components/EditIncome";
import CreateBudgetModal from "./DemoShowroomScreen/components/MakeBudget";
import { useDispatch, useSelector } from 'react-redux';
import { getIncomeDetails, deleteBudget } from '../../server/actions/postActions'; // Adjust the path according to your project structure
import { useRoute } from "@react-navigation/native";
import DeleteConfirmationModal from "./DemoShowroomScreen/components/DeleteConfirmationModal";


interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const IncomeDetailScreen: FC<LoginScreenProps> = observer(function IncomeDetailScreen({ }) {
  const route = useRoute();
  const { id } = route.params;
  console.log(id);

  const [editIncomeModalVisible, setEditIncomeModalVisible] = useState(false);
  const [editBudgetModalVisible, setEditBudgetModalVisible] = useState(false);
  const [createBudgetModalVisible, setCreateBudgetModalVisible] = useState(false);
  const [deleteBudgetModalVisible, setDeleteBudgetModalVisible] = useState(false);

  const dispatch = useDispatch();
  const incomeDetail = useSelector(state => state.incomeDetail);
  const { loading, error, income ,  budget, categories} = incomeDetail;

  const incomeUpdate = useSelector((state: RootState) => state.incomeUpdate);
  const { success } = incomeUpdate;

  const budgetUpdate = useSelector((state: RootState) => state.budgetUpdate);
  const { success: successBudget } = budgetUpdate;

  const budgetDelete = useSelector((state: RootState) => state.budgetDelete);
  const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = budgetDelete;

  const categoryUpdate = useSelector((state: RootState) => state.categoryUpdate);
  const { success: successCategory } = categoryUpdate;

  const categoryCreate = useSelector((state: RootState) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;

  const budgetCreate = useSelector((state: RootState) => state.budgetCreate);
  const { success: successBudgetCreate } = budgetCreate;

  useEffect(() => {
    dispatch(getIncomeDetails(id));
  }, [dispatch, id, success, successBudget, successCategory, successCreate, deleteSuccess, successBudgetCreate, deleteError]);

  const handleSaveIncome = (data: any) => {
    // Implement logic to save editedIncomeData
  };

  const handleSaveBudget = (data: any) => {
    // Implement logic to save editedBudgetData
  };

  const handleCreateBudget = (name: string, incomeId: string, endDate: string, description: string) => {
    // Implement logic to create new budget
  };

  const handleDeleteBudget = () => {
    dispatch(deleteBudget(budget.id));
    setDeleteBudgetModalVisible(false);
  };

  if (loading || deleteLoading) {
    return (
      <View style={$loadingContainer}>
        <ActivityIndicator size="large" color={colors.palette.primary} />
      </View>
    );
  }

  // if (error || deleteError) {
  //   return (
  //     <View style={$loadingContainer}>
  //       <Text style={$errorText}>{error || deleteError}</Text>
  //     </View>
  //   );
  // }

  if (!income) {
    return (
      <View style={$loadingContainer}>
        <Text style={$errorText}>Income details not found.</Text>
      </View>
    );
  }

  const { income: incomeData, budget: budgetData } = income;

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" style={$title}>Income Detail</Text>
      {income && (
        <View style={$section}>
          <View style={$sectionHeader}>
            <Text style={$heading}>Income</Text>
            <TouchableOpacity onPress={() => setEditIncomeModalVisible(true)}>
              <Icon name="pencil" size={20} color="blue" style={$editIcon} />
            </TouchableOpacity>

{!budget &&            <TouchableOpacity onPress={() => setCreateBudgetModalVisible(true)}>
              <Icon name="plus" size={20} color="green" style={$editIcon} />
            </TouchableOpacity>}
          </View>
          <Text><Text style={$label}>Source: </Text>{income.source}</Text>
          <Text><Text style={$label}>Amount: </Text>${income?.amount}</Text>
          <Text><Text style={$label}>Date Received: </Text>{income.date_received}</Text>
          <Text><Text style={$label}>Description: </Text>{income?.description}</Text>
        </View>
      )}
      {budget && (
        <View style={$section}>
          <View style={$sectionHeader}>
            <Text style={$heading}>Budget</Text>
            <TouchableOpacity onPress={() => setEditBudgetModalVisible(true)}>
              <Icon name="pencil" size={20} color="blue" style={$editIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteBudgetModalVisible(true)}>
              <Icon name="trash" size={20} color="red" style={$editIcon} />
            </TouchableOpacity>
          </View>

          <Text><Text style={$label}>Name: </Text>{budget.name}</Text>

          <Text><Text style={$label}>Total Expenses: </Text>${budget.total_expenses}</Text>
          <Text><Text style={$label}>Start Date: </Text>{budget.start_date}</Text>
          <Text><Text style={$label}>End Date: </Text>{budget.end_date}</Text>
          <Text><Text style={$label}>Description: </Text>{budget.description}</Text>
        </View>
      )}

      <EditIncomeModal
        visible={editIncomeModalVisible}
        onClose={() => setEditIncomeModalVisible(false)}
        onSave={handleSaveIncome}
        initialData={income}
        incomeId={income?.id}
      />
      {budget && 

      <EditBudgetModal
        visible={editBudgetModalVisible}
        onClose={() => setEditBudgetModalVisible(false)}
        onSave={handleSaveBudget}
        initialData={budget}
        budgetId={budget?.id}
      />
}

      <CreateBudgetModal
      
        visible={createBudgetModalVisible}
        onClose={() => setCreateBudgetModalVisible(false)}
income={income?.id}
/>

<DeleteConfirmationModal
        visible={deleteBudgetModalVisible}
        onClose={() => setDeleteBudgetModalVisible(false)}
        onConfirm={handleDeleteBudget}
      />

{
  !budget &&
  <Text><Text style={$label}> </Text>Hi Please Make A Budget So That I Can Advise Further Just Click The Plus/Add Icon over there</Text>
}
{budget && 
      <BarChart categories={categories} /> 

    }
      {budget && 
      <ChatComponent budgetId={budget?.id}/>}
    </Screen>
  );
});

const $loadingContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const $errorText: TextStyle = {
  color: colors.palette.red,
  fontSize: 18,
};

const $container: ViewStyle = {
  padding: spacing.lg,
};

const $title: TextStyle = {
  marginBottom: spacing.md,
  color: colors.palette.primary,
  textAlign: "center",
};

const $label: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.primary,
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
  fontSize: 16,
  color: colors.palette.primary,
};

const $editIcon: ViewStyle = {
  marginLeft: spacing.sm,
};

export default IncomeDetailScreen;
