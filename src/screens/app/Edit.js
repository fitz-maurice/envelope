import React, {useEffect, useState, useContext, useCallback} from 'react';
import {StatusBar, Alert, Pressable, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// Envelope
import {
  Page,
  Container,
  Button,
  Input,
  Loader,
  HeaderDelete,
} from '../../components';
import {
  AppContext,
  editCard,
  fetchCardHolidays,
  getPeople,
} from '../../services';

const Edit = ({route, navigation}) => {
  const {image, newFrom, newTag} = route.params;
  const context = useContext(AppContext);
  const [from, setFrom] = useState(image.from);
  const [tag, setTag] = useState(image.tag);
  const [date, setDate] = useState(image.date);
  const [notes, setNotes] = useState(image.notes);
  const [changed, setChanged] = useState(false);
  const [holidays, setHolidays] = useState(null);
  const [people, setPeople] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchCardHolidays().then(h => setHolidays(h));
      getPeople(context.user.user.uid).then(p => setPeople(p));
      if (newFrom) {
        setFrom(newFrom);
      }
      if (newTag) {
        setTag(newTag);
      }

      navigation.setOptions({
        headerRight: () => (
          <HeaderDelete
            navigation={navigation}
            imageKey={image.key}
            uid={context.user.user.uid}
          />
        ),
      });
    }, [navigation, image.key, context.user.user.uid, newFrom, newTag]),
  );

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (!changed) {
        return;
      }

      e.preventDefault();
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          {text: "Don't leave", style: 'cancel', onPress: () => {}},
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
  }, [navigation, changed, context.user.user.uid]);

  /**
   * _updateCard
   *
   * Update everything excpect the images associated with a card
   */
  const _updateCard = () => {
    context.setLoading(true);
    editCard(context.user.user.uid, image.key, {
      from,
      tag,
      date,
      notes,
    }).then(() => {
      setChanged(false);
      context.setLoading(false);
      Alert.alert('Card saved!', null, [
        {
          text: 'Great',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    });
  };

  if (!holidays && !people) {
    return <Loader />;
  }

  return (
    <Page>
      <StatusBar barStyle="dark-content" />
      <Container>
        <Pressable
          onPress={() =>
            navigation.navigate('Picker', {
              list: holidays,
              title: 'Select Ocation',
            })
          }>
          <View pointerEvents="none">
            <Input value={tag} editable={false} />
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('Picker', {
              list: people,
              title: 'Pick Contact',
            })
          }>
          <View pointerEvents="none">
            <Input value={from} editable={false} />
          </View>
        </Pressable>
        <Input
          value={date}
          placeholder="mm/dd/yyyy"
          onChangeText={d => {
            setDate(d);
            setChanged(true);
          }}
        />
        <Input.TextArea
          value={notes}
          onChangeText={n => {
            setNotes(n);
            setChanged(true);
          }}
        />
      </Container>
      <Container>
        <Button title="Save" onPress={_updateCard} />
      </Container>
    </Page>
  );
};

export {Edit};
