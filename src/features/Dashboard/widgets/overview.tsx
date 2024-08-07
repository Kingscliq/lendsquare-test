import React, { useMemo } from 'react'
import {
  activateUsers,
  blackListUser,
  dashUsers,
  eye,
  filter,
  userWithLoans,
  userWithSavings,
} from '@assets/icons'
import Badge from '@components/elements/badge'
import DashCard from '@components/elements/dash-card'
import Ellipsis from '@components/elements/popover'
import PopoverItem from '@components/elements/popover/item'
import TableComponent from '@components/elements/table'
import { useFilters } from '@hooks/useFilters'
import { ColumnDef } from '@tanstack/react-table'
import { IUserData } from '@/types/data-table'
import { useNavigate } from 'react-router-dom'
import THead from '@components/elements/table/thead'
import { getDayMonth } from '@utils/formatters'
import OutlineButton from '@components/elements/outline-button'

const Overview = () => {
  const navigate = useNavigate()
  const filters = useFilters()

  const {
    filteredData,
    activeUsers,
    usersWithLoan,
    usersWithSavings,
    setFilterModal,
    resetFilter,
  } = filters

  const menuItems = useMemo(() => {
    return [
      {
        label: 'View Details',
        icon: eye,
      },
      {
        label: 'Blacklist Users',
        icon: blackListUser,
      },
      {
        label: 'Activate Users',
        icon: activateUsers,
      },
    ]
  }, [])

  const tableColumns = React.useMemo<ColumnDef<IUserData>[]>(
    () => [
      {
        header: () => <THead text="Organisation" />,
        accessorKey: 'organisation',
      },
      {
        header: () => <THead text="Username" />,
        accessorKey: 'username',
        cell: (info) => info.getValue(),
      },
      {
        header: () => <THead text="Email" />,
        accessorKey: 'email',
        cell: (info) => info?.getValue(),
      },
      {
        header: () => <THead text="Phone" />,
        accessorKey: 'phone',
        cell: (info) => info?.getValue(),
      },
      {
        header: () => <THead text="Date Joined" />,
        accessorKey: 'start_date',
        cell: (info) => getDayMonth(info?.getValue() as string),
      },
      {
        header: () => <THead text="Status" />,
        accessorKey: 'status',
        cell: (info) => (
          <Badge
            text={info?.getValue() as string}
            status={info?.getValue() as string}
          />
        ),
      },
      {
        header: '',
        accessorKey: 'ellipsis',
        cell: (info) => {
          return (
            <Ellipsis>
              {menuItems.map((item) => {
                return (
                  <PopoverItem
                    label={item.label}
                    icon={item.icon}
                    key={item.label}
                    onClick={() => navigate(`/user/${info.row.original.id}`)}
                  />
                )
              })}
            </Ellipsis>
          )
        },
      },
    ],
    [menuItems, navigate]
  )

  return (
    <div>
      <h3 className={'page-title'}>Users</h3>
      <div className="card-grid">
        <DashCard
          icon={dashUsers}
          title={'Users'}
          value={filteredData?.length as unknown as string}
        />
        <DashCard
          icon={dashUsers}
          title={'Active Users'}
          value={activeUsers as unknown as string}
        />
        <DashCard
          icon={userWithLoans}
          title={'Users with Loans'}
          value={usersWithLoan as unknown as string}
        />
        <DashCard
          icon={userWithSavings}
          title={'Users with Savings'}
          value={usersWithSavings as unknown as string}
        />
      </div>

      <div className="filter">
        <div onClick={() => setFilterModal(true)} className="filter__btn">
          <div>
            <img src={filter} alt="" />
          </div>
          <div>
            <p>Filter</p>
          </div>
        </div>
        <div onClick={() => resetFilter()} className="clear__filter">
          <OutlineButton label="Clear Filters" />
        </div>
      </div>
      <TableComponent
        data={filteredData}
        columns={tableColumns}
        loading={false}
        filters={filters}
      />
    </div>
  )
}

export default Overview
