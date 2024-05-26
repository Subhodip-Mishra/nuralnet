import * as z from "zod";

export const forSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required",
    }), 
})
