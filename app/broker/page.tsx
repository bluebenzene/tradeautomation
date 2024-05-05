'use client'
import Link from 'next/link';
import { useState, FormEvent, MouseEvent } from 'react';
import Image from 'next/image';
interface metatrader {
    hostid: string;
    userid: string;
    password: string;

}

export default function Broker() {
    const [showFormMT4, setShowFormMT4] = useState<boolean>(false);
    const [showFormMT5, setShowFormMT5] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const toggleFormMT4 = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowFormMT4(!showFormMT4);
        setShowFormMT5(false);
        setMessage(''); // Clear previous messages when reopening the form
    };
    const toggleFormMT5 = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowFormMT5(!showFormMT5);
        setShowFormMT4(false); // Ensure MT4 form is hidden
        setMessage('');
    };


    const handleFormSubmitMT4 = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const userData: metatrader = {
            hostid: formData.get('hostid') as string,
            userid: formData.get('userid') as string,
            password: formData.get('password') as string,
        };

        try {
            const response = await fetch('http://google.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message); // Display success message
            } else {
                const data = await response.json();
                setMessage(data.detail || 'Please check your details and try again.'); // Display error message based on server response
            }
        } catch (error: any) {
            setMessage('Error connecting to server. Please try again later.');
        } finally {
            setLoading(false); // End loading
        }
    };
    const handleFormSubmitMT5 = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const userData: metatrader = {
            hostid: formData.get('hostid') as string,
            userid: formData.get('userid') as string,
            password: formData.get('password') as string,
        };

        try {
            const response = await fetch('http://google.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message); // Display success message
            } else {
                const data = await response.json();
                setMessage(data.detail || 'Please check your details and try again.'); // Display error message based on server response
            }
        } catch (error: any) {
            setMessage('Error connecting to server. Please try again later.');
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
            <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-5">
                <h1 className="text-3xl font-bold">TradingViewAlert</h1>
                <nav>
                    <Link href="/setup" className="mr-4 text-lg font-semibold bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition ease-in-out duration-150">Get ApiKey</Link>
                </nav>
            </header>

            <div className="mt-16 p-3 w-full max-w-lg bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg border border-gray-700">
            {/* <Image
                    src="/shoonya.png"
                    alt="Finvasia Broker Logo"
                    width={800}
                    height={400}
                    priority
                /> */}
                <h2 className="text-2xl font-semibold mb-2">MetaTrader 4</h2>
                <p className="text-sm mb-4"> </p>
                <button onClick={toggleFormMT4} className="mb-4 w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2 px-4 rounded transition duration-150">Connect</button>
                {showFormMT4 && (
                    <form onSubmit={handleFormSubmitMT4} className="space-y-4">
                        <input type="text" name="hostid" placeholder="Hostid" required className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        <input type="text" name="userid" placeholder="Userid" required className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        <input type="password" name="password" placeholder="Password" required className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        {loading ? (
                            <div className="bg-gray-800 py-2 px-4 rounded text-center">Loading...</div>
                        ) : (
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-150">Submit</button>
                        )}
                    </form>
                )}
                {message && <div className="mt-4 p-2 text-center text-sm bg-gray-800 rounded">{message}</div>}
            </div>

            <div className="mt-16 p-3 w-full max-w-lg bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg border border-gray-700">
            {/* <Image
                    src="/shoonya.png"
                    alt="Finvasia Broker Logo"
                    width={800}
                    height={400}
                    priority
                /> */}
                <h2 className="text-2xl font-semibold mb-2">MetaTrader 5</h2>
                <p className="text-sm mb-4"></p>
                <button onClick={toggleFormMT5} className="mb-4 w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2 px-4 rounded transition duration-150">Connect</button>
                {showFormMT5 && (
                    <form onSubmit={handleFormSubmitMT5} className="space-y-4">
                        <input type="text" name="hostid" placeholder="Hostid" required className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        <input type="text" name="userid" placeholder="Userid" required className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        <input type="password" name="password" placeholder="Password" required className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        {loading ? (
                            <div className="bg-gray-800 py-2 px-4 rounded text-center">Loading...</div>
                        ) : (
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-150">Submit</button>
                        )}
                    </form>
                )}
                {message && <div className="mt-4 p-2 text-center text-sm bg-gray-800 rounded">{message}</div>}
            </div>
        </main>
    );
}
