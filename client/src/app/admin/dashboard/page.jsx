'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import checkWebExists from "@/components/business/utils/checkWebExists"; 

export default function Dashboard() {

    return (
        <div className="dashboard-container">
            <h1>Panel de Control</h1>
            <ul className="dashboard-options">
                
                <li>
                    <Link href="/admin/dashboard/users">Gestionar Users</Link>
                </li>

                <li>
                    <Link href="/admin/dashboard/webs">Gestionar Webs</Link>
                </li>
            
                <li>
                    <Link href="/admin/dashboard/bizs">Gestionar Comercios</Link>
                </li>
            </ul>
        </div>
    );
}
