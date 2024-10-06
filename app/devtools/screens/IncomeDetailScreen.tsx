import React, { FC, useState } from "react";
import { ScrollView, TextStyle, ViewStyle, View, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { Screen, Text } from "../components";
import { useStores } from "../models";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";
import ChatComponent from "./DemoShowroomScreen/components/ChatComponent";
import BarChart from "./DemoShowroomScreen/components/PieChartComponent";
import EditBudgetModal from "./DemoShowroomScreen/components/EditBudget";
import Icon from "react-native-vector-icons/FontAwesome"; // Example, adjust according to your icon library
import EditIncomeModal from "./DemoShowroomScreen/components/EditIncome";
import CreateBudgetModal from "./DemoShowroomScreen/components/MakeBudget";


interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const IncomeDetailScreen: FC<LoginScreenProps> = observer(function IncomeDetailScreen(_props) {
  const [editIncomeModalVisible, setEditIncomeModalVisible] = useState(false);
  const [editBudgetModalVisible, setEditBudgetModalVisible] = useState(false);
  const [createBudgetModalVisible, setCreateBudgetModalVisible] = useState(false);

  const [editedIncomeData, setEditedIncomeData] = useState({
    amount: "1500.00",
    source: "GAO WORK",
    dateReceived: "2024-06-28",
    description: "Payment for freelance Full-stack development project."
  });

  const [editedBudgetData, setEditedBudgetData] = useState({
    totalExpenses: "1500.00",
    startDate: "2024-06-28",
    endDate: "2024-07-31",
    description: "Budget for the month of July"
  });

  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores();

  const error = false;

  const incomeData = {
    amount: "1500.00",
    source: "GAO WORK",
    dateReceived: "2024-06-28",
    description: "Payment for freelance Full-stack development project."
  };

  const budgetData = {
    totalExpenses: "1500.00",
    startDate: "2024-06-28",
    endDate: "2024-07-31",
    description: "Budget for the month of July"
  };

  const categories = [
    {
      name: "Levy",
      description: "Cozy Abode Expenses: Rent, mortgage, property taxes, etc.",
      amount: "550.00",
      color: colors.palette.blue
    },
    {
      name: "Utilities",
      description: "Essential services: water, electricity, etc.",
      amount: "325.00",
      color: colors.palette.green
    },
    {
      name: "Healthcare",
      description: "Medical expenses: doctor's visits, medications, etc.",
      amount: "50.00",
      color: colors.palette.orange
    },
    {
      name: "Extra",
      description: "Uncharted Expenses: unpredictable and occasional expenses.",
      amount: "275.00",
      color: colors.palette.purple
    },
    {
      name: "Lamborghini Savings",
      description: "Car Savings: for a down payment, upgrades, or repairs.",
      amount: "300.00",
      color: colors.palette.red
    }
  ];

  // Function to handle saving edited income data
  const handleSaveIncome = (data: any) => {
    // Implement logic to save editedIncomeData
    setEditedIncomeData(data);
  };

  // Function to handle saving edited budget data
  const handleSaveBudget = (data: any) => {
    // Implement logic to save editedBudgetData
    setEditedBudgetData(data);
  };

  // Function to handle saving new budget data
  const handleCreateBudget = (name: string, incomeId: string, endDate: string, description: string) => {
    // Implement logic to create new budget
    const newBudgetData = { name, incomeId, endDate, description };
    console.log("New Budget Data: ", newBudgetData);
  };

  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <Text preset="heading" style={$title}>Income Detail</Text>
      <View style={$section}>
        <View style={$sectionHeader}>
          <Text style={$heading}>Income</Text>
          <TouchableOpacity onPress={() => setEditIncomeModalVisible(true)}>
            <Icon name="pencil" size={20} color="blue" style={$editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCreateBudgetModalVisible(true)}>
            <Icon name="plus" size={20} color="green" style={$editIcon} />
          </TouchableOpacity>
        </View>
        <Text><Text style={$label}>Source: </Text>{incomeData.source}</Text>
        <Text><Text style={$label}>Amount: </Text>${incomeData.amount}</Text>
        <Text><Text style={$label}>Date Received: </Text>{incomeData.dateReceived}</Text>
        <Text><Text style={$label}>Description: </Text>{incomeData.description}</Text>
      </View>
      <View style={$section}>
        <View style={$sectionHeader}>
          <Text style={$heading}>Budget</Text>
          <TouchableOpacity onPress={() => setEditBudgetModalVisible(true)}>
            <Icon name="pencil" size={20} color="blue" style={$editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditBudgetModalVisible(true)}>
            <Icon name="trash" size={20} color="red" style={$editIcon} />
          </TouchableOpacity>

        </View>
        <Text><Text style={$label}>Total Expenses: </Text>${budgetData.totalExpenses}</Text>
        <Text><Text style={$label}>Start Date: </Text>{budgetData.startDate}</Text>
        <Text><Text style={$label}>End Date: </Text>{budgetData.endDate}</Text>
        <Text><Text style={$label}>Description: </Text>{budgetData.description}</Text>
      </View>

      {/* Income Edit Modal */}
      <EditIncomeModal
        visible={editIncomeModalVisible}
        onClose={() => setEditIncomeModalVisible(false)}
        onSave={handleSaveIncome}
        initialData={incomeData}
      />

      {/* Budget Edit Modal */}
      <EditBudgetModal
        visible={editBudgetModalVisible}
        onClose={() => setEditBudgetModalVisible(false)}
        onSave={handleSaveBudget}
        initialData={budgetData}
      />

      {/* Budget Create Modal */}
      <CreateBudgetModal
        visible={createBudgetModalVisible}
        onClose={() => setCreateBudgetModalVisible(false)}
        onSave={handleCreateBudget}
      />

      <BarChart categories={categories} />
      <ChatComponent />
    </Screen>
  );
});

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
