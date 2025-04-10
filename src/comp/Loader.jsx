import React, { useEffect } from 'react';
import { Animated, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Loader = () => {
    const navigation = useNavigation();
    const progress = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(progress, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }).start(() => {
          navigation.navigate('WelcomeAboutScreen');
        });
      }, []);
    
      const rotate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
      });

  return (
    <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Animated.Image
                source={require('../asst/decor/loader.png')}
                style={{
                width: 140,
                height: 210,
                resizeMode: 'contain',
                transform: [{ rotate }],
                }}
        />
    </View>
  );
};

export default Loader;