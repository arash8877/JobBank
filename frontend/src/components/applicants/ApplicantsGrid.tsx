import { IApplicant } from "../../types/globalTypes";
import "./ApplicantsGrid.scss";
import { GridColDef } from "@mui/x-data-grid/models";
import { PictureAsPdf } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "../../constants/urlConstant";
import { Box, IconButton, Tooltip } from "@mui/material";

interface IApplicantsGridProps {
  data: IApplicant[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
  { field: "email", headerName: "Email", flex: 1.2, minWidth: 180 },
  { field: "phone", headerName: "Phone", flex: 1, minWidth: 140 },
  {
    field: "coverLetter",
    headerName: "Cover Letter",
    flex: 2,
    minWidth: 200,
    renderCell: (params) => (
      <Tooltip title={params.value || ""}>
        <span className="cell-truncate">{params.value}</span>
      </Tooltip>
    ),
  },
  {
    field: "resumeUrl",
    headerName: "Resume",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Tooltip title="Download Resume">
        <IconButton
          href={`${BASE_URL}/Applicant/download/${params.row.resumeUrl}`}
          download
          size="small"
          color="primary"
        >
          <PictureAsPdf />
        </IconButton>
      </Tooltip>
    ),
  },
];

const ApplicantsGrid = ({ data }: IApplicantsGridProps) => {
  return (
    <Box className="applicants-grid-container">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={60}
        checkboxSelection={false}
        disableColumnMenu
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Box>
  );
};

export default ApplicantsGrid;
