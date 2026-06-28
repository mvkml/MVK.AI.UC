-- Roles & Users tables for Signup/Login (AI_HR database)

CREATE TABLE Roles (
    RoleId   INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO Roles (RoleName) VALUES
    ('HR Manager'),
    ('HR Executive'),
    ('Recruiter'),
    ('Payroll Manager'),
    ('Team Lead'),
    ('Developer'),
    ('Other');

CREATE TABLE Users (
    UserId       INT IDENTITY(1,1) PRIMARY KEY,
    FullName     NVARCHAR(150) NOT NULL,
    Email        NVARCHAR(255) NOT NULL UNIQUE,
    Company      NVARCHAR(150) NOT NULL,
    RoleId       INT NOT NULL FOREIGN KEY REFERENCES Roles(RoleId),
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    IsActive     BIT NOT NULL DEFAULT 1
);
