import { Accordion } from '@cyishere/react-uikit';

export default function IconUsage() {
  return (
    <Accordion.Root showIcon>
      <Accordion.Item>
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Panel>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Panel>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Panel>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
