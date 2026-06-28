// Real file/endpoint snapshot per API layer. Update by hand as Controllers/BL/DAL get built.

const apiDetails = {
  'AI.HR.Api': {
    description: 'Web API project — Controllers, Program.cs, appsettings.',
    groups: [
      {
        heading: 'Controllers',
        items: [
          { name: 'WeatherForecastController', path: 'Controllers/WeatherForecastController.cs', real: false },
          { name: 'UsersController — POST api/users/signup, GET api/users/roles', path: 'Controllers/UsersController.cs', real: true },
        ],
      },
      {
        heading: 'Config',
        items: [
          { name: 'AiHrDbContext registered (UseSqlServer)', path: 'Program.cs', real: true },
          { name: 'ConnectionStrings:AiHrDb → AI_HR (LocalDB, Windows Auth)', path: 'appsettings.json', real: true },
          { name: 'DI: IUserRepository, IRoleRepository, IUserBL, IUserValidationService (Scoped)', path: 'Program.cs', real: true },
          { name: 'Swagger/SwaggerUI (Swashbuckle.AspNetCore)', path: 'Program.cs', real: true },
        ],
      },
    ],
  },
  'AI.HR.BL': {
    description: 'Business logic layer — UserBL (Sign Up flow) and UserValidationService.',
    groups: [
      { heading: 'Classes', items: [ { name: 'Class1 (placeholder)', path: 'Class1.cs', real: false } ] },
      {
        heading: 'Users',
        items: [
          { name: 'IUserBL / UserBL.SignUp — UserRequest → UserItem → Repository.Upsert → UserResponse', path: 'UserBL.cs', real: true },
          { name: 'IUserValidationService / UserValidationService.Validate', path: 'UserValidationService.cs', real: true },
        ],
      },
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
          { name: '20260628182755_AddRoleOrderId', path: 'Migrations/', real: true },
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
          { name: 'UserRequest (Sign Up payload)', path: 'UserRequest.cs', real: true },
          { name: 'UserResponse (Sign Up response)', path: 'UserResponse.cs', real: true },
          { name: 'UsersModel (UserRequest / UserItem / UserItems / UserResponse)', path: 'UsersModel.cs', real: true },
        ],
      },
      {
        heading: 'Roles',
        items: [
          { name: 'RoleItem (single role record, incl. OrderId)', path: 'RoleItem.cs', real: true },
          { name: 'RolesModel (RoleItems)', path: 'RolesModel.cs', real: true },
        ],
      },
    ],
  },
  'AI.HR.Repoistories': {
    description: 'Repository layer — UserRepository (Create/Update/Delete/Upsert), RoleRepository (read-only), against AiHrDbContext.',
    groups: [
      { heading: 'Classes', items: [ { name: 'Class1 (placeholder)', path: 'Class1.cs', real: false } ] },
      {
        heading: 'Users',
        items: [
          { name: 'IUserRepository / UserRepository — Create, Update, Delete, Upsert', path: 'UserRepository.cs', real: true },
        ],
      },
      {
        heading: 'Roles',
        items: [
          { name: 'IRoleRepository / RoleRepository — GetAll (ordered by OrderId)', path: 'RoleRepository.cs', real: true },
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
