import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'

export default function Home() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! Welcome to WhatsApp clone', sender: 'other', time: '10:30' },
    { id: 2, text: 'This is a demo chat interface', sender: 'other', time: '10:31' }
  ])
  const [inputText, setInputText] = useState('')
  const [contacts] = useState([
    { id: 1, name: 'Demo Contact', lastMessage: 'This is a demo chat interface', time: '10:31', unread: 2, active: true },
    { id: 2, name: 'John Doe', lastMessage: 'See you tomorrow!', time: 'Yesterday', unread: 0, active: false },
    { id: 3, name: 'Jane Smith', lastMessage: 'Thanks for your help', time: 'Monday', unread: 0, active: false },
  ])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      }
      setMessages([...messages, newMessage])
      setInputText('')

      // Simulate response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: 'Thanks for your message!',
          sender: 'other',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        }])
      }, 1000)
    }
  }

  return (
    <>
      <Head>
        <title>WhatsApp Clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="app">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="user-avatar">
              <div className="avatar-circle">Me</div>
            </div>
            <div className="header-icons">
              <button className="icon-btn">⟳</button>
              <button className="icon-btn">💬</button>
              <button className="icon-btn">⋮</button>
            </div>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search or start new chat" />
          </div>

          <div className="contacts-list">
            {contacts.map(contact => (
              <div key={contact.id} className={`contact ${contact.active ? 'active' : ''}`}>
                <div className="contact-avatar">{contact.name[0]}</div>
                <div className="contact-info">
                  <div className="contact-header">
                    <h3>{contact.name}</h3>
                    <span className="contact-time">{contact.time}</span>
                  </div>
                  <div className="contact-message">
                    <p>{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="unread-badge">{contact.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="contact-avatar">D</div>
              <div>
                <h3>Demo Contact</h3>
                <span className="status">online</span>
              </div>
            </div>
            <div className="header-icons">
              <button className="icon-btn">🔍</button>
              <button className="icon-btn">⋮</button>
            </div>
          </div>

          <div className="messages-container">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="message-time">{message.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="message-input" onSubmit={handleSend}>
            <button type="button" className="icon-btn">😊</button>
            <button type="button" className="icon-btn">📎</button>
            <input
              type="text"
              placeholder="Type a message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="send-btn">
              {inputText.trim() ? '➤' : '🎤'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
