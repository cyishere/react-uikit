import { Grid } from '@cyishere/react-uikit';

const GridWithWidth = () => {
  return (
    <Grid className="uk-text-center">
      <div className="uk-width-auto@m">
        <div className="uk-card uk-card-default uk-card-body">Auto</div>
      </div>
      <div className="uk-width-1-3@m">
        <div className="uk-card uk-card-default uk-card-body">1-3</div>
      </div>
      <div className="uk-width-expand@m">
        <div className="uk-card uk-card-default uk-card-body">Expand</div>
      </div>
    </Grid>
  );
};

export default GridWithWidth;
