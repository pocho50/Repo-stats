import { ref } from "vue";
import type Search from "@/types/Search";
import type Repo from "@/types/Repo";
import msg from "@/messages";

export default function useResource() {
  const repos = ref<Repo[] | []>([]);
  const repo = ref<Repo | null>(null);
  const baseURL = "https://api.github.com";

  const fetchById = async (id: number) => {
    // fetch
    const response = await fetch(baseURL + `repositories/${id}`);
    if (!response.ok) {
      throw msg.ERROR_GENERAL;
    }
    repo.value = await response.json();
  };

  const fetchByTopic = async (search: Search) => {
    const topic = encodeURIComponent(search.topic);
    if (!topic) throw msg.ERROR_TOPIC;
    const stars = parseInt(search.stars);

    // build the query
    const q = `/search/repositories?q=topic:${topic}&sort=stars&order=desc&per_page=10`;

    // fetch
    const response = await fetch(baseURL + q);
    if (!response.ok) {
      throw msg.ERROR_GENERAL;
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
    repo,
    repos,
    fetchByTopic,
  };
}
