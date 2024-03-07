import React from 'react'
import Card from './individualposts'

function Main(){
  return (
    <div>
        <div className="container">
            <div className="headline-text">
                <h1>Main article heading</h1>
                <h5>Description</h5>
                <button>Read more</button>
            </div>
        </div>
        <div className='card-container'>
        <Card title="Prompting ChatGPT to success" 
              description="ChatGPT prompts are the starting points for conversations with the ChatGPT or any other conversational AI tool for that matter. Think of them as the initial domino in a chain of linguistic sequences; what you input sets the tone, direction, and scope of the dialogue"
              author="Writesonic"
              date="19 Jan 2024"
              />
        <Card />
        </div>
    </div>
  )
}

export default Main
