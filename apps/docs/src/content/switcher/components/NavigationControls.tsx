import { Switcher } from 'react-uikit';

const NavigationControls = () => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-subnav uk-subnav-pill">
        <Switcher.Trigger>Item</Switcher.Trigger>
        <Switcher.Trigger>Item</Switcher.Trigger>
        <Switcher.Trigger>Item</Switcher.Trigger>
      </Switcher.List>
      <Switcher.Container>
        <Switcher.Panel>
          Hello!{' '}
          <Switcher.Item className="uk-text-primary" to={2}>
            Switch to item 3
          </Switcher.Item>
        </Switcher.Panel>
        <Switcher.Panel>
          Hello again!{' '}
          <Switcher.Item className="uk-text-primary" to="next">
            Next item
          </Switcher.Item>
        </Switcher.Panel>
        <Switcher.Panel>
          Bazinga!{' '}
          <Switcher.Item className="uk-text-primary" to="previous">
            Previous item
          </Switcher.Item>
        </Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default NavigationControls;
