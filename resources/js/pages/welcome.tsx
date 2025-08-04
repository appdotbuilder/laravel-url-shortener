import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Copy, ExternalLink, TrendingUp, Zap, Shield, Globe } from 'lucide-react';

interface UrlShortener {
    id: number;
    original_url: string;
    short_code: string;
    clicks: number;
    created_at: string;
    short_url: string;
}

interface Props {
    recentUrls?: UrlShortener[];
    shortUrl?: UrlShortener;
    message?: string;
    errors?: {
        original_url?: string;
    };
    [key: string]: unknown;
}

export default function Welcome({ recentUrls = [], shortUrl, message, errors }: Props) {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setIsLoading(true);
        router.post('/', { original_url: url }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setIsLoading(false);
                if (!errors?.original_url) {
                    setUrl('');
                }
            }
        });
    };

    const copyToClipboard = async (shortUrl: string, shortCode: string) => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopiedCode(shortCode);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const formatUrl = (url: string) => {
        if (url.length > 50) {
            return url.substring(0, 47) + '...';
        }
        return url;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-white text-xl font-bold">ShortLink</span>
                    </div>
                    <div className="space-x-4">
                        <Link href="/stats" className="text-white hover:text-purple-200 transition-colors">
                            📊 Stats
                        </Link>
                        <Link href="/login" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                            Login
                        </Link>
                        <Link href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto px-4 pb-12">
                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        🔗 Shorten Your Links
                        <span className="block text-yellow-300">Make Them Memorable</span>
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Transform long, ugly URLs into short, beautiful links that are easy to share and remember. 
                        Track clicks and manage your links with style! ✨
                    </p>

                    {/* URL Shortener Form */}
                    <Card className="max-w-2xl mx-auto mb-8 shadow-2xl border-0">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <Input
                                            type="url"
                                            placeholder="🌐 Paste your long URL here..."
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500"
                                            disabled={isLoading}
                                        />
                                        {errors?.original_url && (
                                            <p className="text-red-500 text-sm mt-1 text-left">
                                                {errors.original_url}
                                            </p>
                                        )}
                                    </div>
                                    <Button 
                                        type="submit" 
                                        disabled={isLoading || !url.trim()}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-medium shadow-lg"
                                    >
                                        {isLoading ? '⏳ Shortening...' : '🚀 Shorten It!'}
                                    </Button>
                                </div>
                            </form>

                            {/* Success Message and Short URL */}
                            {shortUrl && (
                                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-green-600 font-medium">🎉 {message}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            readOnly
                                            value={shortUrl.short_url}
                                            className="flex-1 bg-white border-green-300"
                                        />
                                        <Button
                                            onClick={() => copyToClipboard(shortUrl.short_url, shortUrl.short_code)}
                                            variant="outline"
                                            size="sm"
                                            className="border-green-300 text-green-700 hover:bg-green-50"
                                        >
                                            {copiedCode === shortUrl.short_code ? (
                                                <>✅ Copied!</>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4 mr-1" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            onClick={() => window.open(shortUrl.short_url, '_blank')}
                                            variant="outline"
                                            size="sm"
                                            className="border-green-300 text-green-700 hover:bg-green-50"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            Test
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </section>

                {/* Features Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">
                        ✨ Why Choose ShortLink?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <CardTitle>⚡ Lightning Fast</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/90 text-center">
                                    Generate short links instantly with our optimized algorithm. No waiting, just results!
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-blue-400 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <CardTitle>📊 Smart Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/90 text-center">
                                    Track clicks and monitor performance with detailed statistics and insights.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardHeader className="text-center">
                                <div className="w-12 h-12 bg-green-400 text-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <CardTitle>🔒 Secure & Reliable</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/90 text-center">
                                    Your links are safe with us. Enterprise-grade security and 99.9% uptime guaranteed.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Recent URLs Section */}
                {recentUrls.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold text-white text-center mb-8">
                            🕒 Recently Shortened URLs
                        </h2>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {recentUrls.map((item) => (
                                <Card key={item.id} className="bg-white/10 backdrop-blur-md border-white/20">
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <Globe className="w-4 h-4 text-white/70" />
                                                <span className="text-white/70 text-sm truncate">
                                                    {formatUrl(item.original_url)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-yellow-300 font-mono">
                                                    {item.short_url}
                                                </span>
                                                <Badge variant="secondary" className="bg-purple-600 text-white">
                                                    👆 {item.clicks} clicks
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={() => copyToClipboard(item.short_url, item.short_code)}
                                                variant="outline"
                                                size="sm"
                                                className="border-white/30 text-white hover:bg-white/10"
                                            >
                                                {copiedCode === item.short_code ? (
                                                    <>✅</>
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => window.open(item.short_url, '_blank')}
                                                variant="outline"
                                                size="sm"
                                                className="border-white/30 text-white hover:bg-white/10"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-black/20 backdrop-blur-md mt-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-white font-bold">ShortLink</span>
                        </div>
                        <p className="text-white/70 text-center">
                            🚀 Making the web more beautiful, one link at a time
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}