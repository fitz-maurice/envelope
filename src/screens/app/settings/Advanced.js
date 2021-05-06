import React, {useContext} from 'react';
import {Alert, StatusBar, View, StyleSheet} from 'react-native';

// Envelope
import {ThemeContext} from '../../../theme';
import {
  Page,
  Container,
  PageTitle,
  Paragraph,
  Button,
} from '../../../components';

const Advanced = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  /**
   * _download
   *
   * Create a zip file and send the user their photos via email
   */
  const _download = () => {
    Alert.alert(
      'Export Date',
      'Requesting an export will send you an email with an attachment of all your data to the email address used when signing up.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Confirm', onPress: () => console.log('OK Pressed')},
      ],
    );
  };

  /**
   * _delete
   *
   * Nuke it all
   */
  const _delete = () => {
    Alert.alert(
      'Delete Account',
      'You will be sent an export of your data before your account and all of its data is permanently deleted.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Confirm', onPress: () => _realDelete()},
      ],
    );
  };

  /**
   * _realDelete
   *
   * Nuke it all
   */
  const _realDelete = () => {
    Alert.alert(
      'Are you sure?',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Confirm', onPress: () => console.log('OK Pressed')},
      ],
    );
  };

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 30,
    },
  });

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} />
      <Container>
        <PageTitle text="Manage Your Account" />
        <Paragraph text="A few tools for you to download your data or delete you Envelope account all together." />
        <View style={styles.buttonContainer}>
          <Button onPress={() => _download()} title="Download Data" />
          <Button.Red onPress={() => _delete()} title="Delete Account" />
        </View>
      </Container>
    </Page>
  );
};

export {Advanced};
