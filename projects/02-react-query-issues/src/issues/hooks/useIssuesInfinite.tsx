import { useInfiniteQuery } from "@tanstack/react-query";

import { githubApi } from "../../api/githubApi";
import { Issue } from "../interfaces";
import { State } from "../interfaces/issue";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", page.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });

  return data;
};

export const useIssuesInfinite = ({ labels, state }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, labels }],
    queryFn: ({ pageParam, queryKey }) => {
      const [, , args = { labels, state }] = queryKey;

      return getIssues({ labels, state, page: pageParam });
    },
    staleTime: 1000 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
  });

  return {
    issuesQuery,
  };
};
