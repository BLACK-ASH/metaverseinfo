"use client"
import { cn } from '@/lib/utils'
import { Cable, Camera, ContainerIcon, CpuIcon, Fan, GpuIcon, HeadsetIcon, Keyboard, KeyboardIcon, KeyboardMusicIcon, LucidePower, MemoryStickIcon, MicIcon, Monitor, MonitorSpeakerIcon, MouseIcon, SpeakerIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
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
        <ScrollArea className="w-full rounded-md border whitespace-nowrap">
            <div className='flex items-center gap-2 p-2 pb-4'>
                {category.map((item) => (
                    <div onClick={handleClick(item.value)} className={cn('text-muted-foreground flex flex-col justify-center items-center gap-2 ring-2 p-4 cursor-pointer ring-muted text-center rounded-md', searchParams.get("category") === item.value && "bg-muted text-muted-foreground")} key={item.title}>
                        <item.icon />
                        <p>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default DisplayCategory