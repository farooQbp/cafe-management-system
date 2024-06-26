Sure, I'll add the table creation steps to the README file. Here's the updated version:

---

# Cafe Management System

Welcome to the Cafe Management System project! This README will guide you through the steps to set up and run the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [MongoDB](https://www.mongodb.com/)
- [Oracle Database](https://www.oracle.com/database/)

## Installation

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone -b main https://github.com/farooQbp/cafe-management-system.git
```

### 2. Navigate to the Data Services Directory

```bash
cd cafe-management-system/DataServices/
```

### 3. Activate the Virtual Environment

```bash
.\myenv\Scripts\activate
```

### 4. Install Python Packages

```bash
pip install -r requirements.txt
```

### 5. Start the Python Application

```bash
python app.py
```

### 6. Open Another Terminal and Navigate to the Web Directory

```bash
cd ../Web
```

### 7. Install Node Packages

```bash
npm install
```

### 8. Start the Web Application

```bash
npm start
```

## Configuration

### Oracle Configuration

Replace the Oracle database details in the following file:

```plaintext
DataServices/source/oracle/oracle.py
```

### MongoDB Configuration

Replace the MongoDB details in the following file:

```plaintext
DataServices/source/oracle/mongo.py
```

## Database Setup

To set up the Oracle database, run the following SQL commands to create the necessary tables:

```sql
CREATE TABLE User_Type (
    User_Type_Name VARCHAR(50) PRIMARY KEY NOT NULL
);

CREATE TABLE Users (
    User_ID INT PRIMARY KEY NOT NULL,
    User_Name VARCHAR(50) NOT NULL,
    User_Email VARCHAR(50) NOT NULL,
    User_Password VARCHAR(50) NOT NULL,
    User_Type VARCHAR(50) NOT NULL,
    FOREIGN KEY (User_Type) REFERENCES User_Type(User_Type_Name)
);

CREATE TABLE CATEGORY_TYPE (
    ID NUMBER NOT NULL,
    NAME VARCHAR2(10) NOT NULL,
    CONSTRAINT CATEGORY_TYPE_PK PRIMARY KEY (ID)
);

CREATE TABLE DIETARY_PREFERENCES (
    ID NUMBER,
    NAME VARCHAR2(15) NOT NULL,
    CONSTRAINT DIETARY_PREFERENCES_PK PRIMARY KEY (ID)
);

CREATE TABLE INVENTORY (
    ID NUMBER NOT NULL,
    NAME VARCHAR2(50) NOT NULL,
    STOCK_AVAILABLE NUMBER NOT NULL,
    PRICE_PER_UNIT NUMBER NOT NULL,
    CONSTRAINT INVENTORY_PK PRIMARY KEY (ID)
);
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize the sections as needed.
