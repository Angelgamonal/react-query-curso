import { Link, Navigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

export const IssueView = () => {
  const params = useParams();

  const issueId = params.id ?? "0";

  const { issueQuery, commentsQuery } = useIssue(+issueId);

  if (issueQuery.isLoading) return <LoadingIcon />;

  if (!issueQuery.data) return <Navigate to="/issues/list" />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros */}

      {commentsQuery.data?.map((issue) => (
        <IssueComment issue={issue} key={issue.id} />
      ))}
    </div>
  );
};
