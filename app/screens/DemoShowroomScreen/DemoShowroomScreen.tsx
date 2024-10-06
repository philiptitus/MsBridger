import React, { FC, useRef, useState, useEffect } from "react"
import { View, SectionList, ViewStyle, TextStyle } from "react-native"
import { Drawer } from "react-native-drawer-layout"
import { Screen, Text } from "../../components"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import * as Demos from "./demos"
import { colors, spacing } from "../../theme"
import { isRTL } from "../../i18n"
import { FuturisticSidebar } from "./components/FuturisticSidebar"

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> = (_props) => {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const listRef = useRef<SectionList>(null)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleScroll = (sectionIndex: number, itemIndex = 0) => {
    listRef.current?.scrollToLocation({ animated: true, itemIndex, sectionIndex })
    toggleDrawer()
  }

  const scrollToIndexFailed = (info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => {
    listRef.current?.getScrollResponder()?.scrollToEnd()
    timeout.current = setTimeout(
      () => listRef.current?.scrollToLocation({ animated: true, itemIndex: info.index, sectionIndex: 0 }),
      50,
    )
  }

  useEffect(() => () => timeout.current && clearTimeout(timeout.current), [])

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="back"
      drawerPosition={isRTL ? "right" : "left"}
      renderDrawerContent={() => (
        <FuturisticSidebar handleScroll={handleScroll} />
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
        <Text
          text="Menu"
          onPress={toggleDrawer}
          style={$menuButton}
        />
        <SectionList
          ref={listRef}
          contentContainerStyle={$sectionListContentContainer}
          stickySectionHeadersEnabled={false}
          sections={Object.values(Demos)}
          renderItem={({ item }) => item}
          renderSectionFooter={() => <View style={$demoUseCasesSpacer} />}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoShowroomScreen.jumpStart" />
            </View>
          }
          onScrollToIndexFailed={scrollToIndexFailed}
          renderSectionHeader={({ section }) => (
            <View>
              <Text preset="heading" style={$demoItemName}>
                {section.name}
              </Text>
              <Text style={$demoItemDescription}>{section.description}</Text>
            </View>
          )}
        />
      </Screen>
    </Drawer>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $menuButton: TextStyle = {
  fontSize: 18,
  color: "#E0AAFF", // Lighter purple color for the button text
  margin: spacing.md,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.xxxl,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  color: "#E0AAFF", // Lighter purple for section names
  marginBottom: spacing.md,
}

const $demoItemDescription: TextStyle = {
  marginBottom: spacing.xxl,
  color: "#9D4EDD", // Medium purple for descriptions
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.xxl,
}
