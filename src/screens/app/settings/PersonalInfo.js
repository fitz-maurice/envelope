import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {
  KeyboardAccessoryView,
  KeyboardAccessoryNavigation,
} from 'react-native-keyboard-accessory';
import firestore from '@react-native-firebase/firestore';

// Envelope
import {
  Input,
  PageTitle,
  Paragraph,
  Page,
  Container,
} from '../../../components';
import {ThemeContext} from '../../../theme';
import {AppContext, updateUser} from '../../../services';

const PersonalInfo = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const context = useContext(AppContext);
  const [fullname, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const fs = 17 * useWindowDimensions().fontScale;

  useEffect(() => {
    if (context.userRestored) {
      context.setLoading(true);
      const uid = context.user.user.uid;
      const subscriber = firestore()
        .doc(`${uid}/account`)
        .onSnapshot(querySnapshot => {
          setFullname(querySnapshot.data().displayName);
          setBirthday(querySnapshot.data().birthday);
          context.setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [context.userRestored]);

  /**
   * _save()
   *
   * Save a user's updated to their profile
   */
  const _save = () => {
    if (fullname.length === 0 || birthday.length === 0) {
      Alert.alert('Please fill out all fields');
      return;
    }

    // mm/dd/yyyy
    if (
      !birthday.match(
        /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20|21)\d\d$/,
      )
    ) {
      Alert.alert('Please enter your birthday in mm/dd/yyyy format');
      return;
    }

    context.setLoading(true);
    updateUser(context.user.user.uid, {
      displayName: fullname,
      birthday: birthday,
    }).then(() => {
      context.setLoading(false);
      Alert.alert('Saved!');
    });
  };

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 30,
    },
    textInputButton: {
      flexShrink: 1,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.green,
    },
    button: {
      color: '#ffffff',
    },
  });

  return (
    <Page>
      <Page>
        <StatusBar barStyle={theme.appbar.barStyle} />
        <Container>
          <PageTitle text="A Few Details" />
          <Paragraph text="Just a few thinks so we can better customize Evnelope for you." />

          <View style={styles.inputContainer}>
            <Input
              value={fullname}
              autoFocus={true}
              placeholder="Full name"
              onChangeText={setFullname}
            />
            <Input
              value={birthday}
              placeholder="mm/dd/yyyy"
              onChangeText={setBirthday}
            />
          </View>
        </Container>
      </Page>
      <KeyboardAccessoryView
        animateOn="all"
        hideBorder={true}
        alwaysVisible={true}
        avoidKeyboard={true}
        androidAdjustResize={true}>
        <Pressable style={styles.textInputButton} onPress={() => _save()}>
          <Text style={[styles.button, {fontSize: fs}]}>Save</Text>
        </Pressable>
      </KeyboardAccessoryView>
      <KeyboardAccessoryNavigation
        androidAdjustResize={true}
        doneButtonTitle="Save"
        tintColor={theme.green}
        onDone={() => _save()}
        // onNext={() => console.log()}
        // onPrevious={() => passwordRef.current.focus()}
      />
    </Page>
  );
};

export {PersonalInfo};
