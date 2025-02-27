# UJIKOM EXTERNAL ( FRONTEND ) - Property Management Application

## 📝 Description
A modern web-based property management system built with React. This application streamlines the process of managing real estate properties, enabling users to efficiently handle property listings, tenant information, and property transactions through an intuitive interface.

## 🏢 Features
- **Property Listings Management**: Add, view, update, and delete property listings
- **Property Details**: 
  - Detailed property information
  - Property status tracking (Available/Sold/Rented)
  - Property images and documentation
- **Dashboard Interface**: Overview of property statistics and key metrics
- **Responsive Design**: Fully responsive interface for both desktop and mobile devices
- **User-Friendly Interface**: Clean and intuitive UI using Material-UI components

## 🛠 Technologies Used
- React.js
- Material-UI (MUI)
- React Router for navigation
- Axios for API integration
- CSS3 for custom styling
- Node.js (runtime environment)

## 📦 Project Structure
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Featurecard/
│   │   ├── Footerhomepage/
│   │   ├── Footerlandingpage/
│   │   ├── Propertycard/
│   │   └── Sidebar/
│   ├── pages/     # Reusable UI components
│   │   ├── Dashboard/
│   │   ├── Dashboardadmin/
│   │   ├── Dashboardtransaksi/
│   │   ├── Dashboardulasan/
│   │   └── Dashboarduser/
│   │   └── forgotpassword/
│   │   └── homepage/
│   │   └── landingpage/
│   │   └── listrumah/
│   │   └── login/
│   │   └── register/
│   ├── pages/         # Main application pages
│   ├── assets/        # Static assets (images, styles)
│   └── App.js         # Main application component
├── public/           # Public assets and index.html
└── package.json      # Project dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
```bash
git clone https://github.com/ArkanFarrel/Ujikom_External_FRONTEND.git
```

2. Navigate to project directory
```bash
cd frontend
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

## 💡 Usage
1. **Dashboard**: 
   - View overall property statistics
   - Quick access to key features

2. **Property Management**:
   - Add new properties with detailed information
   - Edit existing property details
   - Remove properties from the system
   - View property status and history

3. **Search and Filter**:
   - Search properties by various criteria
   - Filter properties based on status, type, or location

## 🖥 Screenshots
*(You can add screenshots of your application here)*

Example:
- Dashboard View
- Property Listing Page
- Add Property Form
- Property Details View

## 👥 Contributors
- [Arkan Farrel](https://github.com/ArkanFarrel)

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements
- Integration with maps for property location
- Advanced filtering and sorting options
- Property comparison feature
- Document management system
- Financial tracking and reporting
- Mobile application development

## 🤝 Acknowledgments
- Thanks to all contributors who participated in this project
- Special thanks to the Material-UI team for their comprehensive component library