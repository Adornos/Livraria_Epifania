import React from "react";
import { SvgProps } from "react-native-svg";
import LogoSvg from "../assets/logo.svg";
import EntryLogoSvg from "../assets/entryLogo.svg";

const Logo = (props: SvgProps) => {
  return <LogoSvg width={192} height={68} {...props} />;
};

export default Logo;