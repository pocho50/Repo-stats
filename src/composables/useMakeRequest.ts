import { ref } from "vue";
import type Search from "@/types/Search";
import type Repo from "@/types/Repo";

export default function useResource() {
  const repos = ref<Repo[] | []>([]);
  const baseURL = "https://api.github.com/search/repositories";
  const fetchByTopic = async (search: Search) => {
    const topic = encodeURIComponent(search.topic);
    const stars = parseInt(search.stars);
    const q = `?q=topic:${topic}&sort=stars&order=desc&per_page=10`;
    const response = await fetch(baseURL + q);
    const data = await response.json();
    repos.value = getRepos(data.items);
  };

  const getRepos: Repo[] = (items) => {
    return items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: item.html_url,
        stars: item.stargazers_count,
      };
    });
  };

  return {
    repos,
    fetchByTopic,
  };
}
