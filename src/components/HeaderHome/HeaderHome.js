import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import {
  Header,
  Body,
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

import HeaderTitle from '../HeaderTitle';

const HeaderHome = ({ navigation }) => {
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
    // Regular Header
    <Header style={s.header}>
      {/* Left */}
      <Left style={s.left}>
        {/* Layout Toggle */}
        <Button transparent onPress={_toggleLayout}>
          <Icon
            size={22}
            color={s.iconColor.color}
            name={context.layout ? 'square' : 'grid'}
          />
        </Button>
      </Left>

      {/* Body / Logo */}
      <Body>
        <HeaderTitle>Envelope</HeaderTitle>
      </Body>

      {/* Right */}
      <Right>
        {/* Search Toggle */}
        <Button
          transparent
          style={s.searchLayout}
          onPress={() => toggleSearchMode(!searchMode)}>
          <Icon name="search" size={20} color={s.iconColor.color} />
        </Button>

        {/* Menu */}
        <Button
          transparent
          onPress={() =>
            navigation.navigate('Settings', {
              backgroundColor: s.header.backgroundColor,
            })
          }>
          <Icon name="menu" size={20} color={s.iconColor.color} />
        </Button>
      </Right>
    </Header>
  ) : (
    // Search Bar Header
    <Header searchBar rounded style={s.header}>
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
        <Text style={s.searchCancel}>Cancel</Text>
      </Button>
    </Header>
  );
};

export default HeaderHome;
