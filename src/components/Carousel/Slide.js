import React from 'react';
import {View, Animated} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

const Slide = ({image}) => {
  const _scale = new Animated.Value(1);

  /**
   * _onZoomEvent
   */
  const _onZoomEvent = Animated.event(
    [
      {
        nativeEvent: {scale: _scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  /**
   * _onZoomStateChange
   */
  const _onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(_scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={_onZoomEvent}
      onHandlerStateChange={_onZoomStateChange}>
      <Animated.Image
        resizeMode="cover"
        source={{uri: image.image}}
        style={{
          width: image.width,
          height: image.height,
          transform: [{scale: _scale}],
        }}
      />
    </PinchGestureHandler>
  );
};

export {Slide};
