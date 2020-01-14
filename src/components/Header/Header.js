import React, { useState, useContext } from 'react';
import { View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
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
import AppContext from '../../config/context';

const EHeader = ({ navigation }) => {
  const s = useDynamicStyleSheet(styles);
  const context = useContext(AppContext);
  const [searchMode, toggleSearchMode] = useState(true);

  /**
   * _toggleLayout
   *
   * Change the view of the home page from a grid to a single item layout
   */
  const _toggleLayout = () => {
    context.setLayout(!context.layout);
  };

  return searchMode ? (
    <Header style={s.header}>
      <StatusBar barStyle="light-content" />

      {/* Left */}
      <Left>
        <View style={s.leftLayout}>
          {/* Layout Toggle */}
          <Button transparent onPress={_toggleLayout}>
            <Icon
              size={20}
              color={s.iconColor.color}
              name={context.layout ? 'square' : 'grid'}
            />
          </Button>
          {/* Search Toggle */}
          <Button
            transparent
            style={s.searchLayout}
            onPress={() => toggleSearchMode(!searchMode)}>
            <Icon name="search" size={20} color={s.iconColor.color} />
          </Button>
        </View>
      </Left>

      {/* Body / Logo */}
      <Body>
        <Title style={s.headerTitle}>Envelope</Title>
      </Body>

      {/* Right */}
      <Right>
        <Button transparent onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={20} color={s.iconColor.color} />
        </Button>
      </Right>
    </Header>
  ) : (
    <Header searchBar rounded style={s.header}>
      <StatusBar barStyle="light-content" />

      {/* Search bar */}
      <Item>
        <Icon
          name="search"
          size={16}
          color={s.iconColorSearch.color}
          style={s.iconColorSearch}
        />
        <Input placeholder="Search" />
      </Item>
      {/* Cancel button */}
      <Button transparent onPress={() => toggleSearchMode(!searchMode)}>
        <Text style={{ color: 'white' }}>Cancel</Text>
      </Button>
    </Header>
  );
};

export default EHeader;
