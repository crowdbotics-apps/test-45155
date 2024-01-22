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
  pbr: {
    lightingModel: "PBR",
  },
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
      <ViroDirectionalLight castsShadow={true} color="#ffffff" direction={[.05, 0.05, .05]} />

      {/* Spotlight on top of the model to highlight this model*/}
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, 1, 0]}
        position={[0, -7, 0]}
        color="#ffffff"
        intensity={250} />

      <ViroSpotLight
        position={[1, 3, 1]}
        direction={[-1, -1, -1]}
        color="grey"
        intensity={750}
        attenuationStartDistance={1}
        attenuationEndDistance={10}
        innerAngle={45}
        outerAngle={90}
        castsShadow
        shadowMapSize={2048}
        shadowNearZ={1}
        shadowFarZ={4}
        shadowOpacity={1.0}
      />

      <Viro3DObject
        key="obj_3d3"
        source={require('../../assets/Quinn_Low/Quinn_Low.vrx')} /// this works
        position={[0, -8, -20]}
        scale={[0.05, 0.05, 0.05]}
        type="VRX"
        materials={"pbr"}
        resources={[
          require('../../assets/Quinn_Low/T_Quinn_01ID_D.PNG'),
          require('../../assets/Quinn_Low/T_Quinn_01ID_Tan.PNG'),
          require('../../assets/Quinn_Low/T_Quinn_02ID_D.PNG'),
          require('../../assets/Quinn_Low/T_Quinn_02ID_Tan.PNG'),]}
        animation={{
          name: 'Take 001',
          run: true,
          loop: true,
          delay: 1000
        }}
      />

      <Viro3DObject
        key="obj_3d5"
        source={require('../../assets/Quinn_Med/Quinn_Med.vrx')} /// this works
        position={[0, -8, -20]}
        scale={[0.05, 0.05, 0.05]}
        type="VRX"
        materials={"pbr"}
        resources={[
          require('../../assets/Quinn_Med/T_Quinn_01ID_D.PNG'),
          require('../../assets/Quinn_Med/T_Quinn_01ID_Tan.PNG'),
          require('../../assets/Quinn_Med/T_Quinn_02ID_D.PNG'),
          require('../../assets/Quinn_Med/T_Quinn_02ID_Tan.PNG'),]}
        animation={{
          name: 'Take 001',
          run: true,
          loop: true,
          delay: 1000
        }}
      />

      {/* <Viro3DObject
        key="obj_3d2"
        source={require('../../assets/Quinn_High/Quinn_High.vrx')} /// this works
        position={[0, -8, -20]}
        scale={[0.05, 0.05, 0.05]}
        type="VRX"
        materials={"pbr"}
        resources={[
          require('../../assets/Quinn_High/T_Quinn_01ID_D.PNG'),
          require('../../assets/Quinn_High/T_Quinn_01ID_Tan.PNG'),
          require('../../assets/Quinn_High/T_Quinn_02ID_D.PNG'),
          require('../../assets/Quinn_High/T_Quinn_02ID_Tan.PNG'),]}
        animation={{
          name: 'Take 001',
          run: true,
          loop: true,
          delay: 1000
        }}
      /> */}

      {/* <Viro3DObject
        key="obj_3d1"
        source={require('../../assets/Quin_texture_anim2/Quin_texture_anim2.vrx')} /// this works
        position={[-10, -8, -20]}
        scale={[0.08, 0.08, 0.08]}
        type="VRX"
        materials={"pbr"}
        resources={[
          require('../../assets/Quin_texture_anim2/T_Quinn_01ID_D.PNG'),
          require('../../assets/Quin_texture_anim2/T_Quinn_01ID_Tan.PNG'),
          require('../../assets/Quin_texture_anim2/T_Quinn_02ID_D.PNG'),
          require('../../assets/Quin_texture_anim2/T_Quinn_02ID_Tan.PNG'),]}

        rotation={[-270, -10, 0]}
        animation={{
          name: 'Take 001',
          run: true,
          loop: true,
          delay: 1000
        }}
      /> */}
    </ViroARScene>

  );
};

const VRScreen = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      pbrEnabled={true}
      hdrEnabled={true}
      bloomEnabled={true}
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
