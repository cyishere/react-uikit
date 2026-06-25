import { Grid } from '@cyishere/react-uikit';

const GapModifier = () => {
  return (
    <div>
      <Grid className="uk-grid-small uk-child-width-expand@s uk-text-center">
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
      </Grid>

      <Grid className="uk-grid-medium uk-child-width-expand@s uk-text-center">
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
      </Grid>

      <Grid className="uk-grid-large uk-child-width-expand@s uk-text-center">
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">Item</div>
        </div>
      </Grid>

      <Grid className="uk-grid-collapse uk-child-width-expand@s uk-text-center uk-margin-large-top">
        <div>
          <div className="uk-background-muted uk-padding">Item</div>
        </div>
        <div>
          <div className="uk-background-primary uk-padding uk-light">Item</div>
        </div>
        <div>
          <div className="uk-background-secondary uk-padding uk-light">Item</div>
        </div>
      </Grid>
    </div>
  );
};

export default GapModifier;
