import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import axios from "axios";
import * as API from "../constants/api-routes";
import { useState, useEffect } from "react";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const updateRefundStatus = (complaint_id) => {
    const requestOptions = {
      complaint_id: complaint_id,
    };
    axios.post(API.UPDATE_REFUND_STATUS, requestOptions).then((response) => {
      console.log(
        "Response of UPDATE_REFUND_STATUS: " + JSON.stringify(response)
      );
    });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.complaint_id}
        </TableCell>
        <TableCell align="center">{row.renter_username}</TableCell>
        <TableCell align="center">{row.product_id}</TableCell>
        <TableCell align="center">
          {row.refund_status == 1 ? "Complete" : "Pending"}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            onClick={() => updateRefundStatus(row.complaint_id)}
          >
            Issue Refund
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Complaint
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableCell align="left">{row.description}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     email: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     refund: PropTypes.string.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         reason: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default function AdminViewComplaints() {
  const [rows, setRows] = useState([
    {
      complaint_id: "",
      description: "",
      is_refund_requested: "",
      product_id: "",
      refund_status: "",
      renter_username: "",
    },
  ]);

  useEffect(() => {
    axios.post(API.GET_COMPLAINTS).then((response) => {
      console.log("Response of GET_COMPLAINTS: " + JSON.stringify(response));
      setRows(response.data);
    });
  }, []);

  return (
    <div
      style={{ padding: "100px", paddingLeft: "200px", paddingRight: "200px" }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Complaint ID</TableCell>
              <TableCell align="center">Renter Username</TableCell>
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Refund Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.refund_status == 1 ? "Complete" : "Pending"}
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
