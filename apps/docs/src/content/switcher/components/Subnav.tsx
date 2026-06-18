import { Switcher } from 'react-uikit';

const Subnav = () => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-subnav uk-subnav-pill">
        <Switcher.Trigger>Item 1</Switcher.Trigger>
        <Switcher.Trigger>Item 2</Switcher.Trigger>
        <Switcher.Trigger>Item 3</Switcher.Trigger>
      </Switcher.List>
      <Switcher.Container className="uk-margin">
        <Switcher.Panel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Switcher.Panel>
        <Switcher.Panel>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </Switcher.Panel>
        <Switcher.Panel>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur, sed do eiusmod.
        </Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default Subnav;
