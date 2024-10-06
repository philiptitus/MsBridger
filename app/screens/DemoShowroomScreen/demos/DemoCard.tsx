/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { AutoImage, Button, Card, Icon } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import IncomeCards from "../components/IncomeCards"
import SavingPlans from "../components/SavingPlans"
import { AppStackScreenProps } from "../../../navigators"
import { LoginScreen } from "app/screens/LoginScreen"
import { Defs, Pattern, Rect, Svg } from "react-native-svg"

interface DemoCardScreenProps extends AppStackScreenProps<"DemoCard"> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.large,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  gradient: {
    padding: spacing.medium,
    borderRadius: 10,
    marginBottom: spacing.medium,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
  },
  pattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  neonBorder: {
    borderWidth: 2,
    borderColor: '#00ffff',
    borderRadius: 10,
    padding: spacing.small,
  },
});

const CustomPattern = () => (
  <View style={styles.pattern}>
    <Svg height="100%" width="100%">
      <Defs>
        <Pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
          patternTransform="rotate(45)"
        >
          <Rect width="5" height="10" transform="translate(0,0)" fill="opacity" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#pattern)" />
    </Svg>
  </View>
);

export const DemoCard: FC<Demo> = {
  name: "Existing Incomes And Saving Plans",
  description: "Your Previously Created Income Streams And Saving Plans.",
  data: [
    <DemoUseCase name="Incomes" description="Click On An Income To Customize">
      <View style={[styles.gradient, styles.neonBorder]}>
        <CustomPattern />
        <View style={styles.gradientOverlay} />
        <IncomeCards />
      </View>
      <DemoDivider />
    </DemoUseCase>,

    <DemoUseCase name="Saving Plans" description="Click On A Savings Plan To Customize">
      <View style={[styles.gradient, styles.neonBorder]}>
        <CustomPattern />
        <View style={styles.gradientOverlay} />
        <SavingPlans />
      </View>
      <DemoDivider />
    </DemoUseCase>,
  ],
}

// @demo remove-file
