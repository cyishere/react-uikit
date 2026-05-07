import * as React from 'react';
import { Icon } from 'react-uikit';

import styles from './CopyButton.module.scss';

interface CopyButtonProps {
  targetId: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ targetId }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      const pre = document.getElementById(targetId);
      const codeString = pre?.textContent || '';
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      className={`uk-icon-link ${styles.wrapper}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy the code'}
      data-copy-button
    >
      {copied ? <Icon name="check" /> : <Icon name="copy" />}
    </button>
  );
};

export default CopyButton;
