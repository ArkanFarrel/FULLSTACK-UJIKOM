/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PropertyCard from "../components/Propertycard.jsx";
import FeatureCard from "../components/Featurecard.jsx";
import gambar from "../img/logo-rku.png";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footerhomepage from "../components/Footerhomepage.jsx";

const handleScrollToTestimonial = () => {
  const testimonialSection = document.getElementById("testimonials");
  if (testimonialSection) {
    testimonialSection.scrollIntoView({ behavior: "smooth" });
  }
};
const handleScrollTofeaturecard = () => {
  const featurecard = document.getElementById("featurecard");
  if (featurecard) {
    featurecard.scrollIntoView({ behavior: "smooth" });
  }
};
const handleScrollTolayanan = () => {
  const layanan = document.getElementById("layanan");
  if (layanan) {
    layanan.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScrollTolihat = () => {
  const lihatSection = document.getElementById("lihat");
  if (lihatSection) {
    lihatSection.scrollIntoView({ behavior: "smooth" });
  }
};
const handleScrollTosimulasi = () => {
  const simulasiSection = document.getElementById("simulasi");
  if (simulasiSection) {
    simulasiSection.scrollIntoView({ behavior: "smooth" });
  }
};

const featureCards = [
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/cari_agen_eec1886a8f/cari_agen_eec1886a8f.svg",
    title: "Cari Agen",
    onclick: handleScrollToTestimonial,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/iklankan_properti_5f17f9d285/iklankan_properti_5f17f9d285.svg",
    title: "Iklankan Properti",
    onclick: handleScrollTofeaturecard,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/Jual_Propertimu_749b908321/Jual_Propertimu_749b908321.svg",
    title: "Jual Propertimu",
    onclick: handleScrollTofeaturecard,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/carikan_properti_d35e238a07/carikan_properti_d35e238a07.svg",
    title: "Carikan Properti",
    onclick: handleScrollTofeaturecard,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/simulasi_kpr_105d56534d/simulasi_kpr_105d56534d.svg",
    title: "Simulasi KPR",
    onclick: handleScrollTosimulasi,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/pindah_kpr_cc6669f5e3/pindah_kpr_cc6669f5e3.svg",
    title: "Pindah KPR",
    onclick: handleScrollTosimulasi,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/Aset_Bank_adbb8a7b78/Aset_Bank_adbb8a7b78.svg",
    title: "Aset Lelang Bank",
  },
  {
    icon: "https://storage.googleapis.com/core-asset/static/images/assets/quick-menu-others-icon.svg",
    title: "Lainnya",
    onclick: handleScrollTolayanan,
  },
];

const testimonials = [
  {
    name: "Danang Tri Wibowo",
    role: "Agen",
    feedback:
      "Rumahmu membantu saya mendapatkan leads dari customer dengan optimal. Dengan memanfaatkan Feature Listing, calon pembeli datang setiap harinya.",
  },
  {
    name: "Ananta Aji Wiguna",
    role: "Pembeli",
    feedback:
      "Situsnya bagus, membantu dalam memberikan informasi untuk mencari rumah khususnya bagi yang suka cari-cari informasi.",
  },
  {
    name: "Adeline Puspa",
    role: "Agen",
    feedback:
      "Saya mendapatkan lebih banyak buyer setelah mengiklankan properti di Rumahmu. Interface Rumahmu memudahkan saya mengatur promosi listing dengan baik.",
  },
  {
    name: "Siapa Puspa",
    role: "Agen",
    feedback:
      "Saya mendapatkan lebih banyak buyer setelah mengiklankan properti di Rumahmu. Interface Rumahmu memudahkan saya mengatur promosi listing dengan baik.",
  },
];

const services = [
  {
    title: "Beli properti",
    description:
      "Kami Menawarkan Beragam Pilihan Properti yang Sesuai dengan Kebutuhan dan Anggaran Anda.",
    icon: "🏠",
  },
  {
    title: "Jual Properti Anda",
    description:
      "Kami Menyediakan Layanan agar Properti Anda terjual dengan Harga Terbaik.",
    icon: "🏡",
  },
  {
    title: "Perhitungan KPR",
    description:
      "Kalkulator KPR untuk Mengetahui Besaran Cicilan Bulanan, Suku Bunga, dan Jangka Waktu yang Sesuai.",
    icon: "🏦",
  },
  {
    title: "Listing Terbaik",
    description:
      "Jelajahi Berbagai Jenis Properti dengan Fasilitas Modern dan Lokasi Strategis.",
    icon: "📋",
  },
  {
    title: "Harga Bersahabat",
    description:
      "Kami Menawarkan Pilihan Terbaik dengan Harga Kompetitif dan Nilai Investasi yang Menguntungkan.",
    icon: "💰",
  },
  {
    title: "Komunikasi Mudah",
    description:
      "Kami Siap Membantu Anda Menemukan atau Menjual Properti dengan Proses yang Transparan dan Ramah.",
    icon: "💬",
  },
];

const Homepage = ({ cartItems = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [properties, setProperties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3008/property"); // Sesuaikan URL API
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img
                src={gambar}
                alt="Logo"
                className="h-10 w-auto filter hue-rotate-[220deg]"
              />
            </div>

            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:flex space-x-4">
                <a
                  href="#/home"
                  className="text-gray-700 hover:bg-blue-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#/home"
                  className="text-gray-700 hover:bg-blue-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  About us
                </a>

                <div className="relative dropdown">
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === "dijual" ? null : "dijual"
                      )
                    }
                    className="text-gray-700 hover:bg-blue-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dijual
                  </button>
                  {dropdownOpen === "dijual" && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                      {["Rumah", "Apartemen", "Ruko", "Tanah"].map((item) => (
                        <a
                          key={item}
                          // href={`/${item.toLowerCase()}`}

                          // sementara seperti dibawah ini
                          href="#/home"
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-200 transition"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative dropdown">
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === "disewakan" ? null : "disewakan"
                      )
                    }
                    className="text-gray-700 hover:bg-blue-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Disewakan
                  </button>
                  {dropdownOpen === "disewakan" && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                      {["Rumah", "Apartemen", "Kost", "Ruko"].map((item) => (
                        <a
                          key={item}
                          // href={`/${item.toLowerCase()}`}

                          // sementara seperti dibawah ini
                          href="#/home"
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-200 transition"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative mt-1">
              {/* Icon Keranjang Belanja */}
              <button
                className="relative hover:text-blue-600"
                aria-label="Keranjang Belanja"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l3.4-8H6.4M7 13L5.4 6M7 13l-1.6 8M17 13l1.6 8M9 21h6"
                  />
                </svg>

                {/* Badge jumlah item di keranjang */}
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-2 -translate-y-2">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Dropdown Keranjang */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Keranjang Belanja</h3>
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {cartItems.length > 0 ? (
                      cartItems.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between p-3 border-b"
                        >
                          <span className="text-sm">{item.title}</span>
                          <span className="text-sm font-bold">
                            {item.price}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="p-3 text-center text-gray-500">
                        Keranjang kosong
                      </li>
                    )}
                  </ul>
                  <div className="p-4">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div id="featurecard" className="mt-24 flex flex-col items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full max-w-6xl px-4">
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              title={card.title}
              onClick={card.onclick} // Properti onClick diteruskan
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between mx-12">
          <h2 className="text-2xl font-bold text-gray-800">
            Rekomendasi Sesuai Pencarianmu
          </h2>
          <button
            onClick={handleScrollTolihat}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
          >
            Lihat Selengkapnya
          </button>
        </div>
        <div className="p-6">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {properties.map((property) => (
              <SwiperSlide key={property.id} className="flex justify-center">
                <PropertyCard
                  title={property.name}
                  price={property.price}
                  location={property.location}
                  status={property.status || "-"}
                  description={property.description || "-"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <section className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800">
            Kami Memberikan Pelayanan Yang Lebih Baik Untuk Anda
          </h2>
          <p className="text-gray-600 mt-4">
            Komitmen Kami Adalah Memenuhi Kebutuhan Anda dengan Layanan yang
            Berkualitas, Cepat, dan Ramah.
          </p>
        </div>
        <div id="simulasi" className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl"
            >
              <div className="text-4xl bg-green-100 text-green-500 rounded-full p-4">
                {service.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div id="testimonials" className="bg-gray-100 py-10 mt-10">
        <h2 className="text-2xl font-bold text-center mb-7">
          Kata Mereka yang Sudah Menggunakan Layanan Rumahmu
        </h2>
        <div className="flex justify-center flex-wrap space-x-4 px-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 max-w-xs min-w-[300px]"
            >
              <h3 className="font-semibold text-lg">{testimonial.name}</h3>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
              <p className="mt-2 text-gray-700">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="lihat" style={{ width: "100%" }}>
        <iframe
          title="Google Maps"
          width="100%"
          height="500"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=villa%20dago,%20pamulang+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>

      <div
        id="layanan"
        className="bg-gray-50 rounded-lg shadow-md p-6 mx-auto w-full max-w-2xl my-10"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Layanan Pengaduan Konsumen
        </h2>

        <div className="space-y-4">
          <div className="text-gray-700">
            <h3 className="text-lg font-medium">
              PT Web Marketing Rumahmu Indonesia
            </h3>
            <p>
              Email:{" "}
              <a href="kosong" className="text-blue-600 hover:underline">
                infopengaduan@rumahmu.com
              </a>
            </p>
          </div>

          <div className="text-gray-700">
            <h3 className="text-lg font-medium">
              Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga (Ditjen
              PKTN)
            </h3>
            <p>
              WhatsApp Ditjen PKTN:{" "}
              <a href="kosong" className="text-blue-600 hover:underline">
                0812345678910
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footerhomepage />
    </>
  );
};

export default Homepage;
