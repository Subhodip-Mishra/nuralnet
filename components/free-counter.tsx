"use clinet"
import { useEffect, useState } from "react"
import { Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { MAX_FREE_COUNTS } from "@/constant"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useProModel } from "@/hooks/use-pro-model"

interface FreeCounterProps {
    apiLimitCount: number
}

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
    const proModal = useProModel();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <div className="px-3  py-100">
            <Card className="bg-white/10 border-0 rounded-2xl">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-[#737eb0] mb-4 space-y-2">
                        <p className="font-bold">
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress
                            className="h-3"
                            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                        />
                    </div>
                    <Button onClick={proModal.onOpen} className="w-full rounded-full" variant="premium">
                        Upgrade
                        <Zap
                            className="w-4 h-4 ml-2 fill-white"
                        />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}