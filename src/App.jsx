import { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    // Cargar mensajes iniciales
    fetch("http://localhost:4000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    // Conectar WebSocket
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "NEW_MESSAGE") {
        setMessages((prev) => [data.message, ...prev]);
      }

      if (data.type === "LIKE_UPDATE") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.message.id ? data.message : msg
          )
        );
      }
    };

    return () => ws.current.close();
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await fetch("http://localhost:4000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setContent("");
  };

  const handleLike = async (id) => {
    await fetch(`http://localhost:4000/messages/${id}/like`, {
      method: "POST",
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1>Feedback Hub</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <input
          style={{ flex: 1, padding: "8px 12px", fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
          placeholder="Escribe un mensaje..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          style={{ padding: "8px 16px", fontSize: 16, borderRadius: 6, background: "#4f46e5", color: "white", border: "none", cursor: "pointer" }}
          onClick={handleSubmit}
        >
          Publicar
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{msg.content}</span>
            <button
              onClick={() => handleLike(msg.id)}
              style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 14 }}
            >
              ❤️ {msg.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;