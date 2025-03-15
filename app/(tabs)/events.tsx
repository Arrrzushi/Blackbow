import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { Calendar } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const EVENTS = [
  {
    id: '1',
    title: 'Tech Fest 2025',
    date: 'March 15, 2025',
    location: 'SDMA',
    description:
      'Annual technology festival featuring workshops, competitions, and guest speakers.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
  },
  {
    id: '2',
    title: 'Cultural Night',
    date: 'March 20, 2025',
    location: 'GH-5',
    description: 'A night of music, dance in Hostels.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
  },
];

export default function Events() {
  const handleRSVP = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <Animated.Text entering={FadeInDown.delay(200)} style={styles.title}>
        Upcoming Events
      </Animated.Text>

      {EVENTS.map((event, index) => (
        <Animated.View key={event.id} entering={FadeInUp.delay(index * 200)} style={styles.eventCard}>
          <Animated.Image source={{ uri: `${event.image}?w=800` }} style={styles.eventImage} />
          <View style={styles.eventContent}>
            <Animated.Text style={styles.eventTitle}>{event.title}</Animated.Text>
            <View style={styles.eventDetails}>
              <Calendar size={16} color="#666" />
              <Animated.Text style={styles.eventDate}>{event.date}</Animated.Text>
            </View>
            <Animated.Text style={styles.eventLocation}>📍 {event.location}</Animated.Text>
            <Animated.Text style={styles.eventDescription}>{event.description}</Animated.Text>
            <Pressable onPress={() => handleRSVP(event.id)} style={styles.rsvpButton}>
              <Animated.Text style={styles.rsvpButtonText}>RSVP Now</Animated.Text>
            </Pressable>
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventContent: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  eventLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: '#444',
    marginBottom: 15,
    lineHeight: 24,
  },
  rsvpButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  rsvpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
