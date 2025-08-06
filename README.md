# Finly Money Manager

<div align="center">
  <img src="./finly-webapp/src/assets/FinlyLogo.png" alt="Finly Logo" width="200"/>
  <h3>Your Personal Finance Tracking Solution</h3>
</div>

## Overview

Finly Money Manager is a comprehensive personal finance management application that helps users track their income, expenses, and overall financial health. Built with a modern tech stack, it offers an intuitive interface for managing your financial life.

## Features

- 📊 **Comprehensive Dashboard**: Real-time financial overview with interactive charts and graphs
- 💰 **Income Tracking**: Record and categorize income from multiple sources
- 💸 **Expense Management**: Track and categorize expenses with detailed breakdowns
- 📁 **Smart Categories**: Create custom categories with emoji support for better organization
- 📈 **Financial Analytics**: Visual representation using line charts and pie charts
- 📅 **Monthly Overview**: Track monthly financial performance and trends
- � **Secure Authentication**: JWT-based authentication with email verification
- 📧 **Email Integration**: Account activation and password reset via email
- 🖼️ **Profile Management**: Upload and manage profile pictures via Cloudinary
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎨 **Modern UI**: Built with TailwindCSS for a clean, professional interface
- 🔍 **Transaction Filtering**: Advanced filtering options for transactions
- 📊 **Export Functionality**: Export data using Apache POI integration
- 🌐 **Real-time Updates**: Live updates across all components

## Tech Stack

### Frontend (finly-webapp)
- **React 19.1.0** with **Vite 7.0.4**
- **TailwindCSS 4.1.11** for styling
- **React Router DOM 7.7.1** for navigation
- **Recharts 3.1.0** for data visualization
- **Axios 1.11.0** for API communication
- **React Hot Toast** for notifications
- **Emoji Picker React** for category emojis
- **Lucide React** for icons
- **Moment.js** for date handling

### Backend (finly-backend)
- **Spring Boot 3.5.4** (Java 21)
- **Spring Security** for authentication
- **Spring Data JPA** for database operations
- **MySQL** database
- **JWT (JSON Web Tokens)** for authentication
- **Spring Mail** with Brevo SMTP for email services
- **Apache POI** for Excel file handling
- **Lombok** for reducing boilerplate code
- **Maven** for dependency management

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Java JDK 21**
- **Maven 3.6+**
- **MySQL 8.0+**
- **IDE**: VS Code (frontend), IntelliJ IDEA (backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Minulck/Finly-Money-Manager.git
   cd Finly-Money-Manager
   ```

2. **Frontend Setup**
   ```bash
   cd finly-webapp
   npm install
   ```

   Create a `.env` file in the `finly-webapp` directory:
   ```env
   # Backend API Configuration
   VITE_BASE_API_URL=http://localhost:8080
   
   # Cloudinary Configuration (for image uploads)
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

   Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

3. **Backend Setup**

   **Database Setup:**
   ```sql
   CREATE DATABASE finly_db;
   CREATE USER 'finly_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON finly_db.* TO 'finly_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

   **Environment Variables:**
   Create environment variables or update `application.properties`:
   ```properties
   # Database Configuration
   DB_URL=jdbc:mysql://localhost:3306/finly_db?useSSL=false&serverTimezone=UTC
   DB_Username=finly_user
   DB_Password=your_password
   
   # Email Configuration (Brevo SMTP)
   MAIL_USERNAME=your_brevo_username
   MAIL_PASSWORD=your_brevo_password
   MAIL_FROM=your_email@domain.com
   
   # JWT Configuration
   JWT_SECRET_KEY=your_jwt_secret_key_here
   
   # Frontend URL
   FiNLY_FRONTEND_URL=http://localhost:5173
   
   # Activation Link
   FINLY_ACTIVATION_LINK=http://localhost:5173/activate
   ```

   Build and run the backend:
   ```bash
   cd finly-backend
   mvn clean install
   mvn spring-boot:run
   ```
   The backend API will be available at `http://localhost:8080/api/v1.0`

## Project Structure

```
finly-webapp/                    # Frontend React application
├── public/                     # Public assets
├── src/
│   ├── assets/                # Images and static files
│   │   └── images/           
│   ├── components/            # Reusable UI components
│   │   ├── AddCategoryForm/   # Category management
│   │   ├── AddExpenseForm/    # Expense entry
│   │   ├── AddIncomeForm/     # Income entry
│   │   ├── Dashboard/         # Main dashboard
│   │   ├── Charts/            # Data visualization
│   │   └── common/           # Shared components
│   ├── pages/                # Main application pages
│   │   ├── Home/            # Dashboard page
│   │   ├── Income/          # Income management
│   │   ├── Expense/         # Expense tracking
│   │   ├── Category/        # Category management
│   │   ├── Login/           # Authentication
│   │   └── Signup/          # User registration
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom React hooks
│   └── util/               # Utility functions
├── .env                     # Environment variables
├── package.json            # Dependencies and scripts
└── vite.config.js         # Vite configuration

finly-backend/                  # Spring Boot backend
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── Minul/
│   │   │           └── finly_backend/
│   │   │               ├── config/          # Configuration classes
│   │   │               ├── controller/      # REST endpoints
│   │   │               ├── dto/             # Data transfer objects
│   │   │               ├── entity/          # Database entities
│   │   │               ├── repository/      # Data access layer
│   │   │               ├── security/        # Security config
│   │   │               ├── service/         # Business logic
│   │   │               └── util/            # Utility classes
│   │   └── resources/
│   │       └── application.properties    # Application configuration
│   └── test/                           # Test files
├── pom.xml                            # Maven dependencies
└── Dockerfile                        # Container configuration
```

### Important Files

#### Frontend Configuration
- `.env`: Environment variables (API URLs, Cloudinary config)
- `package.json`: Dependencies and npm scripts
- `vite.config.js`: Vite bundler configuration with TailwindCSS
- `eslint.config.js`: ESLint configuration for code quality
- `src/util/apiEndpoints.jsx`: Centralized API endpoint definitions
- `src/context/AppContext.jsx`: Global state management with React Context
- `src/util/axiosConfig.js`: Axios HTTP client configuration

#### Backend Configuration
- `application.properties`: Environment-based configuration using `${VAR}` placeholders
- `pom.xml`: Maven dependencies and build configuration
- `src/main/java/.../config/`: Security, CORS, and database configurations
- `src/main/java/.../security/`: JWT authentication and authorization
- `Dockerfile`: Container deployment configuration

#### Key Environment Variables
**Frontend (.env):**
- `VITE_BASE_API_URL`: Backend API base URL
- `VITE_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image uploads

**Backend (Environment Variables):**
- `DB_URL`, `DB_Username`, `DB_Password`: Database connection
- `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM`: Email service configuration
- `JWT_SECRET_KEY`: JWT token signing secret
- `FiNLY_FRONTEND_URL`: Frontend URL for CORS and email links
- `FINLY_ACTIVATION_LINK`: Email activation link template

## API Documentation

### Base URL
```
http://localhost:8080/api/v1.0
```

### Authentication Endpoints
- `POST /login` - User login
- `POST /register` - User registration
- `GET /activate` - Account activation
- `POST /reset-email` - Send password reset email
- `POST /reset-password` - Reset password

### Core Endpoints
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /profile/password` - Change password
- `GET /categories` - Get user categories
- `POST /categories` - Create new category
- `GET /incomes` - Get user incomes
- `POST /incomes` - Add new income
- `GET /expenses` - Get user expenses
- `POST /expenses` - Add new expense
- `GET /dashboard/dashboard-data` - Get dashboard data

## Key Features in Detail

### Financial Dashboard
- **Real-time Overview**: Live financial status with automatic updates
- **Interactive Charts**: Line charts for trends, pie charts for category breakdowns
- **Monthly Insights**: Monthly financial performance tracking
- **Recent Transactions**: Quick access to latest income and expense entries
- **Category Analysis**: Visual breakdown of spending by category

### Transaction Management
- **Income Tracking**: Add, edit, and delete income entries with categories
- **Expense Recording**: Detailed expense tracking with custom categories
- **Smart Categorization**: Emoji-supported categories for better visual recognition
- **Transaction History**: Complete transaction history with filtering options
- **Bulk Operations**: Efficient management of multiple transactions

### User Experience
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Real-time Notifications**: Toast notifications for user actions
- **Profile Management**: Cloudinary-powered profile image uploads
- **Email Integration**: Automated email verification and password reset
- **Secure Authentication**: JWT-based authentication with refresh tokens

## Contributing

We welcome contributions to Finly Money Manager! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Minul - [GitHub Profile](https://github.com/Minulck)
Email - [Email_Me](minulck@gmail.com)
Project Link: [https://github.com/Minulck/Finly-Money-Manager](https://github.com/Minulck/Finly-Money-Manager)

---

<div align="center">
  Made with ❤️ by Minul
</div>
