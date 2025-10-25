if (exists(select name from master.dbo.sysdatabases where ('['+name+']' = N'WeCareDB' or name = N'WeCareDB')))
drop DATABASE WeCareDB
go

create database WeCareDB
USE WeCareDB

CREATE TABLE [User](
  [UserId] INT CONSTRAINT pk_UserId PRIMARY KEY IDENTITY(1001,1),
  [Name] VARCHAR(50) CONSTRAINT chk_UserName CHECK(len([Name])>=3 AND len([Name])<=50) NOT NULL,
  [Password] VARCHAR(15) CONSTRAINT chk_UserPassword CHECK(len([Password])>=5 AND len([Password])<=10) NOT NULL,
  [Gender] CHAR CONSTRAINT chk_UserGender CHECK(Gender='F' OR Gender='M') NOT NULL,
  [MobileNumber] NUMERIC(10) CONSTRAINT chk_UserMobileNumber check([MobileNumber] NOT LIKE '0%' AND len([MobileNumber])=10) NOT NULL,
  [DateOfBirth] DATE CONSTRAINT chk_UserDateOfBirth CHECK(DateOfBirth<GETDATE()) NOT NULL,
  [EmailId] VARCHAR(50) CONSTRAINT unique_EmailId Unique,
  [Pincode] NUMERIC(6) CONSTRAINT chk_Pincode check(len([Pincode])=6) NOT NULL,
  [City] VARCHAR(20) NOT NULL,
  [State] VARCHAR(20) NOT NULL,
  [Country] VARCHAR(20) NOT NULL
);

Insert Into [User]([Name],[Password],[Gender],[MobileNumber],[DateOfBirth],[EmailId],[Pincode],[City],[State],[Country]) Values('Naveen Kumar','harry','M',9999999999,'2000-10-13','naveen@gmail.com',578987,'Banglore','Karnataka','India');

CREATE TABLE Coach(
  [CoachId] INT CONSTRAINT pk_CoachId PRIMARY KEY IDENTITY(2001,1),
  [Name] VARCHAR(50) CONSTRAINT chk_CoachName CHECK(len([Name])>=3 AND len([Name])<=50) NOT NULL,
  [Password] VARCHAR(15) CONSTRAINT chk_CoachPassword CHECK(len([Password])>=5 AND len([Password])<=10) NOT NULL,
  [Gender] CHAR CONSTRAINT chk_CoachGender CHECK(Gender='F' OR Gender='M') NOT NULL,
  [MobileNumber] NUMERIC(10) CONSTRAINT chk_CoachMobileNumber check([MobileNumber] NOT LIKE '0%' AND len([MobileNumber])=10) NOT NULL,
  [DateOfBirth] DATE CONSTRAINT chk_CoachDateOfBirth CHECK(DateOfBirth<GETDATE()) NOT NULL,
  [Speciality] VARCHAR(50) NOT NULL
);

Insert Into Coach([Name],[Password],[Gender],[MobileNumber],[DateOfBirth],[Speciality]) Values('Ram','seetha','M',9123456789,'2000-10-13','Confident Issues');

CREATE TABLE Bookings(
  [BookingId] INT CONSTRAINT pk_BookingId PRIMARY KEY IDENTITY(3001,1),
  [AppointmentDate] DATE CONSTRAINT chk_AppointmentDate CHECK(AppointmentDate>=GETDATE()) NOT NULL,
  [Slot] VARCHAR(20) NOT NULL,
  [UserId] INT CONSTRAINT fk_UserId REFERENCES [User]([UserId]),
  [CoachId] INT CONSTRAINT fk_CoachId REFERENCES Coach([CoachId])
);

Insert Into Bookings([AppointmentDate],[Slot],[UserId],[CoachId]) Values('2024-03-13','9 AM to 10 AM',1001,2001);
go

CREATE PROCEDURE AddUser
    @Name VARCHAR(50),
    @Password VARCHAR(15),
    @Gender CHAR,
    @MobileNumber NUMERIC(10),
    @DateOfBirth DATE,
    @EmailId VARCHAR(50),
    @Pincode NUMERIC(6),
    @City VARCHAR(20),
    @State VARCHAR(20),
    @Country VARCHAR(20),
    @NewUserId INT OUTPUT
AS
BEGIN
    -- Validate the input parameters
    IF LEN(@Name) < 3 OR LEN(@Name) > 50 RETURN -1
    IF LEN(@Password) < 5 OR LEN(@Password) > 10 RETURN -2
    IF @Gender NOT IN ('F', 'M') RETURN -3
    IF LEN(CAST(@MobileNumber AS VARCHAR(10))) <> 10 OR LEFT(CAST(@MobileNumber AS VARCHAR(10)), 1) = '0' RETURN -4
    IF @DateOfBirth >= GETDATE() RETURN -5
    IF LEN(CAST(@Pincode AS VARCHAR(6))) <> 6 RETURN -6

    -- Check if EmailId is unique
    IF EXISTS(SELECT * FROM [User] WHERE [EmailId] = @EmailId) RETURN -7

    -- Insert the new user into the User table
    INSERT INTO [User] ([Name], [Password], [Gender], [MobileNumber], [DateOfBirth], [EmailId], [Pincode], [City], [State], [Country])
    VALUES (@Name, @Password, @Gender, @MobileNumber, @DateOfBirth, @EmailId, @Pincode, @City, @State, @Country)
    
    -- Retrieve the new UserId
    SELECT @NewUserId = SCOPE_IDENTITY()
    
    -- Return the UserId
    RETURN @NewUserId
END
Go

CREATE PROCEDURE AddCoach
    @Name VARCHAR(50),
    @Password VARCHAR(15),
    @Gender CHAR,
    @MobileNumber NUMERIC(10),
    @DateOfBirth DATE,
    @Speciality VARCHAR(50),
    @NewCoachId INT OUTPUT
AS
BEGIN
    -- Validate the input parameters
    IF LEN(@Name) < 3 OR LEN(@Name) > 50 RETURN -1
    IF LEN(@Password) < 5 OR LEN(@Password) > 10 RETURN -2
    IF @Gender NOT IN ('F', 'M') RETURN -3
    IF LEN(CAST(@MobileNumber AS VARCHAR(10))) <> 10 OR LEFT(CAST(@MobileNumber AS VARCHAR(10)), 1) = '0' RETURN -4
    IF @DateOfBirth >= GETDATE() RETURN -5
    IF LEN(@Speciality) = 0 RETURN -6

    -- Insert the new coach into the Coach table
    INSERT INTO [Coach] ([Name], [Password], [Gender], [MobileNumber], [DateOfBirth], [Speciality])
    VALUES (@Name, @Password, @Gender, @MobileNumber, @DateOfBirth, @Speciality)
    
    -- Retrieve the new CoachId
    SELECT @NewCoachId = SCOPE_IDENTITY()
    
    -- Return the CoachId
    RETURN @NewCoachId
END
Go
CREATE PROCEDURE AddBooking
    @AppointmentDate DATE,
    @Slot VARCHAR(20),
    @UserId INT,
    @CoachId INT,
    @NewBookingId INT OUTPUT
AS
BEGIN
    -- Validate the input parameters
    IF @AppointmentDate < GETDATE() RETURN -1
    IF LEN(@Slot) = 0 RETURN -2
    IF NOT EXISTS(SELECT * FROM [User] WHERE [UserId] = @UserId) RETURN -3
    IF NOT EXISTS(SELECT * FROM Coach WHERE [CoachId] = @CoachId) RETURN -4

    -- Insert the new booking into the Bookings table
    INSERT INTO [Bookings] ([AppointmentDate], [Slot], [UserId], [CoachId])
    VALUES (@AppointmentDate, @Slot, @UserId, @CoachId)
    
    -- Retrieve the new BookingId
    SELECT @NewBookingId = SCOPE_IDENTITY()
    
    -- Return the BookingId
    RETURN @NewBookingId
END
Go
CREATE PROCEDURE UpdateBooking
    @BookingId INT,
    @NewAppointmentDate DATE,
    @NewSlot VARCHAR(20)
AS
BEGIN
    -- Validate the input parameters
    IF @NewAppointmentDate < GETDATE() RETURN -1
    IF LEN(@NewSlot) = 0 RETURN -2
    IF NOT EXISTS(SELECT * FROM [Bookings] WHERE [BookingId] = @BookingId) RETURN -3

    -- Update the booking with the new details
    UPDATE [Bookings]
    SET [AppointmentDate] = @NewAppointmentDate, [Slot] = @NewSlot
    WHERE [BookingId] = @BookingId
    
    -- Return success code
    RETURN 1
END


