import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens';
import TeamsScreen from './screens/TeamsScreen';
import PlayerListScreen from './screens/PlayerListScreen';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
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
                contentStyle: {backgroundColor: `#${route.params.primary}`}
              }
            : {title: 'Players'}
        }
      />
      <Stack.Screen name="Player" component={PlayerScreen} options={({route}) =>
          route.params
            ? {
                title: route.params.player.FirstName + ' ' + route.params.player.LastName,
                headerTitleAlign: 'center',
                headerTintColor: `#${route.params.primary}`,
                headerStyle: {backgroundColor: `#${route.params.secondary}`},
                contentStyle: {backgroundColor: `#${route.params.primary}`}
              }
            : {title: 'Player'}
        } />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
