"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import { useProModel } from "@/hooks/use-pro-model"
import { Badge } from "@/components/ui/badge"
import { Check, CheckCircle, CodeIcon, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
    },
    {
        label: "Video Summerizer",
        icon: CodeIcon,
        color: "text-purple-700",
        bgColor: "bg-green-700/10",
    },

]


export const ProModal = () => {
    const proModal = useProModel()
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 p-4 rounded-lg mb-6 ">
                    <div className="text-2xl font-bold flex items-center gap-x-2">
                        Upgrade to Nuralnet
                        <Badge variant="premium" className="text-sm py-1 bg-yellow-300 text-white shadow-lg">
                            PRO
                        </Badge>
                    </div>
                    <div className="text-lg font-medium flex items-center gap-x-2">
                        <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-full shadow-md">
                            <span className="text-lg font-bold">$20</span>
                            <span className="text-sm font-medium">/month</span>
                        </span>

                    </div>
                </div>
                <DialogHeader className="text-center mb-6">
                    <DialogTitle className="text-4xl font-extrabold mb-2 text-gray-900">
                        Unlock Exclusive Features
                    </DialogTitle>
                    <DialogDescription className="text-lg font-xl text-pretty text-gray-700 leading-relaxed">
                        <p>Upgrade to NuralNet PRO for enhanced productivity with advanced tools and features.</p>
                    </DialogDescription>

                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {tools.map((tool) => (
                        <Card
                            key={tool.label}
                            className="p-4 border border-gray-200 shadow-sm rounded-lg flex items-center"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-3 rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                                </div>
                                <div className="font-semibold text-base">
                                    {tool.label}
                                </div>
                            </div>
                            <CheckCircle className="text-primary w-8 h-8 ml-auto " />
                        </Card>
                    ))}
                </div>
                <DialogFooter className="w-full">
                    <Button
                        size="lg"
                        variant="premium"
                        className="w-full rounded-full flex items-center justify-center "
                    >
                        Upgrade Now
                        <Zap className="w-5 h-5 ml-2 fill-current" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}