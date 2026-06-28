// Live status of each agile-team agent + active task chains.
// Update this file whenever a task starts/ends. No history is kept by design —
// this reflects only the current moment.

const agentStatus = [
  { agent: 'Product Owner', icon: '📦', file: 'product-owner.md', status: 'idle' },
  { agent: 'Architect',     icon: '🏗️', file: 'architect.md',     status: 'idle' },
  { agent: 'Scrum Master',  icon: '🏃', file: 'scrum-master.md',  status: 'idle' },
  { agent: 'Dev Angular',   icon: '⚡', file: 'dev-angular.md',   status: 'working',
    task: { id: 'TASK-014', subject: 'Add left-pane tabs + arrow-chain Current Work view',
            description: 'Restructure hr_dev_dashboard with a left sidebar (Team Status / Current Work / Project Structure tabs) and render active task chains as arrows.' } },
  { agent: 'Dev FastAPI',   icon: '🚀', file: 'dev-fastapi.md',   status: 'idle' },
  { agent: 'Dev SQL',       icon: '🗄️', file: 'dev-sql.md',       status: 'idle' },
  { agent: 'Dev DevOps',    icon: '🔧', file: 'dev-devops.md',    status: 'idle' },
];

/*
  currentTasks: one entry per active/recently-touched task chain.
  Each step: { name, status: 'done' | 'working' }
  status === 'idle' on agentStatus and an empty currentTasks array means
  "no active work" — rendered as such in both the Team Status and Current Work tabs.
*/
const currentTasks = [
  {
    id: 'TASK-014',
    subject: 'Add left-pane tabs + arrow-chain Current Work view',
    chain: [
      { name: 'Vishnu',        status: 'done' },
      { name: 'Product Owner', status: 'done' },
      { name: 'Scrum Master',  status: 'done' },
      { name: 'Dev Angular',   status: 'working' },
    ],
  },
];
