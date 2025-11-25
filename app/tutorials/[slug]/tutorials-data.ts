export interface TutorialStep {
  title: string;
  content: string;
  code?: {
    language: string;
    code: string;
    filename?: string;
  };
  note?: string;
}

export interface Tutorial {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category:
    | "getting-started"
    | "features"
    | "deployment"
    | "optimization"
    | "integration";
  difficulty: "beginner" | "intermediate" | "advanced";
  timeToComplete: string;
  lastUpdated: string;
  summary: string;
  prerequisites: string[];
  whatYoullLearn: string[];
  steps: TutorialStep[];
  nextSteps: string[];
  relatedTutorials: string[];
}

export const tutorials: Tutorial[] = [
  {
    slug: "convert-nextjs-to-mobile-app",
    title: "How to Convert Your Next.js App to iOS & Android",
    metaTitle: "Convert Next.js App to iOS & Android Mobile Apps in 2025",
    metaDescription:
      "Convert Next.js to mobile app in 30 mins. Step-by-step Capacitor guide with code. Deploy to App Store & Google Play. Start free tutorial →",
    category: "getting-started",
    difficulty: "beginner",
    timeToComplete: "30 minutes",
    lastUpdated: "October 2025",
    summary:
      "Learn how to transform your Next.js web application into fully functional iOS and Android mobile apps using Capacitor. This guide covers installation, configuration, and deployment to app stores.",
    prerequisites: [
      "Existing Next.js application",
      "Node.js 18+ installed",
      "Basic knowledge of React",
      "Xcode (for iOS) or Android Studio (for Android)",
    ],
    whatYoullLearn: [
      "Install and configure Capacitor in a Next.js project",
      "Build your Next.js app for mobile",
      "Add native mobile capabilities",
      "Test your app on iOS and Android simulators",
      "Deploy to the App Store and Google Play",
    ],
    steps: [
      {
        title: "Install Capacitor",
        content:
          "First, install Capacitor core and CLI packages in your Next.js project. Make sure your Next.js app is working locally before proceeding.",
        code: {
          language: "bash",
          code: `npm install @capacitor/core @capacitor/cli
npx cap init`,
        },
        note: "When prompted, enter your app name and bundle ID (e.g., com.yourcompany.appname).",
      },
      {
        title: "Configure Next.js for Static Export",
        content:
          "Capacitor works best with static exports. Update your Next.js configuration to enable static site generation.",
        code: {
          language: "typescript",
          filename: "next.config.ts",
          code: `const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable trailing slashes for Capacitor
  trailingSlash: true,
};

export default nextConfig;`,
        },
        note: "The 'output: export' setting generates static HTML/CSS/JS files that Capacitor can wrap.",
      },
      {
        title: "Update Package.json Scripts",
        content:
          "Add convenient scripts to build and sync your app with mobile platforms.",
        code: {
          language: "json",
          filename: "package.json",
          code: `{
  "scripts": {
    "build": "next build",
    "cap:build": "npm run build && npx cap sync",
    "cap:ios": "npm run cap:build && npx cap open ios",
    "cap:android": "npm run cap:build && npx cap open android"
  }
}`,
        },
      },
      {
        title: "Configure Capacitor",
        content:
          "Update the Capacitor configuration to point to your build output directory.",
        code: {
          language: "typescript",
          filename: "capacitor.config.ts",
          code: `import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.appname',
  appName: 'Your App Name',
  webDir: 'out',
};

export default config;`,
        },
        note: "The 'webDir' should point to 'out' since that's where Next.js exports static files.",
      },
      {
        title: "Add iOS and Android Platforms",
        content:
          "Now add the iOS and Android platforms to your project. This creates native project folders.",
        code: {
          language: "bash",
          code: `npx cap add ios
npx cap add android`,
        },
        note: "This will create 'ios' and 'android' folders in your project root.",
      },
      {
        title: "Build and Sync Your App",
        content:
          "Build your Next.js app and sync it with the native platforms.",
        code: {
          language: "bash",
          code: `npm run build
npx cap sync`,
        },
        note: "Run 'npx cap sync' whenever you make changes to your web code or add new Capacitor plugins.",
      },
      {
        title: "Open in Xcode or Android Studio",
        content:
          "Open your project in the respective IDE to test and build for mobile.",
        code: {
          language: "bash",
          code: `# For iOS
npx cap open ios

# For Android
npx cap open android`,
        },
        note: "You'll need Xcode for iOS development (Mac only) and Android Studio for Android development.",
      },
      {
        title: "Test on Simulators/Emulators",
        content:
          "In Xcode or Android Studio, select a simulator/emulator and click the Run button. Your Next.js app will launch as a native mobile app!",
        note: "Common issues: Make sure your build completed successfully and the 'out' directory exists.",
      },
      {
        title: "Add Mobile-Specific Features (Optional)",
        content:
          "Enhance your app with native capabilities like camera, push notifications, or file access.",
        code: {
          language: "bash",
          code: `# Install plugins
npm install @capacitor/camera
npm install @capacitor/push-notifications

# Sync with native projects
npx cap sync`,
        },
        note: "Each Capacitor plugin provides native functionality through a JavaScript API.",
      },
    ],
    nextSteps: [
      "Add app icons and splash screens",
      "Configure push notifications",
      "Set up in-app purchases with RevenueCat",
      "Implement deep linking",
      "Prepare for App Store submission",
    ],
    relatedTutorials: [
      "add-push-notifications-nextjs",
      "setup-in-app-purchases",
      "deploy-to-app-store",
    ],
  },
  {
    slug: "add-push-notifications-nextjs",
    title: "How to Add Push Notifications to Your Next.js Mobile App",
    metaTitle: "Add Push Notifications to Next.js Mobile App (iOS & Android)",
    metaDescription:
      "Add push notifications to Next.js in 45 mins. Firebase + Capacitor guide with code. iOS & Android. Free tutorial with examples →",
    category: "features",
    difficulty: "intermediate",
    timeToComplete: "45 minutes",
    lastUpdated: "October 2025",
    summary:
      "Implement push notifications in your Next.js mobile app using Capacitor's Push Notifications plugin and Firebase Cloud Messaging. Send notifications to iOS and Android users.",
    prerequisites: [
      "Next.js app with Capacitor configured",
      "Firebase project created",
      "Apple Developer account (for iOS)",
      "Google Play Console access (for Android)",
    ],
    whatYoullLearn: [
      "Set up Firebase Cloud Messaging",
      "Configure iOS push notification certificates",
      "Configure Android push notifications",
      "Request notification permissions",
      "Handle incoming notifications",
      "Send test notifications",
    ],
    steps: [
      {
        title: "Install Push Notifications Plugin",
        content:
          "Install the Capacitor Push Notifications plugin in your project.",
        code: {
          language: "bash",
          code: `npm install @capacitor/push-notifications
npx cap sync`,
        },
      },
      {
        title: "Set Up Firebase Project",
        content:
          "Create a Firebase project if you haven't already, then add iOS and Android apps to your Firebase project. Download the configuration files.",
        note: "Download google-services.json (Android) and GoogleService-Info.plist (iOS) from Firebase Console.",
      },
      {
        title: "Configure iOS Push Notifications",
        content:
          "Add the GoogleService-Info.plist to your Xcode project and enable Push Notifications capability.",
        code: {
          language: "text",
          code: `1. Open your project in Xcode: npx cap open ios
2. Drag GoogleService-Info.plist into the App folder
3. Go to Signing & Capabilities
4. Click + Capability → Push Notifications
5. Add Background Modes → Remote notifications`,
        },
        note: "You'll also need to create an APNs key in your Apple Developer account and upload it to Firebase.",
      },
      {
        title: "Configure Android Push Notifications",
        content: "Add the google-services.json file to your Android project.",
        code: {
          language: "bash",
          code: `# Copy google-services.json to android/app/
cp google-services.json android/app/`,
        },
      },
      {
        title: "Request Notification Permissions",
        content:
          "Create a hook or component to request notification permissions when your app launches.",
        code: {
          language: "typescript",
          filename: "hooks/usePushNotifications.ts",
          code: `import { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';

export function usePushNotifications() {
  useEffect(() => {
    // Request permission
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google
        PushNotifications.register();
      }
    });

    // Listen for registration
    PushNotifications.addListener('registration', token => {
      console.log('Push token:', token.value);
      // Send token to your backend
    });

    // Listen for push notifications
    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Notification received:', notification);
    });

    // Handle notification tap
    PushNotifications.addListener('pushNotificationActionPerformed', action => {
      console.log('Notification action:', action);
    });
  }, []);
}`,
        },
      },
      {
        title: "Use the Hook in Your App",
        content:
          "Import and use the push notifications hook in your root layout or app component.",
        code: {
          language: "typescript",
          filename: "app/layout.tsx",
          code: `'use client';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function RootLayout({ children }) {
  usePushNotifications();
  
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}`,
        },
      },
      {
        title: "Send a Test Notification",
        content:
          "Use Firebase Console to send a test notification to your device.",
        code: {
          language: "text",
          code: `1. Go to Firebase Console → Cloud Messaging
2. Click "Send your first message"
3. Enter notification title and text
4. Click "Send test message"
5. Paste your device token
6. Click "Test"`,
        },
        note: "Your app must be running on a real device (not simulator) to receive push notifications.",
      },
      {
        title: "Handle Notification Actions",
        content:
          "Navigate users to specific screens when they tap notifications.",
        code: {
          language: "typescript",
          code: `PushNotifications.addListener(
  'pushNotificationActionPerformed',
  (action) => {
    const data = action.notification.data;
    
    // Navigate based on notification data
    if (data.screen === 'profile') {
      router.push('/profile');
    } else if (data.screen === 'post') {
      router.push(\`/posts/\${data.postId}\`);
    }
  }
);`,
        },
      },
    ],
    nextSteps: [
      "Set up a backend to send notifications programmatically",
      "Implement notification badges",
      "Add rich notifications with images",
      "Set up notification channels (Android)",
      "Track notification analytics",
    ],
    relatedTutorials: [
      "convert-nextjs-to-mobile-app",
      "setup-in-app-purchases",
      "add-deep-linking",
    ],
  },
  {
    slug: "setup-in-app-purchases",
    title: "How to Add In-App Purchases to Your Next.js App",
    metaTitle: "Set Up In-App Purchases in Next.js Mobile App with RevenueCat",
    metaDescription:
      "Add in-app purchases to Next.js in 60 mins. RevenueCat + Capacitor guide. iOS & Android subscriptions. Complete tutorial with code →",
    category: "features",
    difficulty: "intermediate",
    timeToComplete: "60 minutes",
    lastUpdated: "October 2025",
    summary:
      "Monetize your Next.js mobile app with in-app purchases and subscriptions using RevenueCat. This guide covers setup, implementation, and testing for both iOS and Android.",
    prerequisites: [
      "Next.js app with Capacitor configured",
      "App published on App Store Connect (iOS) or Google Play Console (Android)",
      "RevenueCat account (free tier available)",
      "Understanding of app monetization basics",
    ],
    whatYoullLearn: [
      "Set up RevenueCat for your app",
      "Create products in App Store Connect and Google Play",
      "Install and configure RevenueCat SDK",
      "Display available products",
      "Handle purchase flows",
      "Verify purchase receipts",
      "Restore purchases",
    ],
    steps: [
      {
        title: "Create RevenueCat Account",
        content:
          "Sign up for a free RevenueCat account at revenuecat.com. RevenueCat handles the complexity of in-app purchases across platforms.",
        note: "RevenueCat is free for up to $10k monthly tracked revenue.",
      },
      {
        title: "Configure App in RevenueCat",
        content: "Add your iOS and Android apps in the RevenueCat dashboard.",
        code: {
          language: "text",
          code: `1. Go to RevenueCat Dashboard → Projects
2. Click "Add App"
3. Enter your iOS Bundle ID and Android Package Name
4. Upload App Store Connect API key (iOS)
5. Upload Google Play service account JSON (Android)`,
        },
      },
      {
        title: "Create Products in App Stores",
        content:
          "Create your in-app purchase products in App Store Connect and Google Play Console.",
        note: "Product IDs should be the same across both platforms for easier management (e.g., 'premium_monthly').",
      },
      {
        title: "Configure Products in RevenueCat",
        content: "Set up your products and offerings in RevenueCat dashboard.",
        code: {
          language: "text",
          code: `1. Go to Products → Add Product
2. Enter product ID from app stores
3. Create an Offering (e.g., "premium")
4. Add products to the offering
5. Make offering the default`,
        },
      },
      {
        title: "Install RevenueCat SDK",
        content:
          "Install the RevenueCat Capacitor plugin in your Next.js project.",
        code: {
          language: "bash",
          code: `npm install @revenuecat/purchases-capacitor
npx cap sync`,
        },
      },
      {
        title: "Initialize RevenueCat",
        content: "Configure RevenueCat in your app with your API keys.",
        code: {
          language: "typescript",
          filename: "lib/revenuecat.ts",
          code: `import { Purchases } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

export async function initializeRevenueCat() {
  if (!Capacitor.isNativePlatform()) {
    return; // RevenueCat only works on native platforms
  }

  const platform = Capacitor.getPlatform();
  const apiKey = platform === 'ios' 
    ? process.env.NEXT_PUBLIC_REVENUECAT_IOS_KEY!
    : process.env.NEXT_PUBLIC_REVENUECAT_ANDROID_KEY!;

  await Purchases.configure({ apiKey });
  
  console.log('RevenueCat initialized');
}`,
        },
      },
      {
        title: "Call Initialization on App Start",
        content: "Initialize RevenueCat when your app launches.",
        code: {
          language: "typescript",
          filename: "app/layout.tsx",
          code: `'use client';
import { useEffect } from 'react';
import { initializeRevenueCat } from '@/lib/revenuecat';

export default function RootLayout({ children }) {
  useEffect(() => {
    initializeRevenueCat();
  }, []);
  
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}`,
        },
      },
      {
        title: "Fetch Available Products",
        content: "Create a component to display available in-app purchases.",
        code: {
          language: "typescript",
          filename: "components/PremiumUpgrade.tsx",
          code: `'use client';
import { useState, useEffect } from 'react';
import { Purchases } from '@revenuecat/purchases-capacitor';

export default function PremiumUpgrade() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOfferings() {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (error) {
        console.error('Error fetching offerings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOfferings();
  }, []);

  async function handlePurchase(pkg: any) {
    try {
      const result = await Purchases.purchasePackage({ 
        aPackage: pkg 
      });
      
      if (result.customerInfo.entitlements.active['premium']) {
        alert('Purchase successful! You now have premium access.');
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        alert('Purchase failed: ' + error.message);
      }
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Upgrade to Premium</h2>
      {packages.map((pkg: any) => (
        <button 
          key={pkg.identifier}
          onClick={() => handlePurchase(pkg)}
        >
          {pkg.product.title} - {pkg.product.priceString}
        </button>
      ))}
    </div>
  );
}`,
        },
      },
      {
        title: "Check User Subscription Status",
        content:
          "Create a utility to check if the user has an active subscription.",
        code: {
          language: "typescript",
          filename: "lib/checkPremium.ts",
          code: `import { Purchases } from '@revenuecat/purchases-capacitor';

export async function checkPremiumStatus(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.customerInfo.entitlements.active['premium'] !== undefined;
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
}`,
        },
      },
      {
        title: "Implement Restore Purchases",
        content:
          "Add a button to restore previous purchases (required by Apple).",
        code: {
          language: "typescript",
          code: `async function restorePurchases() {
  try {
    const customerInfo = await Purchases.restorePurchases();
    
    if (customerInfo.customerInfo.entitlements.active['premium']) {
      alert('Purchases restored! You have premium access.');
    } else {
      alert('No previous purchases found.');
    }
  } catch (error) {
    alert('Failed to restore purchases');
  }
}`,
        },
      },
    ],
    nextSteps: [
      "Add subscription management UI",
      "Implement promotional offers",
      "Set up webhook for backend verification",
      "Add analytics tracking for purchases",
      "Test subscription lifecycle",
    ],
    relatedTutorials: [
      "convert-nextjs-to-mobile-app",
      "add-push-notifications-nextjs",
      "deploy-to-app-store",
    ],
  },
  {
    slug: "build-ios-app-nextjs",
    title: "How to Build an iOS App with Next.js in 2025",
    metaTitle: "Build iOS App with Next.js and Capacitor - Complete Guide",
    metaDescription:
      "Build iOS app with Next.js in 45 mins. Capacitor tutorial from setup to App Store. Works on iPhone/iPad. Start free guide →",
    category: "getting-started",
    difficulty: "beginner",
    timeToComplete: "45 minutes",
    lastUpdated: "October 2025",
    summary:
      "Turn your Next.js web app into a native iOS application using Capacitor. This step-by-step guide covers everything from initial setup to publishing on the App Store.",
    prerequisites: [
      "Next.js project ready",
      "macOS computer (required for iOS development)",
      "Xcode installed from Mac App Store",
      "Apple Developer account ($99/year)",
    ],
    whatYoullLearn: [
      "Configure Next.js for iOS development",
      "Set up Capacitor for iOS",
      "Build and run your app in iOS Simulator",
      "Add iOS-specific features",
      "Prepare for App Store submission",
    ],
    steps: [
      {
        title: "Install Xcode and Command Line Tools",
        content: `<div style="display: flex; flex-direction: column; gap: 16px;">
        <div>Download Xcode from the Mac App Store (it's large, ~10GB).</div>
         <div>After installation, install the command line tools.</div>
         </div>`,
        code: {
          language: "bash",
          code: `# Verify installation
xcode-select -p
          
# Install command line tools if not already installed
xcode-select --install

`,
        },
        note: "Xcode is required for iOS development and can only run on macOS.",
      },
      {
        title: "Configure Next.js for Static Export",
        content:
          "iOS apps need static files. Configure Next.js to export a static site.",
        code: {
          language: "typescript",
          filename: "next.config.ts",
          code: `const nextConfig = {
  // Export statically for native builds
  ...(process.env.IS_NATIVE && {
    env: {
      IS_NATIVE: "true",
    },
    output: "export",
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;`,
        },
      },
      {
        title: "Update package.json scripts",
        content:
          "Add scripts to build and open the iOS project easily in dev mode.",
        code: {
          language: "json",
          filename: "package.json",
          code: `"mobile": "cross-env IS_NATIVE=true npm run build && cross-env IS_NATIVE=true npx cap sync",
"mobile:dev": "cross-env IS_NATIVE=true npm run build && cross-env IS_NATIVE=true npx cap sync && npm run dev"`,
        },
      },
      {
        title: "Install and Initialize Capacitor",
        content:
          "Add Capacitor to your Next.js project and configure it for iOS.",
        code: {
          language: "bash",
          code: `npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init`,
        },
        note: "When prompted, enter your app name and bundle ID (e.g., com.yourcompany.appname).",
      },
      {
        title: "Update Capacitor Config",
        content: "Configure Capacitor to use the correct build directory.",
        code: {
          language: "typescript",
          filename: "capacitor.config.ts",
          code: `import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.appname',
  appName: 'Your App Name',
  webDir: 'out',
  ios: {
    schema: 'YourAppName',
  }
};

export default config;`,
        },
      },
      {
        title: "Add iOS Platform",
        content:
          "Add the iOS platform to your project. This creates an ios folder with an Xcode project.",
        code: {
          language: "bash",
          code: `npx cap add ios`,
        },
      },
      {
        title: "Build Your Next.js App",
        content: "Build your Next.js app and sync it with the iOS project.",
        code: {
          language: "bash",
          code: `npm run build
npx cap sync ios`,
        },
        note: "Run 'npx cap sync ios' every time you update your web code.",
      },
      {
        title: "Open in Xcode",
        content:
          "Open your iOS project in Xcode to configure signing and build settings.",
        code: {
          language: "bash",
          code: `npx cap open ios`,
        },
      },
      {
        title: "Configure Signing in Xcode",
        content: `<div>
          <div>Set up code signing so you can run your app on devices and submit to the App Store.</div>
          <br/> 
          <div>1. Select your project in the left sidebar</div>
           <br/> 
          <div>2. Select the <strong>App</strong> target</div>
           <br/> 
          <div>3. Go to <strong>Signing & Capabilities</strong> tab</div>
           <br/> 
          <div>4. Check <strong>Automatically manage signing</strong></div>
           <br/> 
          <div>5. Select your development team</div>
           <br/> 
          <div>6. Xcode will create a provisioning profile</div>
          </div>`,
        //         code: {
        //           language: "text",
        //           code: `1. Select your project in the left sidebar
        // 2. Select the "App" target
        // 3. Go to "Signing & Capabilities" tab
        // 4. Check "Automatically manage signing"
        // 5. Select your development team
        // 6. Xcode will create a provisioning profile`,
        //         },
        note: `<div>You need an <a href=""https://developer.apple.com>Apple Developer account</a> to sign apps.</div>`,
      },
      {
        title: "Run on iOS Simulator",
        content: `<div>
          <div>Test your app on the iOS Simulator before deploying to a real device.</div>
          <br/> 
          <div>1. In Xcode, select a simulator (e.g., iPhone 15 Pro)</div>
           <br/> 
          <div>2. Click the <strong>Play </strong> button or press Cmd+R</div>
           <br/> 
          <div>3. Wait for the simulator to boot and your app to launch</div>
          </div>`,
        note: "First launch can take a few minutes. Subsequent launches are lighting-fast.",
      },
      {
        title: "Test on a Real Device",
        content: `<div>
          <div>Connect your iPhone or iPad via USB to test on a real device.</div>
          <br/> 
          <div>1. Connect your iPhone <strong>via USB</strong></div>
           <br/> 
          <div>2. Trust the computer on your device</div>
           <br/> 
          <div>3. Select your device in Xcode <strong>(top bar)</strong></div>
           <br/> 
          <div>4. Click <strong>Play</strong> to build and run</div>
           <br/> 
          <div>5. Trust the <strong>developer certificate</strong> on your device</div>
          </div>`,
        note: "Go to Settings → General → VPN & Device Management to trust the certificate.",
      },
    ],
    nextSteps: [
      "Add app icon and splash screen",
      "Configure display name and version",
      "Add privacy descriptions for permissions",
      "Test on multiple iOS versions",
      "Prepare for App Store submission",
    ],
    relatedTutorials: [
      "convert-nextjs-to-mobile-app",
      "deploy-to-app-store",
      "add-app-icon-splash-screen",
    ],
  },
  {
    slug: "deploy-to-app-store",
    title: "How to Deploy Your Next.js App to the App Store",
    metaTitle: "Deploy Next.js App to iOS App Store - Complete Guide 2025",
    metaDescription:
      "Deploy to App Store in 90 mins. Next.js submission guide: TestFlight, review process, approval. Step-by-step tutorial →",
    category: "deployment",
    difficulty: "intermediate",
    timeToComplete: "90 minutes",
    lastUpdated: "October 2025",
    summary:
      "Learn how to prepare, build, and submit your Next.js mobile app to the Apple App Store. This guide covers everything from app icons to App Store Connect configuration.",
    prerequisites: [
      "Completed Next.js iOS app",
      "Apple Developer account ($99/year)",
      "App tested on real iOS device",
      "App icons and screenshots ready",
    ],
    whatYoullLearn: [
      "Prepare your app for production",
      "Create app in App Store Connect",
      "Generate production build",
      "Upload to App Store Connect",
      "Submit for review",
      "Handle app review process",
    ],
    steps: [
      {
        title: "Prepare App Metadata",
        content:
          "Gather all required information for your App Store listing before you begin.",
        code: {
          language: "text",
          code: `Required information:
- App name (30 characters max)
- Subtitle (30 characters max)
- Description (4000 characters max)
- Keywords (100 characters, comma-separated)
- Support URL
- Marketing URL (optional)
- Privacy Policy URL
- App category
- App icon (1024x1024px PNG)
- Screenshots for all device sizes`,
        },
      },
      {
        title: "Add App Icon",
        content: "Add your 1024x1024px app icon to the Xcode project assets.",
        code: {
          language: "text",
          code: `1. Open your project in Xcode: npx cap open ios
2. Navigate to App → App → Assets.xcassets
3. Click on "AppIcon"
4. Drag your 1024x1024px icon to the "App Store iOS 1024pt" slot`,
        },
        note: "Your icon should be a PNG with no transparency and no alpha channel.",
      },
      {
        title: "Update App Version and Build Number",
        content: "Set your app version and build number in Xcode.",
        code: {
          language: "text",
          code: `1. Select your project in Xcode
2. Select the "App" target
3. Go to "General" tab
4. Set Version to "1.0.0"
5. Set Build to "1"`,
        },
        note: "Version uses semantic versioning (1.0.0). Build number must increment with each upload.",
      },
      {
        title: "Create App in App Store Connect",
        content: "Create a new app listing in App Store Connect.",
        code: {
          language: "text",
          code: `1. Go to appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Select iOS platform
4. Enter app name (must be unique)
5. Select primary language
6. Enter Bundle ID (must match Xcode)
7. Enter SKU (unique identifier, use bundle ID)
8. Click "Create"`,
        },
      },
      {
        title: "Configure App Store Information",
        content: "Fill in all required app information in App Store Connect.",
        code: {
          language: "text",
          code: `1. Add app subtitle and description
2. Upload screenshots (required for all device sizes)
3. Upload app preview videos (optional)
4. Enter keywords
5. Set support and privacy URLs
6. Choose app category and subcategory
7. Set content rights and age rating`,
        },
        note: "Use Apple's App Store Connect Help for screenshot dimensions.",
      },
      {
        title: "Create Archive in Xcode",
        content: "Build an archive of your app for distribution.",
        code: {
          language: "text",
          code: `1. In Xcode, select "Any iOS Device (arm64)" as destination
2. Go to Product → Archive
3. Wait for archive process to complete
4. Xcode will open the Organizer window`,
        },
        note: "Make sure you're building for 'Generic iOS Device' and not a simulator.",
      },
      {
        title: "Upload to App Store Connect",
        content: "Distribute your archive to App Store Connect.",
        code: {
          language: "text",
          code: `1. In Organizer, select your archive
2. Click "Distribute App"
3. Select "App Store Connect"
4. Click "Upload"
5. Select your distribution options
6. Review and upload
7. Wait for upload to complete (5-30 minutes)`,
        },
        note: "Apple will process your build. You'll receive an email when it's ready (30-60 minutes).",
      },
      {
        title: "Submit for Review",
        content: "Once your build is processed, submit your app for review.",
        code: {
          language: "text",
          code: `1. Go back to App Store Connect
2. Open your app
3. Go to "App Store" tab
4. Scroll to "Build" section
5. Click "+" and select your uploaded build
6. Fill in "What's New in This Version"
7. Add app review information (test account, notes)
8. Click "Submit for Review"`,
        },
      },
      {
        title: "Monitor Review Status",
        content: "Track your app's review status and respond to any feedback.",
        note: "Review typically takes 24-48 hours. Apple may request changes or clarifications. Respond promptly to avoid delays.",
      },
    ],
    nextSteps: [
      "Set up TestFlight for beta testing",
      "Prepare marketing materials",
      "Plan your launch strategy",
      "Monitor user reviews and ratings",
      "Prepare updates and bug fixes",
    ],
    relatedTutorials: [
      "build-ios-app-nextjs",
      "setup-testflight-beta-testing",
      "app-store-optimization",
    ],
  },
];
