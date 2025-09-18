import React, { useState } from 'react';
import { ThumbsUp, Heart, Lightbulb, MessageSquare, Send } from 'lucide-react';

// --- Time Formatting Helper ---
const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
};


// --- Mock Data ---
// In a real app, this would come from your API.
// Note: Timestamps are now ISO strings for proper sorting.
const initialComments = [
    {
        id: 1,
        author: {
            name: 'Anika Tabassum',
            avatar: 'https://placehold.co/40x40/E6E6FA/333?text=AT',
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        text: "Dr. Ahmed was incredibly patient and thorough during my consultation. He took the time to answer all of my questions and explained everything clearly. I felt very comfortable and well-cared for. Highly recommended!",
        reactions: {
            like: 18,
            love: 25,
            insightful: 12,
        },
        replies: [
            {
                id: 101,
                author: {
                    name: 'Dr. Ibrahim Ahmed',
                    avatar: 'https://placehold.co/40x40/D1E8E2/333?text=DA',
                    isDoctor: true,
                },
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
                text: "Thank you for your kind words, Anika. I'm glad to hear you had a positive experience. Wishing you all the best.",
                reactions: {
                    like: 15,
                    love: 10,
                    insightful: 5,
                },
                replies: [],
            },
        ],
    },
    {
        id: 2,
        author: {
            name: 'Rahim Sheikh',
            avatar: 'https://placehold.co/40x40/F0E68C/333?text=RS',
        },
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        text: "I had a follow-up appointment and the wait time was a bit long, but the consultation itself was very helpful. Dr. Ahmed is very knowledgeable.",
        reactions: {
            like: 7,
            love: 2,
            insightful: 9,
        },
        replies: [],
    },
];

// --- Helper Components ---

const ReactionButton = ({ icon: Icon, count, onClick, userReacted }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-1.5 text-gray-500 hover:text-blue-600 transition-colors duration-200 ${userReacted ? 'text-blue-600 font-semibold' : ''}`}
    >
        <Icon size={18} className={`transition-transform duration-200 ${userReacted ? 'scale-110' : ''}`} />
        <span className="text-sm">{count}</span>
    </button>
);

const Comment = ({ comment, onReply, onReact }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [userReactions, setUserReactions] = useState({});

    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (replyText.trim()) {
            onReply(comment.id, replyText);
            setReplyText('');
            setShowReplyForm(false);
        }
    };
    
    const handleReactionClick = (reactionType) => {
        onReact(comment.id, reactionType);
        setUserReactions(prev => ({...prev, [reactionType]: !prev[reactionType]}));
    };

    return (
        <div className="flex space-x-4">
            <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full flex-shrink-0 mt-1" />
            <div className="flex-1">
                <div className="bg-gray-100 rounded-xl p-4">
                    <div className="flex items-baseline space-x-2">
                        <p className="font-semibold text-gray-800">{comment.author.name}</p>
                        {comment.author.isDoctor && (
                            <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full">Doctor</span>
                        )}
                        <p className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</p>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.text}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 pl-2">
                    <ReactionButton icon={ThumbsUp} count={comment.reactions.like} onClick={() => handleReactionClick('like')} userReacted={userReactions.like} />
                    <ReactionButton icon={Heart} count={comment.reactions.love} onClick={() => handleReactionClick('love')} userReacted={userReactions.love} />
                    <ReactionButton icon={Lightbulb} count={comment.reactions.insightful} onClick={() => handleReactionClick('insightful')} userReacted={userReactions.insightful} />
                    <button onClick={() => setShowReplyForm(!showReplyForm)} className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        <MessageSquare size={18} />
                        <span className="text-sm font-semibold">Reply</span>
                    </button>
                </div>

                {showReplyForm && (
                    <form onSubmit={handleReplySubmit} className="mt-3 flex space-x-3">
                         <img src="https://placehold.co/40x40/C2DFFF/333?text=ME" alt="Your avatar" className="w-9 h-9 rounded-full" />
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Reply to ${comment.author.name}...`}
                                className="w-full bg-gray-100 border-transparent rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                                <Send size={20} />
                            </button>
                        </div>
                    </form>
                )}

                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                        {comment.replies.map(reply => (
                            <Comment key={reply.id} comment={reply} onReply={onReply} onReact={(replyId, reactionType) => onReact(replyId, reactionType, comment.id)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- Main Component ---
export default function App() {
    const [comments, setComments] = useState(initialComments);
    const [newCommentText, setNewCommentText] = useState('');
    const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'oldest'

    const handlePostComment = (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        const newComment = {
            id: Date.now(),
            author: {
                name: 'Kamal Hossain', // This would be the logged-in user
                avatar: 'https://placehold.co/40x40/C2DFFF/333?text=KH',
            },
            timestamp: new Date().toISOString(), // Use ISO string for new comments
            text: newCommentText,
            reactions: { like: 0, love: 0, insightful: 0 },
            replies: [],
        };

        setComments([newComment, ...comments]);
        setNewCommentText('');
    };

    const handleReply = (parentId, text) => {
        const newReply = {
            id: Date.now(),
            author: {
                name: 'Kamal Hossain', // Logged-in user
                avatar: 'https://placehold.co/40x40/C2DFFF/333?text=KH',
            },
            timestamp: new Date().toISOString(), // Use ISO string for new replies
            text: text,
            reactions: { like: 0, love: 0, insightful: 0 },
            replies: [],
        };

        const addReplyToComment = (commentsArray) => {
            return commentsArray.map(comment => {
                if (comment.id === parentId) {
                    return { ...comment, replies: [newReply, ...comment.replies] };
                }
                if (comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: addReplyToComment(comment.replies) };
                }
                return comment;
            });
        };

        setComments(addReplyToComment(comments));
    };
    
    const handleReact = (commentId, reactionType) => {
        const updateReactions = (commentsArray) => {
            return commentsArray.map(comment => {
                if (comment.id === commentId) {
                    const currentCount = comment.reactions[reactionType];
                    return {
                        ...comment,
                        reactions: { ...comment.reactions, [reactionType]: currentCount + 1 }
                    };
                }
                if (comment.replies && comment.replies.length > 0) {
                    return { ...comment, replies: updateReactions(comment.replies) };
                }
                return comment;
            });
        };
        setComments(updateReactions(comments));
    };

    // Sort comments based on the sortBy state
    const sortedComments = [...comments].sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        if (sortBy === 'newest') {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Patient Feedback & Reviews</h2>
                <p className="text-gray-600 mb-6">Share your experience or read what others are saying.</p>
                
                {/* Post a new comment form */}
                <div className="mb-8">
                    <div className="flex items-start space-x-4">
                        <img src="https://placehold.co/48x48/C2DFFF/333?text=KH" alt="Your avatar" className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                             <form onSubmit={handlePostComment} className="relative">
                                <textarea
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    className="w-full p-4 pr-12 text-gray-700 bg-gray-100 rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                    rows="3"
                                    placeholder="Write a review about your experience with the doctor..."
                                ></textarea>
                                <button type="submit" className="absolute right-3 top-3 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={!newCommentText.trim()}>
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Filter/Sort controls */}
                <div className="flex justify-between items-center mb-6">
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-start">
                            <span className="bg-white pr-3 text-lg font-medium text-gray-700">All Reviews ({comments.length})</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-600 mr-3">Sort by:</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setSortBy('newest')}
                                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${sortBy === 'newest' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                Newest
                            </button>
                            <button
                                onClick={() => setSortBy('oldest')}
                                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${sortBy === 'oldest' ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                Oldest
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-8">
                    {sortedComments.map(comment => (
                        <Comment key={comment.id} comment={comment} onReply={handleReply} onReact={handleReact} />
                    ))}
                </div>
            </div>
        </div>
    );
}
