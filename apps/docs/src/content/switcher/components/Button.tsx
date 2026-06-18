import { Switcher } from 'react-uikit';

const Button = () => {
  return (
    <Switcher.Root animation="uk-animation-fade">
      <Switcher.List className="uk-list uk-flex">
        <Switcher.Trigger className="uk-button uk-button-default">Item 1</Switcher.Trigger>
        <Switcher.Trigger className="uk-button uk-button-default">Item 2</Switcher.Trigger>
        <Switcher.Trigger className="uk-button uk-button-default">Item 3</Switcher.Trigger>
      </Switcher.List>
      <Switcher.Container className="uk-margin">
        <Switcher.Panel>Hello from Fade panel 1</Switcher.Panel>
        <Switcher.Panel>Hello from Fade panel 2</Switcher.Panel>
        <Switcher.Panel>Hello from Fade panel 3</Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default Button;
