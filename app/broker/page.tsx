'use client'
import Link from 'next/link';
import { useState, FormEvent, MouseEvent } from 'react';

interface FieldConfig {
    name: string;
    placeholder: string;
    type: string;
}

interface ExchangeInfo {
    name: string;
    fields: FieldConfig[];
    endpoint: string;
}

const exchanges: ExchangeInfo[] = [
    {
        name: 'MetaTrader 4',
        fields: [
            { name: 'hostid', placeholder: 'Hostid', type: 'text' },
            { name: 'userid', placeholder: 'Userid', type: 'text' },
            { name: 'password', placeholder: 'Password', type: 'password' },
        ],
        endpoint: 'http://example.com/mt4',
    },
    {
        name: 'MetaTrader 5',
        fields: [
            { name: 'hostid', placeholder: 'Hostid', type: 'text' },
            { name: 'userid', placeholder: 'Userid', type: 'text' },
            { name: 'password', placeholder: 'Password', type: 'password' },
        ],
        endpoint: 'http://example.com/mt5',
    },
    {
        name: 'Binance',
        fields: [
            { name: 'apikey', placeholder: 'ApiKey', type: 'text' },
            { name: 'apisec', placeholder: 'ApiSec', type: 'text' },
        ],
        endpoint: 'http://example.com/binance',
    },
    {
        name: 'Bybit',
        fields: [
            { name: 'apikey', placeholder: 'ApiKey', type: 'text' },
            { name: 'apisec', placeholder: 'ApiSec', type: 'text' },
        ],
        endpoint: 'http://example.com/binance',
    },
    {
        name: 'Finvasia',
        fields: [
            { name: 'username', placeholder: 'Username', type: 'text' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'apikey', placeholder: 'ApiKey', type: 'text' },
            { name: 'totpkey', placeholder: 'TotpKey', type: 'text' },
        ],
        endpoint: 'http://example.com/finvasia',
    },
    {
        name: 'Aliceblue',
        fields: [
            { name: 'username', placeholder: 'Username', type: 'text' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'totpkey', placeholder: 'TotpKey', type: 'text' },
            { name: 'appid', placeholder: 'AppId', type: 'text' },
            { name: 'apisec', placeholder: 'ApiSec', type: 'text' },

        ],
        endpoint: 'http://example.com/binance',
    },
    {
        name: 'AngleOne',
        fields: [
            { name: 'username', placeholder: 'Username', type: 'text' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'totpkey', placeholder: 'TotpKey', type: 'text' },
            { name: 'apikey', placeholder: 'ApiKey', type: 'text' },

        ],
        endpoint: 'http://example.com/binance',
    },
];

export default function Broker() {
    const [formState, setFormState] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const toggleForm = (exchangeName: string) => {
        setFormState(prev => ({
            ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
            [exchangeName]: !prev[exchangeName],
        }));
        setMessage('');
    };

    const handleFormSubmit = async (exchange: ExchangeInfo, event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
    
        const formData = new FormData(event.currentTarget);
        const userData = exchange.fields.reduce((acc: Record<string, FormDataEntryValue>, field) => {
            // Provide a default value if formData.get returns null
            const value = formData.get(field.name) || "";
            return {
                ...acc,
                [field.name]: value,
            };
        }, {});
    
        try {
            const response = await fetch(exchange.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            setMessage(response.ok ? data.message : data.detail || 'Please check your details and try again.');
        } catch (error) {
            setMessage('Error connecting to server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
            <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-5">
                <h1 className="text-3xl font-bold">TradingViewAlert</h1>
                <nav>
                    <Link href="/setup" className="mr-4 text-lg font-semibold bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition ease-in-out duration-150">Setup</Link>
                </nav>
            </header>

            {exchanges.map(exchange => (
                <ExchangeForm
                    key={exchange.name}
                    exchange={exchange}
                    showForm={formState[exchange.name] || false}
                    loading={loading}
                    message={message}
                    toggleForm={() => toggleForm(exchange.name)}
                    handleFormSubmit={(e) => handleFormSubmit(exchange, e)}
                />
            ))}
        </main>
    );
}

interface ExchangeFormProps {
    exchange: ExchangeInfo;
    showForm: boolean;
    loading: boolean;
    message: string;
    toggleForm: () => void;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function ExchangeForm({ exchange, showForm, loading, message, toggleForm, handleFormSubmit }: ExchangeFormProps) {
    return (
        <div className="mt-16 p-3 w-full max-w-lg bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">{exchange.name}</h2>
            <button onClick={toggleForm} className="mb-4 w-full bg-cyan-800 hover:bg-cyan-700 text-white py-2 px-4 rounded transition duration-150">Connect</button>
            {showForm && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {exchange.fields.map(field => (
                        <input key={field.name} type={field.type} name={field.name} placeholder={field.placeholder} required className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    ))}
                    {loading ? (
                        <div className="bg-gray-800 py-2 px-4 rounded text-center">Loading...</div>
                    ) : (
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-150">Submit</button>
                    )}
                </form>
            )}
            {message && <div className="mt-4 p-2 text-center text-sm bg-gray-800 rounded">{message}</div>}
        </div>
    );
}
