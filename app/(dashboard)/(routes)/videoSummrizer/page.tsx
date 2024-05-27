"use client";
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
    Document, Page, Text, View, StyleSheet, BlobProvider
} from '@react-pdf/renderer';
import Heading from '@/components/heading';
import { Video } from 'lucide-react';

const VideoSummarizer: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editableSummary, setEditableSummary] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { toast } = useToast();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/summarize', { url: videoUrl });
            const cleanedSummary = response.data.summary.replace(/\*\*/g, '').replace(/##/g, '');
            setSummary(cleanedSummary);
            setEditableSummary(cleanedSummary);
        } catch (error) {
            console.error('Error fetching summary:', error);
        }
        setLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
        toast({
            title: "Summary copied to clipboard",
            description: "The summary has been successfully copied to the clipboard.",
            action: (
                <ToastAction altText="Close">Close</ToastAction>
            ),
        });
    };

    const handleEditToggle = () => {
        if (editMode) {
            setSummary(editableSummary);
        }
        setEditMode(!editMode);
        toast({
            title: editMode ? "Edit saved" : "Edit mode enabled",
            description: editMode ? "Your changes have been saved." : "You can now edit the summary.",
            action: (
                <ToastAction altText="Close">Close</ToastAction>
            ),
        });
    };

    const PdfDocument = ({ content }: { content: string }) => {
        const cleanContent = content.replace(/<\/?u>/g, ''); // Remove <u> tags from the content

        return (
            <Document>
                <Page style={styles.pdfPage} size="A4">
                    <View style={styles.pdfSection}>
                        {cleanContent.split('\n').map((line, index) => (
                            <Text key={index} style={line.startsWith('_') ? styles.pdfHeading : styles.pdfText}>
                                {line.replace(/^_/, '')}
                            </Text>
                        ))}
                    </View>
                </Page>
            </Document>
        );
    };

    const handleSummaryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditableSummary(e.target.value);
    };

    const formatSummary = (summaryText: string) => {
        const lines = summaryText.split('\n').filter(line => line.trim() !== "");
        const formattedLines = lines.map((line, index) => {
            if (line.startsWith('<u>')) {
                return null; // Exclude lines starting with <u>
            } else if (line.startsWith('_')) {
                return <h3 key={index} className="font-semibold mt-4 text-2xl">{line.replace(/^_/, '')}</h3>;
            } else if (line.startsWith('* Question:')) {
                return <p key={index} className="mt-2 text-lg"><strong>{line.replace('* Question:', 'Question:')}</strong></p>;
            } else if (line.startsWith('* Answer:')) {
                return <p key={index} className="text-lg"><strong>{line.replace('* Answer:', 'Answer:')}</strong></p>;
            } else if (line.startsWith('    *')) {
                return <p key={index} className="ml-6 text-lg">{line.replace('    *', '•')}</p>;
            } else if (line.startsWith('**')) {
                // Highlight important points
                return <p key={index} className="ml-4 font-bold text-red-500 text-lg">{editMode ? editableSummary : line}</p>;
            } else if (line.includes('function') || line.includes('class') || line.includes('import') || line.includes('const') || line.includes('let')) {
                // Change color for important code-related lines
                return <p key={index} className="ml-4 text-blue-700 text-lg">{editMode ? editableSummary : line}</p>;
            } else {
                return <p key={index} className="ml-4 text-lg">{editMode ? editableSummary : line}</p>;
            }
        }).filter(line => line !== null); // Remove null lines
        return <div>{formattedLines}</div>;
    };

    return (
        <div className='container mx-auto px-4'>
            <div className='flex  px-[34%] mt-2 '>
                <Heading
                    title='Video Summarizer'
                    description="Summarize your video into text."
                    icon={Video}
                    iconColor="text-blue-600"
                    bgColor="bg-red-500/10"
                />
            </div>
            <div className='flex flex-col items-center justify-center mt-2'>
                <input
                    type="text"
                    value={videoUrl}
                    onChange={handleInputChange}
                    placeholder="Enter YouTube video URL"
                    className='chatinputtext bg-white w-full lg:w-1/3 border border-shadow border-zinc-400 py-3 rounded-xl p-4 outline-none text-black text-sm mb-4'
                />
                <div className='px-1 rounded-lg'>
                    <Button
                        className={`text-white py-2 px-4 rounded-md hover:bg-blue-700 ${loading ? 'bg-blue-300' : 'bg-blue-500'}`}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0l8 8-8 8v-4a8 8 0 01-8-8z"></path>
                                </svg>
                                Loading...
                            </div>
                        ) : 'Submit'}
                    </Button>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row mt-4 items-center justify-center'>
                {transcript && (
                    <div className='px-4 lg:px-20 mt-4'>
                        <h2 className='text-3xl font-bold'>YouTube Transcript:</h2>
                        <p className='mt-4'>{transcript}</p>
                    </div>
                )}
                <div className='w-full lg:w-2/3 lg:max-h-[600px] overflow-y-auto'>
                    {summary && (
                        <div className='px-4 lg:px-1 mt-2 w-full max-w-[800px]'>
                            <h2 className='text-3xl font-bold mt-3'>Summary:</h2>
                            {editMode ? (
                                <textarea
                                    className='w-full p-3 border rounded-md'
                                    value={editableSummary}
                                    onChange={handleSummaryChange}
                                    style={{ maxHeight: '2200px', overflowY: 'auto' }}
                                />
                            ) : (
                                <div className='list-disc list-inside mt-4'>
                                    {formatSummary(summary)}
                                </div>
                            )}
                            <div className='fixed bottom-0 left-0 right-0 bg-white py-4 flex justify-center border-t'>
                                <Button
                                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mr-2'
                                    onClick={handleCopy}
                                >
                                    Copy
                                </Button>
                                <Button
                                    className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-700 mr-2'
                                    onClick={handleEditToggle}
                                >
                                    {editMode ? 'Save' : 'Edit'}
                                </Button>
                                <BlobProvider document={<PdfDocument content={summary} />}>
                                    {({ url, loading }) => (
                                        <Button
                                            className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700'
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.download = 'summary.pdf';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }}
                                        >
                                            {loading ? 'Generating PDF...' : 'Download PDF'}
                                        </Button>
                                    )}
                                </BlobProvider>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
        textDecoration: 'none',
    },
    text: {
        fontSize: 18,
        marginBottom: 4,
        textAlign: 'justify',
    },
    pdfPage: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    pdfSection: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    pdfHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
        textDecoration: 'line-through underline',
    },
    pdfText: {
        fontSize: 12, // Adjust the font size for PDF text
        marginBottom: 5,
        textAlign: 'left',
    },
});

export default VideoSummarizer;
