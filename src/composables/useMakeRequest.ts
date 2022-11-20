import { ref } from "vue";
import type Search from "@/types/Search";
import type Repo from "@/types/Repo";

export default function useResource() {
  const repos = ref<Repo[] | []>([]);
  const baseURL = "https://api.github.com/search/repositories";

  const fetchByTopic = async (search: Search) => {
    const topic = encodeURIComponent(search.topic);
    if (!topic) throw "El topic es requerido";
    const stars = parseInt(search.stars);

    // build the query
    const q = `?q=topic:${topic}&sort=stars&order=desc&per_page=10`;

    // fetch
    const response = await fetch(baseURL + q);
    if (!response.ok) {
      throw "Hubo un error, pruebe mas tarde.";
    }
    const data = await response.json();
    repos.value = getRepos(data.items, stars);
  };

  const getRepos: Repo[] = (items, stars) => {
    const repos: Repo[] = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: item.html_url,
        stars: item.stargazers_count,
      };
    });

    // filter by min stars
    if (stars > 0) {
      return repos.filter((repo) => repo.stars >= stars);
    }
    return repos;
  };

  return {
    repos,
    fetchByTopic,
  };
}
