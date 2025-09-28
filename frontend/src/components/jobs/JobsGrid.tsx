import { IJob } from "../../types/globalTypes";
import moment from "moment";
import "./JobsGrid.scss";

interface IJobsGridProps {
  data: IJob[];
}

const JobsGrid = ({ data }: IJobsGridProps) => {
  return (
    <div className="jobs-grid-container">
      <div className="jobs-grid-card">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Seniority</th>
              <th>Company</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td className="job-title">{job.title}</td>
                <td>
                  <span
                    className={`badge level-${job.level ? job.level.toLowerCase() : "unknown"}`}
                  >
                    {job.level || "N/A"}
                  </span>
                </td>
                <td>{job.companyName}</td>
                <td>{moment(job.createdAt).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsGrid;
