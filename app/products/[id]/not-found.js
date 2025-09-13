"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function NotFound({ params }) {
    return <section className="container overflow-hidden box-border mx-auto px-4 md:p-6 min-h-[calc(100vh-110px)]" id="NotFound">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <Button onClick={() => history.back()}>Go Back</Button>
        <Button >
            <Link href="/" >Home</Link>
        </Button>
    </section>
}