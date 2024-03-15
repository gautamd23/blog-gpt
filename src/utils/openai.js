import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'my api key', // defaults to process.env["OPENAI_API_KEY"]
});