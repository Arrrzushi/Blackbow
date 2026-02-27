import { useCallback } from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Shuffle, MessageSquare, Calendar, User } from 'lucide-react-native';
import { Platform, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function HapticTabButton({ children, onPress, onLongPress, style, ...rest }: any) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(
    (e: any) => {
      // Trigger haptic feedback
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      // Bounce animation for immediate visual feedback
      scale.value = withSequence(
        withSpring(0.85, { damping: 15, stiffness: 400 }),
        withSpring(1, { damping: 10, stiffness: 300 }),
      );
      onPress?.(e);
    },
    [onPress, scale],
  );

  return (
    <AnimatedPressable
      onPress={handlePress}
      onLongPress={onLongPress}
      style={[style, animatedStyle]}
      {...rest}>
      {children}
    </AnimatedPressable>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarStyle: {
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={50} style={{ flex: 1 }} />
          ) : null,
        tabBarActiveTintColor: '#FF2D55',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarButton: (props) => <HapticTabButton {...props} />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shuffle"
        options={{
          title: 'Shuffle',
          tabBarIcon: ({ color, size }) => <Shuffle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="confessions"
        options={{
          title: 'Confessions',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}