import { useState } from "react";
import "./App.css";

function App() {
    const [namespace, setNamespace] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleAsk() {
        if (!namespace || !question) {
            return;
        }

        setLoading(true);
        setAnswer("");
        setSources([]);

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question,
                    namespace
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setAnswer(data.answer);
            setSources(data.sources || []);

        } catch (error) {
            console.error(error);
            setAnswer("Failed to get an answer.");
        }

        setLoading(false);
    }

    return (
        <div className="app">
            <div className="container">

                <div className="header">
                    <h1>RepoLens</h1>
                    <p>Understand any code repository with AI.</p>
                </div>

                <div className="card">
                    <label>Repository Namespace</label>

                    <input
                        type="text"
                        placeholder="e.g. DocSense"
                        value={namespace}
                        onChange={(e) => setNamespace(e.target.value)}
                    />

                    <label>Ask a Question</label>

                    <input
                        type="text"
                        placeholder="Where is user authentication implemented?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    <button
                        onClick={handleAsk}
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Ask RepoLens"}
                    </button>
                </div>

                {loading && (
                    <div className="card loading">
                        Searching repository and generating answer...
                    </div>
                )}

                {answer && !loading && (
                    <div className="card">
                        <h2>Answer</h2>

                        <div className="answer">
                            {answer}
                        </div>
                    </div>
                )}

                {sources.length > 0 && !loading && (
                    <div className="card">
                        <h2>Sources</h2>

                        {sources.map((source, index) => (
                            <div className="source" key={index}>
                                📄 {source.file}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default App;