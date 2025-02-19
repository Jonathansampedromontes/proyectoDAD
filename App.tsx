import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [tracking, setTracking] = useState(false);

  function onInitialized(state: ViroTrackingStateConstants, reason: any) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTracking(true);
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* Luz para iluminar el coche y el texto */}
      <ViroAmbientLight color="#ffffff" intensity={300} />

      {/* Texto "Hello Jorge!" */}
      <ViroText
        text="Hello Jonathan!"
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.5, -1]} // Un poco arriba del coche
        style={styles.helloWorldTextStyle}
      />

      {/* Modelo del Mustang, solo se muestra cuando el tracking es correcto */}
      {tracking && (
        <Viro3DObject
          source={require("./res/bugatti/bugatti.obj")} // Ruta corregida
          position={[0, -0.5, -2]} // Ajuste de posición
          scale={[0.08, 0.08, 0.08]} // Ajusta el tamaño
          rotation={[0, 0, 0]} // Sin rotación inicial
          type="OBJ" // Tipo corregido
        />
      )}
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});