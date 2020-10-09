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
import { RewardedAd, RewardedAdEventType, AdEventType, InterstitialAd, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

class App extends React.Component {

  state = {
    pubsEnabled: true,
    loaded: false,
    rewardCount: 0
  };


  componentDidMount() {
    interstitial.load();
    rewarded.load();

    interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        this.setState({loaded: true});
      }
      if (type === AdEventType.CLOSED) {
        console.log('closed');
        this.setState({loaded: false});
        interstitial.load();
      }
    });

    rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        this.setState({loaded: true});
      }


      if (type === AdEventType.CLOSED) {
        this.setState({loaded: false});
        rewarded.load();
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
        this.setState({ rewardCount: this.state.rewardCount + Number(reward.amount) });
      }
    });
  }




  render() {
    const pubsEnabled = this.state.pubsEnabled;

    
    return (

      <SafeAreaView style={styles.container}>
        

        { pubsEnabled && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.SMART_BANNER} 
                                    requestOptions={{requestNonPersonalizedAdsOnly: true,}}
                         /> }
        
        

        { pubsEnabled && 
          <TouchableOpacity onPress={ () => { this.setState({ pubsEnabled: false }) } } style={styles.buttonPub}>
            <Text style={styles.buttonText}>Désactiver la bannière pub</Text>
          </TouchableOpacity> 
        }

        { !pubsEnabled && 
          <TouchableOpacity onPress={ () => { this.setState({ pubsEnabled: true }) } } style={styles.buttonPub}>
            <Text style={styles.buttonText}>Activer la bannière pub</Text>
          </TouchableOpacity> 
        }
        
        
        <TouchableOpacity style={styles.buttonInterstitial} onPress={() => { interstitial.show() }}>
          <Text style={styles.buttonText}>Afficher une pub interstitielle</Text>
        </TouchableOpacity>

        


        <TouchableOpacity style={styles.buttonReward} onPress={() => { rewarded.show(); }}>
          <Text style={styles.buttonText}>Obtenir une récompense en regardant une pub</Text>
        </TouchableOpacity>


        <Text style={styles.rewardText}>Vos récompenses actuelles : { this.state.rewardCount }</Text>
        

        { pubsEnabled && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.SMART_BANNER} 
                                    requestOptions={{requestNonPersonalizedAdsOnly: true,}}
                         /> }
      </SafeAreaView>

    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap', 
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPub: {
    backgroundColor: '#960000',
    padding: 20,
    marginTop: 50,
    width: '60%',
    borderRadius: 5,
  },
  buttonInterstitial: {
    backgroundColor: '#686868',
    padding: 20,
    marginTop: 30,
    width: '60%',
    borderRadius: 5,
  },
  buttonReward: {
    backgroundColor: 'green',
    padding: 20,
    marginTop: 30,
    width: '60%',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  rewardText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

export default App;
