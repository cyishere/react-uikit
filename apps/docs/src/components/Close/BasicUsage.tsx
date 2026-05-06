import type { ReactNode } from 'react';

import { Close } from 'react-uikit';

import DemoPreviewCode from '../DemoPreviewCode';

const BasicUsage = ({ children }: { children: ReactNode }) => {
  return <DemoPreviewCode preview={<Close />}>{children}</DemoPreviewCode>;
};

export default BasicUsage;
