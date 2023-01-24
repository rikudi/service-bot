import React from 'react'

//Initializing openAI API Configuration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  
});
const openai = new OpenAIApi(configuration);


export default function Chat() 
{
    const [messages, setMessages] = React.useState([])
    const [currentMessage, setCurrentMessage] = React.useState("")
    const [responses, setResponses] = React.useState([])


     //function that requests OpenAI api data based on parameters and updates messages state.
     //using Async/await to return a promise after it is resolved
     const sendMessage = async () => {
        setMessages(messages => [...messages], messages.push(currentMessage))
        const textParamaters = {
            model: "text-davinci-003",
            prompt: currentMessage,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,   
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        }
        const response = await openai.createCompletion(textParamaters)
        const data = response.data.choices[0].text
        console.log(data)

        setResponses(responses => [...responses], responses.push(data))
        
        console.log("Messages in array: " + messages)
        console.log("GPT-3 Responses: " + responses)
    }

    return(
        <div>
            <div className='messages-container w-96 h-96 bg-zinc-300 rounded'>
                <div className='flex items-end'>
                    <div className='messages'>
                            {messages.map(message => <div className="text-white bg-zinc-600 rounded p-1 m-1" key={message}>User: {message}</div>)}
                            {responses.map(message => <div className="text-white bg-purple-600 rounded p-1 m-1" key={message}>Bot: {message}</div>)}
                    </div>
                </div>
            </div>
                <div className='input flex flex-col'>
                    <label htmlFor="message" className='text-white my-2'>Type your message</label>
                    <textarea 
                            id='message'
                            placeholder='Type a message'
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            className="whitespace-pre-wrap h-28 mb-2 p-4 text-sm placeholder-slate-300 rounded border-0 shadow outline-none text-base break-all truncate focus:outline-none focus:ring w-full"
                    />
                    <button className='bg-gray-100 p-2 rounded w-1/2' onClick={sendMessage}>
                        Generate text
                    </button>
                </div>
        </div>
        
        
    )
}
