import type { FC, ReactNode } from 'react';

import { Switcher } from 'react-uikit';

import styles from './DemoPreviewCode.module.css';

interface BasicUsageProps {
  preview?: ReactNode;
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
        <Switcher.Panel className={`uk-padding-small ${styles.demoPanel}`}>
          {preview || <p>Please refresh.</p>}
        </Switcher.Panel>
        <Switcher.Panel>{children}</Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default BasicUsage;
