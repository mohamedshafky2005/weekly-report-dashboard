import { useState } from "react";
import api from "../api/api";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

function AiChatWidget() {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello! I can summarize team work, blockers, workload, recent reports, and submission status.",
        },
    ]);

    const askAI = async (customQuestion) => {
        const q = customQuestion || question;
        if (!q.trim()) return;

        setMessages((prev) => [...prev, { sender: "user", text: q }]);
        setQuestion("");
        setLoading(true);

        try {
            const res = await api.post("/ai/chat", { question: q });

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: res.data.answer || "No answer received.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Sorry, I could not process your question.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const quickQuestions = [
        "summarize team work",
        "show blockers",
        "show workload",
        "show submission status",
        "show recent reports",
    ];

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        position: "fixed",
                        right: "30px",
                        bottom: "30px",
                        zIndex: 9999,
                        background: "linear-gradient(135deg, #2563eb, #1e40af)",
                        color: "white",
                        border: "none",
                        borderRadius: "999px",
                        padding: "15px 22px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        boxShadow: "0 15px 35px rgba(37,99,235,.35)",
                        cursor: "pointer",
                    }}
                >
                    <FaRobot />
                    AI Assistant
                </button>
            )}

            {open && (
                <div
                    style={{
                        position: "fixed",
                        right: "30px",
                        bottom: "30px",
                        width: "420px",
                        height: "590px",
                        background: "white",
                        borderRadius: "24px",
                        boxShadow: "0 25px 70px rgba(15,23,42,.35)",
                        zIndex: 10000,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        border: "1px solid #e2e8f0",
                    }}
                >
                    <div
                        style={{
                            background: "linear-gradient(135deg, #0f172a, #1e40af)",
                            color: "white",
                            padding: "18px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <h3 style={{ margin: 0 }}>🤖 AI Assistant</h3>
                            <small style={{ color: "#cbd5e1" }}>Team activity helper</small>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                background: "rgba(255,255,255,.15)",
                                color: "white",
                                border: "none",
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                margin: 0,
                            }}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            padding: "14px",
                            borderBottom: "1px solid #e2e8f0",
                        }}
                    >
                        {quickQuestions.map((q) => (
                            <button
                                key={q}
                                onClick={() => askAI(q)}
                                disabled={loading}
                                style={{
                                    background: "#eff6ff",
                                    color: "#1e40af",
                                    border: "none",
                                    borderRadius: "999px",
                                    padding: "8px 12px",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    margin: 0,
                                    width: "auto",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    <div
                        style={{
                            flex: 1,
                            padding: "15px",
                            overflowY: "auto",
                            background: "#f8fafc",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                    background: msg.sender === "user" ? "#2563eb" : "white",
                                    color: msg.sender === "user" ? "white" : "#0f172a",
                                    padding: "12px",
                                    borderRadius:
                                        msg.sender === "user"
                                            ? "16px 16px 0 16px"
                                            : "16px 16px 16px 0",
                                    border: msg.sender === "user" ? "none" : "1px solid #e2e8f0",
                                    maxWidth: "88%",
                                    marginBottom: "12px",
                                }}
                            >
                <pre
                    style={{
                        whiteSpace: "pre-wrap",
                        fontFamily: "Inter, Arial, sans-serif",
                        margin: 0,
                        lineHeight: 1.5,
                        fontSize: "14px",
                    }}
                >
                  {msg.text}
                </pre>
                            </div>
                        ))}

                        {loading && (
                            <div
                                style={{
                                    alignSelf: "flex-start",
                                    background: "white",
                                    padding: "12px",
                                    borderRadius: "16px",
                                    border: "1px solid #e2e8f0",
                                }}
                            >
                                Thinking...
                            </div>
                        )}
                    </div>

                    <div
                        style={{
                            padding: "12px",
                            display: "flex",
                            gap: "8px",
                            borderTop: "1px solid #e2e8f0",
                            background: "white",
                        }}
                    >
                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask about team reports..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") askAI();
                            }}
                            style={{
                                flex: 1,
                                padding: "12px",
                                border: "1px solid #cbd5e1",
                                borderRadius: "10px",
                                margin: 0,
                            }}
                        />

                        <button
                            onClick={() => askAI()}
                            disabled={loading}
                            style={{
                                width: "52px",
                                minWidth: "52px",
                                margin: 0,
                                background: "#2563eb",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                            }}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AiChatWidget;