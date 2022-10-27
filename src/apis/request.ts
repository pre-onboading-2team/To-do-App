import axios from "axios";

import server from "./url";

const request = axios.create({
  baseURL: server.preOnboarding,
});

export default request;
