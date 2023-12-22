// Load in Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load in safety features. These should be beneficial in most use cases, but it's up to Leo to decide if he wants to delete them
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
const safetySettings = [
    { 
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

// Actually call the Gemeni API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", safetySettings});

// Im tired of writing comments
export async function generate() {
 const prompt = `You are an expert tailwind developer. A user will provide you with a
 low-fidelity wireframe of an application and you will return 
 a single html file that uses tailwind to create the website. Use creative license to make the application more fleshed out.
if you need to insert an image, use placehold.co to create a placeholder image. Respond only with the html file. Turn this image into an HTML file`;
 const { image } =  await request.json();
 try {
  const result = await model.generateContent([prompt, ...image]);
  const response = await result.response;
 } catch (e) {
  console.log(e)
 }
 console.log(response.json)
}
