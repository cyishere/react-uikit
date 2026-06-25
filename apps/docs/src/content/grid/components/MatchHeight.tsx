import { Grid } from '@cyishere/react-uikit';

const MatchHeight = () => {
  return (
    <Grid matchHeight=".uk-card-body" className="uk-child-width-expand@s uk-text-center">
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item</div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">
          Item
          <br />…
        </div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">
          Item
          <br />…<br />…
        </div>
      </div>
    </Grid>
  );
};

export default MatchHeight;
