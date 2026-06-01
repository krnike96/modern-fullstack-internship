import { addReview, getReviews, getAverageRatings } from "../actions/reviewDatabaseOperations";

async function ReviewPage() {
    const reviews = await getReviews();
    const averageRating = await getAverageRatings();
    return (
        <div >
            <form action={addReview} >
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" placeholder="Username" required />
                <br />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" placeholder="Email" required />
                <br />
                <label htmlFor="review">Review: </label>
                <textarea name="review" placeholder="Review" required />
                <br />
                <label htmlFor="rating">Rating: </label>
                <input type="number" name="rating" placeholder="Rating" required />
                <br />
                <button type="submit" >
                    Submit Review
                </button>
            </form>

            <hr />

            <h2>Average Ratings: {Number(averageRating).toFixed(2)}</h2>
            <h2>Reviews: </h2>
            {
                reviews.map((review, index) => (
                    <div key={index} >
                        <h3>username: {review.username}</h3>
                        <h3>Email: {review.email}</h3>
                        <h3>Feedback: {review.review}</h3>
                        <h3>Ratings: {Number(review.rating).toFixed(2)}</h3>
                    </div>
                ))
            }
        </div>
    );
}

export default ReviewPage;
