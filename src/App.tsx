import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeamsScreen from './screens/TeamsScreen';
import PlayerListScreen from './screens/PlayerListScreen';
import PlayerScreen from './screens/PlayerScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MatchScreen from './screens/MatchScreen';
import IconScreen from './screens/IconScreen';
import ScoreScreen from './screens/ScoreScreen';
import { RootStackParamList } from './types/navigation';
import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      headerShown:false,
      tabBarIcon: ({focused,color,size}) => {
        let iconName = '';
        switch (route.name){
          case 'Resultados':
            iconName = focused ? 'podium' : 'podium-outline';
            break;
          case 'Partidos':
            iconName = focused ? 'trophy' : 'trophy-outline';
            break;
          case 'Equipos':
            iconName = focused ? 'basketball' : 'basketball-outline';
            break;
        }
        return <Icon name = {iconName} size={size} color={color} />
      }
    })}>
      <Tab.Screen name='Resultados' component={ScoreScreen}/>
      <Tab.Screen name='Partidos' component={MatchScreen}/>
      <Tab.Screen name='Equipos' component={TeamsScreen}/>
    </Tab.Navigator>
    
  );
};

// const navigatio = useNavigation();

const App = () => (
  <NavigationContainer>
    
    <Stack.Navigator>
      <Stack.Screen name="NBApp" component={TabNavigator}
      options={({navigation}) => ({
        headerRight: () => (
          // <Button
          //     onPress={() => navigation.navigate('Icon')}
          //     title="Icon"
          //   />
          <TouchableOpacity  onPress={() => navigation.navigate('Icon')}>
            <Icon name='settings' size={30} color={'grey'} onPress={() =>
            navigation.navigate('Icon')}></Icon>
          </TouchableOpacity>
        )
      })}
      />
      <Stack.Screen
        name="Icon"
        component={IconScreen}
      />
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

const styles = StyleSheet.create({
  icon:{
    padding: 10
  }
})

export default App;
