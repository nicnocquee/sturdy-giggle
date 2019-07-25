import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import ProTip from "../src/components/ProTip";
import Link from "../src/components/Link";
import TextField from "@material-ui/core/TextField";
import { setFood } from "../src/reducers/food";
import { connect } from "react-redux";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Material-UI
      </MuiLink>
      {" team."}
    </Typography>
  );
}

export function About({ food, dispatch }) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h1" component="h1" gutterBottom>
          About {food}
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v4-beta example
        </Typography>
        <Link href="/">Go to the main page</Link>
        <Link href="/logout">Logout </Link>
        <ProTip />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="food"
          label="Food"
          name="food"
          autoFocus
          value={food}
          onChange={e => dispatch(setFood(e.target.value))}
        />
        <MadeWithLove />
      </Box>
    </Container>
  );
}

About.getInitialProps = async ({ req, reduxStore }) => {
  if (req) {
    reduxStore.dispatch(setFood("Burger"));
  }
};

const stateProps = state => ({
  food: state.food
});

export default connect(stateProps)(About);
