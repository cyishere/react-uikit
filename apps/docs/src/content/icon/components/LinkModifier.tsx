/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon } from '@cyishere/react-uikit';

const LinkModifier = () => {
  return (
    <div className="uk-flex uk-flex-middle">
      <a href="#" className="uk-icon-link uk-margin-small-right">
        <Icon name="copy" />
      </a>
      <a href="#" className="uk-icon-link uk-margin-small-right">
        <Icon name="file-edit" />
      </a>
      <a href="#" className="uk-icon-link uk-margin-small-right">
        <Icon name="trash" />
      </a>
    </div>
  );
};

export default LinkModifier;
