import Review from "./Review";

const ReviewPage = ({ reviews }) => {
  return (
    <>
      {reviews.map((review) => (
        <Review key={review.review_id} review={review} />
      ))}
    </>
  );
};

export default ReviewPage;
