import React from "react";

interface dashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DashboardShell({ children, className, ...props }: dashboardShellProps){
    return (
        <div className="flex-1 space-y-4 p-8 pt-6" {...props}>
          {children}
        </div>
    )
}