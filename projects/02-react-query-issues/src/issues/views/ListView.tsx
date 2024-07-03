import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const onLabelChanged = (labelName: string) => {
    const selected = selectedLabels.includes(labelName)
      ? selectedLabels.filter((label) => label !== labelName)
      : [...selectedLabels, labelName];

    console.log(selected);

    setSelectedLabels(selected);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        <IssueList />
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
