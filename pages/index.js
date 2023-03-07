import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  // const [userInput1, setUserInput1] = useState('');
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false);

  // basePromptMain = 'My Interests are'; 
  // for (i=0; i<userInput1.length; i++){
  //   basePromptMain += userInput1
  // }

  
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")


   
     const response = await fetch('/api/generate',
   {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json'         
      },
         body: JSON.stringify({ userInput }),
         
    });
    // .then(response => response.json())
    // .then(response => {

    // console.log(response)

    // });

  
   
     const data = await response.json();
     const {output} = data;
     console.log("OpenAI replied...", output.text);
  
     setApiOutput(`${output.text}`);
       setIsGenerating(false);
  }



  

  //  const onUserChangedText = (event) => {
  //   console.log(event.target.value);
  //    setUserInput(event.target.value);
  //  }  
  return (
    <div className='root'>
      <div className='container'>
        <div className="header">
          <div className='header-title'>
            <h1 >The A I CAREER COUNSELLOR</h1>
          </div>
          <div className='header-subtitle'>
            <h2>understanding who you want to be, is just a click away!</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="start typing your interests and career goals"  className="prompt-box" value={userInput} onChange={event =>{setUserInput(event.target.value)} } />
        
        <div className='prompt-buttons'>
          <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
            <div className='generate'>
            <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
            </div>
          </a>
        </div>
        {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
       
      </div>
    </div>
       <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
           <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div> 
          </a>       
      </div>       
    </div>
   
    );
};

export default Home;
