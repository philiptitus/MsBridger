import React, { useState, useEffect } from "react";
import { ScrollView, View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust the import path as needed
import { createCategory } from "../../../../server/actions/postActions"; // Adjust the import path as needed

const responses = [
  "Here is your new budget.",
  "Your new budget has been set.",
  "The new budget has been updated.",
  "Budget successfully updated.",
  "Your budget is now updated.",
  "New budget applied.",
  "Budget changes saved.",
  "Budget updated successfully.",
  "The budget has been adjusted.",
  "Budget modifications complete.",
  "Your budget has been refreshed.",
  "The budget is now updated.",
  "Budget settings applied.",
  "Your budget has been modified.",
  "Budget update successful.",
  "Budget adjusted.",
  "The new budget is in place.",
  "Your budget is now set.",
  "Budget has been altered.",
  "Budget update complete.",
  "New budget settings saved.",
  "Budget recalculated.",
  "Your budget is now updated.",
  "The budget is set.",
  "New budget configuration complete.",
  "Budget successfully modified.",
  "Your budget has been updated.",
  "Budget changes are saved.",
  "The new budget is applied.",
  "Your budget adjustments are complete."
];

const initialTips = [
  "Welcome! This AI helps you manage your budget. Start by telling me your income and expenses.",
  "Tip: For accurate results, provide specific details about your financial goals.",
  "Remember, this AI is designed to assist with budget planning. Please avoid non-financial queries.",
  "You can ask me to set a savings goal or allocate funds to different categories.",
  "For best results, provide clear and concise prompts related to budgeting.",
  "Tip: Let me know if you need help tracking your expenses or planning for a big purchase.",
  "This AI excels at budget management. Avoid asking about non-financial topics.",
  "A good prompt: 'Help me create a budget for my monthly expenses.'",
  "Tip: Provide your monthly income and expenses for personalized budget advice.",
  "Start with: 'I want to save $500 this month. How can I adjust my budget?'",
  "Tip: Be specific about your financial goals, like saving for a vacation or paying off debt.",
  "Use this AI to track your spending and stay within your budget.",
  "Avoid non-financial queries to get the best budget planning advice.",
  "Example prompt: 'Show me how to reduce my grocery spending.'",
  "Tip: Regularly update your income and expenses for accurate budgeting.",
  "Remember, this AI helps with financial planning. Keep your queries budget-focused.",
  "A good prompt: 'Help me balance my budget for the next three months.'",
  "Tip: Specify the categories you want to budget for, like groceries, rent, and entertainment.",
  "Use this AI to set realistic savings goals based on your income.",
  "Avoid non-financial questions to make the most of this budget planning tool.",
  "Example prompt: 'What can I cut from my budget to save more?'",
  "Tip: Regularly review your budget to stay on track with your financial goals.",
  "This AI is best used for financial planning. Keep your prompts budget-related.",
  "A good prompt: 'How much should I allocate for entertainment each month?'",
  "Tip: Be clear about your financial priorities, like saving for emergencies or paying off loans.",
  "Use this AI to create a sustainable budget that fits your lifestyle.",
  "Avoid non-financial queries to ensure accurate budget advice.",
  "Example prompt: 'Help me plan a budget for my annual expenses.'",
  "Tip: Update your budget regularly to reflect changes in your income and expenses.",
  "Remember, this AI is designed to help with budgeting. Keep your questions focused on finances."
];

const ChatComponent = ({ budgetId }) => {
  const [messages, setMessages] = useState<{ text: string, type: 'user' | 'response' }[]>([]);
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();
  const categoryCreate = useSelector((state: RootState) => state.categoryCreate);
  const { loading, error, success } = categoryCreate;

  useEffect(() => {
    const initialTip = initialTips[Math.floor(Math.random() * initialTips.length)];
    setMessages([{ text: initialTip, type: 'response' }]);
  }, []);

  const handleSend = () => {
    if (input.trim().length > 0) {
      const newMessages = [...messages, { text: input, type: 'user' }];
      setMessages(newMessages.slice(-5));
      setInput("");

      // Dispatch the createCategory action with the required data
      dispatch(createCategory({ budget: budgetId, description: input }));
    }
  };

  useEffect(() => {
    if (loading) {
      setMessages((prevMessages) => [...prevMessages.slice(-4), { text: "Let Me see what I can Do...", type: 'response' }]);
    } else if (error) {
      setMessages((prevMessages) => [...prevMessages.slice(-4), { text: `Sorry I am Experiencing Some Issues Try Talking to Me Later.🤕 ${error}`, type: 'response' }]);
    } else if (success) {
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prevMessages) => [...prevMessages.slice(-4), { text: response, type: 'response' }]);
    }
  }, [loading, error, success]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.type === 'user' ? styles.userMessage : styles.responseMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Let me see...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: "#DCF8C6",
  },
  responseMessage: {
    alignSelf: 'flex-start',
    backgroundColor: "#ECECEC",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ChatComponent;
