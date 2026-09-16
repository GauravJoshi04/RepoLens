import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {
    const [repoUrl, setRepoUrl] = useState("");
    const [namespace, setNamespace] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [repoReady, setRepoReady] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleAnalyze() {
        if (!repoUrl) {
            return;
        }

        setAnalyzing(true);
        setRepoReady(false);
        setNamespace("");
        setAnswer("");
        setSources([]);

        try {
            const response = await fetch(
                "http://localhost:5000/api/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        repoUrl
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to analyze repository"
                );
            }

            setNamespace(data.repoName);
            setRepoReady(true);

        } catch (error) {
            console.error(error);
            setAnswer("Failed to analyze repository.");
        }

        setAnalyzing(false);
    }

    async function handleAsk() {
        if (!namespace || !question) {
            return;
        }

        setLoading(true);
        setAnswer("");
        setSources([]);

        try {
            const response = await fetch(
                "http://localhost:5000/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question,
                        namespace
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Something went wrong"
                );
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

            <header className="navbar">
                <div className="logo">
                    <span className="logo-mark">R</span>
                    <span>RepoLens</span>
                </div>

                <div className="status">
                    <span className="status-dot"></span>
                    Intelligent Codebase Analyzer
                </div>
            </header>

            <main className="main">

                <section className="hero">

                    <h1>
                        Understand your
                        <span> codebase.</span>
                    </h1>

                    <p>
                        Ask questions about your repository and get
                        grounded answers from your actual source code.
                    </p>
                </section>

                <section className="workspace">

                    {/* Repository input */}
                    <div className="repo-input">

                        <div className="input-label">
                            <span>GitHub Repository</span>

                            <span className="input-hint">
                                Public repository
                            </span>
                        </div>

                        <div className="repo-field">

                            <span className="repo-icon">⌘</span>

                            <input
                                type="text"
                                placeholder="https://github.com/user/repository"
                                value={repoUrl}
                                onChange={(e) =>
                                    setRepoUrl(e.target.value)
                                }
                            />

                            <button
                                className="analyze-button"
                                onClick={handleAnalyze}
                                disabled={analyzing || !repoUrl}
                            >
                                {analyzing
                                    ? "Analyzing..."
                                    : "Analyze"}
                            </button>

                        </div>

                        {repoReady && (
                            <div className="repo-ready">
                                Repository ready !
                            </div>
                        )}

                    </div>

                    {/* Question box */}
                    {repoReady && (
                        <div className="question-box">

                            <div className="input-label">
                                <span>Ask RepoLens</span>
                            </div>

                            <textarea
                                placeholder="Where is document ingestion implemented?"
                                value={question}
                                onChange={(e) =>
                                    setQuestion(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (
                                        e.key === "Enter" &&
                                        !e.shiftKey
                                    ) {
                                        e.preventDefault();
                                        handleAsk();
                                    }
                                }}
                            />

                            <div className="question-footer">

                                <span>
                                    Enter to ask · Shift + Enter for new line
                                </span>

                                <button
                                    onClick={handleAsk}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        "Analyzing..."
                                    ) : (
                                        <>
                                            Ask
                                            <span>→</span>
                                        </>
                                    )}
                                </button>

                            </div>

                        </div>
                    )}

                    {/* Loading state */}
                    {loading && (
                        <div className="loading-card">

                            <div className="spinner"></div>

                            <div>
                                <strong>
                                    Analyzing repository...
                                </strong>

                                <p>
                                    Searching relevant code and generating
                                    an answer.
                                </p>
                            </div>

                        </div>
                    )}

                    {/* Answer + sources */}
                    {answer && !loading && (
                        <section className="result-section">

                            <div className="section-title">
                                <span className="section-icon">
                                    ✦
                                </span>

                                Answer
                            </div>

                            <div className="answer-card">

                                <div className="answer">
                                    <ReactMarkdown>{answer}</ReactMarkdown>
                                </div>

                            </div>

                            {sources.length > 0 && (
                                <>
                                    <div className="section-title sources-title">

                                        <span className="section-icon">
                                            ⌁
                                        </span>

                                        Sources

                                    </div>

                                    <div className="sources-grid">

                                        {sources.map((source, index) => (
                                            <div
                                                className="source-card"
                                                key={index}
                                            >

                                                <div className="file-icon">
                                                    {"</>"}
                                                </div>

                                                <div className="source-info">

                                                    <span className="source-file">
                                                        {source.file}
                                                    </span>

                                                    <span className="source-label">
                                                        Retrieved context
                                                    </span>

                                                </div>

                                                <span className="source-arrow">
                                                    ↗
                                                </span>

                                            </div>
                                        ))}

                                    </div>
                                </>
                            )}

                        </section>
                    )}

                </section>

            </main>

            <footer className="footer">
                Built by Gaurav Joshi
            </footer>

        </div>
    );
}

export default App;

