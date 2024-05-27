"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Code } from 'lucide-react';
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forSchema } from "./constants";
import Empty from "@/components/empty";
import Heading from '@/components/heading';
import Loader from "@/components/loader";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import { UserAvater } from "@/components/user-avater";
import { BotAvater } from "@/components/bot-avater";

const CodePage = () => {
  const [message, setMessage] = useState([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(forSchema),
    defaultValues: { prompt: "" }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...message, userMessage];
      const response = await axios.post("/api/code", { message: newMessages });
      setMessage(current => [...current, userMessage, response.data]);
      form.reset();
    } catch (error) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }  
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-white">
        <Heading
          title="Code Generation"
          description="Generate code using descriptive text."
          icon={Code}
          iconColor="text-green-700"
          bgColor="bg-green-700/10"
        />
      </div>

        <div className="space-y-4 mt-4 ">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {message.length === 0 && !isLoading && (
            <Empty label="NO conversation started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {message.map((message) => (
              <div
                key={message.content}
                className={cn("p-8 w-full flex items-center justify-center gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
              >
                {message.role === "user" ? <UserAvater /> : <BotAvater />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) =>
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                  }}
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      <div className='px-4 lg:px-8 '>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10 gap-2">
                    <FormControl className="m-0 p-2">
                      <Input
                        className="border-0 outline-none focus-visible: ring-0 focus-visible: ring-transparent"
                        disabled={isLoading}
                        placeholder="Simple toggle button using react hooks."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 relative flex justify-center items-center px-4 lg:px-8 py-2 text-white bg-indigo-600 border border-transparent hover:border-current sm:items-center sm:w-28"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CodePage;


 'use client';

 import React, { useState } from 'react';
 import { ArrowUp, PenBox } from 'lucide-react';
 import { HeroSection } from '@/components/HeroSection';
 import { UserButton } from '@clerk/nextjs';
 import axios from 'axios';
 import { v4 as uuidv4 } from 'uuid';

 type Message = {
   id: string;
   role: 'user' | 'assistant';
   content: string;
 };

 const CodePage = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [inputText, setInputText] = useState('');

   const handleSendMessage = async (event: React.FormEvent) => {
     event.preventDefault();

     if (inputText.trim() === '') return;

     const userMessage: Message = { id: uuidv4(), role: 'user', content: inputText };
     setInputText('');
     setMessages([...messages, userMessage]);

     try {
       const response = await axios.post('/api/code', {
         messages: [...messages, userMessage],
       });

       const aiMessage: Message = { id: uuidv4(), role: 'assistant', content: response.data.text };
       setMessages([...messages, userMessage, aiMessage]);
     } catch (error) {
       console.error('Error sending message:', error);
     }
   };

   return (
     <div className="App text-center flex bg-[#282c34] absolute top-0 bottom-0 right-0 left-0">
       <aside className="sidemenu bg-gray-950 w-[260px] p-4 px-3 text-end border-1">
         <div className="grow overflow-hidden text-sm sidemenubutton p-1 pb-1 text-white hover:bg-zinc-800 group flex h-10 items-center gap-2 rounded-lg px-2 font-semibold">
           <div className="gap-2">
             <img
               src="/chatgpt.jpg"
               className="group flex h-8 w-8 items-center rounded-full bg-token-sidebar-surface-primary px-0 py-0 font-medium hover:bg-token-sidebar-surface-secondary transition-opacity"
               style={{ marginRight: '0px' }}
               alt="ChatGPT"
             />
           </div>
           New chat
           <div className="flex items-center justify-center" style={{ marginLeft: '80px' }}>
             <PenBox size={17} />
           </div>
         </div>
       </aside>
       <section className="chatbox relative flex-1 border-solid border-zinc-800 bg-[#212121]">
         <div className="flex items-center gap-2 py-4 justify-center top-2">
           <HeroSection />
         </div>

         <div className="chat-log p-11 px-20 lg:px-30 text-left rounded-full flex flex-col">
         <img className='flex items-center justify-center '  src="favicon.ico" alt="" />

           {messages.map((message) => (
             <div className={`chat-message ${message.role === 'assistant' ? 'chatgpt' : ''}`} key={message.id}>
               <div className="chat-center pb-10 ml-auto mr-auto flex p-2 pl-11 pr-5">
                 <div className={`avatar flex rounded-full w-7 h-7 ${message.role === 'assistant' ? 'bg-white' : ''}`}>
                   {message.role === 'assistant' ? (
                     <img src="/chatgpt.jpg" className="rounded-full border" alt="AI" />
                   ) : (
                     <UserButton afterSignOutUrl="/" />
                   )}
                 </div>
                 <div className="User">
                   <div className="text-white font-bold text-md px-3">
                     {message.role === 'assistant' ? 'NuralNet' : 'You'}
                   </div>
                   <div className="message text-white pl-3 pr-5">{message.content}</div>
                 </div>
               </div>
             </div>
           ))}
         </div>

           <div className="chatinputholder absolute left-0 right-0 bottom-0 p-1">
             <form onSubmit={handleSendMessage}>
               <textarea
                 rows={1}
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 className="chatinputtext bg-[#212121] w-9/12 border border-shadow border-zinc-600 rounded-md p-4 outline-none text-white text-sm"
                 placeholder="message NuralNet"
               />
               <button
                 type="submit"
                 className="text-zinc-300 rounded-lg border border-none bg-black p-2 md:p-3 h-8 md:h-10 w-8 md:w-10"
               >
                 <ArrowUp size={16} />
               </button>
             </form>
           </div>
       </section>
     </div>
   );
 };

 export default CodePage;


