import React, { useState, useRef, useEffect } from 'react'
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Smile, 
  Paperclip, 
  Mic, 
  Send,
  Check,
  CheckCheck,
  MessageCircle,
  Users
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const VendorChat = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef(null)

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: "John Doe",
      avatar: "👨‍💼",
      lastMessage: "Hey, I'd like to order some items",
      time: "2:30 PM",
      unread: 2,
      online: true,
      status: "typing..."
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "👩‍🎓", 
      lastMessage: "Thanks for the quick delivery!",
      time: "1:45 PM",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "👨‍🔬",
      lastMessage: "What's your delivery time?",
      time: "12:20 PM", 
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: "Campus Admin",
      avatar: "🏫",
      lastMessage: "Monthly report due tomorrow",
      time: "Yesterday",
      unread: 0,
      online: false
    }
  ]

  // Sample messages for each chat
  const sampleMessages = {
    1: [],
    2: []
  }

  // useEffect(() => {
  //   setMessages(sampleMessages)
  // }, [sampleMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    }

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }))
    setMessage('')
  }

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const MessageStatus = ({ status }) => {
    if (status === 'sent') return <Check size={16} className="text-gray-400" />
    if (status === 'delivered') return <CheckCheck size={16} className="text-gray-400" />
    if (status === 'read') return <CheckCheck size={16} className="text-blue-500" />
    return null
  }

  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <MessageCircle size={24} />
              Vendor Chat
            </h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur rounded-full text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 cursor-pointer border-b border-border transition-colors ${
                  selectedChat === chat.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {chat.status ? (
                          <span className="text-blue-500 italic">{chat.status}</span>
                        ) : (
                          chat.lastMessage
                        )}
                      </p>
                      {chat.unread > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2 px-2 py-1 bg-gradient-to-r from-accent to-secondary text-white text-xs rounded-full font-semibold"
                        >
                          {chat.unread}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                    {chats.find(c => c.id === selectedChat)?.avatar}
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-primary/5 to-accent/5">
            <div className="space-y-4">
              {(messages[selectedChat] || []).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-md'
                      : 'bg-white text-foreground rounded-bl-md shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 justify-end ${
                      msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{msg.time}</span>
                      {msg.sender === 'me' && <MessageStatus status={msg.status} />}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <Paperclip size={20} />
              </motion.button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="w-full px-4 py-2 pr-12 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Smile size={18} />
                </motion.button>
              </div>
              
              {message.trim() ? (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  className="p-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:opacity-90"
                >
                  <Send size={20} />
                </motion.button>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Mic size={20} />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Welcome Screen
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white text-4xl">
              💬
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to Vendor Chat</h2>
            <p className="text-gray-600">Select a customer to start messaging</p>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default VendorChat