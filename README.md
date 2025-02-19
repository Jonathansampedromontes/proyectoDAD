<<<<<<< HEAD
# Viro Starter Kit

This is a new [**React Native**](https://reactnative.dev) project, set up with `@reactvision/react-viro`.

## How to Install Viro in an existing project?

If you are integrating ViroReact into an existing project, have a look at our [Installation instructions](https://viro-community.readme.io/docs/installation-instructions).

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions. Stop before you get to the `Creating a new application` section; we have done that for you!

## Step 1: Install Dependencies

```bash
npm install
```

### iOS only:

```bash
cd ios
pod install
cd ..
```

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

## Step 3: Start your Application

> **Warning**: Due to limitations of the Apple Simulator and the Android Emulator, you must run your project on a physical device.

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

```bash
# iOS
npx react-native run-ios
# Android
npx react-native run-android
```

If everything is set up _correctly_, you should see your new app running on you device.

#### Install CocoaPods

```bash
cd ios
pod install
cd ..
```

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 4: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

## Next Steps

Check out our [documentation](https://viro-community.readme.io/) for guides, examples, and more!

## Need help?

[Reach us in Discord.](https://discord.gg/YfxDBGTxvG) or submit an issue!
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
>>>>>>> f6553c0282ddb4400abd2fe802948cd3a7a24851
