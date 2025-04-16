// redux/actions/searchActions.js
import { tmdbClient, API_ENDPOINT } from "../../utils/tmdbClient";
import { setSearchResults } from "../reducer/search/searchReducer";

export const searchContent = ({ query = "", page = 1 }) => async (dispatch) => {
  if (!query) {
    dispatch(setSearchResults({ movies: [], tvShows: [] }));
    return;
  }

  try {
    const [movieRes, tvRes] = await Promise.all([
      tmdbClient.get(API_ENDPOINT.SEARCH_MOVIE, {
        params: { query, language: "en-US", page },
      }),
      tmdbClient.get(API_ENDPOINT.SEARCH_TV, {
        params: { query, language: "en-US", page },
      }),
    ]);

    dispatch(setSearchResults({
      movies: movieRes.data.results || [],
      tvShows: tvRes.data.results || [],
    }));
  } catch (err) {
    console.error("Failed to search content:", err);
  }
};
