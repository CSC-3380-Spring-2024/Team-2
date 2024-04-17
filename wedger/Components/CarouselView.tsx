import {View, Dimensions, FlatList, StyleSheet} from 'react-native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {BudgetType} from '../Types/BudgetTypes';
import {ShoppingListType} from '../Types/ShoppingListTypes';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Slide = memo(function Slide(props: any) {
  return <View style={styles.slide}>{props.children}</View>;
});

interface PaginationProps {
  index: number;
  slideList: BudgetType[] | ShoppingListType[] | any[];
}

function Pagination(props: PaginationProps) {
  const {index, slideList} = props;
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

interface CarouselViewProps {
  contentArray: BudgetType[] | ShoppingListType[] | any[];
  children: JSX.Element;
}

const CarouselView = (props: CarouselViewProps) => {
  const {contentArray} = props;
  const slideList = contentArray;
  const [index, setIndex] = useState<number>(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(
    (event: {
      nativeEvent: {
        layoutMeasurement: {width: any};
        contentOffset: {x: number};
      };
    }) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);

      const distance = Math.abs(roundIndex - index);

      // Prevent one pixel triggering setIndex in the middle
      // of the transition. With this we have to scroll a bit
      // more to trigger the index change.
      const isNoMansLand = 0.4 < distance;

      if (roundIndex !== indexRef.current && !isNoMansLand) {
        setIndex(roundIndex);
      }
    },
    [],
  );

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((s: {id: any}) => String(s.id), []),
    getItemLayout: useCallback(
      (_: any, i: number) => ({
        index,
        length: windowWidth,
        offset: i * windowWidth,
      }),
      [index],
    ),
  };

  const renderItem = useCallback(
    function renderItem() {
      return <Slide type={undefined} props={props.children} key={index} />;
    },
    [index, props.children],
  );

  return (
    <>
      <FlatList
        data={slideList}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index} slideList={slideList} />
    </>
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {width: windowWidth * 0.9, height: windowHeight * 0.7},
  slideTitle: {fontSize: 24},
  slideSubtitle: {fontSize: 18},

  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {backgroundColor: 'lightblue'},
  paginationDotInactive: {backgroundColor: 'gray'},

  carousel: {flex: 1},
});
