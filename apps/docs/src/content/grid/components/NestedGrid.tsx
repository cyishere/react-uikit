import { Grid } from '@cyishere/react-uikit';

const NestedGrid = () => {
  return (
    <Grid className="uk-child-width-1-2 uk-text-center">
      <div>
        <div className="uk-card uk-card-default uk-card-body">Item</div>
      </div>
      <div>
        <Grid className="uk-child-width-1-2 uk-text-center">
          <div>
            <div className="uk-card uk-card-primary uk-card-body">Item</div>
          </div>
          <div>
            <div className="uk-card uk-card-primary uk-card-body">Item</div>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default NestedGrid;
