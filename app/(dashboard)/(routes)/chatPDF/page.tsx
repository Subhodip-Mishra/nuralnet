// "use client";
// import { ArrowUp, CopyIcon, Download, RefreshCcw, Edit2 } from 'lucide-react';
// import React, { useRef, useState } from 'react';
// import { HeroSection } from '@/components/HeroSection';
// import { UserButton } from '@clerk/nextjs';
// import { Button } from '@/components/ui/button';
// import {useDropzone} from 'react-dropzone'
// import { PDFViewer } from '@react-pdf/renderer';

// const ChatPdf = () => {
//   const {getRootProps, getInputProps} = useDropzone();


  
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [chatMessages, setChatMessages] = useState([{ sender: 'NuralNet', message: "Sure, here's a sample text:" }]);
//   const [inputText, setInputText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editMessageIndex, setEditMessageIndex] = useState<number | null>(null);

//   const handleImportClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         // Create a new FileReader instance
//         const fileReader = new FileReader();
  
//         // Define a callback function to handle the FileReader onload event
//         fileReader.onload = (event) => {
//           if (event.target?.result) {
//             // Convert the file data to ArrayBuffer
//             const arrayBuffer = event.target.result as ArrayBuffer;
  
//             // Handle the ArrayBuffer here, e.g., send it to the server, process it further, etc.
//             console.log('File data as ArrayBuffer:', arrayBuffer);
//           }
//         };
  
//         // Read the file as ArrayBuffer
//         fileReader.readAsArrayBuffer(file);
//       } catch (error) {
//         console.error('Error reading file:', error);
//       }
//     }
//   };
  

//   const handleCopyClick = (text: string) => {
//     navigator.clipboard.writeText(text)
//       .then(() => {
//         console.log('Text copied to clipboard:', text);
//       }).catch(err => {
//         console.error('Failed to copy text:', err);
//       });
//   };

//   const handleRefreshClick = async (message: string, index: number) => {
//     // Resend the user's message to the AI and update the response
//     setLoading(true);
//     try {
//       const aiResponse = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message }),
//       });

//       const data = await aiResponse.json();
//       const aiMessage = { sender: 'NuralNet', message: data.response };

//       // Update the chat messages with the new AI response
//       setChatMessages((prevMessages) => {
//         const newMessages = [...prevMessages];
//         newMessages.splice(index, 1, aiMessage);
//         return newMessages;
//       });
//     } catch (error) {
//       console.error('Error fetching AI response:', error);
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'NuralNet', message: 'Sorry, something went wrong. Please try again.' }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (index: number) => {
//     setEditMessageIndex(index);
//     setInputText(chatMessages[index].message);
//   };

//   const handleUpdateClick = () => {
//     if (editMessageIndex !== null && inputText.trim() !== '') {
//       const updatedMessages = [...chatMessages];
//       updatedMessages[editMessageIndex].message = inputText;
//       setChatMessages(updatedMessages);
//       setEditMessageIndex(null);
//       setInputText('');
//     }
//   };

//   const handleSubmitClick = async () => {
//     if (inputText.trim() !== '') {
//       if (editMessageIndex !== null) {
//         handleUpdateClick();
//       } else {
//         const userMessage = { sender: 'You', message: inputText };
//         setChatMessages([...chatMessages, userMessage]);
//         setInputText('');

//         setLoading(true);
//         try {
//           const aiResponse = await fetch('/api/chat', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ message: inputText }),
//           });

//           const data = await aiResponse.json();
//           const aiMessage = { sender: 'NuralNet', message: data.response };
//           setChatMessages((prevMessages) => [...prevMessages, aiMessage]);
//         } catch (error) {
//           console.error('Error fetching AI response:', error);
//           setChatMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: 'NuralNet', message: 'Sorry, something went wrong. Please try again.' }
//           ]);
//         } finally {
//           setLoading(false);
//         }
//       }
//     }
//   };

//   return (
//     <div className="App text-center flex bg-[#282c34] absolute inset-0">
//       <aside className="sidemenu bg-gray-950 w-1/2 border-1">
//         <div className="pdfImport text-white flex items-center justify-center py-[38%] text-xl cursor-pointer" onClick={handleImportClick}>
//           Import Pdf
//           <div className="flex items-center px-3 justify-center">
//             <Download size={30} />
//           </div>
//         </div>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//       </aside>

//       <section className="chatbox relative flex-1 border border-zinc-800 bg-[#212121] flex flex-col">
//         <div className="flex items-center gap-2 py-4 justify-center">
//           <HeroSection />
//         </div>

//         <div className="chat-log flex-1 overflow-y-auto p-11 px-10 lg:px-30 text-left flex flex-col">
//           {chatMessages.map((chat, index) => (
//             <div key={index} className={`chat-message ${chat.sender === 'NuralNet' ? 'chatgpt' : ''} mb-4`}>
//               <div className="chat-center ml-auto mr-auto flex p-1 pl-11 pr-5">
//                 <div className={`avatar ${chat.sender === 'NuralNet' ? 'text-white bg-white' : ''} rounded-full w-8 h-8`}>
//                   {chat.sender === 'NuralNet' ? (
//                     <img src="/chatgpt.jpg" className="rounded-full border" alt="" />
//                   ) : (
//                     <UserButton afterSignOutUrl="/" />
//                   )}
//                 </div>
//                 <div className={`${chat.sender === 'NuralNet' ? 'ai' : 'User'}`}>
//                   <div className="text-white font-bold text-md px-3">
//                     {chat.sender}
//                   </div>
//                   <div className={`message ${chat.sender === 'NuralNet' ? 'text-white' : 'bg-zinc-700 text-white rounded-2xl pt-3 pl-4 pr-4 pb-3'}`}>
//                     {chat.message}
//                   </div>
//                 </div>
//               </div>
//               {chat.sender === 'NuralNet' && (
//                 <div className="text-gray-400 flex px-20 mt-2 gap-[2px]">
//                   <button className="flex items-center gap-1.5 rounded-md p-2 text-xs" onClick={() => handleCopyClick(chat.message)}>
//                     <CopyIcon className="flex hover:text-white" size={16} />
//                   </button>
//                   <button className="flex items-center gap-1.5 rounded-md p-2 text-xs" onClick={() => handleRefreshClick(chat.message, index)} title='Regenerate'>
//                     <RefreshCcw className="flex hover:text-white" size={16} />
//                   </button>
//                 </div>
//               )}
//               {chat.sender === 'You' && (
//                 <div className="text-gray-400 flex px-20 mt-2 gap-[2px]">
//                   <button className="flex items-center gap-1.5 rounded-md p-2 text-xs" onClick={() => handleCopyClick(chat.message)} title='copy'>
//                     <CopyIcon className="flex hover:text-white" size={16} />
//                   </button>
//                   <button className="flex items-center gap-1.5 rounded-md p-2 text-xs" onClick={() => handleEditClick(index)} title='edit'>
//                     <Edit2 className="flex hover:text-white" size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="chatinputholder p-1 mb-2 flex items-center justify-center">
//           <textarea
//             rows={1}
//             className="chatinputtext bg-[#212121] w-9/12 border border-shadow border-zinc-600 rounded-full p-3 outline-none text-white text-sm px-5"
//             placeholder="message pdf"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//           />
//           <Button className="rounded-full p-2 bg-zinc-700 hover:bg-white hover:text-black" onClick={handleSubmitClick} disabled={loading}>
//             <ArrowUp />
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ChatPdf;
