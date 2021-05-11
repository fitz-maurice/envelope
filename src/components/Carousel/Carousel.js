import React, {memo, useState, useRef, useCallback} from 'react';
import {FlatList, StyleSheet, Image, Dimensions} from 'react-native';

// Envelope
import {Slide, Pagination} from '../../components';

const Carousel = memo(({images}) => {
  const [index, setIndex] = useState(0);
  const [_imageWidth, setImageWidth] = useState(null);
  const [_imageHeight, setImageHeight] = useState(null);
  const screen = Dimensions.get('window');
  const indexRef = useRef(index);
  indexRef.current = index;
  // Set up images for mapping
  const _images = images.map((image, i) => {
    const _image = `data:image/png;base64,${image}`;
    Image.getSize(_image, (w, h) => {
      const ratio = screen.width / w;
      setImageWidth(w * ratio);
      setImageHeight(h * ratio);
    });

    return {
      key: i,
      image: _image,
      width: _imageWidth,
      height: _imageHeight,
    };
  });

  /**
   * _onScroll
   *
   * Easing function to help with horizontal scroll
   */
  const _onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const _index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(_index);
    const distance = Math.abs(roundIndex - _index);
    const isNoMansLand = distance > 0.4;
    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  /***************************************************************
   * STYLES
   **************************************************************/
  const styles = StyleSheet.create({
    carousel: {
      flexGrow: 0,
    },
  });

  return (
    <>
      <FlatList
        data={_images}
        style={styles.carousel}
        pagingEnabled
        horizontal
        onScroll={_onScroll}
        initialNumToRender={0}
        scrollEventThrottle={16}
        scrollEnabled={images.length > 1}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide image={item} />}
      />
      {images.length > 1 ? <Pagination images={images} index={index} /> : null}
    </>
  );
});

export {Carousel};
