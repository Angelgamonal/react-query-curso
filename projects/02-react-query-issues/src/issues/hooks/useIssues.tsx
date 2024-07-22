import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

export const useIssues = ({ labels, state }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [labels, state]);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels, page }],
    queryFn: () => getIssues({ labels, state }),
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? "loading" : page,
    nextPage,
    prevPage,
  };
};
