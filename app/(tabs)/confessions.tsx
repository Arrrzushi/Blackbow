import { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { ChevronUp, ChevronDown, Send } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

type Confession = {
  id: string;
  text: string;
  votes: number;
};

export default function Confessions() {
  const [confessions, setConfessions] = useState<Confession[]>([
    {
      id: '1',
      text: "My rommate is very clingy",
      votes: 15,
    },
    {
      id: '2',
      text: "I have a crush on my professor",
      votes: 8,
    },
  ]);
  const [newConfession, setNewConfession] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleVote = (id: string, increment: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setConfessions((prev) =>
      prev.map((conf) =>
        conf.id === id
          ? { ...conf, votes: conf.votes + increment }
          : conf,
      ),
    );
  };

  const handleSubmit = () => {
    if (!newConfession.trim()) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newEntry = {
      id: Date.now().toString(),
      text: newConfession,
      votes: 0,
    };

    setConfessions((prev) => [newEntry, ...prev]);
    setNewConfession('');
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.delay(200)}
        style={styles.title}>
        Confessions
      </Animated.Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Share your confession anonymously..."
          value={newConfession}
          onChangeText={setNewConfession}
          multiline
        />
        <Pressable
          onPress={handleSubmit}
          style={styles.submitButton}>
          <Send size={24} color="white" />
        </Pressable>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {confessions.map((confession, index) => (
          <Animated.View
            key={confession.id}
            entering={FadeInUp.delay(index * 100)}
            style={styles.confessionCard}>
            <View style={styles.votes}>
              <Pressable
                onPress={() => handleVote(confession.id, 1)}
                style={styles.voteButton}>
                <ChevronUp
                  size={24}
                  color="#4CD964"
                />
              </Pressable>
              <Animated.Text style={styles.voteCount}>
                {confession.votes}
              </Animated.Text>
              <Pressable
                onPress={() => handleVote(confession.id, -1)}
                style={styles.voteButton}>
                <ChevronDown
                  size={24}
                  color="#FF3B30"
                />
              </Pressable>
            </View>
            <View style={styles.confessionContent}>
              <Animated.Text style={styles.confessionText}>
                {confession.text}
              </Animated.Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 25,
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
  scrollView: {
    flex: 1,
  },
  confessionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  votes: {
    alignItems: 'center',
    marginRight: 15,
  },
  voteButton: {
    padding: 5,
  },
  voteCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  confessionContent: {
    flex: 1,
  },
  confessionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});