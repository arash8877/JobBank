import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Companies.scss";
import { ICreateCompanyDto } from "../../types/globalTypes";
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import httpModule from "../../helpers/httpModule";

const AddCompany = () => {
  const [company, setCompany] = useState<ICreateCompanyDto>({ name: "", size: "" });
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("/Company/Create", company)
      .then(() => redirect("/companies"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/companies");
  };

  return (
    <div className="add-company-container">
      <div className="add-company-card">
        <h2>Add New Company</h2>
        <div className="form-fields">
          <TextField
            autoComplete="off"
            label="Company Name"
            variant="outlined"
            fullWidth
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Company Size</InputLabel>
            <Select
              value={company.size}
              label="Company Size"
              onChange={(e) => setCompany({ ...company, size: e.target.value })}
            >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="btns">
          <Button
            className="save-btn"
            variant="contained"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            className="back-btn"
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
