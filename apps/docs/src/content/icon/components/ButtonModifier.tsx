/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon } from '@cyishere/react-uikit';

const ButtonModifier = () => {
  return (
    <div className="uk-flex uk-flex-middle">
      <a href="#" className="uk-icon-button uk-margin-small-right">
        <Icon name="instagram" />
      </a>
      <a href="#" className="uk-icon-button uk-margin-small-right">
        <Icon name="facebook" />
      </a>
      <a href="#" className="uk-icon-button uk-margin-small-right">
        <Icon name="youtube" />
      </a>
    </div>
  );
};

export default ButtonModifier;
