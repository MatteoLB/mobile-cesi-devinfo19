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
import { SafeAreaView, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import { InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

class App extends React.Component {

  state = {
    pubsEnabled: true
  };


  componentDidMount() {
    interstitial.load();
  }


  render() {
    const pubsEnabled = this.state.pubsEnabled;

    
    return (

      <SafeAreaView>

        { pubsEnabled && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} 
                                    requestOptions={{requestNonPersonalizedAdsOnly: true,}}
                         /> }
        

        { pubsEnabled && 
          <TouchableOpacity onPress={ () => { this.setState({ pubsEnabled: false }) } } style={styles.buttonPub}>
            <Text style={styles.buttonText}>Désactiver les pubs</Text>
          </TouchableOpacity> 
        }
        { !pubsEnabled && 
          <TouchableOpacity onPress={ () => { this.setState({ pubsEnabled: true }) } } style={styles.buttonPub}>
            <Text style={styles.buttonText}>Activer les pubs</Text>
          </TouchableOpacity> 
        }
        
        <TouchableOpacity style={styles.buttonInterstitial}
          onPress={() => {
            interstitial.show();
          }}
        >
          <Text style={styles.buttonText}>Pub interstitielle</Text>
        </TouchableOpacity>
      </SafeAreaView>

    );
  }
};

const styles = StyleSheet.create({
  buttonPub: {
    backgroundColor: 'blue',
    padding: 30,
    marginTop: 50,
    color: 'white'
  },
  buttonInterstitial: {
    backgroundColor: 'red',
    padding: 30,
    marginTop: 50
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});

export default App;
