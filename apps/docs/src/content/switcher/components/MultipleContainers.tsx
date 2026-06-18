import { Switcher } from 'react-uikit';

const MultipleContainers = () => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-subnav uk-subnav-pill">
        <Switcher.Trigger>Item 1</Switcher.Trigger>
        <Switcher.Trigger>Item 2</Switcher.Trigger>
        <Switcher.Trigger>Item 3</Switcher.Trigger>
      </Switcher.List>

      <h4>Container 1</h4>

      <Switcher.Container className="uk-margin">
        <Switcher.Panel>Hello from panel 1</Switcher.Panel>
        <Switcher.Panel>Hello from panel 2</Switcher.Panel>
        <Switcher.Panel>Hello from panel 3</Switcher.Panel>
      </Switcher.Container>

      <h4>Container 2</h4>

      <Switcher.Container className="uk-margin">
        <Switcher.Panel>Panel 1 Container 2</Switcher.Panel>
        <Switcher.Panel>Panel 2 Container 2</Switcher.Panel>
        <Switcher.Panel>Panel 3 Container 2</Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default MultipleContainers;
