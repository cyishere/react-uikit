import type { FC, ReactNode } from 'react';

import { Switcher } from 'react-uikit';

interface BasicUsageProps {
  preview: ReactNode;
  children: ReactNode;
}

const BasicUsage: FC<BasicUsageProps> = ({ preview, children }) => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-tab">
        <Switcher.Trigger>Preview</Switcher.Trigger>
        <Switcher.Trigger>Code</Switcher.Trigger>
      </Switcher.List>

      <Switcher.Container className="uk-margin">
        <Switcher.Panel>{preview}</Switcher.Panel>
        <Switcher.Panel>{children}</Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default BasicUsage;
