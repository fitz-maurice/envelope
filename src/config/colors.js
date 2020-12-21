import {PlatformColor} from 'react-native';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
const eventEmitter = new EventEmitter();

const generateColors = (currentTheme, userChoice) => {
  const theme = userChoice === 'automatic' ? currentTheme : userChoice;

  return {
    scheme: theme,
    black: '#000000',
    white: '#FFFFFF',
    red: '#590404',
    green: '#5C5F3E',
    // blue: '#3E688C',
    // red2: '#8C2218',
    // beige: '#A6998A',
    gray:
      userChoice === 'automatic'
        ? PlatformColor('systemGray5')
        : theme === 'light'
        ? '#e5e5eaff'
        : '#2c2c2eff',
    backgroundColor:
      userChoice === 'automatic'
        ? PlatformColor('systemBackground')
        : theme === 'light'
        ? '#ffffff'
        : '#000000ff',
    text:
      userChoice === 'automatic'
        ? PlatformColor('label')
        : theme === 'light'
        ? PlatformColor('darkText')
        : PlatformColor('lightText'),
    statusBar:
      userChoice === 'automatic'
        ? 'default'
        : theme === 'light'
        ? 'dark-content'
        : 'light-content',
  };
};

module.exports = {
  generateColors,
  addChangeListener(listener) {
    eventEmitter.addListener('change', listener);
  },
  removeChangeListener(listener) {
    eventEmitter.removeListener('change', listener);
  },
};
