import { IApplicant } from "../../types/globalTypes";
import moment from "moment";
import "./ApplicantsGrid.scss";
import { GridColDef } from "@mui/x-data-grid/models";
import { PictureAsPdf } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../../constants/urlConstant"; 
import { Box } from "@mui/material";

interface IApplicantsGridProps {
  data: IApplicant[];
}

const column: GridColDef[] = [
   { field: "id", headerName: "ID", width: 100 },
   { field: "firstName", headerName: "First Name", width: 120 },
   { field: "lastName", headerName: "Last Name", width: 120 },
   { field: "email", headerName: "Email", width: 150 },
   { field: "phone", headerName: "Phone", width: 150 },
   { field: "coverLetter", headerName: "CV", width: 500 },

   {
      field: "resumeUrl",
      headerName: "Download",
      width: 150,
      renderCell: (params) => (
         <a href={`${BASE_URL}/Applicant/download/${params.row.resumeUrl}`} download>
            <PictureAsPdf />
         </a>
      ),
   },
];

const ApplicantsGrid = ({ data }: IApplicantsGridProps) => {
  return (
   <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
         <DataGrid rows={data} columns={column} getRowId={(row) => row.id} rowHeight={50} />
      </Box>
  );
};

export default ApplicantsGrid;
