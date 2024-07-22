import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces/issue";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State | undefined>();

  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

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
            issues={issuesQuery.data ?? []}
            state={state}
            onChangeState={onChangeState}
          />
        )}

        <div className="d-flex mt-2 justify-content-between align-item-center">
          <button
            className={`btn btn-outline-primary ${
              issuesQuery.isFetching ? "disabled" : ""
            }`}
            onClick={prevPage}
            disabled={issuesQuery.isFetching}
          >
            prev
          </button>
          <span>{page}</span>
          <button
            className={`btn btn-outline-primary ${
              issuesQuery.isFetching ? "disabled" : ""
            }`}
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
          >
            next
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
