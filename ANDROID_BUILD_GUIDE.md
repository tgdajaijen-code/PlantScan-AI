# PlantScan AI - Android APK & AAB Production Build Guide

This document provides step-by-step instructions to compile and build **PlantScan AI** into a signed Android App Bundle (`.aab`) for Google Play Store publication or an Android Application Package (`.apk`) for side-loading.

---

## 1. Prerequisites

- **Node.js**: v18 or later
- **Android Studio**: Ladybug / Jellyfish or higher with Android SDK 34+
- **JDK**: Java 17 LTS

---

## 2. Prepare Web Build

First, compile the production-ready web application:

```bash
npm install
npm run build
```

This outputs static distribution assets into the `dist/` directory.

---

## 3. Initialize Capacitor for Native Android

If you haven't added the Android platform yet, run:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/camera @capacitor/geolocation
npx cap init "PlantScan AI" "com.plantscan.ai" --web-dir "dist"
npx cap add android
npx cap copy android
```

---

## 4. Android Manifest Permissions (`android/app/src/main/AndroidManifest.xml`)

Ensure the following permissions are set in your `AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="PlantScan AI"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:label="PlantScan AI"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

---

## 5. Build Android APK & AAB

Open Android Studio:

```bash
npx cap open android
```

### In Android Studio:
1. Go to **Build** → **Generate Signed Bundle / APK**.
2. Select **Android App Bundle (.aab)** for Google Play Store upload, or **APK** for direct device installation.
3. Select your Keystore (or click **Create new...** to create a production release key).
4. Choose **release** build variant.
5. Click **Create**.

Your release `.aab` file will be generated at:
`android/app/release/app-release.aab`

---

## 6. Pre-Flight Google Play Store Checklist

- [x] Package Name: `com.plantscan.ai`
- [x] High-resolution App Icon (512x512 PNG included in `/public/icon.svg`)
- [x] Privacy Policy URL & Opt-in settings
- [x] Target SDK 34+
- [x] Offline mode gracefully supported
- [x] Mock AI identification mode enabled by default (PlantNet API Key optional)
