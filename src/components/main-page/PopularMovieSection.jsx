import { useEffect, useState } from "react";
import Carousel from "../common/Carousel";

const PopularMovieSection = () => {
  const [movies, setMovies] = useState([]);
  const [itemsPerView, setItemsPerView] = useState(3);

  const fetchPopularMovies = async () => {
    console.log("fetchPopularMovies");
    try {
      const request = await fetch("/api/popular-movies");
      if (request.ok) {
        const response = await request.json();
        const movies = response.movies;
        console.log(movies);
        setMovies(movies);
      }
    } catch (err) {}
  };
  useEffect(() => {
    fetchPopularMovies();
  }, []);
  return (
    <>
      <Carousel itemsPerView={itemsPerView}>
        {movies.map((movie, index) => (
          <Carousel.Item key={`popular-movie-key-${index}`}>
            {movie.title}
          </Carousel.Item>
        ))}
        <Carousel.Navigator />
      </Carousel>
      <br />
      <input
        type="number"
        onChange={(e) => setItemsPerView(Number(e.target.value))}
        value={itemsPerView}
      />
    </>
  );
};
export default PopularMovieSection;
