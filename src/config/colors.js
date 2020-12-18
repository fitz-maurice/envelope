import {PlatformColor} from 'react-native';

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#590404',
  green: '#5C5F3E',
  blue: '#3E688C',
  red2: '#8C2218',
  beige: '#A6998A',
  gray: PlatformColor('systemGray5'),
  backgroundColor: PlatformColor('systemBackground'),
  text: (theme) =>
    theme === 'light' ? PlatformColor('darkText') : PlatformColor('lightText'),
  statusBar: (theme) => (theme === 'light' ? 'dark-content' : 'light-content'),
};
