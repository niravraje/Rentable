import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import { dividerClasses } from "@mui/material";
import axios from "axios";
import * as API from "../constants/api-routes";
import { useState, useEffect } from "react";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  order_id,
  order_date,
  owner_username,
  product_name,
  product_rent_price,
  product_rent_frequency
) {
  return {
    order_id,
    order_date,
    owner_username,
    product_name,
    product_rent_price,
    product_rent_frequency,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell />
        <TableCell component="th" scope="row">
          {row.order_id}
        </TableCell>
        <TableCell align="right">{row.order_date}</TableCell>
        <TableCell align="right">{row.owner_username}</TableCell>
        <TableCell align="right">{row.product_name}</TableCell>
        <TableCell align="right">{row.product_rent_price}</TableCell>
        <TableCell align="right">{row.product_rent_frequency}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     order_id: PropTypes.string.isRequired,
//     order_date: PropTypes.number.isRequired,
//     owner_username: PropTypes.string.isRequired,
//     product_name: PropTypes.string.isRequired,
//     product_rent_price: PropTypes.string.isRequired,
//     product_rent_frequency: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default function RenterOrderHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState(
    [
      {
        order_id: "",
        order_date: "",
        owner_username: "",
        renter_username: "",
        product_title: "",
        product_rent_price: "",
        product_rent_frequency: "",
      },
    ].sort((a, b) => (a.order_date < b.order_date ? -1 : 1))
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const requestOptions = {
      user_type: sessionStorage.getItem("user_type"),
      username: sessionStorage.getItem("username"),
    };

    axios.post(API.GET_ORDER_HISTORY, requestOptions).then((response) => {
      console.log(
        "Response of Get Renter Order History: " + JSON.stringify(response)
      );
      setRows(
        response.data.sort((a, b) => (a.order_date < b.order_date ? -1 : 1))
      );
    });
  }, []);

  return (
    <div
      style={{ padding: "100px", paddingLeft: "200px", paddingRight: "200px" }}
    >
      <Paper>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Order ID
                </TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Owner Username</TableCell>
                <TableCell align="right">Product Title</TableCell>
                <TableCell align="right">Rent Price</TableCell>
                <TableCell align="right">Rent Frequency</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {row.order_id}
                  </TableCell>
                  <TableCell align="right">{row.order_date}</TableCell>
                  <TableCell align="right">{row.owner_username}</TableCell>
                  <TableCell align="right">{row.product_title}</TableCell>
                  <TableCell align="right">{row.product_rent_price}</TableCell>
                  <TableCell align="right">
                    Per {row.product_rent_frequency}
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
