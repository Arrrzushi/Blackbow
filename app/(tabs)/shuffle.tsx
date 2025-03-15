import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
  runOnJS,
  FadeInDown,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Check, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;

const DUMMY_PROFILES = [
  {
    id: '1',
    name: 'Sunny leone',
    branch: 'Computer Science',
    year: '3rd Year',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '2',
    name: 'Salman khan',
    branch: 'Electronics',
    year: '2nd Year',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
];

export default function Shuffle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardRotate = useSharedValue(0);

  const handleSwipeComplete = useCallback(
    (direction: 'left' | 'right') => {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setCurrentIndex((prev) => prev + 1);
      translateX.value = 0;
      translateY.value = 0;
      cardRotate.value = 0;
    },
    [],
  );

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      cardRotate.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-30, 0, 30],
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        translateX.value = withSpring(
          Math.sign(event.velocityX) * SCREEN_WIDTH,
          {},
          () => {
            runOnJS(handleSwipeComplete)(
              event.velocityX > 0 ? 'right' : 'left',
            );
          },
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        cardRotate.value = withSpring(0);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${cardRotate.value}deg` },
      ],
    };
  });

  if (currentIndex >= DUMMY_PROFILES.length) {
    return (
      <View style={styles.container}>
        <Animated.Text
          entering={FadeInDown}
          style={styles.noMoreText}>
          No more profiles to show!
        </Animated.Text>
      </View>
    );
  }

  const profile = DUMMY_PROFILES[currentIndex];

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, rStyle]}>
          <Animated.Image
            source={{ uri: `${profile.image}?w=800` }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Animated.Text style={styles.name}>
              {profile.name}
            </Animated.Text>
            <Animated.Text style={styles.details}>
              {profile.branch} • {profile.year}
            </Animated.Text>
          </View>
        </Animated.View>
      </GestureDetector>

      <View style={styles.actions}>
        <Pressable
          onPress={() => {
            translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
              runOnJS(handleSwipeComplete)('left');
            });
          }}
          style={[styles.actionButton, styles.dislikeButton]}>
          <X size={32} color="white" />
        </Pressable>
        <Pressable
          onPress={() => {
            translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
              runOnJS(handleSwipeComplete)('right');
            });
          }}
          style={[styles.actionButton, styles.likeButton]}>
          <Check size={32} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  cardContent: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 50,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  likeButton: {
    backgroundColor: '#4CD964',
  },
  dislikeButton: {
    backgroundColor: '#FF3B30',
  },
  noMoreText: {
    fontSize: 20,
    color: '#666',
  },
});