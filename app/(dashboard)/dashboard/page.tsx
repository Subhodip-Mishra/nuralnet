"use client"
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { ArrowRight, CodeIcon, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import {
  CardContainer,
  CardBody,
  CardItem
} from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RightSidebar from "@/components/Right-sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const tools = [
  {
    label: "Conversation Models",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    description: "AI Conversation model",
    image: "/conversation1.png",
    isActive: "Active",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
    image: "/music.jpg",
    isActive: "Active",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
    image: "/image.jpg",
    isActive: "Active",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
    image: "/video.jpg",
    isActive: "Active",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
    image: "/code.jpg",
    isActive: "Active", 
  },
  {
    label: "Video Summerizer",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
    image: "/code.jpg",
    isActive: "Active", 
  },
  {
    label: "Chat with PDF",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
    image: "/code.jpg",
    isActive: "Active", 
  }
];

const DashBoardPages = () => {
  const router = useRouter();

  return (
    <>

      {/* <div> */}
      {/* <div className=""> */}
      {/* <div className="mv-8 space-y-4">
              <div className="flex flex-col-4 items-center justify-center">
                <div className="mt-1 text-lg leading-8 font-extrabold  rounded-md  sm:text-4xl sm:mt-1 ">
                  <Button className="rounded-md p-5 flex text-2xl font-bold " variant={"premium"}>
                    <div>
                    Make Your Journey Wornderful 
                    </div>
                  </Button>
                    <div className="flex items-center justify-center p-3">
                      <Button variant={"premium"} className="rounded-full p-4 flex  text-2xl items-center justify-center font-bold">
                    using NuralNet
                      </Button>
                    </div>
                  <div className="flex items-center  justify-center text-2xl font-mono">Your Ai Assistent</div>
                </div>
              </div>
            </div> */}
      {/* <RightSidebar/> */}
      {/* <div className="px-4 md:px-20 lg:px-10 space-y-2">
            <div className="flex flex-wrap justify-center gap-1">
              {tools.map((tool) => (
                <CardContainer key={tool.label} className="inter-var m-1 bg-white hover:shadow-md rounded-xl">
                  <CardBody className="p-6 flex flex-col justify-between shadow-lg rounded-xl">
                    <div className="flex items-center">
                      <div className="mt-1 ml-1 flex flex-col-12">
                        <div className={cn("flex  rounded-lg p-3 ", tool.bgColor)}>
                          <tool.icon className={cn("w-9 h-9 gap-x-8 gap-y-3 ", tool.color)} />
                        </div>
                        <div className="text-xl font-bold py-4 px-4">{tool.label}</div>
                      </div>
                    </div>
                    <div className="ml-4 mt-4">
                      <Image
                        src={tool.image}
                        alt={tool.label}
                        height="1000"
                        width="1000"
                        className="object-cover h-full w-full rounded-xl"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <CardItem translateZ="50" className="text-xs font-semibold hover:text-opacity-75">
                      </CardItem>
                      <CardItem translateZ="100">
                        <Button
                          onClick={() => router.push(tool.href)}
                          variant="premium"
                          className="px-5 w-full py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-700"
                        >
                          <div className="flex items-center justify-center">
                            Go
                            <div className="flex gap-y-3">
                              <ArrowRight />
                            </div>
                          </div>
                        </Button>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <div className="">
        <RightSidebar/>
        
      </div>

      <div className="flex items-center bg-fixed ml-20 mr-20 justify-center py-28 px-4 sm:px-6 lg:px-8">
  <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md w-full">
    <table className="min-w-full divide-y divide-gray-200">
      <caption className="text-center text-lg py-2 bg-gray-100">Access all your AI Models</caption>
      <thead className="bg-gray-50">
        <tr className="text-left text-lg font-semibold text-gray-600">
          <th scope="col" className="px-6 py-3">Models</th>
          <th scope="col" className="px-6 py-3 flex items-center justify-center">Explore</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tools.map((tool) => (
          <tr key={tool.href} onClick={() => router.push(tool.href)} className="hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out">
            <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 font-medium">{tool.label}</td>
            <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
              <div className="text-primary hover:text-primary-dark transition duration-300 ease-in-out">
                <ArrowRight className="w-6 h-6" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* If i have a good idea then i work on this 
       <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$20</TableCell>
        </TableRow>
      </TableFooter> */}



    </>
  );
};

export default DashBoardPages;
