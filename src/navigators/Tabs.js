import React, {useCallback, useContext} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

// Envelope
const Tabs = AnimatedTabBarNavigator();
import {ThemeContext} from '../theme';
import {HeaderCamera} from '../components';
import {Home, Library, Settings} from '../screens';

const TabsNavigator = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: () => <HeaderCamera navigation={navigation} />,
      });
    }, [navigation]),
  );

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.white,
        activeBackgroundColor: theme.green,
        labelStyle: {
          color: theme.white,
        },
        tabStyle: {
          backgroundColor: theme.white,
        },
      }}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : theme.bodyTextColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="image"
              size={size ? size : 24}
              color={focused ? color : theme.bodyTextColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="settings"
              size={size ? size : 24}
              color={focused ? color : theme.bodyTextColor}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export {TabsNavigator};
