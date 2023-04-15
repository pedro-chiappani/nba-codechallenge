import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from './screens';
import TeamsScreen from './screens/TeamsScreen';
import PlayerListScreen from './screens/PlayerListScreen';
import PlayerScreen from './screens/PlayerScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name='Casa' component={HomeScreen} />
      <Tab.Screen name='Equipos' component={TeamsScreen}/>
    </Tab.Navigator>
    
  );
};

const App = () => (
  <NavigationContainer>
    
    <Stack.Navigator>
      <Stack.Screen name="NBApp" component={TabNavigator} />
      <Stack.Screen
        name="Teams"
        component={TeamsScreen}
        options={({navigation}) => ({
          title: 'NBA Teams',
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="PlayerList"
        component={PlayerListScreen}
        options={({route}) =>
          route.params
            ? {
                title: route.params.teamName,
                headerTitleAlign: 'center',
                headerTintColor: `#${route.params.primary}`,
                headerStyle: {backgroundColor: `#${route.params.secondary}`},
                contentStyle: {backgroundColor: `#${route.params.primary}`},
              }
            : {title: 'Players'}
        }
      />
      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={({route}) =>
          route.params
            ? {
                title:
                  route.params.player.FirstName +
                  ' ' +
                  route.params.player.LastName,
                headerTitleAlign: 'center',
                headerTintColor: `#${route.params.primary}`,
                headerStyle: {backgroundColor: `#${route.params.secondary}`},
                contentStyle: {backgroundColor: `#${route.params.primary}`},
              }
            : {title: 'Player'}
        }
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
