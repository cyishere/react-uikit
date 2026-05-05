import { Switcher } from 'react-uikit';

const SwitcherDemo = () => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-tab">
        <Switcher.Trigger>Overview</Switcher.Trigger>
        <Switcher.Trigger>API</Switcher.Trigger>
        <Switcher.Trigger disabled>Disabled</Switcher.Trigger>
      </Switcher.List>

      <Switcher.Container className="uk-margin">
        <Switcher.Panel>
          <p>Switcher controls active content panels using React state and UIkit classes.</p>
        </Switcher.Panel>
        <Switcher.Panel>
          <p>Use the compound API: Root, List, Trigger, Container, and Panel.</p>
        </Switcher.Panel>
        <Switcher.Panel>
          <p>This disabled tab is not selectable from keyboard or click interactions.</p>
        </Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default SwitcherDemo;
