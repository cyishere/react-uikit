import type { FC, ReactNode } from 'react';

import { Accordion } from 'react-uikit';

import DemoPreviewCode from '../DemoPreviewCode';

interface NoCollapsingUsageProps {
  children: ReactNode;
}

const NoCollapsingUsage: FC<NoCollapsingUsageProps> = ({ children }) => {
  return (
    <DemoPreviewCode
      preview={
        <Accordion.Root defaultOpen={[0]} collapsible={false}>
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
      }
    >
      {children}
    </DemoPreviewCode>
  );
};

export default NoCollapsingUsage;
