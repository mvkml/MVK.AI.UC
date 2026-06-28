// Real file/endpoint snapshot per API layer. Update by hand as Controllers/BL/DAL get built.

const apiDetails = {
  'AI.HR.Api': {
    description: 'Web API project — Controllers, Program.cs, appsettings.',
    groups: [
      {
        heading: 'Controllers',
        items: [
          { name: 'WeatherForecastController', path: 'Controllers/WeatherForecastController.cs', real: false },
        ],
      },
      {
        heading: 'Config',
        items: [
          { name: 'AiHrDbContext registered (UseSqlServer)', path: 'Program.cs', real: true },
          { name: 'ConnectionStrings:AiHrDb → AI_HR (LocalDB, Windows Auth)', path: 'appsettings.json', real: true },
        ],
      },
    ],
  },
  'AI.HR.BL': {
    description: 'Business logic layer — currently empty scaffold.',
    groups: [
      { heading: 'Classes', items: [ { name: 'Class1 (placeholder)', path: 'Class1.cs', real: false } ] },
    ],
  },
  'AI.HR.DAL': {
    description: 'Data access layer — currently empty scaffold.',
    groups: [
      { heading: 'Classes', items: [ { name: 'Class1 (placeholder)', path: 'Class1.cs', real: false } ] },
    ],
  },
  'AI.HR.EF': {
    description: 'Entity Framework layer — entities, DbContext, migrations.',
    groups: [
      {
        heading: 'Entities',
        items: [
          { name: 'User', path: 'Entities/User.cs', real: true },
          { name: 'Role', path: 'Entities/Role.cs', real: true },
        ],
      },
      {
        heading: 'DbContext',
        items: [
          { name: 'AiHrDbContext', path: 'DBContexts/AiHrDbContext.cs', real: true },
        ],
      },
      {
        heading: 'Migrations',
        items: [
          { name: '20260628134601_InitialCreate', path: 'Migrations/', real: true },
        ],
      },
    ],
  },
  'AI.HR.Models': {
    description: 'API response models — wraps EF entities for use by controllers.',
    groups: [
      {
        heading: 'Base',
        items: [
          { name: 'BaseModel (IsNotValid, Message)', path: 'BaseModel.cs', real: true },
        ],
      },
      {
        heading: 'Users',
        items: [
          { name: 'UserItem (single user record)', path: 'UserItem.cs', real: true },
          { name: 'UsersModel (UserItem / UserItems)', path: 'UsersModel.cs', real: true },
        ],
      },
    ],
  },
  'FastAPI': {
    description: 'AI-only functionality (Claude agents, Graphify backend). Scope and location not yet defined.',
    groups: [
      { heading: 'Status', items: [] },
    ],
  },
};
