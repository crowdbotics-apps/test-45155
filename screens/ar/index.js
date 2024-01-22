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
  Viro3DObject,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSpotLight
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
      <ViroAmbientLight color="#ffffff" intensity={20} />

      {/* DirectionalLight with the direction away from the user, pointed upwards, to light up the "face" of the model */}
      <ViroDirectionalLight color="#ffffff" direction={[0, -1, -.2]} />

      {/* Spotlight on top of the model to highlight this model*/}
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, 1, 0]}
        position={[0, -7, 0]}
        color="#ffffff"
        intensity={250} />

      <Viro3DObject
        key="obj_3d3"
        source={require('../../assets/Quinn_Low.vrx')} /// this works
        position={[0, 0, -20]}
        scale={[0.05, 0.05, 0.05]}
        type="VRX"
      />
      <Viro3DObject
        key="obj_3d2"
        source={require('../../assets/Quinn_High.vrx')} /// this works
        position={[0, 0, -20]}
        scale={[0.05, 0.05, 0.05]}
        type="VRX"
      />

      <Viro3DObject
        key="obj_3d1"
        source={require('../../assets/Quin_texture_anim2.vrx')} /// this works
        position={[0, 0, -20]}
        scale={[0.05, 0.05, 0.05]}
        type="VRX"
        animation={{
          name: 'Take 001',
          run: true,
          loop: true,
          delay: 1000
        }}
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
