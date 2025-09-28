import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Jobs.scss";
import { ICreateJobDto, ICompany } from "../../types/globalTypes";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import httpModule from "../../helpers/httpModule";

const levelsArray: string[] = ["Junior", "Intern", "Mid", "Senior", "Lead", "Manager"];

const AddJobPage = () => {
  const [job, setJob] = useState<ICreateJobDto>({ title: "", level: "", companyId: "" });
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
    if (job.title === "" || job.level === "" || job.companyId === "") {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("/Job/Create", job)
      .then(() => redirect("/jobs"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/jobs");
  };

  return (
    <div className="add-job-container">
      <div className="add-job-card">
        <h2>Add New Job</h2>

        <div className="form-fields">
          <TextField
            autoComplete="off"
            label="Job Title"
            variant="outlined"
            fullWidth
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel>Seniority</InputLabel>
            <Select
              value={job.level}
              label="Seniority"
              onChange={(e) => setJob({ ...job, level: e.target.value })}
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
              value={job.companyId}
              label="Company"
              onChange={(e) => setJob({ ...job, companyId: e.target.value })}
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
