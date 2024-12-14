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
  "preamble": "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, LIBERTY, EQUALITY, and FRATERNITY. The Supreme Court in Kesavananda Bharati case (1973) held that the Preamble is part of the Constitution and can be amended, subject to the basic structure doctrine.",
  
  "fundamental rights": {
    "general": "The Fundamental Rights are enshrined in Part III of the Constitution. They include Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
    "right to equality": "Articles 14-18: Ensures equality before law and equal protection of laws. In Indra Sawhney case (1992), the Supreme Court upheld reservations for socially and educationally backward classes while capping it at 50%.",
    "right to freedom": "Articles 19-22: Protects six fundamental freedoms including speech, assembly, and movement. In Shreya Singhal case (2015), the Supreme Court struck down Section 66A of IT Act as violative of freedom of speech.",
    "right to life": "Article 21: The Supreme Court in Maneka Gandhi case (1978) interpreted it to include right to live with dignity, right to privacy, and right to clean environment."
  },
  
  "directive principles": {
    "general": "The Directive Principles of State Policy are guidelines to governments for establishing a just society.",
    "key principles": "Include uniform civil code, protection of environment, free legal aid, and right to work.",
    "court decisions": "In Minerva Mills case (1980), Supreme Court held that fundamental rights and directive principles form the basic features of Constitution and are complementary to each other."
  },
  
  "fundamental duties": {
    "general": "Added by 42nd Amendment in 1976 upon Swaran Singh Committee recommendations.",
    "court interpretation": "In AIIMS Students Union case (2001), Supreme Court emphasized that fundamental duties are as important as fundamental rights."
  },
  
  "parliament": {
    "general": "Consists of the President and two Houses - Rajya Sabha (Council of States) and Lok Sabha (House of the People).",
    "powers": "Can make laws on subjects in Union List and Concurrent List. In case of conflict with state law, parliament law prevails as per Article 254.",
    "landmark cases": "In Raja Ram Pal case (2007), Supreme Court upheld Parliament's power to expel members for misconduct."
  },
  
  "supreme court": {
    "general": "Highest judicial forum and final court of appeal under the Constitution of India.",
    "jurisdiction": "Original, Appellate, and Advisory jurisdiction under Articles 131, 132-136, and 143 respectively.",
    "key decisions": "Established basic structure doctrine (Kesavananda Bharati, 1973), Right to Privacy (Justice Puttaswamy, 2017)"
  },
  
  "emergency provisions": {
    "general": "Three types: National Emergency (Article 352), State Emergency (Article 356), Financial Emergency (Article 360)",
    "landmark cases": "In S.R. Bommai case (1994), Supreme Court made President's power to impose State Emergency subject to judicial review."
  }
};

const findAnswer = (question: string): string => {
  const lowercaseQuestion = question.toLowerCase();
  
  // Check for specific sub-topics first
  for (const [mainTopic, content] of Object.entries(constitutionData)) {
    if (typeof content === 'object') {
      for (const [subTopic, subContent] of Object.entries(content)) {
        if (lowercaseQuestion.includes(subTopic)) {
          return subContent;
        }
      }
    }
  }
  
  // Check for main topics
  for (const [key, value] of Object.entries(constitutionData)) {
    if (lowercaseQuestion.includes(key)) {
      if (typeof value === 'object') {
        // Return the general description if available, otherwise return the first value
        return value.general || Object.values(value)[0];
      }
      return value;
    }
  }
  
  return "I apologize, but I don't have specific information about that aspect of the Indian Constitution. Please try asking about the preamble, fundamental rights (including right to equality, freedom, and life), directive principles, fundamental duties, parliament, supreme court, or emergency provisions.";
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Indian Constitution assistant. Ask me about the Preamble, Fundamental Rights (including specific rights like equality, freedom, life), Parliament, Supreme Court decisions, or other constitutional topics!",
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