import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Item,
  Input,
  Text,
} from 'native-base';

import styles from './styles';
import globals from '../../config/globals';

const EHeader = ({ navigation }) => {
  const [searchMode, toggleSearchMode] = useState(true);

  return searchMode ? (
    <Header>
      {/* Left */}
      <Left>
        <View style={{ flexDirection: 'row' }}>
          <Button transparent onPress={() => alert('Change view!')}>
            <Icon name="grid" size={20} color={globals.colors.blackTrue} />
          </Button>
          <Button
            transparent
            onPress={() => toggleSearchMode(!searchMode)}
            style={{ marginLeft: 12 }}>
            <Icon name="search" size={20} color={globals.colors.blackTrue} />
          </Button>
        </View>
      </Left>

      {/* Body / Logo */}
      <Body>
        <Title>Envelope</Title>
      </Body>

      {/* Right */}
      <Right>
        <Button transparent onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={20} color={globals.colors.blackTrue} />
        </Button>
      </Right>
    </Header>
  ) : (
    <Header searchBar rounded>
      <Item>
        <Icon name="search" size={16} color={globals.colors.blackTrue} />
        <Input placeholder="Search" />
      </Item>
      <Button transparent onPress={() => toggleSearchMode(!searchMode)}>
        <Text>Cancel</Text>
      </Button>
    </Header>
  );
};

export default EHeader;
