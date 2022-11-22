import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Nav } from '../components/index';

export default {
  title: 'Navbar',
  component: Nav,
} as ComponentMeta<typeof Nav>;

export const Primary: ComponentStory<typeof Nav> = () => <Nav />;
