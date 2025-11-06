import { Image, StyleSheet } from 'react-native';

type EpifaniaLogoProps = { style?: object; };


const Logo = ( {style = {}} : EpifaniaLogoProps) => {
  return (
    <Image
      source={require('@/assets/logo.png')}
      style={[styles.logo, {...style}]}
      resizeMode="contain"
    />
  );
}
const styles = StyleSheet.create({
  logo: { width: 206, height: 114, alignSelf: 'center' },
});

export default Logo;
