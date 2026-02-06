# NBA Code Challenge

- [NBA Code Challenge](#nba-code-challenge)
  - [Installing the App (Only once)](#installing-the-app-only-once)
  - [Running the App](#running-the-app)
  - [Testing](#testing)
  - [Linting](#linting)
  - [Objetives](#objetives)
  - [Examples](#examples)

___

## Installing the App (Only once)
1. `npm i`
2. `npm start`
3. `emulator -avd <emulator-name>`
4. `npx react-native run-android` / `npx react-native run-ios`

## Running the App
1. `npm start`
2. `emulator -avd <emulator-name>`

## Troubleshooting

### Android Build Errors (aapt2 resource loading failures)

If you encounter build errors related to Android SDK or aapt2, try the following:

1. **Clean the build cache:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. **Clear gradle cache (if issue persists):**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew cleanBuildCache
   cd ..
   rm -rf android/.gradle
   rm -rf android/app/build
   ```

3. **Rebuild the app:**
   ```bash
   npx react-native run-android
   ```

**Note:** This project uses Android API level 34 and Kotlin 1.8.22. Make sure you have the Android SDK Platform 34 installed in your Android SDK Manager.

**Important:** Android API level 35 has known aapt2 resource table parsing bugs that cause build failures. Please use API level 34 instead.

### Kotlin Dexing Errors (D8/R8 failures)

If you encounter errors related to Kotlin dexing (e.g., `Error while dexing`, `com.android.tools.r8.kotlin`), this is usually due to Kotlin version incompatibility. The project uses:
- Android Gradle Plugin 7.4.2
- Kotlin 1.8.22
- React Native 0.68.2
- Android API level 34

These versions are tested and compatible. After pulling updates, clean your gradle cache as described above.

### Package/Namespace Compilation Errors

If you encounter errors like `package com.resulnba does not exist` or `MissingClass` when compiling, this typically means gradle cache needs to be cleared after namespace changes. The project configuration:
- Application ID: `com.resulnba`
- Namespace: `com.resulnba` (generates BuildConfig in this package)
- Java source package: `com.rn` (with explicit BuildConfig imports)
- AndroidManifest.xml: Uses fully qualified class names (e.g., `com.rn.MainActivity`)

The manifest declares `package="com.resulnba"` for the applicationId but references classes using their full package names (`com.rn.*`) since the Java source code is in a different package than the namespace.

After pulling updates, always clean gradle cache as described above.

### Jetifier Transformation Errors

If you encounter errors like `Failed to transform ... using Jetifier` or `Unsupported class file major version`, this indicates Jetifier is trying to process modern Java bytecode. The project configuration:
- **Jetifier is disabled** (`android.enableJetifier=false`)
- All dependencies use AndroidX natively
- No legacy `android.support.*` libraries

Jetifier is no longer needed for modern React Native projects. If you see Jetifier errors after pulling updates, ensure your gradle cache is clean as described above.

### Android Lint Errors

If you encounter lint errors during Android builds (e.g., `NewApi` errors from third-party libraries), the project is configured to handle these appropriately:
- Lint tasks are disabled for all libraries in `node_modules` (configured in `android/build.gradle`)
- Known issues in external dependencies are tracked in `android/app/lint-baseline.xml`
- New issues in project code will still fail the build to maintain code quality
- External dependencies are not checked to avoid false positives

The project uses two levels of lint configuration:

1. **Global configuration** in `android/build.gradle`:
   - Disables all lint tasks for projects in `node_modules`
   - Prevents third-party library lint tasks from running (e.g., `:react-native-change-icon:lintDebug`)

2. **App-level configuration** in `android/app/build.gradle`:
   - `baseline = file("lint-baseline.xml")` - Tracks known issues separately
   - `checkDependencies = false` - Skips checking external dependencies

This multi-level approach ensures the app's own code is checked while preventing build failures from third-party library lint issues. Java 8 features (like forEach in react-native-change-icon) are safely desugared by the Android build tools.

## Testing
- `npm run test:watch`

## Linting
- `npm run lint:fix`

## Objetives
- [ ] Read Sportsdata.io NBA [API docs](https://sportsdata.io/developers/api-documentation/nba).
- [ ] Create Sportsdata.io NBA [API key](https://sportsdata.io/cart/free-trial).
- [ ] Create a new Screen with a `<FlatList/>` component listing the active teams from the current season.
- [ ] Create a new Screen with a `<FlatList/>` component listing players from certain team.
  - [ ] Add a search bar.
- [ ] Create a new Screen with a detailed view of a player.
- [ ] Manage the state using [Zustand](https://github.com/pmndrs/zustand)
- [ ] Add tests using [React Native Testing Library](https://callstack.github.io/react-native-testing-library/docs/getting-started/)
    - [ ] Tapping on a team should open the team detail screen.
    - [ ] Tapping on a player should open the player detail screen.
    - [ ] Updating the search box input should update the player list.

## Exampless
<img src="https://cdn.dribbble.com/users/2539530/screenshots/8088320/media/cb83c6d48b6eae3d1c22190e662a77ee.jpg?compress=1&resize=400x300" alt="drawing" style="width:400px;"/>
<img src="https://cdn.dribbble.com/users/485682/screenshots/17474405/media/a4e888a7b3e45091327c3b2558922a15.jpg?compress=1&resize=400x300&vertical=top" alt="drawing" style="width:400px;"/>
