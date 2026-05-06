import type { FC, ReactNode } from 'react';

import { Alert, Close } from 'react-uikit';

import DemoPreviewCode from '../DemoPreviewCode';

interface BasicUsageProps {
  children: ReactNode;
}

const BasicUsage: FC<BasicUsageProps> = ({ children }) => {
  return (
    <DemoPreviewCode
      preview={
        <Alert>
          Eu eu cillum duis in officia aliquip enim qui sunt officia eu pariatur nostrud elit esse
          ut officia sint cupidatat nostrud nulla do aliquip veniam in ut sint culpa.
          <Close className="uk-alert-close" />
        </Alert>
      }
    >
      {children}
    </DemoPreviewCode>
  );
};

export default BasicUsage;
