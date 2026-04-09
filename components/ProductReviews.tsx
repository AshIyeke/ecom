"use client";

import { useState } from "react";
import { useAuth } from "@/store/AuthContext";
import { 
  useGetReviewsQuery, 
  useAddReviewMutation, 
  useUpdateReviewMutation, 
  useDeleteReviewMutation 
} from "@/store/api/reviewApi";
import { Star, MoreVertical, Trash2, Edit2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useAuth();
  const { data: reviews, isLoading } = useGetReviewsQuery(productId);
  const [addReview] = useAddReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      await addReview({ 
        product_id: productId, 
        rating, 
        comment 
      }).unwrap();
      setRating(0);
      setComment("");
    } catch (error: any) {
      alert(error.data || "Failed to add review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateReview({ 
        id, 
        product_id: productId, 
        rating: editRating, 
        comment: editComment 
      }).unwrap();
      setEditingId(null);
    } catch (error: any) {
      alert(error.data || "Failed to update review");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview({ id, product_id: productId }).unwrap();
    } catch (error: any) {
      alert(error.data || "Failed to delete review");
    }
  };

  if (isLoading) return <div className="animate-pulse space-y-4">
    <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
    <div className="h-32 bg-zinc-100 dark:bg-zinc-900 rounded-xl"></div>
  </div>;

  const userReview = reviews?.find(r => r.user_id === user?.id);
  const otherReviews = reviews?.filter(r => r.user_id !== user?.id) || [];

  return (
    <div className="space-y-12 mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Customer Reviews</h2>
          <p className="text-zinc-500 mt-1 font-medium">Share your experience with this product</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <Star className="fill-yellow-400 text-yellow-400" size={20} />
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {reviews && reviews.length > 0 
              ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
              : "0.0"}
          </span>
          <span className="text-zinc-400 text-sm font-medium">({reviews?.length || 0})</span>
        </div>
      </div>

      {!userReview && user && (
        <Card className="border-2 border-zinc-100 dark:border-zinc-800 shadow-none bg-zinc-50/50 dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>How would you rate this product?</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="transition-transform hover:scale-110"
                    onMouseEnter={() => setHoveredRating(i)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(i)}
                  >
                    <Star
                      size={32}
                      className={cn(
                        "transition-colors",
                        (hoveredRating || rating) >= i
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300 dark:text-zinc-700"
                      )}
                    />
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="What did you like or dislike? How was the quality?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[120px] bg-background/50 border-border"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || rating === 0}
                className="w-full sm:w-auto px-8"
              >
                {isSubmitting ? "Posting..." : "Post Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!user && (
        <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-4">Please log in to share your thoughts on this product.</p>
          <Button variant="outline" asChild>
            <a href="/login">Login to Review</a>
          </Button>
        </div>
      )}

      <div className="space-y-8">
        {userReview && (
          <div className="relative group">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-yellow-400 rounded-full" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                    {userReview.profiles?.full_name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                      Your Review
                      <span className="text-[10px] uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">You</span>
                    </h4>
                    <p className="text-xs text-zinc-500 font-medium">{new Date(userReview.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                {editingId !== userReview.id && (
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                      onClick={() => {
                        setEditingId(userReview.id);
                        setEditRating(userReview.rating);
                        setEditComment(userReview.comment);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-zinc-400 hover:text-red-500"
                      onClick={() => handleDelete(userReview.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                )}
              </div>

              {editingId === userReview.id ? (
                <div className="space-y-4 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button key={i} onClick={() => setEditRating(i)}>
                        <Star
                          size={20}
                          className={cn(
                            editRating >= i ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-700"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="bg-white dark:bg-zinc-950"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdate(userReview.id)}>
                      <Check size={16} className="mr-1" /> Save Changes
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                      <X size={16} className="mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={16}
                        className={cn(
                          userReview.rating >= i ? "fill-yellow-400 text-yellow-400" : "text-zinc-200 dark:text-zinc-800"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">{userReview.comment}</p>
                </div>
              )}
            </div>
            <Separator className="mt-8" />
          </div>
        )}

        {otherReviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {otherReviews.map((review) => (
              <div key={review.id} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center font-bold text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                    {review.profiles?.full_name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50">{review.profiles?.full_name || "Verified Customer"}</h4>
                    <p className="text-xs text-zinc-500 font-medium">{new Date(review.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        className={cn(
                          review.rating >= i ? "fill-yellow-400 text-yellow-400" : "text-zinc-200 dark:text-zinc-800"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{review.comment}</p>
                </div>
                {otherReviews.indexOf(review) !== otherReviews.length - 1 && <Separator className="pt-4" />}
              </div>
            ))}
          </div>
        ) : !userReview && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900 mb-4">
              <Star className="text-zinc-300 dark:text-zinc-700" size={32} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">No reviews yet</h3>
            <p className="text-zinc-500 max-w-xs mx-auto mt-2 font-medium">Be the first to share your experience with this product!</p>
          </div>
        )}
      </div>
    </div>
  );
}
