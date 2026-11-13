# Inventory Management System

A full-stack Inventory Management System built using **Java Spring Boot, React, and PostgreSQL**. This application helps users manage products, track stock quantities, and monitor inventory value through a dashboard.

## Features

- Add new products
- View all products
- Update existing products
- Delete products
- Search products by name
- Dashboard displaying total products, total stock, and inventory value
- Form validation for product details
- REST API integration between frontend and backend

## Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML
- CSS
- Vite

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

**Database**
- PostgreSQL

**Tools**
- Visual Studio Code
- Postman
- Git and GitHub

## Project Structure

```text
inventory-management/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
└── inventory-management/
    ├── src/main/java/com/inventory/inventory_management/
    │   ├── controller/
    │   ├── entity/
    │   ├── repository/
    │   ├── service/
    │   └── config/
    └── pom.xml
```

## API Endpoints

Base URL: `http://localhost:8080/api/products`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Add a product |
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| PUT | `/api/products/{id}` | Update a product |
| DELETE | `/api/products/{id}` | Delete a product |

## How to Run the Project

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Start the Spring Boot Backend

Open a terminal:

```powershell
cd inventory-management/inventory-management
.\mvnw.cmd spring-boot:run
```

Backend runs at:

`http://localhost:8080`

### 3. Start the React Frontend

Open another terminal:

```powershell
cd inventory-management/frontend
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

### 4. Database Configuration

Configure your PostgreSQL database credentials in the backend `application.properties` file before starting the application.

## Screenshots

Add screenshots of the following:
- Dashboard
- Add Product
- Product List
- Edit Product

## Future Improvements

- User authentication and authorization
- Role-based access
- Low-stock alerts
- Improved reporting and analytics

## Author

Developed as a Java Full Stack Development project.