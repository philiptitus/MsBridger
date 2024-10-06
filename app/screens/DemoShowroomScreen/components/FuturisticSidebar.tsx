import React, { FC } from "react"
import { View, ViewStyle, TextStyle, Image, ScrollView, Platform, TouchableOpacity } from "react-native"
import { ListView, ListItem, Text } from "../../../components"
import { Link } from "@react-navigation/native"
import { colors, spacing } from "../../../theme"
import { isRTL } from "../../../i18n"
import * as Demos from "../demos"

export interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  const sectionSlug = item.name.toLowerCase()

  return (
    <View style={$listItemContainer}>
      <Link to={`/showroom/${sectionSlug}`} style={$menuItem} activeOpacity={0.7}>
        <Text preset="bold" style={$listItemText}>
          {item.name}
        </Text>
      </Link>
      <View style={$divider} />
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)
        return (
          <Link key={`section${sectionIndex}-${u}`} to={`/showroom/${sectionSlug}/${itemSlug}`} style={$useCaseLink}>
            <Text style={$useCaseText}>{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => (
  <View style={$listItemContainer}>
    <TouchableOpacity onPress={() => handleScroll?.(sectionIndex)} style={$menuItem}>
      <Text preset="bold" style={$listItemText}>
        {item.name}
      </Text>
    </TouchableOpacity>
    <View style={$divider} />
    {item.useCases.map((u, index) => (
      <ListItem
        key={`section${sectionIndex}-${u}`}
        onPress={() => handleScroll?.(sectionIndex, index + 1)}
        text={u}
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
        style={$listItemText}
      />
    ))}
  </View>
)

const ShowroomListItem = Platform.select({ web: WebListItem, default: NativeListItem })

export const FuturisticSidebar: FC<{
  handleScroll: (sectionIndex: number, itemIndex?: number) => void
}> = ({ handleScroll }) => {
  return (
    <View style={$drawerContainer}>
      <View style={$patternContainer}>
        {/* Background Pattern */}
        <View style={[$shape, $circle]} />
        <View style={[$shape, $square]} />
        <View style={[$shape, $star]} />
        <View style={[$shape, $rectangle]} />
      </View>
      <ScrollView contentContainerStyle={$listContentContainer}>
        <ListView<DemoListItem["item"]>
          estimatedItemSize={250}
          data={Object.values(Demos).map((d) => ({
            name: d.name,
            useCases: d.data.map((u) => u.props.name as string),
          }))}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index: sectionIndex }) => (
            <ShowroomListItem {...{ item, sectionIndex, handleScroll }} />
          )}
        />
      </ScrollView>
    </View>
  )
}

const $drawerContainer: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.md,
  borderTopRightRadius: 90,
  borderBottomRightRadius: 230,
  shadowColor: colors.palette.black,
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.5,
  shadowRadius: 15,
  backgroundColor: "#3A0CA3", // Dark purple background
  overflow: "hidden",
}

const $patternContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const $shape: ViewStyle = {
  position: "absolute",
  backgroundColor: "#724AF4", // Purple color for shapes
  opacity: 0.3,
}

const $circle: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
  top: 40,
  left: 30,
}

const $square: ViewStyle = {
  width: 80,
  height: 80,
  top: 200,
  right: 50,
}

const $star: ViewStyle = {
  width: 60,
  height: 60,
  transform: [{ rotate: "45deg" }],
  top: 350,
  left: 100,
}

const $rectangle: ViewStyle = {
  width: 120,
  height: 40,
  bottom: 100,
  right: 30,
}

const $listContentContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
}

const $listItemContainer: ViewStyle = {
  marginBottom: spacing.lg,
}

const $menuItem: ViewStyle = {
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  borderRadius: 10,
  backgroundColor: "#4A2BC9",
}

const $listItemText: TextStyle = {
  color: "#E0AAFF", // Lighter purple text color
  fontSize: 18,
  fontWeight: "600",
}

const $useCaseText: TextStyle = {
  color: "#C77DFF", // Slightly lighter shade for use cases
  fontSize: 16,
  marginLeft: spacing.md,
  marginVertical: spacing.xs,
}

const $useCaseLink: ViewStyle = {
  marginVertical: spacing.xs,
  paddingLeft: spacing.sm,
  borderRadius: 5,
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: "#724AF4",
  marginVertical: spacing.sm,
  opacity: 0.4,
}
