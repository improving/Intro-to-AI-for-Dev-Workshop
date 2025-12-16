import { useState, useEffect } from 'react';
import { Sparkles, Code2, Rocket } from 'lucide-react';

function App() {
  const [apiMessage, setApiMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchApiMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/hello');
      const data = await response.json();
      setApiMessage(data.message);
    } catch (err) {
      console.error('Failed to fetch from API:', err);
      setApiMessage('Unable to connect to API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-20 h-20 text-indigo-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">Agentic Workshop Starter</h1>
          <p className="text-2xl text-gray-600 mb-8">A modern full-stack application template</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Welcome to Your Workshop!
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Code2 className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Tech Stack</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Express.js backend</li>
                  <li>• Vite for fast development</li>
                </ul>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Rocket className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Ready to Build</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• ESLint & Prettier configured</li>
                  <li>• Jest testing setup</li>
                  <li>• Hot module replacement</li>
                  <li>• Clean project structure</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-semibold mb-3">API Connection Status</h3>
              {loading ? (
                <p className="text-lg">Connecting to backend...</p>
              ) : (
                <p className="text-lg font-medium">{apiMessage || 'Waiting for API response...'}</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                This is a clean baseline application ready for you to build upon during the
                workshop.
              </p>
              <p>
                The frontend and backend are connected and ready to go. Start adding your features!
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="font-mono text-sm">
                  <strong>Frontend:</strong> http://localhost:5173
                  <br />
                  <strong>Backend:</strong> http://localhost:3001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
