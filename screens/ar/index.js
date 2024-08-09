import React, { useState } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import {
  ViroARScene,
  ViroMaterials,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSpotLight
} from '@reactvision/react-viro';
let ScreenHeight = Dimensions.get("window").height;

ViroMaterials.createMaterials({
  pbr: {
    lightingModel: "Phong",
    roughness: 0.0,
    metalness: 1.0,
  },
});

const ARScreen = () => {
  const [text, setText] = useState('Initializing AR...');
  const [scale, setScale] = useState([0.08, 0.08, 0.08]);
  const [rotate, setRotate] = useState([0, 0, 0]);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  function _onDrag(draggedToPosition, source) {
    console.log(
      "Dragged to: x" +
      draggedToPosition[0] +
      " y:" +
      draggedToPosition[1] +
      " z: " +
      draggedToPosition[2]
    );
  }


  function _onHoverDoSomething(isHovering, source) {
    if (isHovering) {
      console.log("We are hovering onto the image!");
    } else {
      console.log("We are not longer hovering on the image!");
    }
  }

  function _onPinch(pinchState, scaleFactor, source) {
    let newScale = [
      scale[0] * scaleFactor,
      scale[1] * scaleFactor,
      scale[2] * scaleFactor
    ];

    if (scale[0] < 0.05) {
      return
    }
    if (scale[0] > 0.5) {
      return
    }
    if (pinchState == 3) {
      setScale(newScale);
      return;
    }

    setScale(newScale)
  };

  function _onScroll(scrollPosition, source) {
    console.log(
      "Scrolled to: x" + scrollPosition[0] + " y:" + scrollPosition[1]
    );
  }

  function _onSwipe(swipeState, source) {
    if (swipeState == 1) {
      console.log("Swiped up");
    } else if (swipeState == 2) {
      console.log("Swiped down");
    } else if (swipeState == 3) {
      console.log("Swiped left");
    } else if (swipeState == 4) {
      console.log("Swiped right");
    }
  }

  function _onRotate(rotateState, rotationFactor, source) {
    if (rotateState == 3) {
      const rotation = [rotate[0], rotate[1] + rotationFactor, rotate[2]]
      setRotate(rotation)
      return;
    }
    const rotation = [rotate[0], rotate[1] + rotationFactor, rotate[2]]
    setRotate(rotation)
  }

  function _onTouch(state, touchPos, source) {
    var touchX = touchPos[0];
    var touchY = touchPos[1];
    if (state == 1) {
      // Touch Down
    } else if (state == 2) {
      // Touch Down Move
    } else if (state == 3) {
      // Touch Up
    }
  }

  function _onFuse(source) {
    // User has hovered over object for timeToFuse milliseconds
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFFF" intensity={250} />
      <ViroDirectionalLight color="#FFFFFF" direction={[0, -1, 0]} />
      <ViroDirectionalLight color="#FFFFFF" direction={[0, 0, -1]} />
      <ViroDirectionalLight color="#FFFFFF" direction={[-1, 0, 0]} />

      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, 1, 0]}
        position={[0, -7, 0]}
        color="#ffffff"
        intensity={250} />


      {/* <Viro3DObject
        source={require('../../assets/FinalBaseMesh.obj')}
        type="OBJ"
        materials={"pbr"}
        position={[0.0, 0.0, -20]}
        scale={[0.3, 0.3, 0.3]}
        onDrag={_onDrag}
        onHover={_onHoverDoSomething}
        onScroll={_onScroll}
        onSwipe={_onSwipe}
        onTouch={_onTouch}
        onPinch={_onPinch}
        onRotate={_onRotate}
        rotation={rotate}
      /> */}

      {/* <Viro3DObject
        source={require('../../assets/PinOBJ/PinOBJ.obj')}
        resources={[
          require('../../assets/PinOBJ/PinOBJ.mtl'),
        ]}
        materials={"pbr"}
        type="OBJ"
        position={[0.0, 0, -10]}
        scale={[0.001, 0.001, 0.001]}
        onDrag={_onDrag}
        onHover={_onHoverDoSomething}
        onScroll={_onScroll}
        onSwipe={_onSwipe}
        onTouch={_onTouch}
        onPinch={_onPinch}
        onRotate={_onRotate}
      /> */}

      <Viro3DObject
        source={require('../../assets/Star_Anim/Star_Anim.vrx')}
        materials={"pbr"}
        type="VRX"
        position={[0.0, 0, -10]}
        scale={[0.03, 0.03, 0.03]}
        onDrag={_onDrag}
        onHover={_onHoverDoSomething}
        onScroll={_onScroll}
        onSwipe={_onSwipe}
        onTouch={_onTouch}
        onPinch={_onPinch}
        onRotate={_onRotate}
        animation={{
          name: 'Take 001',
          run: true,
          loop: true,
          delay: 1000
        }}
      />

      <Viro3DObject
        source={require('../../assets/VRX_RoamTT_Pin/SM_RoamTT_Pin.vrx')}
        materials={"pbr"}
        type="VRX"
        position={[-4, 0, -10]}
        scale={[0.03, 0.03, 0.03]}
        onDrag={_onDrag}
        onHover={_onHoverDoSomething}
        onScroll={_onScroll}
        onSwipe={_onSwipe}
        onTouch={_onTouch}
        onPinch={_onPinch}
        onRotate={_onRotate}
        animation={{
          name: 'Take 001',
          run: true,
          loop: true,
          delay: 1000
        }}
      />

      {/* <Viro3DObject
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
      /> */}

      {/* <Viro3DObject
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
      /> */}

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
          position={[0, 0, -20]}
          highAccuracyEvents={true}
          scale={scale}
          type="VRX"
          materials={"pbr"}
          onDrag={_onDrag}
          onHover={_onHoverDoSomething}
          onScroll={_onScroll}
          onSwipe={_onSwipe}
          onTouch={_onTouch}
          onPinch={_onPinch}
          onRotate={_onRotate}
          rotation={rotate}
          onFuse={{ callback: _onFuse, timeToFuse: 3000 }}
          animation={{
            name: 'Take 001',
            run: true,
            loop: true,
            delay: 1000
          }}
      /> */}

      {/* <ViroARCamera>
        <Viro3DObject
          key="obj_3d1"
          source={require('../../assets/Quinn_opacity/Quinn_opacity.vrx')} /// this works
          position={[0, 0, -20]}
          highAccuracyEvents={true}
          scale={scale}
          type="VRX"
          materials={"pbr"}
          onDrag={_onDrag}
          onHover={_onHoverDoSomething}
          onScroll={_onScroll}
          onSwipe={_onSwipe}
          onTouch={_onTouch}
          onPinch={_onPinch}
          onRotate={_onRotate}
          rotation={rotate}
          onFuse={{ callback: _onFuse, timeToFuse: 3000 }}
          animation={{
            name: 'Take 001',
            run: true,
            loop: true,
            delay: 1000
          }}
        />
      </ViroARCamera> */}
    </ViroARScene>

  );
};


const ArChallengeCapture = ({

}) => {

  class ViroARSceneMain extends React.Component {

    constructor() {
      super();
      this._setARNavigatorRef = this._setARNavigatorRef.bind(this);
      this.startRecordVideo = this.startRecordVideo.bind(this);
      this.stopRecordVideo = this.stopRecordVideo.bind(this);
    }

    _setARNavigatorRef(ARNavigator) {
      this._arNavigator = ARNavigator;
    }

    async startRecordVideo() {
      const onError = (error) => {
        console.log("startRecordVideo: error:", error)
      }
      this._arNavigator
        ._startVideoRecording('recording', true, onError)
    }

    async stopRecordVideo() {
      const retDict = await this._arNavigator._stopVideoRecording()
      console.log("stopRecordVideo:", retDict)
    }


    render() {
      return (
        <View
          style={styles.mainContainer}>
          <ViroARSceneNavigator
            autofocus={true}
            pbrEnabled={true}
            hdrEnabled={true}
            bloomEnabled={true}
            ref={this._setARNavigatorRef}
            initialScene={{
              scene: ARScreen,
            }}
            style={styles.f1}
          />
          <TouchableOpacity onPress={() => {
            this.startRecordVideo()
          }} style={{ position: 'absolute', bottom: 30, left: 20, backgroundColor: '#00000050', padding: 10 }}>
            <Text style={{ fontSize: 20, color: '#fff' }}>Start Record</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.stopRecordVideo()
          }} style={{ position: 'absolute', bottom: 30, right: 20, backgroundColor: '#00000050', padding: 10 }}>
            <Text style={{ fontSize: 20, color: '#fff' }}>Stop Record</Text>
          </TouchableOpacity>
        </View>
      );
    }

  };
  return (
    <ViroARSceneMain />
  )
}

var styles = StyleSheet.create({
  mainContainer: {
    height: ScreenHeight,
    width: '100%',
    position: 'relative',
  },
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


export default ArChallengeCapture;
