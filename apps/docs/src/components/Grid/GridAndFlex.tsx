import { Grid } from 'react-uikit';

const GridAndFlex = () => {
  return (
    <Grid className="uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center">
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item 1</div>
      </div>
      <div className="uk-flex-last">
        <div className="uk-card uk-card-secondary uk-card-body">Item 2</div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item 3</div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item 4</div>
      </div>
      <div className="uk-flex-first">
        <div className="uk-card uk-card-primary uk-card-body">Item 5</div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item 6</div>
      </div>
    </Grid>
  );
};

export default GridAndFlex;
