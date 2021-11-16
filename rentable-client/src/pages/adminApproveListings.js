import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";
import { useState, useEffect } from "react";
import JSONDATA from "../Data2.json";
import { useHistory } from "react-router-dom";
import * as API from "../constants/api-routes";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "category",
    numeric: false,
    paddingLeft: "10px",
    label: "Category",
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "owner_username",
    numeric: true,
    disablePadding: false,
    label: "Owner Username",
  },
  {
    id: "rent_price",
    numeric: true,
    disablePadding: false,
    label: "Rent Price (USD)",
  },
  {
    id: "rent_price",
    numeric: true,
    disablePadding: false,
    label: "Rental Frequency",
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "Title",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Pending Approvals
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [error, setError] = useState("");

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([
    {
      category: "",
      description: "",
      id: "",
      owner_username: "",
      rent: "",
      rent_frequency: "",
      title: "",
    },
  ]);
  useEffect(() => {
    console.log("use effect triggered!");
    const getFilteredProducts = async (approval_filter) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          approval_filter: approval_filter,
        }),
      };
      try {
        const res = await fetch(API.GET_FILTERED_PRODUCTS, requestOptions);
        console.log("Response on get_products request: " + res);
        const data = await res.json();

        console.log("res -> data = " + data);
        // console.log("JSONDATA = " + JSONDATA);
        console.log("data[0] = " + data[0].title);
        console.log("res->data typeof: " + typeof data);
        console.log(
          "res->data stringified typeof: " + typeof JSON.stringify(data)
        );
        console.log("JSONDATAx typeof: " + typeof JSONDATAx);

        console.log("Status code of request: " + res.status);

        console.log("res.json(): " + JSON.stringify(data));

        setRows(data);

        return;
      } catch (err) {
        setError("Error. Internal server error.");
        console.log("Server error occurred. Check if the server is running.");
      }
    };

    getFilteredProducts(0);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [cards, setCards] = useState(JSONDATA);

  const findJsonObjectById = (id) => {
    return rows.filter(() => {
      return rows.id === id;
    });
  };

  const denyListing = async (productId) => {
    //update the approval_status to 0 for the specified ID
    console.log("deny id: " + productId);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: productId,
      }),
    };
    const res = await fetch(API.ADMIN_DENY_LISTING, requestOptions);
    console.log("Response on deny_listing request: " + res);
    const data = await res.json();
    console.log("res.json(): " + JSON.stringify(data));
    // window.location.reload(false);
  };

  const approveListing = async (productId) => {
    console.log("approve id: " + productId);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: productId,
      }),
    };
    const res = await fetch(API.ADMIN_APPROVE_LISTING, requestOptions);
    console.log("Response on approve_listing request: " + res);
    const data = await res.json();
    console.log("res.json(): " + JSON.stringify(data));
    // getProducts();
    // window.location.reload(false);
  };

  const convertToTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div style={{ padding: "100px" }}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow>
                        <TableCell align="left" style={{ paddingLeft: "20px" }}>
                          {convertToTitleCase(row.category)}
                        </TableCell>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">
                          {row.owner_username}
                        </TableCell>
                        <TableCell align="right">{row.rent_price}</TableCell>
                        <TableCell align="right">
                          {"Per " + convertToTitleCase(row.rent_frequency)}
                        </TableCell>
                        <TableCell align="right">{row.title}</TableCell>
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="contained"
                          onClick={() => approveListing(row.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="contained"
                          onClick={() => denyListing(row.id)}
                        >
                          Deny
                        </Button>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
