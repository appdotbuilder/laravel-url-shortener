import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Globe, MousePointer, LinkIcon, Calendar } from 'lucide-react';

interface UrlShortener {
    id: number;
    original_url: string;
    short_code: string;
    clicks: number;
    created_at: string;
    short_url: string;
}

interface PaginationData {
    data: UrlShortener[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    urls: PaginationData;
    totalUrls: number;
    totalClicks: number;
    [key: string]: unknown;
}

export default function Stats({ urls, totalUrls, totalClicks }: Props) {
    const formatUrl = (url: string) => {
        if (url.length > 60) {
            return url.substring(0, 57) + '...';
        }
        return url;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Shortener</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <LinkIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-white text-xl font-bold">ShortLink Stats</span>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto px-4 pb-12">
                {/* Hero Section */}
                <section className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        📊 Link Analytics
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Track performance and discover insights about your shortened URLs
                    </p>
                </section>

                {/* Stats Overview */}
                <section className="mb-12">
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardHeader className="text-center pb-2">
                                <div className="w-12 h-12 bg-green-400 text-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <LinkIcon className="w-6 h-6" />
                                </div>
                                <CardDescription className="text-white/70">Total Links</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center pt-0">
                                <CardTitle className="text-3xl font-bold text-green-300">
                                    {totalUrls.toLocaleString()}
                                </CardTitle>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardHeader className="text-center pb-2">
                                <div className="w-12 h-12 bg-blue-400 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <MousePointer className="w-6 h-6" />
                                </div>
                                <CardDescription className="text-white/70">Total Clicks</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center pt-0">
                                <CardTitle className="text-3xl font-bold text-blue-300">
                                    {totalClicks.toLocaleString()}
                                </CardTitle>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardHeader className="text-center pb-2">
                                <div className="w-12 h-12 bg-purple-400 text-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <CardDescription className="text-white/70">Avg Clicks/Link</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center pt-0">
                                <CardTitle className="text-3xl font-bold text-purple-300">
                                    {totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0}
                                </CardTitle>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Links Table */}
                <section>
                    <Card className="bg-white/10 backdrop-blur-md border-white/20">
                        <CardHeader>
                            <CardTitle className="text-white text-2xl">
                                🔥 Top Performing Links
                            </CardTitle>
                            <CardDescription className="text-white/70">
                                Links sorted by click count (most popular first)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {urls.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <LinkIcon className="w-8 h-8 text-white/50" />
                                    </div>
                                    <h3 className="text-white text-xl font-semibold mb-2">No links yet</h3>
                                    <p className="text-white/70 mb-6">Start shortening URLs to see analytics here!</p>
                                    <Link href="/">
                                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                            Create Your First Link
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {urls.data.map((url, index) => (
                                        <Card key={url.id} className="bg-white/5 border-white/10">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <Badge 
                                                                variant="secondary" 
                                                                className={`
                                                                    ${index === 0 ? 'bg-yellow-500 text-yellow-900' : ''}
                                                                    ${index === 1 ? 'bg-gray-400 text-gray-900' : ''}
                                                                    ${index === 2 ? 'bg-orange-500 text-orange-900' : ''}
                                                                    ${index > 2 ? 'bg-purple-600 text-white' : ''}
                                                                `}
                                                            >
                                                                {index === 0 && '🥇'}
                                                                {index === 1 && '🥈'}
                                                                {index === 2 && '🥉'}
                                                                {index > 2 && `#${index + 1}`}
                                                            </Badge>
                                                            <Badge variant="outline" className="border-green-300 text-green-300">
                                                                👆 {url.clicks.toLocaleString()} clicks
                                                            </Badge>
                                                        </div>
                                                        
                                                        <div className="space-y-2">
                                                            <div className="flex items-center space-x-2">
                                                                <Globe className="w-4 h-4 text-white/50 flex-shrink-0" />
                                                                <span className="text-white/70 text-sm break-all">
                                                                    {formatUrl(url.original_url)}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex items-center space-x-2">
                                                                <LinkIcon className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                                                                <span className="text-yellow-300 font-mono text-sm">
                                                                    {url.short_url}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex items-center space-x-2">
                                                                <Calendar className="w-4 h-4 text-white/50 flex-shrink-0" />
                                                                <span className="text-white/50 text-xs">
                                                                    Created {formatDate(url.created_at)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex space-x-2 ml-4">
                                                        <Button
                                                            onClick={() => window.open(url.short_url, '_blank')}
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-white/30 text-white hover:bg-white/10"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {urls.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-4 mt-8">
                                    <span className="text-white/70 text-sm">
                                        Page {urls.current_page} of {urls.last_page}
                                    </span>
                                    <div className="flex space-x-2">
                                        {urls.current_page > 1 && (
                                            <Link
                                                href={`/stats?page=${urls.current_page - 1}`}
                                                className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {urls.current_page < urls.last_page && (
                                            <Link
                                                href={`/stats?page=${urls.current_page + 1}`}
                                                className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-black/20 backdrop-blur-md mt-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                <LinkIcon className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-white font-bold">ShortLink</span>
                        </div>
                        <p className="text-white/70 text-center">
                            📈 Powering your link analytics since today
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}