# WeCare

## Project Overview

WeCare is a comprehensive full-stack web application built to facilitate connections between users seeking personal development and professional coaches. The platform allows users to register, browse coach profiles, book coaching sessions, and manage their personal growth journey. Coaches can create profiles, manage their availability, and interact with clients through the system.

The application is designed with a modern architecture, separating concerns between the frontend user interface, backend business logic, and data persistence layer. This ensures scalability, maintainability, and a smooth user experience.

## Tech Stack

- **Frontend**: Angular (TypeScript-based framework for building dynamic single-page applications)
- **Backend**: .NET Core Web API (RESTful API for handling business logic and data operations)
- **Database**: SQL Server (Relational database for storing user, coach, and booking data)
- **ORM**: Entity Framework Core (For object-relational mapping and database interactions)
- **Authentication**: JWT-based authentication for secure user sessions
- **Styling**: CSS with Angular components for responsive UI

## Features

### User Features
- **User Registration and Login**: Secure sign-up and authentication system
- **Profile Management**: Users can view and update their personal information
- **Coach Discovery**: Browse and search for available coaches
- **Booking System**: Schedule and manage coaching sessions
- **Dashboard**: Personalized view of upcoming bookings and coach interactions

### Coach Features
- **Coach Profiles**: Detailed profiles showcasing expertise, experience, and availability
- **Session Management**: Manage bookings, availability, and client interactions
- **Profile Customization**: Coaches can update their information and services

### General Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Dynamic updates for bookings and profiles
- **Secure API**: Protected endpoints with authentication and authorization

## Architecture

The application follows a layered architecture:

- **Presentation Layer (WeCareAng)**: Angular application handling user interactions
- **Application Layer (WeCareAPIServices)**: .NET Core API exposing REST endpoints
- **Data Access Layer (WeCareDAL)**: Repository pattern with Entity Framework for database operations
- **Database Layer**: SQL Server with structured tables for Users, Coaches, and Bookings

### Project Structure
```
WeCare/
├── WeCareAng/          # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── home/       # Home page component
│   │   │   ├── login/      # Login component
│   │   │   ├── sign-up/    # Registration component
│   │   │   ├── user/       # User dashboard
│   │   │   ├── coach/      # Coach-related components
│   │   │   └── ...
│   │   └── assets/         # Static assets
│   └── ...
├── WeCareAPIServices/  # .NET Core API
│   ├── Controllers/        # API controllers
│   ├── Properties/         # App settings
│   └── ...
├── WeCareDAL/          # Data access layer
│   ├── Models/             # Entity models
│   ├── WeCareDbContext.cs  # EF Core context
│   └── ...
├── WeCareDB.sql        # Database schema script
└── README.md           # This file
```

## Prerequisites

Before running the app locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher) - For running the Angular app
- [Angular CLI](https://angular.io/cli) - Install globally with `npm install -g @angular/cli`
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) - For building and running the .NET API
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or SQL Server Express - For the database
- [Visual Studio Code](https://code.visualstudio.com/) or another IDE for development

## Installation and Setup

Follow these steps to get the app running on your local machine:

1. **Clone the repository**:
   ```
   git clone https://github.com/naveen-virat/WeCare.git
   cd WeCare
   ```

2. **Set up the database**:
   - Install SQL Server if you haven't already.
   - Open SQL Server Management Studio (SSMS) or your preferred SQL management tool.
   - Connect to your local SQL Server instance.
   - Open and execute the `WeCareDB.sql` script located in the root directory. This will create the `WeCareDB` database with all necessary tables and initial data.

3. **Configure the backend**:
   - Navigate to the `WeCareAPIServices` folder.
   - Open `appsettings.json` in a text editor.
   - Update the `ConnectionStrings.DefaultConnection` to point to your SQL Server instance. For example, if using local SQL Server with Windows authentication:
     ```
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=WeCareDB;Trusted_Connection=True;MultipleActiveResultSets=true"
     }
     ```
   - Restore NuGet packages by running: `dotnet restore`
   - Build the project: `dotnet build`
   - Run the API server: `dotnet run`
     - The API will start on `https://localhost:5001` (or check the console for the exact URL).

4. **Configure the frontend**:
   - Open a new terminal and navigate to the `WeCareAng` folder.
   - Install npm dependencies: `npm install`
   - Start the Angular development server: `ng serve`
     - The frontend will be available at `http://localhost:4200`.

5. **Access the application**:
   - Open your web browser and navigate to `http://localhost:4200`.
   - You can now register as a new user, log in, browse coaches, and make bookings.
   - The backend API endpoints are accessible at `https://localhost:5001/api/...`

## API Endpoints

The backend provides the following main API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/coaches` - Get list of coaches
- `GET /api/coaches/{id}` - Get coach details
- `POST /api/bookings` - Create a booking
- `GET /api/users/{id}/bookings` - Get user bookings

For a full list, refer to the Swagger documentation at `https://localhost:5001/swagger` when the API is running.

## Database Schema

The database consists of the following main tables:

- **Users**: Stores user account information
- **Coaches**: Stores coach profiles and details
- **Bookings**: Manages session bookings between users and coaches

Refer to `WeCareDB.sql` for the complete schema.

## Development

### Running Tests
- Backend: `dotnet test` in the `WeCareAPIServices` directory
- Frontend: `ng test` in the `WeCareAng` directory

### Building for Production
- Backend: `dotnet publish` in `WeCareAPIServices`
- Frontend: `ng build --prod` in `WeCareAng`

## Usage

- Register as a new user or log in with existing credentials.
- Browse available coaches and view their profiles.
- Book sessions with coaches.
- Manage your profile and bookings.

## Contributing

We welcome contributions to WeCare! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## Troubleshooting

- **Database connection issues**: Double-check your connection string in `appsettings.json`
- **Port conflicts**: Ensure ports 4200 (Angular) and 5001 (.NET) are available
- **Build errors**: Run `dotnet restore` and `npm install` to ensure all dependencies are installed
- **CORS issues**: The API is configured to allow requests from `http://localhost:4200`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
