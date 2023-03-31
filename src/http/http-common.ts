import axios from "axios";

export default axios.create({
  baseURL: "https://smans.com.ng/feed/public/api",
  headers: {
    "Content-type": "application/json"
  }
});
//https://dioceseofife.com/feed/public/api/feed