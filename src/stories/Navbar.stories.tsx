import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Nav } from '../components/index';

export default {
  title: 'Navbar',
  component: Nav,
  argTypes: {
    text: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = ({ text }) => {
  return <Nav text={text} />;
};

export const Primary: ComponentStory<typeof Nav> = Template.bind({});

Primary.args = {
  text: '',
};
