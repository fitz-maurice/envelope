import React from 'react';
import {
  View,
  Alert,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import {Container} from '../../components';
import {colors} from '../../config';

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{flex: 1}}>
        <Container>
          <TextInput
            autoFocus={true}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
        </Container>
      </View>
      <KeyboardAccessoryView
        animateOn="all"
        hideBorder={true}
        alwaysVisible={true}
        avoidKeyboard={true}
        androidAdjustResize={true}>
        <TouchableOpacity
          style={styles.textInputButton}
          onPress={() => Alert.alert('Nailed it!', 'Wohooo')}>
          <Text style={[styles.button]}>Send</Text>
        </TouchableOpacity>
      </KeyboardAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top',
  },
  textInputButton: {
    flexShrink: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  button: {
    color: '#ffffff',
  },
});

export {ForgotPassword};
