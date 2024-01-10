import React, { useState } from "react"
import {
  StyleSheet,
  Image
} from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  Viro3DObject
} from '@viro-community/react-viro';

ViroMaterials.createMaterials({
  green_mtl: {
    diffuseColor: "#0B6623",
    lightingModel: "PBR"
  },
  white_mtl: {
    diffuseColor: "#FFFFFF",
    lightingModel: "PBR"
  }
});

const ARScreen = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <Viro3DObject
        source={require('../../assets/Tree.obj')} /// this works
        position={[0, 0, -5]}
        scale={[0.05, 0.05, 0.05]}
        rotation={[-45,50,40]}
        type="OBJ"
        lightReceivingBitMask={3}
        resources={[
          require('../../assets/Tree.mtl'),
        ]}
        materials={ "green_mtl" }
      />
    </ViroARScene>

  );
};

const VRScreen = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ARScreen,
      }}
      style={styles.f1}
    />
  );
};


var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  logo: {
    height: 180,
    width: 180,
    padding: 40,
    borderRadius: 30,
    margin: 40
  },
});


export default VRScreen;
