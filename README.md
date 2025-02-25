# 🍽️ Recipe Sharing Application  

![Nutri-book](https://amirbekshomurodov.me/static/5ea2e3d47e4d5ef3090c9dbfa2aad53d/b897f/nutribook.webp)

A full-stack recipe-sharing platform built using **Java Spring Boot**, **React**, and **PostgreSQL**, featuring **Google Authentication** and **JWT-based security**.  

## 🚀 Overview  
This project allows users to **share, discover, and manage recipes** while personalizing their experience with an **allergy management system**.  

## 👥 Contributors  

- **Amirbek Shomurodov (Organizer)** – Led the project, developed core features, implemented **JWT authentication**, built the **Allergy Management Page**, and designed UI/UX in **Figma**  
- **Dan Beck** – Worked on backend development and API integrations  
- **Adam Hetzel** – Assisted in database management and backend security  
- **Danyal Bhatti** – Developed the **User Profile Page** and contributed to frontend optimizations  
- **Krish Sawhney** – Worked on the **Feedback System** and enhanced API responses  
- **Mann Patel Patel** – Assisted with authentication and frontend styling  
- **Sai Vaibhav Buddolu** – Developed the **Admin & Additional Pages** and worked on UI improvements  

## 👩‍🏫 Supervisor  
- **Dr. Fang Wang** – Supervisor and mentor for the project. You can read more about Dr. Wang and her work at [Brunel University](https://www.brunel.ac.uk/business/Business-Partnerships/Co-Innovate/Journeys/Innovation-Champions/Dr-Fang-Wang)


## ✨ Key Features  
✅ **User Authentication** – Google OAuth & JWT for secure login  
✅ **Recipe Management** – Users can create, update, and explore recipes  
✅ **Allergy Management** – Users can set allergies, filtering out incompatible recipes  
✅ **Secure API** – Advanced security measures for safe data handling  
✅ **Modern UI/UX** – Designed in **Figma** for a seamless user experience  

## 🔥 My Contributions  
- Developed the **Allergy Management Page** to let users control their dietary preferences  
- Implemented **JWT authentication** for enhanced security  
- Assisted teammates in completing their tasks  
- Designed the **UI/UX** of the application in **Figma**  

## 🛠 Tech Stack  
- **Frontend:** React, Tailwind CSS  
- **Backend:** Java Spring Boot  
- **Database:** PostgreSQL  
- **Authentication:** Google OAuth, JWT

## ⚙️ Setup Instructions  

Follow these steps to set up and run the project locally:  

### 🛠 Prerequisites  
Before running the project, ensure you have the following installed:  
- Java (JDK 17 or later)  
- Node.js and npm  
- PostgreSQL  
- Maven  

### 📥 1. Clone the Repository  
Run the following command in your terminal:  
```sh
git clone https://github.com/yourusername/recipe-sharing-app.git
cd recipe-sharing-app
```
### 📦 2. Install Dependencies

 ### 🔹 Backend (Spring Boot)
 Navigate to the backend folder and install dependencies:
```sh
cd backend
mvn install
```

 ### 🔹 Frontend (React)
  Navigate to the frontend folder and install dependencies:
```sh
cd ../frontend
npm install
```

### ⚙️ 3. Configure Environment Variables  

You need to set up environment variables for both the **backend** and **frontend**.  

#### 📌 Backend (`.env` file)  
Create a `.env` file inside the **backend** directory and add the following:  

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/your_database
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### 📌 Backend (`.env` file)  
Create a `.env` file inside the **frontend** directory and add the following:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_API_URL=http://localhost:8080
```
Make sure to **replace placeholder values** (`your_google_client_id`, `http://localhost:8080`, etc.) with your actual configuration.  

✅ **Tip:** Restart your backend and frontend servers after setting up the environment variables to apply changes.  

Let me know if you need any modifications! 🚀






