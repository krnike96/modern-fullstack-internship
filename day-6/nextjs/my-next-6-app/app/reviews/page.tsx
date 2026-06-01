import { addReview, getReviews, getAverageRatings } from "../actions/reviewDatabaseOperations";
import { styles } from "../styles/styleReviews";
async function ReviewPage() {
    const reviews = await getReviews();
    const averageRating = await getAverageRatings();

    return (
        <div style={styles.container}>
            <form action={addReview} style={styles.form}>
                <h1 style={styles.heading}>User Reviews & Ratings</h1>

                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>Username: </label>
                    <input type="text" name="username" placeholder="Username" required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email: </label>
                    <input type="email" name="email" placeholder="Email" required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="review" style={styles.label}>Review: </label>
                    <textarea name="review" placeholder="Review" required style={styles.textarea} />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="rating" style={styles.label}>Rating (1-10): </label>
                    <input type="number" name="rating" min="1" max="10" placeholder="Rating" required style={styles.input} />
                </div>

                <button type="submit" style={styles.button}>
                    Submit Review
                </button>
            </form>

            <hr style={styles.hr} />

            <h2 style={styles.subHeading}>Average Ratings: {Number(averageRating).toFixed(2)}</h2>
            <h2 style={styles.subHeading}>Reviews: </h2>

            <div style={styles.reviewList}>
                {reviews.map((review, index) => (
                    <div key={index} style={styles.reviewCard}>
                        <p style={styles.reviewMeta}><strong>Username:</strong> {review.username}</p>
                        <p style={styles.reviewMeta}><strong>Email:</strong> {review.email}</p>
                        <p style={styles.reviewText}><strong>Feedback:</strong> {review.review}</p>
                        <p style={styles.reviewRating}><strong>Rating:</strong> ⭐ {Number(review.rating).toFixed(1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewPage;
