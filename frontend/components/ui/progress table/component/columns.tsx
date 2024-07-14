'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { CustomButtonForProjects, CustomButtonForSynopsis } from "@/components/morecomponents/customButton"
// import CustomButton, { CustomButtonForSynopsis } from "@/components/customButton"
// import {CustomButtonForProjects, CustomButtonForSynopsis} from "@/components/customButton"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-[30px] whitespace-nowrap" column={column} title="Sr No." />
    ),
    cell: ({ row }) => <div className="w-[20px] ">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "teamMembers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team Members" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        {row.getValue("teamMembers")?.split(", ").map((member, index) => (
          member && (
            <span key={index} className="truncate font-medium">
              {member}
            </span>
          )
        ))}
      </div>

    ),
  },
  {
    accessorKey: "mentors",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mentors" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        {row.getValue("mentors")?.split(", ").map((member, index) => (
          member && (
            <span key={index} className="truncate font-medium">
              {member}
            </span>
          )
        ))}
      </div>

    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex items-center">
          {status.icon && (
            <status.icon className="mr-4 h-4 w-4 text-muted-foreground" />
          )}
          <span className="whitespace-nowrap font-medium w-[60px]">{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    accessorKey: 'projectId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 w-[60px]  ">
        <CustomButtonForProjects projectId={row.getValue('projectId')} />
      </div>
    ),
  },
  {
    accessorKey: 'synopsis',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Synopsis" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 w-[60px]">
        <CustomButtonForSynopsis projectId={row.getValue('projectId')} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
export const columns1: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-[30px] whitespace-nowrap" column={column} title="Sr No." />
    ),
    cell: ({ row }) => <div className="w-[20px] ">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "teamMembers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team Members" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1 ">
        {row.getValue("teamMembers")?.split(", ").map((member, index) => (
          member && (
            <span key={index} className="truncate font-medium">
              {member}
            </span>
          )
        ))}
      </div>

    ),
  },
  // {
  //   accessorKey: "mentors",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Mentors" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex flex-col space-y-1">
  //     {row.getValue("mentors")?.split(", ").map((member, index) => (
  //         member && (
  //             <span key={index} className="truncate font-medium">
  //                 {member}
  //             </span>
  //         )
  //     ))}
  // </div>

  //   ),
  // },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {status.icon && (
  //           <status.icon className="mr-4 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span className="whitespace-nowrap w-[40px]">{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    accessorKey: 'projectId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 w-[60px]  ">
        <CustomButtonForProjects projectId={row.getValue('projectId')} />
      </div>
    ),
  },
  {
    accessorKey: 'synopsis',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Synopsis" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 w-[60px]">
        <CustomButtonForSynopsis projectId={row.getValue('projectId')} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
