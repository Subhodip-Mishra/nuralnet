"use client"
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { MessageSquare } from 'lucide-react';
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Empty from "@/components/Empty";
import Heading from '@/components/heading';
import Loader from "@/components/loader";
import { UserAvater } from "@/components/user-avater";
import { BotAvater } from "@/components/bot-avater";
// import { ChatCompletionRequiestMessage } from "openai";
import { forSchema } from "./constants";
import { useProModel } from "@/hooks/use-pro-model";



const ConversationPage = () => {
  const proModal = useProModel();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  // const [message, setMessage] = useState<ChatCompletionRequestMessage[]>([]);
  // const router = useRouter();

  const form = useForm<z.infer<typeof forSchema>>({
    resolver: zodResolver(forSchema),
    defaultValues: {
      prompt: ""
    }
  });

  // const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof forSchema>) => {
    try {
      // const userMessage: ChatCompletionRequiestMessage = {
      //   role: "user",
      //   content: values.prompt,
      // };

      // const newMessages = [...message, userMessage]
      // const response = await axios.post("/api/conversation", {
      //   message: newMessages,
      // });

      // setMessage((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error:any) {
      if(error?.response?.status === 403){
        proModal.onOpen();
      }   
    } finally {
      router.refresh();
    }
  }

  return (
    <>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
        
      />

      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-full border border-spacing-x-24  w-full p-4 px-3 md:px-6 focus-within:shadow-sm   grid-cols-12 gap-2 "
            >
              <div className="relative">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-10">
                    <FormField
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            className="border-0 outline-none focus:outline-none focus:ring-0 "
                            disabled={isLoading}
                            placeholder="Type your message here..."
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-2 flex justify-end">
                    <button className="relative flex justify-center items-center px-4 lg:px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group transition duration-300 text-white border border-transparent hover:border-current sm:items-center sm:w-48">
                      <span className="font-bold">{isLoading ? 'Generating...' : 'Generate'}</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* <Button className="col-span-12 lg:col-span-2" type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate'}
              </Button> */}
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center ">
              <Loader />
            </div>
          )}
          {conversation.length === 0 && !isLoading && (
            <div>
              <Empty
                lable="Start your Conversation"
              />
            </div>
          )}
          {conversation.map((message, index) => (
            <div key={index}
              className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
              )}>
              {message.role === "user" ? <UserAvater /> : <BotAvater />}
              <p className="text-sm">
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ConversationPage;
