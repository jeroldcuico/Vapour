import {
  GAMES_URL_API,
  GAME_DETAILS_URL_API,
  TAGS_URL_API,
  DEVELOPERS_URL_API,
  PUBLISHERS_URL_API,
  STORES_URL_API,
  GENRES_URL_API,
  PLATFORMS_URL_API,
} from "./Api";

export async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchGames(callback) {
  const data = await fetchData(GAMES_URL_API);
  callback(data);
}

export async function fetchGamesByDevelopers(callback) {
  const data = await fetchData(DEVELOPERS_URL_API);
  callback(data);
}

export async function fetchGamesByTags(callback) {
  const data = await fetchData(TAGS_URL_API);
  callback(data);
}
export async function fetchGamesGenre(callback) {
  const data = await fetchData(GENRES_URL_API);
  callback(data);
}
export async function fetchGamesPublisher(callback) {
  const data = await fetchData(PUBLISHERS_URL_API);
  callback(data);
  
}
export async function fetchGamesPlatforms(callback) {
  const data = await fetchData(PLATFORMS_URL_API);
  callback(data);
}
export async function fetchGamesStore(callback) {
  const data = await fetchData(STORES_URL_API);
  callback(data);
}
export async function fetchCustomURL(url, callback) {
  const data = await fetchData(url);
  callback(data);
}

