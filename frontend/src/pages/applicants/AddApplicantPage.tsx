import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Applicants.scss";
import { ICreateApplicantDto, ICompany } from "../../types/globalTypes";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import httpModule from "../../helpers/httpModule";

const levelsArray: string[] = ["Junior", "Intern", "Mid", "Senior", "Lead", "Manager"];

const AddJobPage = () => {
  const [applicant, setJob] = useState<ICreateApplicantDto>({ title: "", level: "", companyId: "" });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("Error fetching companies");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (applicant.title === "" || applicant.level === "" || applicant.companyId === "") {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("/Job/Create", applicant)
      .then(() => redirect("/Applicants"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/Applicants");
  };

  return (
    <div className="add-applicant-container">
      <div className="add-applicant-card">
        <h2>Add New Job</h2>

        <div className="form-fields">
          <TextField
            autoComplete="off"
            label="Job Title"
            variant="outlined"
            fullWidth
            value={applicant.title}
            onChange={(e) => setJob({ ...applicant, title: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel>Seniority</InputLabel>
            <Select
              value={applicant.level}
              label="Seniority"
              onChange={(e) => setJob({ ...applicant, level: e.target.value })}
            >
              {levelsArray.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select
              value={applicant.companyId}
              label="Company"
              onChange={(e) => setJob({ ...applicant, companyId: e.target.value })}
            >
              {companies.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="btns">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSaveBtn}
            className="save-btn"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
            className="back-btn"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJobPage;
