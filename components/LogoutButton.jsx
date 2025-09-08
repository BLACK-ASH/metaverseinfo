"use client"
import { logoutUser } from "@/lib/auth.action"
import { Button } from "./ui/button"
const LogoutButton = () => {
    return (
        <Button variant="destructive" onClick={() => logoutUser()}>Logout</Button>
    )
}

export default LogoutButton