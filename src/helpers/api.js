import axios from "axios";
import { getItem } from "./localStorage";

// export const API_ENDPOINT = "https://api.greenflags.com";
export const API_ENDPOINT = "http://127.0.0.1:5000";

export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/getQuestion`, {
      cookie: getItem("cookie"),
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error("Error fetching question data:", err);
    return {};
  }
};
