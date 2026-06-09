import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { X, Send, Bot, User } from 'lucide-react';

interface AIAssistantProps {
  courseTitle: string;
  lessonTitle: string;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export function AIAssistant({ courseTitle, lessonTitle, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Salom! Men ${courseTitle} kursi bo'yicha AI yordamchiman. ${lessonTitle} darsi haqida savollaringiz bo'lsa, bemalol so'rang!`,
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const mockResponses = [
    "Bu savol uchun quyidagicha tushuntirishim mumkin: Darsda ko'rsatilgan usullarni amalda qo'llashingiz muhim.",
    "Yaxshi savol! Ushbu mavzuni yanada chuqurroq o'rganish uchun amaliy mashqlar qilishingizni maslahat beraman.",
    "Tushuntirib beraman: Bu konsepsiya asosiy bo'lib, keyingi darslar uchun muhim asos hisoblanadi.",
    "Ajoyib! Bu mavzuni to'liq tushunish uchun video darsni qaytadan ko'rishingizni tavsiya qilaman.",
    "Men yordam berishga tayyorman! Bu mavzu bo'yicha qo'shimcha misollar kerakmi?",
  ];

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <CardTitle>AI Yordamchi</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-5 h-5 text-blue-600" />
                    ) : (
                      <User className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot 
                      ? 'bg-blue-50 text-gray-900' 
                      : 'bg-gray-900 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Savolingizni yozing..."
                className="flex-1"
              />
              <Button onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Demo rejim: AI javoblari simulyatsiya qilingan
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}










