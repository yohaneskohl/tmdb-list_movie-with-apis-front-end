// redux/actions/tvShowActions.js
import { tmdbClient, API_ENDPOINT } from "../../utils/tmdbClient";
import {
  setTVOnTheAir,
  setTVTotalPages,
  setLoadingTVOnTheAir,
} from "../reducer/tvshow/tvShowReducer";

export const getOnTheAirTVShows = (page = 1) => async (dispatch) => {
  dispatch(setLoadingTVOnTheAir(true));
  try {
    const res = await tmdbClient.get(API_ENDPOINT.ON_THE_AIR, {
      params: { language: "en-US", page },
    });

    dispatch(setTVOnTheAir(res.data.results || []));
    dispatch(setTVTotalPages(res.data.total_pages || 1));
  } catch (err) {
    console.error("Failed to fetch on the air TV shows:", err);
  } finally {
    dispatch(setLoadingTVOnTheAir(false));
  }
};
