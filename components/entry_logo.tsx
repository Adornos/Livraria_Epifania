import React from "react";
import { SvgProps } from "react-native-svg";
import EntryLogoSvg from "../assets/entryLogo.svg";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const EntryLogo = (props: SvgProps) => {
  return <EntryLogoSvg width={screenWidth * 0.7} height={(screenWidth * 0.7 * 115) / 206} {...props} />;
};

export default EntryLogo;