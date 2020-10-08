/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';



class App extends React.Component {

  render() {

    return (
      <>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </>
    );
  }
};

const styles = StyleSheet.create({
  
});

export default App;
