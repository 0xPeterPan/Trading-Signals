import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Provide the potential return on investment (ROI)
Provide more detailed information such as entry and exit points, stop loss and take profit levels, and any other relevant technical analysis indicators.
Recommend the best cryptocurrency exchanges and trading platforms to use
with the example
Crypto Pair: 
Entry Point: 
Exit Point: 
Stop Loss: 
Take Profit:
Time Frame:
Potential ROI:
Risk Tolerance:

Technical Analysis Indicators:

Recommended Exchange: 
Recommended Trading Platform: 
Technical Analysis: 
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;