import { useState, useEffect } from "react";
import "./Applicants.scss";
import { ICompany, ICreateApplicantDto, ICreateCompanyDto, ICreateJobDto, IJob } from "../../types/globalTypes";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
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
   const [pdfFile, setPdfFile] = useState<File | null>();

   const redirect = useNavigate();

   useEffect(() => {
      httpModule
         .get<IJob[]>("/Job/Get")
         .then((response) => {
            setJobs(response.data);
         })
         .catch((error) => {
            alert("Error");
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
         alert("Fill all fields");
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
         .then((responst) => redirect("/applicants"))
         .catch((error) => console.log(error));
   };

   const handleClickBackBtn = () => {
      redirect("/applicants");
   };

   return (
      <div className="content">
         <div className="add-applicant">
            <h2>Add New Applicant</h2>
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
               value={applicant.firstName}
               onChange={(e) => setApplicant({ ...applicant, firstName: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="Last Name"
               variant="outlined"
               value={applicant.lastName}
               onChange={(e) => setApplicant({ ...applicant, lastName: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="Email"
               variant="outlined"
               value={applicant.email}
               onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="Phone"
               variant="outlined"
               value={applicant.phone}
               onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
            />
            <TextField
               autoComplete="off"
               label="C V"
               variant="outlined"
               value={applicant.coverLetter}
               onChange={(e) => setApplicant({ ...applicant, coverLetter: e.target.value })}
               multiline
            />
            <input type="file" onChange={(event) => setPdfFile(event.target.files ? event.target.files[0] : null)} />

            <div className="btns">
               <Button variant="outlined" color="primary" onClick={handleClickSaveBtn}>
                  Save
               </Button>
               <Button variant="outlined" color="secondary" onClick={handleClickBackBtn}>
                  Back
               </Button>
            </div>
         </div>
      </div>
   );
};

export default AddApplicant;