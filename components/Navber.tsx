import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/MobileSidebar"
import { getApiLimitCount } from "@/lib/api-limit"

const Navber = async() => {
    const apiLimitCount = await getApiLimitCount();
    return (
        <div>
           {/* <MobileSidebar apiLimitCount={apiLimitCount}/> */}
            {/* <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div> */}
        </div>
    )
}

export default Navber