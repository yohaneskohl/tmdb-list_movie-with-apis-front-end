import { tmdbClient } from "../../utils/tmdbClient";
// import { API_ENDPOINT } from "../../utils/tmdbClient";

// Fetch Now Playing Movies
export const fetchNowPlayingMovies = async ({ queryKey }) => {
  const [_key, _params] = queryKey;

  const { data } = await tmdbClient.get(_key, {
    params: {
      language: "en-US",
      page: _params?.page || 1,
    },
  });

  return {
    movies: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

// Fetch On The Air TV Shows
export const fetchOnTheAirTVShows = async ({ queryKey }) => {
  const [_key, _params] = queryKey;

  const { data } = await tmdbClient.get(_key, {
    params: {
      language: "en-US",
      page: _params?.page || 1,
    },
  });

  return {
    shows: data.results || [],
    totalPages: data.total_pages || 1,
  };
};

// Search Movie & TV Shows
export const searchMoviesAndTVShows = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const [movieEndpoint, tvEndpoint] = _key; // sekarang _key dipakai

  const query = _params?.query || "";
  const page = _params?.page || 1;

  if (!query) {
    return { movies: [], tvShows: [] };
  }

  const [movieRes, tvRes] = await Promise.all([
    tmdbClient.get(movieEndpoint, {
      params: { query, language: "en-US", page },
    }),
    tmdbClient.get(tvEndpoint, {
      params: { query, language: "en-US", page },
    }),
  ]);

  return {
    movies: movieRes.data.results || [],
    tvShows: tvRes.data.results || [],
  };
};


// Fetch Movie Detail by ID
export const fetchMovieDetails = async ({ queryKey }) => {
  const [_key, _params] = queryKey;

  const { data } = await tmdbClient.get(_key, {
    params: {
      language: "en-US",
      ..._params, // if someday you need to pass additional params
    },
  });

  return data;
};
