import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// import { Configuration, OpenAIApi} from 'openai';
// import {ChatCompletionRequestMessage} from 'openai'
import { checkApiLimit, increaseapiLimit } from '@/lib/api-limit';

// const  configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const instructionMessage: ChatCompletionRequestMessage = {
//     role: "system",
//     content: "You are a code generator. You must answer only in markdown code snippets Use code comments for explanations. When write then please notedown example"
   
// }

// const openai = new OpenAI(configuration);

export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { message } = body;
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        // if(!configuration.apiKey){
        //     return new NextResponse("OpneAI API key not configured", {status: 500})
        // }

        if(!message){
            return new NextResponse("Mesages are required", {status: 400})
        }
        const freeTrial = await checkApiLimit();

        if(!freeTrial){
            return new NextResponse("Free trial has expired.", {status: 403})
        }

        // const response = await openai.completions({
        //     model: "gpt-3.5-turbo",
        //     message: [instructionMessage, ...message]
        // })
        
        await increaseapiLimit();

        return NextResponse.json(response.data.choices[0].message);
    }
    catch(error){
        console.log("[CODE_ERROR", error)
        return new NextResponse("Internal erro" , {status: 500})
        
    }
}

