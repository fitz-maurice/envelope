import React, {useCallback} from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

// Navigators
const Tabs = AnimatedTabBarNavigator();

// Screens
import {Home, Library, Settings} from '../screens';

// Components
import {HeaderCamera} from '../components';

const TabsNavigator = ({navigation}) => {
  // On focus, insert camera icon
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
        activeTintColor: 'white',
        inactiveTintColor: 'grey',
        activeBackgroundColor: 'purple',
        tabStyle: {
          backgroundColor: 'white',
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
              color={focused ? color : '#222222'}
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
              name="upload"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
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
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export {TabsNavigator};