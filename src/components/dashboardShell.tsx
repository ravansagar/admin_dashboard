import React from "react";

export default function DashboardShell({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>){
    return (
        <div className={`flex-1 space-y-4 p-8 pt-6 ${className}`} {...props}>
          {children}
        </div>
    )
}