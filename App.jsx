import React, { useState } from 'react';
import { ClipboardPaste, Check, Copy } from 'lucide-react';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = (text) => {
    const digits = text.replace(/\D/g, '');
    setOutput(digits);
    navigator.clipboard.writeText(digits);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      handleConvert(text);
    } catch (err) {
      alert('Clipboard থেকে টেক্সট নিতে পারিনি 😥');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2 tracking-tight">
          🔢 Number Extractor Tool
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Paste যেকোনো লেখা → আমরা শুধু সংখ্যাগুলো বের করবো ➕ অটো কপি করে দিবো 😊
        </p>

        <button
          onClick={handlePaste}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl text-lg transition"
        >
          <ClipboardPaste size={20} /> Paste + Auto Extract & Copy
        </button>

        <textarea
          rows={5}
          className="w-full p-4 border border-blue-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base resize-none"
          placeholder="এখানে নিজে লিখো বা কিছু পেস্ট করো..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {output && (
          <div className="bg-gray-50 border border-dashed border-blue-300 rounded-xl p-4 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">শুধু সংখ্যা:</h2>
              {copied ? (
                <span className="flex items-center text-green-600 text-sm font-medium gap-1">
                  <Check size={16} /> কপি হয়েছে
                </span>
              ) : (
                <span className="flex items-center text-gray-400 text-sm font-medium gap-1">
                  <Copy size={16} /> কপি হয়নি
                </span>
              )}
            </div>
            <p className="text-gray-800 text-lg font-mono break-all">{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}
