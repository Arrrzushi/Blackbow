import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { Users, Calendar, MessageSquare } from 'lucide-react-native';
import { Link } from 'expo-router';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DashboardCard = ({
  icon: Icon,
  title,
  colors,
  href,
  delay,
}: {
  icon: any;
  title: string;
  colors: string[];
  href: string;
  delay: number;
}) => (
  <Link href={href} asChild>
    <AnimatedPressable
      entering={FadeInUp.delay(delay)}
      style={styles.card}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <Icon size={32} color="white" />
        <Animated.Text style={styles.cardText}>{title}</Animated.Text>
      </LinearGradient>
    </AnimatedPressable>
  </Link>
);

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.delay(200)}
        style={styles.title}>
        Welcome Back!
      </Animated.Text>
      <View style={styles.grid}>
        <DashboardCard
          icon={Users}
          title="Find People"
          colors={['#FF2D55', '#FF2D55']}
          href="/people"
          delay={400}
        />
        <DashboardCard
          icon={Calendar}
          title="Find Events"
          colors={['#5856D6', '#5856D6']}
          href="/events"
          delay={600}
        />
        <DashboardCard
          icon={MessageSquare}
          title="Confessions"
          colors={['#FF9500', '#FF9500']}
          href="/confessions"
          delay={800}
        />
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});