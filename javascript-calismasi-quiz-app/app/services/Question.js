import { AxiosGetConfig } from "./Axios/AxiosGet";
const url = "https://jsonplaceholder.typicode.com/posts";

export function getQuestions() {
  return AxiosGetConfig(url);
}
