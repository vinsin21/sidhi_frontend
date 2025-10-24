import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const { user, token } = await loginUser({ email, password });
                login(user, token);
            } else {
                await registerUser({ email, password });
                // After successful registration, automatically log them in
                const { user, token } = await loginUser({ email, password });
                login(user, token);
            }
            navigate('/'); // Redirect to homepage after login/signup
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    {isLogin ? 'Welcome Back' : 'Create an Account'}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="ml-1 font-medium text-blue-600 hover:underline">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
}
