# React Native interview

Read the get started doc to fire up the app on an iOS/Android simulator.

## Context

This is a simple postcode look up app. it returns data about that post code such as longitude and lattitude.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

---

- Allow the user to save Postcode to favourites by clicking on the Heart Button
- Favourite Postcodes should render in a list on Favourites view
- Allow the user to un-save Postcode from favourites
- The Heart Button should disabled if there are no searched results
- The Heart Button is filled, when searched result is already saved
- The Heart Button is empty, when searched result is not saved
