# Black Bow 🏹

A modern, feature-rich React Native social app built with Expo, designed for college students to connect, share, and explore campus life.

## Overview

**Black Bow** is a vibrant mobile application that enables college students to discover people, find events, share anonymous confessions, and manage their profiles—all in one sleek, intuitive interface. Built with cutting-edge React Native technologies and stunning UI/UX design, it creates a seamless social experience across iOS, Android, and Web platforms.

## Features

### 🏠 **Home Dashboard**
A welcoming hub with quick-access cards to all major features:
- **Find People** - Swipe through user profiles to discover and connect
- **Find Events** - Explore upcoming campus events and activities
- **Confessions** - View and interact with anonymous community confessions

### 🎭 **Shuffle (Discovery)**
Interactive card-based swiping interface inspired by modern dating apps:
- Gesture-based swiping to accept/reject profiles
- Smooth card animations with rotation effects
- Haptic feedback for tactile user engagement
- Profile information including name, branch, and year
- Dummy data with beautiful unsplash images

### 💬 **Confessions**
Anonymous community messaging platform:
- Post confessions anonymously without attribution
- Community voting system (upvote/downvote)
- Real-time confession feed
- Text input with send functionality
- Haptic feedback for interactions

### 📅 **Events**
Campus event discovery and RSVP system:
- Browse upcoming campus events with details
- Event cards with images, dates, and locations
- Event descriptions and RSVP functionality
- Smooth scrolling interface
- Haptic feedback on RSVP interactions

### 👤 **Profile**
Personal profile management with editing capabilities:
- Avatar display with profile image
- Editable fields: Name, Branch, Year, Bio
- Blur effect on profile card (iOS) with fallback (Android)
- Profile editing mode with multi-field support
- Persistent profile state

## Tech Stack

### Frontend
- **React Native** (v0.76.6) - Cross-platform mobile framework
- **React** (v18.3.1) - UI library
- **TypeScript** - Type-safe development
- **Expo Router** (v4.0.17) - File-based routing with full native support
- **Expo** (v52.0.33) - Development platform and native modules

### Animations & Interactions
- **React Native Reanimated** (v3.16.7) - High-performance animations
- **React Native Gesture Handler** (v2.23.0) - Advanced gesture recognition
- **Expo Haptics** - Haptic feedback and vibrations

### UI Components & Design
- **Lucide React Native** (v0.475.0) - Beautiful, consistent icons
- **Expo Linear Gradient** - Gradient backgrounds
- **Expo Blur** - Blur effects for modern glass-morphism design
- **React Navigation** (v7.x) - Bottom tab navigation

### Native Modules
- **Expo Constants** - Access app constants and metadata
- **Expo Linking** - Deep linking support
- **Expo Splash Screen** - Custom splash screens
- **Expo Status Bar** - Status bar styling
- **Expo System UI** - System UI integration
- **Expo Web Browser** - Web browser functionality

### Tools & Configuration
- **Prettier** - Code formatting (2-space tabs)
- **ESLint** - Code quality via Expo Lint

## Project Structure

```
blackbow/
├── app/                          # Expo Router app structure
│   ├── _layout.tsx              # Root layout with gesture handler wrapper
│   ├── +not-found.tsx           # 404 fallback screen
│   └── (tabs)/                  # Tab-based navigation group
│       ├── _layout.tsx          # Tab navigator configuration
│       ├── index.tsx            # Home/Dashboard screen
│       ├── shuffle.tsx          # Profile discovery swiping
│       ├── confessions.tsx      # Anonymous confessions feed
│       ├── events.tsx           # Event listing and details
│       └── profile.tsx          # User profile management
├── android/                      # Android native code
│   ├── app/                     # Android app module
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/       # Kotlin/Java source
│   │   │   │   └── res/        # Android resources
│   │   │   └── debug/
│   │   └── build.gradle
│   ├── build.gradle
│   ├── gradle.properties
│   └── settings.gradle
├── hooks/
│   └── useFrameworkReady.ts     # Framework initialization hook
├── assets/
│   └── images/                  # App icons and images
├── app.json                     # Expo configuration
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites
- Node.js (v18+) and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS: Xcode and CocoaPods (for iOS development)
- Android: Android Studio and Android SDK

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blackbow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This starts the Expo development server with telemetry disabled for privacy.

### Running on Different Platforms

**Web**
```bash
npm run build:web
# or for development
expo start --web
```

**Android**
```bash
npm run android
```
Requires Android SDK and emulator/device connected.

**iOS**
```bash
npm run ios
```
Requires macOS with Xcode installed.

## Usage Guide

### Home Screen
- Tap any of the three main cards to navigate to that feature
- Smooth fade-in animations on load

### Shuffle (Discovery)
- **Swipe left** to skip a profile (dislike)
- **Swipe right** to like a profile
- **Tap X button** to explicitly dislike
- **Tap ✓ button** to explicitly like
- Card rotation animates with swipe direction
- Haptic feedback confirms actions

### Confessions
- **Write a confession** in the input field at the top
- **Tap send button** to post anonymously
- **Upvote/Downvote** confessions using the arrow buttons
- Vote count displays in real-time

### Events
- **Scroll** through the event list
- **View details** including date, location, and description
- **Tap RSVP Now** to register for an event

### Profile
- **View your profile** with avatar and details
- **Tap the edit button** (pencil icon) to enter edit mode
- **Modify any field** in edit mode
- **Tap edit button again** to save changes

## Development Scripts

```json
{
  "dev": "EXPO_NO_TELEMETRY=1 expo start",     // Start dev server
  "build:web": "expo export --platform web",   // Build web version
  "lint": "expo lint",                         // Run ESLint
  "android": "expo run:android",               // Run on Android
  "ios": "expo run:ios"                        // Run on iOS
}
```

## Key Technologies & Why

| Technology | Why Used |
|---|---|
| **Expo Router** | File-based routing with native support; simpler than RN Navigation |
| **React Native Reanimated** | 60 FPS animations; gesture-driven interactions |
| **Gesture Handler** | Precise touch event handling for swipe cards |
| **TypeScript** | Type safety reduces bugs; better developer experience |
| **Lucide Icons** | Consistent, beautiful icon set across platforms |
| **Expo Haptics** | Enhanced UX with tactile feedback (non-web) |

## Code Style

The project follows Prettier formatting standards:
- 2-space tabs
- Bracket spacing enabled
- Single quotes for strings
- Configured in `.prettierrc`

Run linting:
```bash
npm run lint
```

## Android Configuration

- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Build Tools**: 35.0.0
- **Kotlin Version**: 1.9.25
- **New Architecture**: Enabled for React Native 0.76+
- **Hermes Engine**: Enabled for faster startup

## Android Build Setup

The Android build includes:
- Expo modules auto-linking
- Support for GIF and WebP images
- Network inspector for development
- Hermes JavaScript engine
- React Native New Architecture support

## Customization

### Colors
Modify colors in:
- Android: `android/app/src/main/res/values/colors.xml`
- iOS: Configure in app.json

### App Name & Icons
- Update app name in `app.json` and `android/app/src/main/res/values/strings.xml`
- Add icon at `assets/images/icon.png`

### API Integration
Currently using dummy data. To connect real APIs:
1. Update data fetching in screen components
2. Add API client library (e.g., axios, fetch)
3. Implement state management (Context API, Redux)

## Performance Features

- **Optimized Animations**: Reanimated JS thread processing
- **Lazy Loading**: Route-based code splitting with Expo Router
- **Image Optimization**: Resizing via URL parameters (`?w=800`)
- **Gesture Processing**: Off-main-thread gesture handling
- **Hermes Engine**: Faster JavaScript execution on Android

## Platform Support

| Platform | Status | Notes |
|---|---|---|
| **iOS** | ✅ Full Support | Tested on iOS 13+ |
| **Android** | ✅ Full Support | API 24+ (Android 7.0+) |
| **Web** | ✅ Supported | Via expo-web; some animations may vary |

## Accessibility

- Haptic feedback toggleable per device capability
- High contrast colors for readability
- Large touch targets (minimum 44x44 points)
- Semantic HTML in web version

## Contributing

1. Create a feature branch
2. Make changes and test thoroughly
3. Run `npm run lint` before committing
4. Follow the existing code style

## License

Proprietary - All rights reserved

## Support

For issues, feature requests, or questions:
- Create an issue in the repository
- Check existing documentation in the README
- Test on both iOS and Android platforms

## Future Enhancements

- [ ] User authentication and backend integration
- [ ] Real-time messaging with WebSockets
- [ ] Location-based event recommendations
- [ ] Dark mode theme toggle
- [ ] Notification system
- [ ] User profiles with photos
- [ ] Event calendar view
- [ ] Advanced search and filters
- [ ] Social sharing features
- [ ] Analytics and insights

---

**Built with ❤️ using React Native & Expo**

*Last updated: January 2026*
