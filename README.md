# WeCare

WeCare is a full-stack web application designed to connect users with coaches for personal care and development. It features user authentication, coach profiles, booking management, and more.

## Tech Stack

- **Frontend**: Angular
- **Backend**: .NET Core Web API
- **Database**: SQL Server
- **Other**: Entity Framework Core for data access

## Prerequisites

Before running the app locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Angular CLI](https://angular.io/cli) - Install globally with `npm install -g @angular/cli`
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or SQL Server Express

## Installation and Setup

Follow these steps to get the app running on your local machine:

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/WeCare.git
   cd WeCare
   ```

2. **Set up the database**:
   - Open SQL Server Management Studio (SSMS) or your preferred SQL tool.
   - Connect to your SQL Server instance.
   - Run the `WeCareDB.sql` script located in the root directory to create the database, tables, and initial data.

3. **Configure the backend**:
   - Open the `WeCareAPIServices` folder in your code editor.
   - Open `appsettings.json` and update the connection string to match your SQL Server setup. For example:
     ```
     "ConnectionStrings": {
       "DefaultConnection": "Server=your-server;Database=WeCareDB;Trusted_Connection=True;"
     }
     ```
   - Restore NuGet packages: `dotnet restore`
   - Run the API: `dotnet run`

4. **Configure the frontend**:
   - Open the `WeCareAng` folder in your code editor.
   - Install dependencies: `npm install`
   - Start the development server: `ng serve`

5. **Access the application**:
   - Open your web browser and go to `http://localhost:4200` to view the Angular frontend.
   - The backend API will be available at `https://localhost:5001` (or check the console output for the exact URL).

## Usage

- Register as a new user or log in with existing credentials.
- Browse available coaches and view their profiles.
- Book sessions with coaches.
- Manage your profile and bookings.

## Contributing

If you'd like to contribute to WeCare, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.