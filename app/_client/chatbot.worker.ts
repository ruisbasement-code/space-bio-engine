import { pipeline, env, TextGenerationPipeline } from "@xenova/transformers";

env.allowLocalModels = false;

let generator: TextGenerationPipeline;

const downloadModel = async (modelURL: string) => {
  console.log("Worker: Starting model download...", modelURL);
  try {
    generator = await pipeline("text-generation", modelURL);
    console.log("Worker: Model download complete.");

    self.postMessage({
      status: "ready",
      task: "text-generation",
      modelURL: modelURL,
    });
  } catch (error) {
    console.error("Worker: Error downloading model:", error);
    self.postMessage({
      status: "error",
      error: (error as Error).message,
    });
  }
};

const generateResponse = async (content: string) => {
  console.log("Worker: Generating response for:", content);
  if (!generator) {
    console.log("Worker: Generator not ready, aborting.");
    self.postMessage({
      result: "Model not loaded yet. Please wait.",
    });
    return;
  }

  try {
    const messages = [
    {
      role: "system",
      content: "You are a knowledgeable and friendly assistant specializing in space biology. When you respond, do not use Chinese, only English.",
    },
    {
      role: "user",
      content: content,
    },
  ];

  const textInput = generator.tokenizer.apply_chat_template(messages, {
    tokenize: false,
    add_generation_prompt: true,
  }) as string;

    const output = await generator(textInput, {
      max_new_tokens: 128,
      do_sample: true,
    }) as { generated_text: string }[];

    const conversation = output[0].generated_text;
    const start = conversation.lastIndexOf("assistant\n");
    const lastMessage = conversation.substr(start).replace("assistant\n", "");

    console.log("Worker: Generated response:", lastMessage);
    self.postMessage({
      result: lastMessage,
    });
  } catch (error) {
    console.error("Worker: Error generating response:", error);
    self.postMessage({
      result: `An error occurred: ${(error as Error).message}`,
    });
  }
};

self.addEventListener("message", (event) => {
  console.log("Worker: Received message:", event.data);
  const userRequest = event.data;

  if (userRequest.action === "download") {
    const modelURL = userRequest.modelURL;
    downloadModel(modelURL);
  } else if (userRequest.action === "chat") {
    const content = userRequest.content;
    generateResponse(content);
  }
});
