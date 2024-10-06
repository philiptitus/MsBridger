/* eslint-disable react/jsx-key */
import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Icon, iconRegistry, IconTypes, Text } from "../../../components"
import { colors, spacing, typography } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { Button } from "../../../components"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import { useNavigation } from "@react-navigation/native"
import { NewIncomeScreen } from "app/screens/NewIncomeScreen"


const $iconStyle: ImageStyle = { width: 30, height: 30 }
const $customButtonStyle: ViewStyle = { backgroundColor: colors.error, height: 100 }
const $customButtonPressedStyle: ViewStyle = { backgroundColor: colors.error }
const $customButtonTextStyle: TextStyle = {
  color: colors.error,
  fontFamily: typography.primary.bold,
  textDecorationLine: "underline",
  textDecorationColor: colors.error,
}
const $customButtonPressedTextStyle: TextStyle = { color: colors.palette.neutral100 }
const $customButtonRightAccessoryStyle: ViewStyle = {
  width: "53%",
  height: "200%",
  backgroundColor: colors.error,
  position: "absolute",
  top: 0,
  right: 0,
}
const $customButtonPressedRightAccessoryStyle: ImageStyle = { tintColor: colors.palette.neutral100 }


const $demoIconContainer: ViewStyle = {
  padding: spacing.xs,
}

const $iconTile: ViewStyle = {
  width: "33.333%",
  alignItems: "center",
  paddingVertical: spacing.xs,
}

const $iconTileLabel: TextStyle = {
  marginTop: spacing.xxs,
  color: colors.textDim,
}

const $customIconContainer: ViewStyle = {
  padding: spacing.md,
  backgroundColor: colors.palette.angry500,
}

const $customIcon: ImageStyle = {
  tintColor: colors.palette.neutral100,
}


export const DemoIcon: Demo = {
  
  name: "Welcome",
  description:
    "Create A new Income Source And Describe How You Want To Budget For It, I will Handle The Rest For You.",
  data: [
    <DemoUseCase name="" description="">





      <DemoDivider />

      <Button
            onPress={() => {
              const navigation = useNavigation()
              navigation.navigate("NewIncome")
            }}
        pressedStyle={$customButtonPressedStyle}
        pressedTextStyle={$customButtonPressedTextStyle}
        RightAccessory={(props) => (
          <Icon
            containerStyle={props.style}
            style={[
              $iconStyle,
              props.pressableState.pressed && $customButtonPressedRightAccessoryStyle,
            ]}
            icon="cash"
          />
        )}
      >
        New Income Stream
      </Button>
    </DemoUseCase>,

  ],
}

// @demo remove-file