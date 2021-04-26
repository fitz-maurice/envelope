import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StatusBar,
  Modal,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';

// Envelope
import {
  Input,
  PageTitle,
  Paragraph,
  Page,
  Container,
} from '../../../components';
import {ThemeContext} from '../../../theme';
import {AppContext} from '../../../services';

const PersonalInfo = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const context = useContext(AppContext);
  const [fullname, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [modal, setModal] = useState(true);

  useEffect(() => {
    if (context.userRestored) {
      context.setLoading(true);
      const uid = context.user.user.uid;
      const subscriber = firestore()
        .doc(`${uid}/account`)
        .onSnapshot(querySnapshot => {
          setFullname(querySnapshot.data().displayName);
          const bday = getFormatedDate(
            querySnapshot.data().birthday,
            'MM/DD/YYYY',
          );
          setBirthday(bday);
          context.setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [context.userRestored]);

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      color: theme.bodyTextColor,
    },
  });

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} />
      <Container>
        <PageTitle text="A Few Details" />
        <Paragraph text="Just a few thinks so we can better customize Evnelope for you." />
        <Input value={fullname} onChangeText={setFullname} />
        {/* <Pressable onPress={() => setModal(true)}>
          <Text>{birthday}</Text>
        </Pressable> */}
      </Container>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <DatePicker
          onSelectedChange={date => {
            setBirthday(date);
            setModal(false);
          }}
          selected="2020-07-23"
          mode="calendar"
          //   style={{borderRadius: 10}}
          options={{
            backgroundColor: '#090C08',
            textHeaderColor: '#FFA25B',
            textDefaultColor: '#F6E7C1',
            selectedTextColor: '#fff',
            mainColor: '#F4722B',
            textSecondaryColor: '#D6C7A1',
            borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
        />
      </Modal>
    </Page>
  );
};

export {PersonalInfo};
