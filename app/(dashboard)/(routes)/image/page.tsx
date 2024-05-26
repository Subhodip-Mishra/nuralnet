// "use client"
// import * as z from "zod";
// import { useForm } from 'react-hook-form';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { Download, ImageIcon } from 'lucide-react';
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { UserAvater } from "@/components/user-avater";
// import { BotAvater } from "@/components/bot-avater";
// import Empty from "@/components/empty";
// import Heading from '@/components/heading';
// import Loader from "@/components/loader";
// import { amountOptions, forSchema, resolutionOption } from "./constants";
// import axios from "axios";
// import { useState } from "react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardFooter } from "@/components/ui/card";
// import { useProModel } from "@/hooks/use-pro-model";


// const ImagePage = () => {
//   const proModal = useProModel();

//   const [images, setImages] = useState<string[]>([]);

//   const router = useRouter();

//   const form = useForm<z.infer<typeof forSchema>>({
//     resolver: zodResolver(forSchema),
//     defaultValues: {
//       prompt: "",
//       amount: "1",
//       resolution: "512x512"
//     }
//   });
//   const isLoading = form.formState.isSubmitting;
//   const onSubmit = async (values: z.infer<typeof forSchema>) => {
//     try {
//       setImages([])

//       const response = await axios.post("/api/image", values
//       );

//       const urls = response.data.map((image: {url: string})=> (
//         image.url
//       ))

//       setImages(urls)
//       form.reset();
//     } catch (error:any) {
//       if(error?.response?.status === 403){
//         proModal.onOpen();
//       } 
//       console.log(error);
//     } finally {
//       router.refresh();
//     }
//   }

//   return (
//     <>
//       <Heading
//         title="Image Generation"
//         description="Generate Image."
//         icon={ImageIcon}
//         iconColor="text-pink-700"
//         bgColor="bg-pink-700/10"
//       />

//       <div className='px-4 lg:px-8'>
//         <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-6">
//                     <Input
//                       className="border-0 outline-none focus-within:ring-0 focus-within:ring-transparent"
//                       disabled={isLoading}
//                       placeholder="A picture of a horse in Swiss alps"
//                       {...field}
//                     />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//               control={form.control}
//               name="amount"
//               render={({field})=>(
//                 <FormItem className="col-span-12 lg:col-span-2">
//                   <Select
//                   disabled={isLoading}
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue
//                         defaultValue={field.value}
//                         />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {amountOptions.map((option)=> (
//                         <SelectItem key={option.values}
//                         value={option.values}
//                         >
//                           {option.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//                 )}
//               />
//                 <FormField
//               control={form.control}
//               name="resolution"
//               render={({field})=>(
//                 <FormItem className="col-span-12 lg:col-span-2">
//                   <Select
//                   disabled={isLoading}
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue
//                         defaultValue={field.value}
//                         />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {resolutionOption.map((option)=> (
//                         <SelectItem key={option.values}
//                         value={option.values}
//                         >
//                           {option.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//                 )}
//               />
//               <Button className="col-span-12 lg:col-span-2" type="submit" disabled={isLoading}>
//                 {isLoading ? 'Generating...' : 'Generate'}
//               </Button>
//             </form>
//           </Form>
//         </div>
//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-20">
//               <Loader />
//             </div>
//           )}
//           {images.length === 0 && !isLoading && (
//             <div>
//               <Empty
//                 lable="No images generated"
//               />
//             </div>
//           )}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
//             {images.map((src) => (
//               <Card key={src}
//               className="rounded-lg overflow-hidden"
//               >
//                 <div className="relative aspect-square">
//                   <Image
//                   alt="Image"
//                   fill
//                   src={src}
//                   />
//                   <CardFooter className="p-2">
//                     <Button
//                     onClick={()=>window.open(src)}
//                     variant="secondary"
//                     className="w-full"
//                     >
//                       <Download className="h-4 w-4 mr-2"/>
//                     </Button>
//                   </CardFooter>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ImagePage;
