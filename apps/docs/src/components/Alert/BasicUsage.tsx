import type { FC, ReactNode } from 'react';

import { Alert } from 'react-uikit';

import DemoPreviewCode from '../DemoPreviewCode';

interface BasicUsageProps {
  children: ReactNode;
}

const BasicUsage: FC<BasicUsageProps> = ({ children }) => {
  return (
    <DemoPreviewCode
      preview={
        <div>
          <Alert>
            Eu eu cillum duis in officia aliquip enim qui sunt officia eu pariatur nostrud esse.
          </Alert>
          <Alert className="uk-alert-primary">
            Eu eu cillum duis in officia aliquip enim qui sunt officia eu pariatur nostrud esse.
          </Alert>
          <Alert className="uk-alert-success">
            Eu eu cillum duis in officia aliquip enim qui sunt officia eu pariatur nostrud esse.
          </Alert>
          <Alert className="uk-alert-warning">
            Eu eu cillum duis in officia aliquip enim qui sunt officia eu pariatur nostrud esse.
          </Alert>
          <Alert className="uk-alert-danger">
            Eu eu cillum duis in officia aliquip enim qui sunt officia eu pariatur nostrud esse.
          </Alert>
        </div>
      }
    >
      {children}
    </DemoPreviewCode>
  );
};

export default BasicUsage;
