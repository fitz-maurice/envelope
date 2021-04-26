import React, {useCallback, useState, useContext, useEffect} from 'react';
import {View, StatusBar, Modal, Pressable, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';

// Envelope
import {ThemeContext} from '../../../theme';
import {AppContext} from '../../../services';
import {
  Input,
  PageTitle,
  Paragraph,
  Page,
  Container,
} from '../../../components';

const PersonalInfo = ({navigation}) => {
  const {theme} = useContext(ThemeContext);
  const context = useContext(AppContext);
  const [fullname, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [modal, setModal] = useState(true);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Personal Info',
        headerRight: null,
      });
    }, [navigation]),
  );

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

  const styles = {
    view: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.backgroundColor,
    },
    text: {
      fontSize: 30,
      color: theme.bodyTextColor,
    },
  };

  return (
    <Page>
      <StatusBar barStyle={theme.appbar.barStyle} />
      {/* <Container></Container> */}
      <View style={styles.view}>
        <PageTitle text="A Few Details" />
        <Paragraph text="Just a few thinks so we can better customize Evnelope for you." />
        <Input value={fullname} onChangeText={setFullname} />
        {/* <Pressable onPress={() => setModal(true)}>
          <Text>{birthday}</Text>
        </Pressable> */}
      </View>

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
