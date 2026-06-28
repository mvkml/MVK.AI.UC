// Drill-down detail for each Project Structure card.
// Update this file by hand to match real DB/API state — same pattern as the other data files.

const structureDetails = {
  'hr_apis': {
    label: 'hr_apis — API Layers & Endpoints',
    groups: [
      {
        heading: 'Layers (az/hr_core_apis/AI.HR.Api)',
        items: [
          'AI.HR.Api — Web API project (Controllers, Program.cs)',
          'AI.HR.BL — business logic layer',
          'AI.HR.DAL — data access layer',
          'AI.HR.EF — Entity Framework (DbContext, entities, migrations)',
        ],
      },
      {
        heading: 'Controllers / Endpoints',
        items: [
          'WeatherForecastController — default scaffold, not real',
          '(no Signup/Login/Employees controllers built yet)',
        ],
      },
      {
        heading: 'FastAPI service (AI-only)',
        items: ['Not started — scope TBD'],
      },
    ],
  },
  'hr_data_source': {
    label: 'hr_data_source — Databases',
    groups: [
      {
        heading: 'AI_HR (hr_sql — LocalDB, Windows Auth)',
        items: [
          '📋 Tables: Roles (7 rows seeded), Users (0 rows)',
          '⚙️ Stored Procedures: none yet',
        ],
      },
      {
        heading: 'hr_pg',
        items: ['Not started'],
      },
      {
        heading: 'hr_cosmos',
        items: ['Not started'],
      },
    ],
  },
  'hr_agile': {
    label: 'hr_agile — Agile Process',
    groups: [
      {
        heading: 'Folders',
        items: [
          'team/ — 8 role agent definitions',
          'product_owner/ — backlog, roadmap, capability tracker',
          'scrum/ — sprints, tasks, user stories',
          'architecture/ — ADR001 (FastAPI), ADR002 (split backend)',
          'worklogs/ — dated logs per role',
        ],
      },
    ],
  },
  'hr_devops': {
    label: 'hr_devops',
    groups: [
      { heading: 'Status', items: ['Merged into ai_hr single repo — no separate content yet'] },
    ],
  },
  'hr_drive': {
    label: 'hr_drive',
    groups: [
      {
        heading: 'Folders',
        items: [
          'credentials/ — hr_sql.env, ins_sql.env, dev_dashboard_sql.env (gitignored)',
          'learn/',
          'vibe/ — dev_dashboard/ (you are here), versions/',
          'links/ — LINKS.md',
        ],
      },
    ],
  },
  'hr_ui': {
    label: 'hr_ui — Frontend',
    groups: [
      {
        heading: 'Apps',
        items: [
          'aihrweb/ — Angular web app (active): landing, about, services, portfolio, contact, login, signup, dashboard (home/upload/employees)',
          'mvkhrapp/',
          'mvkhrmobile/',
          'mvk_qa/',
          'documents/',
        ],
      },
    ],
  },
};
