import React from 'react';
import {View, Alert, StatusBar, TextInput, StyleSheet} from 'react-native';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import {Container, Button} from '../../components';

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Container>
        <TextInput
          autoFocus={true}
          style={styles.textInput}
          underlineColorAndroid="transparent"
        />
      </Container>
      <KeyboardAccessoryView alwaysVisible={true}>
        <Button
          title="Send"
          onPress={() => Alert.alert('Nailed it!', 'Wohooo')}
        />
      </KeyboardAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 18,
    // textAlignVertical: 'top',
  },
  textInputButton: {
    flexShrink: 1,
  },
});

export {ForgotPassword};
