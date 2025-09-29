import { useEffect, useState } from "react";
import "./Applicants.scss";
import ApplicantsGrid from "../../components/applicants/ApplicantsGrid";
import httpModule from "../../helpers/httpModule";
import { useNavigate } from "react-router-dom";
import { IApplicant } from "../../types/globalTypes";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const ApplicantsPage = () => {
  const [Applicants, setApplicants] = useState<IApplicant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IApplicant[]>("/Applicant/get")
      .then((response) => {
        setApplicants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error loading Applicants");
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* 🔹 Header */}
      <div className="applicants-header">
        <h2>Applicants</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => redirect("/applicants/add")}
          className="add-applicant-btn"
        >
          Add Applicant
        </Button>
      </div>

      {/* 🔹 Content */}
      <div className="applicants-body">
        {loading ? (
          <div className="loading-box">
            <CircularProgress size={60} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Fetching your Applicants...
            </Typography>
          </div>
        ) : Applicants.length === 0 ? (
          <div className="empty-state">
            <h3>No Applicants Found</h3>
            <p>Start by adding the first applicant to see them here</p>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => redirect("/applicants/add")}
              className="empty-add-btn"
            >
              Add Applicant
            </Button>
          </div>
        ) : (
          <ApplicantsGrid data={Applicants} />
        )}
      </div>
    </div>
  );
};

export default ApplicantsPage;
