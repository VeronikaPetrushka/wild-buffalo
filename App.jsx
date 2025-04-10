import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenuScreen from './src/scr/MainMenuScreen';
import LoaderScreen from './src/scr/LoaderScreen';
import WelcomeAboutScreen from './src/scr/WelcomeAboutScreen';
import AboutScreen from './src/scr/AboutScreen';
import TimerScreen from './src/scr/TimerScreen';
import SetScreen from './src/scr/SetScreen';
import KnowledgeScreen from './src/scr/KnowledgeScreen';
import ColorsScreen from './src/scr/ColorsScreen';
import LearnScreen from './src/scr/LearnScreen';
import HistoryScreen from './src/scr/HistoryScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
            <Stack.Navigator initialRouteName={"LoaderScreen" }>    
            <Stack.Screen 
                  name="LoaderScreen" 
                  component={LoaderScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="WelcomeAboutScreen" 
                  component={WelcomeAboutScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="MainMenuScreen" 
                  component={MainMenuScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="TimerScreen" 
                  component={TimerScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="SetScreen" 
                  component={SetScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="AboutScreen" 
                  component={AboutScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="KnowledgeScreen" 
                  component={KnowledgeScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="ColorsScreen" 
                  component={ColorsScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="LearnScreen" 
                  component={LearnScreen} 
                  options={{ headerShown: false }} 
            />
            <Stack.Screen 
                  name="HistoryScreen" 
                  component={HistoryScreen} 
                  options={{ headerShown: false }} 
            />
            </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
