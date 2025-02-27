import React, { useState } from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SidebarComponent from '../components/Sidebar';
import axios from 'axios';
import rumahKeren from "../img/rumah.jpg";
import { useTheme } from '@mui/material/styles';

const Listrumah = ({ id, title, type, price, location, status, description, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Jumlah rumah per halaman

  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3008/property/delete/${id}`);
      if (response.status === 200) {
        onDelete(id);
        alert("Property berhasil dihapus");
      } else {
        alert("Gagal menghapus property");
      }
    } catch (error) {
      console.error("Error saat menghapus:", error);
      alert("Terjadi kesalahan saat menghapus property");
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  const handleAddToCart = () => {
    alert(`Property ${title} ditambahkan ke keranjang!`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const rumahData = [
    { id: 1, title: "Rumah A", type: "Tipe A", price: "Rp 1.000.000.000", location: "Jawa Barat", status: "Available", description: "Rumah minimalis 150 meter" },
    { id: 2, title: "Rumah B", type: "Tipe B", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 3, title: "Rumah C", type: "Tipe C", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 4, title: "Rumah D", type: "Tipe D", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 5, title: "Rumah E", type: "Tipe E", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 6, title: "Rumah F", type: "Tipe F", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 7, title: "Rumah G", type: "Tipe G", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 8, title: "Rumah H", type: "Tipe H", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 9, title: "Rumah I", type: "Tipe I", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 10, title: "Rumah J", type: "Tipe J", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 11, title: "Rumah K", type: "Tipe K", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
    { id: 12, title: "Rumah L", type: "Tipe L", price: "Rp 2.000.000.000", location: "Jawa Tengah", status: "Available", description: "Rumah modern 200 meter" },
  ];

  // Hitung total halaman
  const totalPages = Math.ceil(rumahData.length / itemsPerPage);

  // Ambil data sesuai halaman yang sedang ditampilkan
  const currentData = rumahData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 250px' }}>
        <SidebarComponent />
      </div>
      <div style={{ flex: 1, padding: '16px' }}>
        <Grid container spacing={3}>
          {currentData.map((rumah) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={rumah.id}>
              <Card sx={{ maxWidth: '100%', m: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={rumahKeren}
                  alt={`Gambar dari ${rumah.title}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {rumah.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Tipe Rumah:</strong> {rumah.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Harga:</strong> {rumah.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Lokasi:</strong> {rumah.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Status:</strong> {rumah.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Deskripsi:</strong> {rumah.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAddToCart}
                    color="primary"
                  >
                    Beli
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<DeleteIcon />} 
                    onClick={handleDeleteClick}
                    color="error"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>

        {/* Popup konfirmasi delete */}
        <Dialog open={confirmOpen} onClose={handleCancelDelete}>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogContent>
            <Typography>Apakah Anda yakin ingin menghapus property ini?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Batal</Button>
            <Button onClick={handleConfirmDelete} color="error">Hapus</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Listrumah;
