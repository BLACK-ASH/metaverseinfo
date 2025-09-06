"use client"
import { cn } from '@/lib/utils'
import { Cable, Camera, ContainerIcon, CpuIcon, Fan, GpuIcon, HeadsetIcon, Keyboard, KeyboardIcon, KeyboardMusicIcon, LucidePower, MemoryStickIcon, MicIcon, Monitor, MonitorSpeakerIcon, MouseIcon, SpeakerIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
export const category = [
    {
        title: "Processors",
        value: "processor",
        icon: CpuIcon,
    },
    {
        title: "Graphics Cards",
        value: "graphics-card",
        icon: GpuIcon,
    },
    {
        title: "Motherboards",
        value: "motherboard",
        icon: KeyboardMusicIcon,
    },
    {
        title: "Storages",
        value: "storage",
        icon: ContainerIcon,
    },
    {
        title: "RAMs",
        value: "RAM",
        icon: MemoryStickIcon,
    },
    {
        title: "Power Supplies",
        value: "power-supply",
        icon: LucidePower,
    },
    {
        title: "Coolers",
        value: "cooler",
        icon: Fan,
    },
    {
        title: "Monitors",
        value: "monitor",
        icon: Monitor,
    },
    {
        title: "Cabinets",
        value: "cabinet",
        icon: MonitorSpeakerIcon,
    },
    {
        title: "Keyboards",
        value: "keyboard",
        icon: KeyboardIcon,
    },
    {
        title: "Mouses",
        value: "mouse",
        icon: MouseIcon,
    },
    {
        title: "Headsets",
        value: "headset",
        icon: HeadsetIcon,
    },
    {
        title: "Microphones",
        value: "microphone",
        icon: MicIcon,
    },
    {
        title: "Webcams",
        value: "webcam",
        icon: Camera,
    },
    {
        title: "Speakers",
        value: "speaker",
        icon: SpeakerIcon,
    },
    {
        title: "Others",
        value: "other",
        icon: Cable
    },
]


const DisplayCategory = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleClick = (item) => () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("category", item)
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3'>
            {category.map((item) => (
                <p onClick={handleClick(item.value)} className={cn('text-muted-foreground flex items-center justify-center gap-2 ring-2 p-2 cursor-pointer ring-muted text-center rounded-md', searchParams.get("category") === item && "bg-muted text-muted-foreground")} key={item.title}><item.icon />{item.title}</p>
            ))}
        </div>
    )
}

export default DisplayCategory