import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsScreen from '../screens/Posts/PostsScreen';
import PostDetailsScreen from '../screens/Posts/PostDetailsScreen';


const Stack = createNativeStackNavigator();

function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="PostsScreen">
                <Stack.Screen name="PostsScreen" component={PostsScreen} />
                <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default MainNavigation;

