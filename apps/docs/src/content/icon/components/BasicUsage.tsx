/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon } from 'react-uikit';

const BasicUsage = () => {
  return (
    <div className="uk-flex uk-flex-middle">
      <Icon name="check" className="uk-margin-small-right" />
      <a href="#">
        <Icon name="heart" />
      </a>
    </div>
  );
};

export default BasicUsage;
