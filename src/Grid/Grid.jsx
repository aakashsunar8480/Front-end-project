import { Pagination, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const Grid = ({ rows, loading }) => {
  const columnData = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "status", headerName: "Status", width: 260 },
    { field: "species", headerName: "Species", width: 260 },
    { field: "gender", headerName: "Gender", width: 200 },
  ];

  return (
    <DataGrid
      columns={columnData}
      rows={rows}
      loading={loading}
      hideFooterPagination
      disableRowSelectionOnClick
    />
  );
};
