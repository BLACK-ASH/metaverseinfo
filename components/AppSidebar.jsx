import { Cable, Camera, ComputerIcon, ContainerIcon, CpuIcon, DatabaseBackupIcon, Fan, GpuIcon, HeadsetIcon, Home, KeyboardIcon, KeyboardMusicIcon, LucidePower, MemoryStickIcon, MicIcon, Monitor, MonitorSpeaker, MouseIcon, ShoppingCart, SpeakerIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getUser, logoutUser } from "@/lib/auth.action"

import LogoutButton from "./LogoutButton"
import { Boxes } from "lucide-react"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Cart",
        url: "/cart",
        icon: ShoppingCart,
    },
    {
        title: "Custom PC",
        url: "/custom-pc",
        icon: ComputerIcon,
    },
    {
        title: "Inventory",
        url: "/inventory",
        icon: DatabaseBackupIcon,
    },
    {
        title:"Orders",
        url: "/orders",
        icon: Boxes
    }

]

const productCategories = [
    {
        title: "Processors",
        url: "/products?category=processor",
        icon: CpuIcon,
    },
    {
        title: "Graphics Cards",
        url: "/products?category=graphics-card",
        icon: GpuIcon,
    },
    {
        title: "Motherboards",
        url: "/products?category=motherboard",
        icon: KeyboardMusicIcon,
    },
    {
        title: "Storage",
        url: "/products?category=storage",
        icon: ContainerIcon,
    },
    {
        title: "RAM",
        url: "/products?category=RAM",
        icon: MemoryStickIcon,
    },
    {
        title: "Power Supplies",
        url: "/products?category=power-supply",
        icon: LucidePower,
    },
    {
        title: "Cooler",
        url: "/products?category=cooler",
        icon: Fan,
    },
    {
        title: "Cabinets",
        url: "/products?category=cabinet",
        icon: MonitorSpeaker,
    },
    {
        title: "Monitors",
        url: "/products?category=monitor",
        icon: Monitor,
    },
]

const peripheralCategories = [

    {
        title: "Keyboards",
        url: "products?category=keyboard",
        icon: KeyboardIcon,
    },
    {
        title: "Mouses",
        url: "/products?category=mouse",
        icon: MouseIcon,
    },
    {
        title: "Headsets",
        url: "/products?category=headset",
        icon: HeadsetIcon,
    },
    {
        title: "Microphones",
        url: "/products?category=microphone",
        icon: MicIcon,
    },
    {
        title: "Webcams",
        url: "/products?category=webcam",
        icon: Camera,
    },
    {
        title: "Speakers",
        url: "/products?category=speaker",
        icon: SpeakerIcon,
    },
    {
        title: "Others",
        url: "/products?category=other",
        icon: Cable
    },
]

export async function AppSidebar() {
    const user = await getUser();


    return (
        <Sidebar collapsible="icon">

            <SidebarContent>
                <SidebarGroup>
                    {/* Menu items */}
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* Products */}
                <SidebarGroup>
                    <SidebarGroupLabel>Products</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {productCategories.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* Peripherals */}
                <SidebarGroup>
                    <SidebarGroupLabel>Peripherals</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {peripheralCategories.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {user && (
                <SidebarFooter>
                    <h3>{user?.name}</h3>
                    <LogoutButton />
                </SidebarFooter>
            )}
        </Sidebar>
    )
}