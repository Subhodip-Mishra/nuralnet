// import { checkApiLimit } from "@/lib/api-limit";
// import { NextResponse } from "next/server";

// const express = require('express');
// const axios = require('axios');
// const pdfjsLib = require('pdfjs-dist/es5/build/pdf.js');

// const app = express();
// const port = 4000;

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// app.get('/api/fetchPdf', async (req, res) => {
//   const { url } = req.query;

//   try {
//     const response = await axios.get(url, {
//       responseType: 'arraybuffer', 
//     });

//     const freeTrial = await checkApiLimit();

//     if(!freeTrial){
//         return new NextResponse("Free trial has expired.", {status: 403})
//     }

//     const textContent = await extractTextFromPDF(new Uint8Array(response.data));
    
//     res.send(textContent);
//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//     res.status(500).send('Error fetching PDF');
//   }
// });

// const extractTextFromPDF = async (typedArray) => {
//   const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
//   let text = '';
//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();
//     const pageText = content.items.map((item) => item.str).join(' ');
//     text += pageText + '\n';
//   }
//   return text;
// };

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
