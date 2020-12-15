import axios from "axios";

export default axios.create({
  baseURL: "https://backendtest.moneytalk.web.illinois.edu/api",
  headers: {
    "Content-type": "application/json"
  }
});
