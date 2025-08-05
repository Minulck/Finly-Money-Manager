# Finly Money Manager

<div align="center">
  <img src="./finly-webapp/src/assets/FinlyLogo.png" alt="Finly Logo" width="200"/>
  <h3>Your Personal Finance Tracking Solution</h3>
</div>

## Overview

Finly Money Manager is a comprehensive personal finance management application that helps users track their income, expenses, and overall financial health. Built with a modern tech stack, it offers an intuitive interface for managing your financial life.

## Features

- 📊 **Dashboard Overview**: Visual representation of your financial status with charts and graphs
- 💰 **Income Tracking**: Record and categorize all your income sources
- 💸 **Expense Management**: Track your expenses with detailed categorization
- 📁 **Category Management**: Create and manage custom categories for better organization
- 📈 **Financial Analytics**: View trends and patterns in your spending and earning
- 🔒 **Secure Authentication**: Protected access to your financial data
- 📱 **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Tech Stack

### Frontend (finly-webapp)
- React.js with Vite
- Context API for state management
- Modern UI components
- Chart.js for data visualization
- Axios for API communication

### Backend (finly-backend)
- Spring Boot
- Java
- Maven
- RESTful API architecture
- Secure authentication system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java JDK 11 or higher
- Maven
- Your favorite IDE (VS Code recommended for frontend, IntelliJ IDEA for backend)

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
   VITE_API_URL=http://localhost:8080/api
   VITE_UPLOAD_URL=http://localhost:8080/uploads
   VITE_AUTH_TOKEN_KEY=your_auth_token_key
   ```

   Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

3. **Backend Setup**

   Navigate to `finly-backend/src/main/resources` and create `application.properties`:
   ```properties
   # Server Configuration
   server.port=8080
   
   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/finly_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   
   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   
   # JWT Configuration
   jwt.secret=your_jwt_secret_key
   jwt.expiration=86400000
   
   # File Upload Configuration
   spring.servlet.multipart.max-file-size=10MB
   spring.servlet.multipart.max-request-size=10MB
   upload.dir=uploads/
   ```

   Build and run the backend:
   ```bash
   cd finly-backend
   mvn clean install
   mvn spring-boot:run
   ```
   The backend API will be available at `http://localhost:8080`

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

#### Frontend
- `.env`: Environment variables configuration
- `package.json`: Project dependencies and scripts
- `vite.config.js`: Vite bundler configuration
- `src/util/apiEndpoints.jsx`: API endpoint configurations
- `src/context/AppContext.jsx`: Global state management

#### Backend
- `application.properties`: Application configuration and environment variables
- `pom.xml`: Maven dependencies and build configuration
- `src/main/java/.../config/SecurityConfig.java`: Security configurations
- `src/main/java/.../config/WebConfig.java`: CORS and web configurations

## Key Features in Detail

### Financial Dashboard
- Real-time overview of your financial status
- Custom charts showing income vs expenses
- Recent transactions list
- Category-wise expense breakdown

### Transaction Management
- Add, edit, and delete income entries
- Record and categorize expenses
- Attach receipts or documents
- View transaction history

### Category System
- Create custom categories for income and expenses
- Emoji support for better visual recognition
- Category-based filtering and reporting

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
