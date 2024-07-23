import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces/issue";
import { useIssuesInfinite } from "../hooks/useIssuesInfinite";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State | undefined>();

  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const issues = issuesQuery.data?.pages?.flat() ?? [];

  const onLabelChanged = (labelName: string) => {
    const selected = selectedLabels.includes(labelName)
      ? selectedLabels.filter((label) => label !== labelName)
      : [...selectedLabels, labelName];

    setSelectedLabels(selected);
  };

  const onChangeState = (state?: State): void => {
    setState(state);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issues}
            state={state}
            onChangeState={onChangeState}
          />
        )}

        <div className="mt-2 mb-2 d-flex flex-column">
          <button
            className={`btn btn-outline-primary  ${
              issuesQuery.isFetching ? "disabled" : ""
            }`}
            disabled={issuesQuery.isFetching}
            onClick={() => issuesQuery.fetchNextPage()}
          >
            {issuesQuery.isFetching ? "Cargando más" : "Cargar más"}
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
