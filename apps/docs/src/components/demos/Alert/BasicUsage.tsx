import { Switcher } from 'react-uikit';

const BasicUsage = () => {
  return (
    <Switcher.Root>
      <Switcher.List className="uk-tab">
        <Switcher.Trigger>Preview</Switcher.Trigger>
        <Switcher.Trigger>Code</Switcher.Trigger>
      </Switcher.List>

      <Switcher.Container className="uk-margin">
        <Switcher.Panel>
          <div className="uk-card uk-card-default uk-card-body">
            <p>Component preview</p>
          </div>
        </Switcher.Panel>
        <Switcher.Panel>
          <p>code example</p>
        </Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

export default BasicUsage;
