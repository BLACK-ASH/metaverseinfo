"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { getUser } from '@/lib/auth.action'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

const AuthComponent = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {

        const fetchUser = async () => {
            const user = await getUser();
            setUser(user)
        }
        fetchUser()
    }, [])

    return (
        <div>
            {user ?
                <LogoutButton/>
                :
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            }
        </div>
    )
}

export default AuthComponent