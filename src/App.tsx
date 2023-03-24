import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from './screens';
import TeamsScreen from './screens/TeamsScreen';
import PlayerListScreen from './screens/PlayerListScreen';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='Teams' component={TeamsScreen}/>
    </Tab.Navigator>
    {/* <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
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
    </Stack.Navigator> */}
  </NavigationContainer>
);

export default App;
