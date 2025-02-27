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
import { Box } from "@mui/material";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "NAME", minWidth: 170 },
  { id: "email", label: "EMAIL", minWidth: 170 },
  { id: "password", label: "PASSWORD", minWidth: 170 },
  { id: "action", label: "ACTION", minWidth: 100, align: "center" },
];

const Dashboardadmin = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [editAdmin, setEditAdmin] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3008/admin");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3008/admin/post",
        newAdmin
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
        `http://localhost:3008/admin/update/${editAdmin}`,
        editAdmin
      );
      setEditOpen(false);
      fetchData();
      setNewAdmin({
      name: "",
       email: "",
       password: "",
      });
      setEditAdmin(null);
    } catch (error) {
      console.error("Terjadi Kesalahan Update Data", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteId) {
        console.error("Invalid Admin ID");
        return;
      }

      const deleteUrl = `http://localhost:3008/admin/delete/${deleteId}`;
      console.log(`Menghapus Data Admin Dengan ID: ${deleteId}`);
      console.log(`Delete URL: ${deleteUrl}`);
      await axios.delete(deleteUrl);

      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));

      setDeleteId(null);
      setConfirmOpen(false);
    } catch (error) {
      if (error.response) {
      } else {
        console.error("Server Tidak Merespon", error.message);
      }

      setConfirmOpen(false);
    }
  };

  const handleDeleteClick = (id) => {
    if (!id) {
      console.error("Invalid property ID");
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
    setNewAdmin({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleEditClick = (row) => {
    setEditAdmin(row.id);
    setNewAdmin({ name: row.name, email: row.email, password: row.password });
    setEditOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <SidebarComponent />
      <Box sx={{ width: "100%", overflow: "hidden", p: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" onClick={handleAddClick}>
            Add
          </Button>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 1000 }}>
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
                {Array.isArray(rows) &&
                  rows.map((row) => (
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
                                  // style={{marginLeft: "40px"}}
                                  variant="outlined"
                                  startIcon={<EditIcon />}
                                  onClick={() => handleEditClick(row)}
                                >
                                  Edit
                                </Button>
                                <Button
                                // style={{marginLeft: "50px"}}
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
        </Paper>
      </Box>

      {/* Popup add new Admin disini */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={newAdmin.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={newAdmin.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            fullWidth
            value={newAdmin.loc}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Popup edit Admin Disini */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nama"
            label="Name"
            fullWidth
            value={newAdmin.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={newAdmin.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            fullWidth
            value={newAdmin.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Popup delete Property Disini */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this admin?</p>
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

export default Dashboardadmin;
