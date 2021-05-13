import React, {useContext} from 'react';
import {StyleSheet, Alert, Text, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Envelope
import {ThemeContext} from '../../theme';
import {AppContext, updateUser} from '../../services';

const HeaderAdd = ({navigation, people}) => {
  const context = useContext(AppContext);
  const {theme} = useContext(ThemeContext);
  const fs = 17 * useWindowDimensions().fontScale;

  /**
   * _addContactPrompt
   *
   * Prompt the user to add a contact
   */
  const _addContactPrompt = () => {
    Alert.prompt(
      'Add Contact',
      'This will permanently add a person to your contact list.',
      [
        {text: 'Cancel', style: 'cancel', onPress: () => {}},
        {
          text: 'Add',
          style: 'default',
          onPress: contact => _addContact(contact),
        },
      ],
    );
  };

  /**
   * _addContact
   *
   * Add the contact to the user's array
   */
  const _addContact = newContact => {
    context.setLoading(true);
    const _people = people.reduce((p, i) => {
      p.push(i.value);
      return p;
    }, []);
    _people.push(newContact);
    _people.sort();
    updateUser(context.user.user.uid, {
      people: _people.filter(
        (value, index, self) => self.indexOf(value) === index,
      ),
    }).then(() => {
      context.setLoading(false);
      ReactNativeHapticFeedback.trigger('impactLight');
      navigation.navigate('Edit', {selected: newContact});
    });
  };

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    add: {
      fontSize: fs,
      marginRight: 8,
    },
  });

  return (
    <Text style={styles.add} onPress={_addContactPrompt}>
      <Icon name="user-plus" size={20} color={theme.green} />
    </Text>
  );
};

export {HeaderAdd};
