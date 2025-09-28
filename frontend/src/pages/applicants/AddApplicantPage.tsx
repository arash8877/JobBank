import { useState, useEffect } from "react";
import "./Applicants.scss";
import { ICreateApplicantDto, IJob } from "../../types/globalTypes";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { CloudUpload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/httpModule";

const AddApplicant = () => {
  const [applicant, setApplicant] = useState<ICreateApplicantDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => setJobs(response.data))
      .catch((error) => {
        alert("Error fetching jobs");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      applicant.firstName === "" ||
      applicant.lastName === "" ||
      applicant.email === "" ||
      applicant.phone === "" ||
      applicant.coverLetter === "" ||
      applicant.jobId === "" ||
      !pdfFile
    ) {
      alert("Please fill all fields and upload a CV.");
      return;
    }

    const newApplicantFormData = new FormData();
    newApplicantFormData.append("firstName", applicant.firstName);
    newApplicantFormData.append("lastName", applicant.lastName);
    newApplicantFormData.append("email", applicant.email);
    newApplicantFormData.append("phone", applicant.phone);
    newApplicantFormData.append("coverLetter", applicant.coverLetter);
    newApplicantFormData.append("jobId", applicant.jobId);
    newApplicantFormData.append("pdfFile", pdfFile);

    httpModule
      .post("/Applicant/Create", newApplicantFormData)
      .then(() => redirect("/applicants"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-applicant-container">
      <div className="add-applicant-card">
        <h2>Add New Applicant</h2>

        <div className="form-fields">
          <FormControl fullWidth>
            <InputLabel>Job</InputLabel>
            <Select
              value={applicant.jobId}
              label="Job"
              onChange={(e) => setApplicant({ ...applicant, jobId: e.target.value })}
            >
              {jobs.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            autoComplete="off"
            label="First Name"
            variant="outlined"
            fullWidth
            value={applicant.firstName}
            onChange={(e) => setApplicant({ ...applicant, firstName: e.target.value })}
          />

          <TextField
            autoComplete="off"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={applicant.lastName}
            onChange={(e) => setApplicant({ ...applicant, lastName: e.target.value })}
          />

          <TextField
            autoComplete="off"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={applicant.email}
            onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
          />

          <TextField
            autoComplete="off"
            label="Phone"
            variant="outlined"
            fullWidth
            value={applicant.phone}
            onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
          />

          <TextField
            autoComplete="off"
            label="Cover Letter"
            variant="outlined"
            fullWidth
            value={applicant.coverLetter}
            onChange={(e) => setApplicant({ ...applicant, coverLetter: e.target.value })}
            multiline
            rows={3}
          />

          {/* Fancy Upload Field */}
          <label className="file-upload">
            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={(event) =>
                setPdfFile(event.target.files ? event.target.files[0] : null)
              }
            />
            <CloudUpload />
            {pdfFile ? <span>{pdfFile.name}</span> : <span>Upload CV (PDF)</span>}
          </label>
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
            onClick={() => redirect("/applicants")}
            className="back-btn"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddApplicant;
