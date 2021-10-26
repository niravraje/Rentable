// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";

// export default function ActionAreaCard() {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image="/static/images/cards/contemplative-reptile.jpg"
//           alt="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

import { FaTasks } from "react-icons/fa";

const Card = ({ card, cardOnClick }) => {
  return (
    <div
      className="card"
      style={{ cursor: "pointer" }}
      onClick={() => cardOnClick(card.id)}
    >
      <img className="image" src={card.image} />
      <h2 className="title"> {card.title} </h2>
      <p className="description">
        ${card.price} <br />
        {card.rating} stars <br />
        {card.location}
      </p>
    </div>
  );
};

export default Card;
