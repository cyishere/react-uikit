/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid, Icon } from 'react-uikit';

const OverlayModifier = () => {
  return (
    <Grid className="uk-child-width-1-2@m">
      <div>
        <a href="#" className="uk-inline uk-dark">
          <img src="/images/light.jpg" width={1800} height={1200} alt="" />
          <div className="uk-position-center">
            <div className="uk-icon-overlay">
              <Icon name="play-circle" ratio={3} />
            </div>
          </div>
        </a>
      </div>

      <div>
        <a href="#" className="uk-inline uk-light">
          <img src="/images/dark.jpg" width={1800} height={1200} alt="" />
          <div className="uk-position-center">
            <div className="uk-icon-overlay">
              <Icon name="youtube" ratio={3} />
            </div>
          </div>
        </a>
      </div>
    </Grid>
  );
};

export default OverlayModifier;
