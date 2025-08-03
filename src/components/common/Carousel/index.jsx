import {
  createContext,
  useContext,
  useState,
  Children,
  useMemo,
  cloneElement,
  useEffect,
} from "react";
import CarouselItem from "./CarouselItem";
import CarouselNavigator from "./CarouselNavigator";

const CarouselContext = createContext(null);
export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Invalid context scope :: CarouselContext");
  }
  return context;
};

// itemsPerView 3 => [0, 1, 2] == next ==> [1, 2, 3]
const Carousel = (props) => {
  console.log(props);
  const { itemsPerView = 3, children } = props;
  const [currentIndexs, setCurrentIndexs] = useState(
    Array.from({ length: itemsPerView }, (_, index) => index)
  );

  useEffect(() => {
    const changedIndexsSlot = Array.from(
      { length: itemsPerView },
      (_, index) => currentIndexs[0] + index
    );
    setCurrentIndexs(changedIndexsSlot);
  }, [itemsPerView]);

  const _children = useMemo(
    () => Children.toArray(children),
    [children, itemsPerView]
  );

  const [carouselItems, carouselNavigator] = useMemo(
    () => [
      _children.filter((child) => child.type === CarouselItem),
      _children.find((child) => child.type === CarouselNavigator),
    ],
    [_children, itemsPerView]
  );

  const carouselItemLength = useMemo(
    () => carouselItems.length,
    [carouselItems.length]
  );

  const handleChangeCurrentIndexs = (indexs) => {
    setCurrentIndexs(indexs);
  };

  const contextValue = {
    currentIndexs,
    itemsPerView,
    carouselItemLength,
    handleChangeCurrentIndexs,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      {carouselItems.map((carouselItem, index) =>
        cloneElement(carouselItem, { ...carouselItem.props, index })
      )}
      {carouselNavigator}
    </CarouselContext.Provider>
  );
};

Carousel.Item = CarouselItem;
Carousel.Navigator = CarouselNavigator;

export default Carousel;
