import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useDynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode';
import { Image } from 'react-native';
import { Card, CardItem, Left, Button, Body, Text, Right } from 'native-base';
import storage from '@react-native-firebase/storage';

import styles from './styles';

const Single = props => {
  const s = useDynamicStyleSheet(styles);
  const [uri, setUri] = useState();

  useEffect(() => {
    const getDownloadURL = storage()
      .refFromURL(props.card.front)
      .getDownloadURL()
      .then(url => setUri(url));

    return () => getDownloadURL;
  }, []);

  return (
    <Card>
      <CardItem header>
        <Left>
          <Text>{props.card.from}</Text>
          <Icon active name="user" />
        </Left>

        <Right>
          <Text>{props.card.date.toDate().toDateString()}</Text>
          <Icon active name="calendar" />
        </Right>
      </CardItem>

      <CardItem cardBody>
        <Image source={{ uri }} style={{ height: 300, width: null, flex: 1 }} />
      </CardItem>
    </Card>
  );
};

export default Single;
