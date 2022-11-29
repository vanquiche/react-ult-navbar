import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Nav } from '../components/index';

export default {
  title: 'Navbar',
  component: Nav,
  argTypes: {
    logoName: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = ({ logoName, theme }) => {
  return <Nav logoName={logoName} theme={theme} />;
};

// export const Default = (args: any) => <Template {...args}/>

// export const WissCSSModules = (args: any) => (
//   <Template {...args} className={styles.Nav} />
// );

export const Primary: ComponentStory<typeof Nav> = Template.bind({});

Primary.args = {
  logoName: '',
  // logoIcon: <Logo />,
};
