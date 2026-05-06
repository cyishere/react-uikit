import type { FC, ReactNode } from 'react';

import { Alert, Switcher } from 'react-uikit';

interface BasicUsageProps {
  children: ReactNode;
}

const BasicUsage: FC<BasicUsageProps> = ({ children }) => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-tab">
        <Switcher.Trigger>Preview</Switcher.Trigger>
        <Switcher.Trigger>Code</Switcher.Trigger>
      </Switcher.List>

      <Switcher.Container className="uk-margin">
        <Switcher.Panel>
          <Alert>
            Eu eu cillum duis in officia aliquip enim qui sunt officia eu pariatur nostrud elit esse
            ut officia sint cupidatat nostrud nulla do aliquip veniam in ut sint culpa.
          </Alert>
        </Switcher.Panel>
        <Switcher.Panel>{children}</Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default BasicUsage;
