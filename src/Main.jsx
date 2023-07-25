import { Login } from "./Login/Login";
import { Stack, Snackbar, Alert } from "@mui/material";
import Image from "./background.jpg";
import { useState } from "react";
import { GridWrapper } from "./Grid/GridWrapper";

export const Main = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [data, setData] = useState([]);
  const [gridLoading, setGridLoading] = useState(true);
  const [toastConfig, setToatsConfig] = useState({ message: "", open: false });
  const [pages, setPages] = useState(0);

  const onLogin = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const responseData = await response.json();
      setData([...responseData.results]);
      setPages(responseData.info.pages);
      setGridLoading(false);
      setLoginStatus(true);
    } catch (e) {
      setToatsConfig({ open: true, message: "Error in API" });
    }
  };

  const handleSerach = async (pageNumber, text) => {
    try {
      setGridLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?${
          pageNumber ? `page=${pageNumber}` : ""
        }${text ? `&name=${text}` : ""}`
      );
      const responseData = await response.json();
      setData([...responseData.results]);
      setPages(responseData.info.pages);
      setGridLoading(false);
    } catch (e) {
      setToatsConfig({ open: true, message: "Error in API" });
      setGridLoading(false);
      setData([]);
    }
  };

  return (
    <>
      {!loginStatus ? (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
          }}
          padding={"40px"}
        >
          <Login onLogin={onLogin} />
        </Stack>
      ) : (
        <Stack padding={"40px"}>
          <GridWrapper
            data={data}
            handleSerach={handleSerach}
            gridLoading={gridLoading}
            pages={pages}
          />
        </Stack>
      )}
      {toastConfig.open && (
        <Snackbar
          open={toastConfig.open}
          autoHideDuration={2000}
          onClose={() => {
            setToatsConfig({ open: false, message: "" });
          }}
        >
          <Alert
            onClose={() => {
              setToatsConfig({ open: false, message: "" });
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            {toastConfig.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
