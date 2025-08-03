import { useCarouselContext } from ".";

const CarouselNavigator = () => {
  const { handleChangeCurrentIndexs, currentIndexs, carouselItemLength } =
    useCarouselContext();
  // 총 아이템의 개수가 10개
  // handleChangeCurrentIndexs = [0, 1, 2]
  const handleClickNavigate = (direction) => {
    const changedCurrentIndexs = currentIndexs.map(
      (curIndex) => curIndex + direction
    );
    if (
      changedCurrentIndexs.some(
        (changedIndex) =>
          changedIndex < 0 || changedIndex > carouselItemLength - 1
      )
    ) {
      return;
    }
    handleChangeCurrentIndexs(changedCurrentIndexs);
  };

  return (
    <>
      <button onClick={() => handleClickNavigate(-1)}>prev</button>
      <button onClick={() => handleClickNavigate(1)}>next</button>
    </>
  );
};
export default CarouselNavigator;
