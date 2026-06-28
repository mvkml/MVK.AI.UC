// Real schema snapshot for AI_HR (and placeholders for hr_pg/hr_cosmos once they exist).
// Update by hand after running migrations or schema changes — same pattern as the other data files.

const dbDetails = {
  AI_HR: {
    connection: '(localdb)\\MSSQLLocalDB — Windows Auth',
    tables: [
      {
        name: 'Roles',
        rowCount: 7,
        columns: [
          { name: 'RoleId',   type: 'int',          nullable: false, key: 'pk' },
          { name: 'RoleName', type: 'nvarchar(100)', nullable: false, key: 'uq' },
        ],
      },
      {
        name: 'Users',
        rowCount: 0,
        columns: [
          { name: 'UserId',       type: 'int',           nullable: false, key: 'pk' },
          { name: 'FullName',     type: 'nvarchar(150)', nullable: false, key: '' },
          { name: 'Email',        type: 'nvarchar(255)', nullable: false, key: 'uq' },
          { name: 'Company',      type: 'nvarchar(150)', nullable: false, key: '' },
          { name: 'PasswordHash', type: 'nvarchar(255)', nullable: false, key: '' },
          { name: 'CreatedAt',    type: 'datetime2',     nullable: false, key: '' },
          { name: 'IsActive',     type: 'bit',           nullable: false, key: '' },
          { name: 'RoleId',       type: 'int',           nullable: false, key: 'fk' },
        ],
      },
    ],
    storedProcedures: [],
  },
};
