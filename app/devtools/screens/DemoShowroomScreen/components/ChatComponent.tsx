import React, { useState } from "react";
import { ScrollView, View, TextInput, Button, Text, StyleSheet } from "react-native";

const responses = [
  "I'm working on it.",
  "I'll get right to it.",
  "On it!",
  "I'm handling it.",
  "Working on that now.",
  "I'll take care of it.",
  "I'll look into it.",
  "Starting on that now.",
  "I'm on it.",
  "I'll get that done.",
  "I'm getting to it.",
  "I'll address that.",
  "I'll handle it.",
  "I'll take care of that.",
  "I'm starting on it.",
  "I'll manage it.",
  "I'll see to it.",
  "I'm dealing with it.",
  "I'm tackling it.",
  "I'll fix that.",
  "I'm sorting it out.",
  "I'll get on that.",
  "I'm taking care of it.",
  "I'll resolve it.",
  "I'm getting on it.",
  "I'll look after that.",
  "I'll work on it.",
  "I'm addressing it.",
  "I'll check on that.",
  "I'm investigating it.",
  "I'll give it attention.",
  "I'll get right on that.",
  "I'm handling that.",
  "I'll start on it now.",
  "I'll focus on that.",
  "I'm sorting it.",
  "I'll make that a priority.",
  "I'm attending to it.",
  "I'll get to that shortly.",
  "I'll attend to that."
];

const ChatComponent = () => {
  const [messages, setMessages] = useState<{ text: string, type: 'user' | 'response' }[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim().length > 0) {
      const newMessages = [...messages, { text: input, type: 'user' }];
      setMessages(newMessages.slice(-5));
      setInput("");
      setTimeout(() => {
        const response = responses[Math.floor(Math.random() * responses.length)];
        setMessages((prevMessages) => [...prevMessages.slice(-4), { text: response, type: 'response' }]);
      }, 500);
    }
  };

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
});

export default ChatComponent;
