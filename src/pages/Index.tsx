import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";

export type Message = {
  id: string;
  content: string;
  isBot: boolean;
};

const constitutionData = {
  "preamble": "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, LIBERTY, EQUALITY, and FRATERNITY.",
  "fundamental rights": "The Fundamental Rights are enshrined in Part III of the Constitution. They include Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
  "directive principles": "The Directive Principles of State Policy are guidelines to the central and state governments for establishing a just society in the country.",
  "fundamental duties": "The Fundamental Duties of citizens were added to the Constitution by the 42nd Amendment in 1976, upon the recommendations of the Swaran Singh Committee.",
  "parliament": "The Parliament of India consists of the President and two Houses - Rajya Sabha (Council of States) and Lok Sabha (House of the People).",
  "supreme court": "The Supreme Court of India is the highest judicial forum and final court of appeal under the Constitution of India.",
  "emergency provisions": "The Constitution provides for three types of emergencies: National Emergency (Article 352), State Emergency (Article 356), and Financial Emergency (Article 360)."
};

const findAnswer = (question: string): string => {
  const lowercaseQuestion = question.toLowerCase();
  
  // Check for keywords in the question
  for (const [key, value] of Object.entries(constitutionData)) {
    if (lowercaseQuestion.includes(key)) {
      return value;
    }
  }
  
  return "I apologize, but I don't have specific information about that aspect of the Indian Constitution. Please try asking about the preamble, fundamental rights, directive principles, fundamental duties, parliament, supreme court, or emergency provisions.";
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Indian Constitution assistant. Ask me about the Preamble, Fundamental Rights, Parliament, Supreme Court, or other constitutional topics!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Get response based on user's question
    const answer = findAnswer(input);
    
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: answer,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="mx-auto max-w-2xl h-[80vh] flex flex-col">
        <div className="bg-[#FF9933] p-4 rounded-t-lg">
          <h1 className="text-white text-xl font-bold text-center">
            Indian Constitution Chatbot
          </h1>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the Indian Constitution..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Index;