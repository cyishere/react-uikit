import { Switcher } from 'react-uikit';

const BasicUsage = () => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-subnav uk-subnav-pill">
        <Switcher.Trigger>Item 1</Switcher.Trigger>
        <Switcher.Trigger>Item 2</Switcher.Trigger>
        <Switcher.Trigger>Item 3</Switcher.Trigger>
      </Switcher.List>
      <Switcher.Container>
        <Switcher.Panel>Hello from panel 1</Switcher.Panel>
        <Switcher.Panel>Hello from panel 2</Switcher.Panel>
        <Switcher.Panel>Hello from panel 3</Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default BasicUsage;
