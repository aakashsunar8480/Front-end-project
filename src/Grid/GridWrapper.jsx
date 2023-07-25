import { Stack, TextField, Pagination } from "@mui/material";
import { Grid } from "./Grid";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export const GridWrapper = ({ data, handleSerach, gridLoading, pages }) => {
  const [searchData, setSearchData] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const handleChange = (event, value) => {
    setPageNumber(value);
    handleSerach(value, searchData);
  };

  return (
    <Stack gap={"16px"} width={"100%"} height={`calc(100vh - 80px) !important`}>
      <TextField
        size="medium"
        placeholder={"Serach by name"}
        InputProps={{
          startAdornment: (
            <Stack paddingRight={"20px"}>
              <SearchIcon color="disabled" fontSize="medium" />
            </Stack>
          ),
        }}
        value={searchData}
        onChange={(event) => {
          setSearchData(event.target.value);
          setTimeout(() => {
            handleSerach(pageNumber, event.target.value);
          }, 500);
        }}
      />
      <Grid rows={data} loading={gridLoading} />
      <Stack alignItems={"end"}>
        <Pagination count={pages} onChange={handleChange} />
      </Stack>
    </Stack>
  );
};
