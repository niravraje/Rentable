import { Rating } from "@mui/material";
import { Grid, Paper } from "@material-ui/core";

const Review = ({ review }) => {
  return (
    <div>
      <Paper
        style={{
          padding: "10px 5px",
          marginTop: 10,
          background: "rgb(240, 248, 255)",
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h5 style={{ margin: 0, textAlign: "left", marginLeft: "5px" }}>
              {" "}
              {review.renter_username}{" "}
            </h5>
            <p style={{ textAlign: "left", marginLeft: "7px" }}>
              {" "}
              {review.review_description}{" "}
            </p>
            <Rating
              name="rating"
              value={review.rating_value}
              precision={0.5}
              readOnly
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Review;
