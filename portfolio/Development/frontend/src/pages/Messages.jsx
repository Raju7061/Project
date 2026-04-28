import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/contact/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#43FAC6] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Inbox (via Elasticsearch)</h1>
          
          {loading ? (
            <p className="text-center">Loading messages...</p>
          ) : (
            <div className="grid gap-4">
              {messages.map((msg, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-[#1db954]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-gray-800">{msg.name}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.created_at / 1000).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-blue-600 text-sm mb-2">{msg.email}</p>
                  <p className="text-gray-700 italic">"{msg.message}"</p>
                </div>
              ))}
              {messages.length === 0 && <p className="text-center text-gray-600">No messages found.</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;