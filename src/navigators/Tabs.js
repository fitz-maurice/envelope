import React, {useCallback} from 'react';
import {useColorScheme} from 'react-native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

// Navigators
const Tabs = AnimatedTabBarNavigator();

// Screens
import {Home, Library, Settings} from '../screens';
import {colors} from '../config/colors';

// Components
import {HeaderCamera} from '../components';

const TabsNavigator = ({navigation}) => {
  const theme = useColorScheme();

  // On focus, insert camera icon
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: () => <HeaderCamera navigation={navigation} />,
      });
    }, [navigation]),
  );

  const options = {
    activeTintColor: colors.red,
    inactiveTintColor: 'green',
    activeBackgroundColor: 'white',
    labelStyle: {
      color: 'black',
    },
    tabStyle: {
      backgroundColor: colors.gray,
    },
  };

  return (
    <Tabs.Navigator tabBarOptions={options}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : colors.text(theme)}
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
              color={focused ? color : colors.text(theme)}
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
              color={focused ? color : colors.text(theme)}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export {TabsNavigator};
