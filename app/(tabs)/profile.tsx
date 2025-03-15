import { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { CreditCard as Edit2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Bill gates',
    branch: 'Computer Science',
    year: '3rd Year',
    bio: 'Dosa sambhar chutney key to sucess',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  });

  const handleEdit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsEditing(!isEditing);
  };

  const ProfileCard = () => (
    <Animated.View
      entering={FadeInUp.delay(400)}
      style={styles.card}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={20} style={styles.blur}>
          <ProfileContent />
        </BlurView>
      ) : (
        <View style={[styles.blur, styles.androidBlur]}>
          <ProfileContent />
        </View>
      )}
    </Animated.View>
  );

  const ProfileContent = () => (
    <>
      <View style={styles.header}>
        <Animated.Image
          source={{ uri: `${profile.image}?w=400` }}
          style={styles.avatar}
        />
        <Pressable
          onPress={handleEdit}
          style={styles.editButton}>
          <Edit2 size={20} color="white" />
        </Pressable>
      </View>

      {isEditing ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, name: text }))
            }
          />
          <TextInput
            style={styles.input}
            value={profile.branch}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, branch: text }))
            }
          />
          <TextInput
            style={styles.input}
            value={profile.year}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, year: text }))
            }
          />
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={profile.bio}
            onChangeText={(text) =>
              setProfile((prev) => ({ ...prev, bio: text }))
            }
            multiline
          />
        </View>
      ) : (
        <View style={styles.info}>
          <Animated.Text style={styles.name}>
            {profile.name}
          </Animated.Text>
          <Animated.Text style={styles.details}>
            {profile.branch} • {profile.year}
          </Animated.Text>
          <Animated.Text style={styles.bio}>
            {profile.bio}
          </Animated.Text>
        </View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.delay(200)}
        style={styles.title}>
        Profile
      </Animated.Text>
      <ProfileCard />
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
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  blur: {
    padding: 20,
  },
  androidBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    
    marginBottom: 20,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});