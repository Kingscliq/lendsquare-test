import { IUserData } from '@/types/datatable';
import { dashUsers, userWithLoans, userWithSavings } from '@assets/icons';
import DashCard from '@components/elements/dash-card';
import TableComponent from '@components/elements/table';
import { useUsersData } from '@hooks/useData';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const Overview = () => {
  const tableColumns = React.useMemo<ColumnDef<IUserData>[]>(
    () => [
      {
        header: 'Organisation',
        accessorKey: 'organisation',
      },
      {
        header: 'Username',
        accessorKey: 'username',
        cell: info => info.getValue(),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: info => info?.getValue(),
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        cell: info => info?.getValue(),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: info => info?.getValue(),
      },
    ],
    []
  );

  const users = useUsersData();

  console.log(users);
  return (
    <div>
      <div className="card-grid">
        <DashCard icon={dashUsers} title={'Users'} value={'2,343'} />
        <DashCard icon={dashUsers} title={'Active Users'} value={'3,456'} />
        <DashCard
          icon={userWithLoans}
          title={'Users with Loans'}
          value={'2,345'}
        />
        <DashCard
          icon={userWithSavings}
          title={'Users with Savings'}
          value={'2,345'}
        />
      </div>

      <TableComponent
        data={users.generatedData}
        columns={tableColumns}
        loading={false}
      />
    </div>
  );
};

export default Overview;
