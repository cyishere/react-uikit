import { Grid, Switcher } from 'react-uikit';

const VerticalTab = () => {
  return (
    <Grid className="uk-child-width-1-2@s">
      <div>
        <Switcher.Root>
          <Grid>
            <div className="uk-width-auto@m">
              <Switcher.List className="uk-tab uk-tab-left">
                <Switcher.Trigger>Active</Switcher.Trigger>
                <Switcher.Trigger>Item</Switcher.Trigger>
                <Switcher.Trigger>Item</Switcher.Trigger>
              </Switcher.List>
            </div>
            <div className="uk-width-expand@m">
              <Switcher.Container>
                <Switcher.Panel>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </Switcher.Panel>
                <Switcher.Panel>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </Switcher.Panel>
                <Switcher.Panel>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur, sed do eiusmod.
                </Switcher.Panel>
              </Switcher.Container>
            </div>
          </Grid>
        </Switcher.Root>
      </div>
      <div>
        <Switcher.Root>
          <Grid>
            <div className="uk-width-auto@m uk-flex-last@m">
              <Switcher.List className="uk-tab uk-tab-right">
                <Switcher.Trigger>Active</Switcher.Trigger>
                <Switcher.Trigger>Item</Switcher.Trigger>
                <Switcher.Trigger>Item</Switcher.Trigger>
              </Switcher.List>
            </div>
            <div className="uk-width-expand@m">
              <Switcher.Container>
                <Switcher.Panel>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </Switcher.Panel>
                <Switcher.Panel>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </Switcher.Panel>
                <Switcher.Panel>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur, sed do eiusmod.
                </Switcher.Panel>
              </Switcher.Container>
            </div>
          </Grid>
        </Switcher.Root>
      </div>
    </Grid>
  );
};

export default VerticalTab;
