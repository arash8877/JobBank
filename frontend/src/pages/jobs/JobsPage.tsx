import { useEffect, useState } from "react";
import "./Jobs.scss";
import JobsGrid from "../../components/jobs/JobsGrid";
import httpModule from "../../helpers/httpModule";
import { useNavigate } from "react-router-dom";
import { IJob } from "../../types/globalTypes";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const JobsPage = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJob[]>("/Job/get")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error loading Jobs");
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="jobs-page">
      {/* Header */}
      <div className="jobs-header">
        <h2>Jobs</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => redirect("/Jobs/add")}
          className="add-job-btn"
        >
          Add Job
        </Button>
      </div>

      {/* Content */}
      <div className="jobs-body">
        {loading ? (
          <div className="loading-box">
            <CircularProgress size={60} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Fetching your Jobs...
            </Typography>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No Jobs Found</h3>
            <p>Start by adding your first job to see them here.</p>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => redirect("/Jobs/add")}
              className="empty-add-btn"
            >
              Add Job
            </Button>
          </div>
        ) : (
          <JobsGrid data={jobs} />
        )}
      </div>
    </div>
  );
};

export default JobsPage;
