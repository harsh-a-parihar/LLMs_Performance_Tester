# LLM Models Accuracy Testing Application
==========================================

# So I have structured the frontend as:
---------------------------------------

## `/dashboard`

### all models (little detials about them)

		-> Visulizations based on the chats/responses accuracy with actual answers
			-> evaluation matrix: accuracy, relevance, fluency, bias & safety, domain specific benchmarks.. etc
		-> Visualizations based on the basic domain specific benchmarks
		-> Suitability or Adaptability of the model based on accuracy, domain specific benchmarks, and costs
		-> All chats(new) history of the particular model

### search
		-> filters based on models, specific domains/categories, basic benchmarks, etc)


## `/models`

		-> Visulizations based on the chats/responses accuracy with actual answers
		-> Visualizations based on the basic domain specific benchmarks
			-> evaluation matrix: accuracy, relevance, fluency, bias & safety, domain specific benchmarks.. etc
		-> Suitability or Adaptability of the model based on accuracy, domain specific benchmarks, and costs
		-> All chats(new) history of the particular model


## `/chats(new)`

		-> just like chatgpt webpage chat history rendering. showing every new chats started in rows when a user clicks and opens it, it will then show all the history and chats between user and llm.
		-> domain specific catgories and dates(days)


### `NOTE: For visualizations: we can use good and professional modern charts, graphs, pies, tables, or any thing better u can suggest with understandable annotations and brief description.`


# Features
----------

## `Prompt box`: text input, file input, model choice, and if possible voice input.

### -> Querying: Simple and API based( one-by-one or in one go )

	-> Simple: input the specific prompt, insert/attach the file, llm generates the response, save the response.
		`ultimate result: get question, response and actual answer for comparision.`

	-> API based: input the file( in my case for now I need json ), then here I must create an api for extracting the questions from json/any file and give that as text input to selected model, and then the model will generate the response. But this api call can be one-by-one (means extract one question->input it to model->model generates response->save response to particular question) or in one-go (means extract all questions in one go-> input it to model as structured text-> response generated->save it..) and at the end all the response must me saved to their particular questions.
		`ultimate result: get all questions, all response corresponding to questions, all actual answers for comparision.`

### `NOTE: Here all the chats must be saved so that can be rendered on chats/history...`

# This is full structure of the frontend or u can say the application I am building.