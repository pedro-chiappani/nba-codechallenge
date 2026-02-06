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

**Note:** This project uses Android API level 34. Make sure you have the Android SDK Platform 34 installed in your Android SDK Manager.

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
