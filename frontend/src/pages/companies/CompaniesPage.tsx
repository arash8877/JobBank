import { useEffect, useState } from "react";
import "./Companies.scss";
import CompaniesGrid from "../../components/companies/CompaniesGrid";
import httpModule from "../../helpers/httpModule";
import { useNavigate } from "react-router-dom";
import { ICompany } from "../../types/globalTypes";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import { Add } from "@mui/icons-material";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICompany[]>("/Company/get")
      .then((response) => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error loading companies");
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="companies-page">
      {/* Header */}
      <div className="companies-header">
        <h2>Companies</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => redirect("/companies/add")}
          className="add-company-btn"
        >
          Add Company
        </Button>
      </div>

      {/* Content */}
      <div className="companies-body">
        {loading ? (
          <div className="loading-box">
            <CircularProgress size={60} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Fetching your companies...
            </Typography>
          </div>
        ) : companies.length === 0 ? (
          <div className="empty-state">
            <h3>No Companies Found</h3>
            <p>Start by adding your first company to see them here.</p>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => redirect("/companies/add")}
              className="empty-add-btn"
            >
              Add Company
            </Button>
          </div>
        ) : (
          <CompaniesGrid data={companies} />
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;
