import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Image } from 'react-native';
import { Card, CardItem, Left, Button, Body, Text, Right } from 'native-base';

// import styles from './styles';

const Single = () => {
  return (
    <Card>
      <CardItem cardBody>
        <Image
          source={{ uri: 'https://placeimg.com/500/500' }}
          style={{ height: 300, width: null, flex: 1 }}
        />
      </CardItem>

      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="heart" />
            <Text>12 Likes</Text>
          </Button>
        </Left>

        <Body>
          <Button transparent>
            <Icon active name="heart" />
            <Text>4 Comments</Text>
          </Button>
        </Body>

        <Right>
          <Icon active name="calendar" />
          <Text>11h ago</Text>
        </Right>
      </CardItem>
    </Card>
  );
};

export default Single;
