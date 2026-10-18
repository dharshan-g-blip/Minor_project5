import React, { useState } from 'react';
import RatingStars from '../common/RatingStars';
import { UserCheck, MessageSquare } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/slices/toastSlice';

export default function ReviewList({ reviews = [], averageRating = 4.8 }) {
  const dispatch = useDispatch();
  const [reviewList, setReviewList] = useState(reviews);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview = {
      id: Date.now(),
      user: userName.trim() || 'Verified Customer',
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    setReviewList([newReview, ...reviewList]);
    setComment('');
    setUserName('');
    setShowForm(false);
    dispatch(showToast({ message: 'Thank you for your feedback! Review submitted.', type: 'success' }));
  };

  return (
    <div className="space-y-8">
      {/* Header and Average */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-black text-gray-950 dark:text-white">
            {averageRating}
          </div>
          <div>
            <RatingStars rating={averageRating} size={18} showScore={false} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Based on {reviewList.length} verified buyer reviews
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{showForm ? 'Cancel Review' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Write a Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmitReview}
          className="p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-4"
        >
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">
            Share Your Experience
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jordan Hayes"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value={5}>5 Stars - Excellent</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Below Average</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Your Review
            </label>
            <textarea
              required
              rows={3}
              placeholder="What did you like or dislike about this product?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      )}

      {/* Review Cards */}
      <div className="space-y-4">
        {reviewList.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center uppercase">
                  {rev.user.charAt(0)}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <span>{rev.user}</span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <UserCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </h5>
                  <p className="text-[10px] text-gray-400">{rev.date}</p>
                </div>
              </div>
              <RatingStars rating={rev.rating} size={14} showScore={false} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
