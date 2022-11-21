import { ref } from "vue";
import type Search from "@/types/Search";
import type Repo from "@/types/Repo";
import msg from "@/messages";

export default function useResource() {
  const repos = ref<Repo[] | []>([]);
  const repo = ref<Repo | null>(null);
  const baseURL = "https://api.github.com";

  const fetchById = async (id: string) => {
    // fetch by id
    const response = await fetch(baseURL + `/repositories/${id}`);
    if (!response.ok) {
      throw msg.ERROR_GENERAL;
    }
    const item = await response.json();
    repo.value = buildRepo(item);
  };

  const fetchByTopic = async (search: Search) => {
    // fetch by topic
    const topic = encodeURIComponent(search.topic);
    if (!topic) throw msg.ERROR_TOPIC;
    const stars: number = Number.isInteger(search.stars) ? search.stars : 0;

    // build the query, search by topic order by stars, 10 item per page
    const q = `/search/repositories?q=topic:${topic}&sort=stars&order=desc&per_page=10`;

    const response = await fetch(baseURL + q);
    if (!response.ok) {
      throw msg.ERROR_GENERAL;
    }
    const data = await response.json();
    repos.value = getRepos(data.items, stars);
  };

  const getRepos = (items: [], stars: number): Repo[] => {
    const repos: Repo[] = items.map((item: any): Repo => {
      return buildRepo(item);
    });

    // filter by min stars
    if (stars > 0) {
      return repos.filter((repo: Repo) => repo.stars >= stars);
    }
    return repos;
  };

  const buildRepo = (item: any): Repo => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      url: item.html_url,
      stars: item.stargazers_count,
      watchers: item.watchers_count,
      forks: item.forks,
      openIssue: item.open_issues_count,
      subscribers: item.subscribers_count,
      size: item.size,
    };
  };

  return {
    repo,
    repos,
    fetchByTopic,
    fetchById,
  };
}
