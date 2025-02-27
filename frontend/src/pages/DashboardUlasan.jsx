/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import SidebarComponent from "../components/Sidebar.jsx";
import { Box, Pagination } from "@mui/material";

const columns = [
  { id: "id", label: "id", minWidth: 170 },
  { id: "rating", label: "rating", minWidth: 170 },
  { id: "comment", label: "comment", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    rating: "",
    comment: "",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [editProperty, setEditProperty] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3008/ulasan");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3008/ulasan/post",
        newProperty
      );
      handleClose();
      setRows((prevRows) => [...prevRows, response.data]);
    } catch (error) {
      console.error("Terjadi Kesalahan Menambah Data", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:3008/ulasan/update/${editProperty}`,
        newProperty
      );
      setEditOpen(false);
      fetchData();
      setNewProperty({
        rating: "",
        comment: "",
      });
      setEditProperty(null);
    } catch (error) {
      console.error("Terjadi Kesalahan Update Data", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteId) {
        console.error("Invalid ulasan ID");
        return;
      }

      const deleteUrl = `http://localhost:3008/ulasan/delete/${deleteId}`;
      console.log(`Menghapus Data Property Dengan ID: ${deleteId}`);
      console.log(`Delete URL: ${deleteUrl}`);
      await axios.delete(deleteUrl);

      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));

      setDeleteId(null);
      setConfirmOpen(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("data Ulasan Tidak Ditemukan");
        } else {
          console.error(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        }
      } else {
        console.error("Server Tidak Merespon", error.message);
      }

      setConfirmOpen(false);
    }
  };

  const handleDeleteClick = (id) => {
    if (!id) {
      console.error("Invalid ulasan ID");
      return;
    }
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewProperty({
      rating: "",
      comment: "",
    });
  };

  const handleChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handleEditClick = (row) => {
    setEditProperty(row.id);
    setNewProperty({
      rating: row.rating,
      comment: row.comment,
    });
    setEditOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="flex">
      <SidebarComponent />
      <Box sx={{ width: "100%", overflow: "hidden", p: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" onClick={handleAddClick}>
            Add
          </Button>
        </Box>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 10000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(paginatedRows) &&
                  paginatedRows.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "action" ? (
                              <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                gap={1}
                              >
                                <Button
                                  variant="outlined"
                                  startIcon={<EditIcon />}
                                  onClick={() => handleEditClick(row)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outlined"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleDeleteClick(row.id)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={2} mb={2}>
            <Pagination
              count={Math.ceil(rows.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Paper>
      </Box>

      {/* Popup add new Property */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Ulasan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="rating"
            label="Rating"
            fullWidth
            value={newProperty.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="comment"
            label="Comment"
            fullWidth
            value={newProperty.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Popup edit Property */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Ulasan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="rating"
            label="Rating"
            fullWidth
            value={newProperty.rating}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rating"
            label="Comment"
            fullWidth
            value={newProperty.comment}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Popup Delete Property */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this ulasan?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;