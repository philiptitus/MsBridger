import React, { FC, useState } from "react";
import { View, Text, ViewStyle, TextStyle, StyleSheet, TouchableOpacity } from "react-native";
import { spacing, colors } from "app/theme";
import EditCategoryModal from "./EditCategory";

interface Category {
  name: string;
  amount: string;
  description: string;
}

interface BarChartProps {
  categories: Category[];
}

const getRandomColor = (): string => {
  const colors = [
    "#FF5733", // orange
    "#33FFB0", // green
    "#3385FF", // blue
    "#FF33F2", // pink
    "#FFD133", // yellow
    "#D133FF", // purple
    "#FF3333", // red
    "#33FF33", // light green
    "#3333FF", // dark blue
    "#FF33A1", // magenta
    "#FFA133", // light orange
    "#B833FF", // violet
    "#33FFF1", // aqua
    "#FF33C4", // hot pink
    "#A6FF33", // lime green
    "#3391FF", // sky blue
    "#FF338F", // deep pink
    "#33FFD7", // turquoise
    "#FFA533", // peach
    "#8B33FF", // indigo
    "#33FF83", // mint green
    "#FF33D4", // fuchsia
    "#33FF57", // spring green
    "#FF5733", // salmon
    "#3399FF", // light blue
    "#FF33CC", // bright pink
    "#33FFC1", // sea green
    "#FF8633", // coral
    "#6A33FF", // royal purple
    "#33FF4C", // neon green
  ];
  
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const BarChart: FC<BarChartProps> = ({ categories }) => {
  const totalAmount = categories.reduce((sum, category) => sum + parseFloat(category.amount), 0);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const openModal = (category: Category) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
  };

  const saveCategory = (name: string, description: string) => {
    if (editingCategory) {
      // Update the category in your data structure or dispatch an action to update state
      console.log(`Updating category: ${editingCategory.name}, ${name}, ${description}`);
      // Here you should update your categories state or dispatch an action to update the category
      // You can use Redux, MobX, or local state management based on your setup
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.label}>{category.name}</Text>
          <TouchableOpacity onPress={() => openModal(category)}>
            <Text style={styles.editIcon}>✎</Text>
          </TouchableOpacity>
          <View style={styles.barWrapper}>
            <View style={[styles.bar, { width: `${(parseFloat(category.amount) / totalAmount) * 100}%`, backgroundColor: getRandomColor() }]} />
            <Text style={styles.amountLabel}>{`${((parseFloat(category.amount) / totalAmount) * 100).toFixed(1)}%`}</Text>
          </View>
          <Text style={styles.amount}>${category.amount}</Text>
        </View>
      ))}
      {editingCategory && (
        <EditCategoryModal
          visible={modalVisible}
          onClose={closeModal}
          onSave={saveCategory}
          initialName={editingCategory.name}
          initialDescription={editingCategory.description}
          categoryId={editingCategory.id} // Pass the category id if needed
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: "grey",
    borderRadius: spacing.sm,
    padding: spacing.md,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    backgroundColor: "white",
    padding: spacing.sm,
    borderRadius: spacing.sm,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    width: 100,
    fontWeight: "bold",
    color: "blue",
    fontSize: 14,
  },
  editIcon: {
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.palette.primary,
  },
  barWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 5,
  },
  amountLabel: {
    marginLeft: spacing.sm,
    color: "blue",
    fontWeight: "bold",
    fontSize: 12,
  },
  amount: {
    marginLeft: spacing.sm,
    fontWeight: "bold",
    color: "blue",
    fontSize: 14,
  },
});

export default BarChart;
