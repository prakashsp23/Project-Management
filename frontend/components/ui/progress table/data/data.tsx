import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "PENDING_APPROVAL",
      label: "Pending Approval",
      icon: StopwatchIcon,
    },
    // {
    //   value: "todo",
    //   label: "Todo",
    //   icon: CircleIcon,
    // },
    // {
    //   value: "IN_PROGRESS",
    //   label: "In Progress",
    //   icon: StopwatchIcon,
    // },
    {
      value: "COMPLETED",
      label: "Aprroved",
      icon: CheckCircledIcon,
    },
    {
      value: "REJECTED",
      label: "Rejected",
      icon: CrossCircledIcon,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]