// Mirrors hr_agile/product_owner/backlog/BACKLOG.md + scrum/tasks + scrum/user_stories.
// Update this file by hand when backlog/task status changes — same pattern as agent_status.js.

const agileItems = [
  // ── Backlog items (from BACKLOG.md) ──
  { id: 'PB001', type: 'backlog', title: 'Setup FastAPI backend',        module: 'API',      priority: 'High',   status: 'Pending' },
  { id: 'PB002', type: 'backlog', title: 'Integrate Graphify',           module: 'Agile',    priority: 'High',   status: 'In Progress' },
  { id: 'PB003', type: 'backlog', title: 'Create employee management',   module: 'UI',       priority: 'Medium', status: 'In Progress' },
  { id: 'PB004', type: 'backlog', title: 'Build HR web UI',              module: 'UI',       priority: 'Medium', status: 'In Progress' },
  { id: 'PB005', type: 'backlog', title: 'Setup mobile app',             module: 'UI',       priority: 'Low',    status: 'Pending' },

  // ── Tasks under PB004 (Build HR web UI) ──
  { id: 'TASK-U01', type: 'task', parent: 'PB004', title: 'Landing / About / Services / Portfolio / Contact pages', module: 'UI', priority: 'Medium', status: 'Completed' },
  { id: 'TASK-U02', type: 'task', parent: 'PB004', title: 'Login / Signup pages',            module: 'UI', priority: 'Medium', status: 'Completed' },
  { id: 'TASK-U03', type: 'task', parent: 'PB004', title: 'Dashboard shell + chat home + Upload Documents page', module: 'UI', priority: 'Medium', status: 'Completed' },
  { id: 'TASK-U04', type: 'task', parent: 'PB003', title: 'Employees page',                  module: 'UI', priority: 'Medium', status: 'Completed' },
  { id: 'TASK-U05', type: 'task', parent: 'PB003', title: 'Recruitment page',                module: 'UI', priority: 'Medium', status: 'Pending' },
  { id: 'TASK-U06', type: 'task', parent: 'PB004', title: 'Payroll page',                    module: 'UI', priority: 'Medium', status: 'Pending' },
  { id: 'TASK-U07', type: 'task', parent: 'PB004', title: 'Reports page',                    module: 'UI', priority: 'Medium', status: 'Pending' },
  { id: 'TASK-U08', type: 'task', parent: 'PB004', title: 'AI Agents page',                  module: 'UI', priority: 'Medium', status: 'Pending' },

  // ── Tasks under PB001 (FastAPI backend) ──
  { id: 'TASK001', type: 'task', parent: 'PB001', title: 'Setup FastAPI backend skeleton',   module: 'API', priority: 'High', status: 'Pending' },

  // ── Tasks under PB002 (Graphify) ──
  { id: 'TASK004', type: 'task', parent: 'PB002', title: 'Graphify research',                module: 'Agile', priority: 'High', status: 'Completed' },
  { id: 'TASK-G01', type: 'task', parent: 'PB002', title: 'Extract ai_hr knowledge graph (Ollama, partial quality)', module: 'Agile', priority: 'High', status: 'Completed' },
  { id: 'TASK-G02', type: 'task', parent: 'PB002', title: 'Re-extract with a cloud backend for better quality',      module: 'Agile', priority: 'Medium', status: 'Pending' },

  // ── Database ──
  { id: 'TASK-D01', type: 'task', title: 'Design hr_sql / hr_pg / hr_cosmos schema', module: 'Database', priority: 'Medium', status: 'Pending' },

  // ── DevOps ──
  { id: 'TASK-O01', type: 'task', title: 'git init ai_hr + initial commit',          module: 'DevOps', priority: 'Medium', status: 'Pending' },

  // ── Agile process itself ──
  { id: 'TASK-A01', type: 'task', title: 'Create real .claude/agents subagents (7 roles)', module: 'Agile', priority: 'High', status: 'Completed' },
  { id: 'TASK-A02', type: 'task', title: 'Add tech_interviewer + dev_qa roles',            module: 'Agile', priority: 'Low', status: 'Pending' },
];
