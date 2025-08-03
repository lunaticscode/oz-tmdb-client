import { useCarouselContext } from ".";

const CarouselItem = (props) => {
  const { index, children } = props;
  const { currentIndexs } = useCarouselContext();

  return currentIndexs.includes(index) ? (
    <div className={"carousel-item"}>{children}</div>
  ) : null;
};
export default CarouselItem;
