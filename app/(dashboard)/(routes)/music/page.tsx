"use client"
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Music } from 'lucide-react';
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Empty from "@/components/Empty";
import Heading from '@/components/heading';
import Loader from "@/components/loader";
import { UserAvater } from "@/components/user-avater";
import { BotAvater } from "@/components/bot-avater";
import { forSchema } from "./constants";
import { useProModel } from "@/hooks/use-pro-model";


const MusicPage = () => {
  const proModal = useProModel();

  const router = useRouter();
  // const [music, setMusic] = useState<string>([]);

  const form = useForm<z.infer<typeof forSchema>>({
    resolver: zodResolver(forSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof forSchema>) => {
    try {
      // setMusic(undefined);
      const response = await axios.post("/api/music", values)
      // setMusic(response.data.audio);

      form.reset();
    } catch (error:any) {
      if(error?.response?.status === 403){
        proModal.onOpen();
      }  
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  return (
    <>
      <Heading
        title="Music Generation"
        description="Generate a music."
        icon={Music}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />

      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <Input
                      className="border-0 outline-none focus-within:ring-0 focus-within:ring-transparent"
                      disabled={isLoading}
                      placeholder="Generate a guiter solo"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2" type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* {!music && !isLoading && (
            <div>
              <Empty
                lable="No Music generated"
              />
            </div>
          )}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music}/>
            </audio>
          )} */}
        </div>
      </div>
    </>
  )
}

export default MusicPage;
