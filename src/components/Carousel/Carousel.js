import React, {memo, useState, useRef, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';

// Envelope
import {Slide, Pagination} from '../../components';

const Carousel = memo(({images}) => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const onScroll = useCallback(event => {
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
      flex: 1,
    },
  });

  return (
    <>
      <FlatList
        data={images}
        style={styles.carousel}
        pagingEnabled
        horizontal
        initialNumToRender={0}
        scrollEventThrottle={16}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide image={item} />}
        keyExtractor={() => Math.floor(Math.random() * 100 + 1)}
      />
      <Pagination images={images} index={index} />
    </>
  );
});

export {Carousel};
