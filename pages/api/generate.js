import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const  [initialBasePrompt, setBasePrompt] = useState['']; 

//const basePromptPrefix = `My interests and career goals are ${req.body.userInput}. I want you to suggest me a career based on your experience.`;

const generateAction = async (req, res) => {

  const basePromptPrefix = `My interests and career goals are ${req.body.userInput}. I want you to suggest me a career based on your experience.`;


  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
   const basePromptOutput = baseCompletion.data.choices.pop();
   res.status(200).json({ output: basePromptOutput });
  };
   // I build Prompt #2.
   /* const secondPrompt = `My career goals is to be a ${req.body.userInput}. I want you to suggest me a career based on your experience.`;
   // I call the OpenAI API a second time with Prompt #2
    const secondPromptCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${secondPrompt}`,
      // I set a higher temperature for this one. Up to you!
      temperature: 0.85,
      // I also increase max_tokens.
      max_tokens: 1250,
    });
   
  //  // Get the output
    const secondPromptOutput = secondPromptCompletion.data.choices.pop();
 
  //  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
    res.status(200).json({ output: secondPromptOutput });
  };*/  



   
 

export default generateAction;