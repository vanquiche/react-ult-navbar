import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavNodeType } from '../components/types';

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

const navigationTree: NavNodeType[] = [
  {
    link: (props) => <a {...props}>{props.children}</a>,
    title: 'Hello World',
    linkAttribute: {
      href: 'http://google.com',
      target: '_blank',
      rel: 'noopener',
    },
  },
  {
    link: (props) => <a {...props}>{props.children}</a>,
    title: 'Second Link',
    linkAttribute: {},
    void: true,
    submenu: [
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 1',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
      },
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 3',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
        submenu: [
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 1',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 2',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
        ],
      },
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 2',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
      },
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 3',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
        submenu: [
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 1',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 2',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
        ],
      },
    ],
  },
  {
    link: (props) => <a {...props}>{props.children}</a>,
    title: 'About',
    linkAttribute: {
      href: 'http://google.com',
      target: '_blank',
    },
    submenu: [
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 2',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
      },
      {
        link: (props) => <a {...props}>{props.children}</a>,
        title: 'Sub menu link 3',
        linkAttribute: { href: 'http://google.com', target: '_blank' },
        submenu: [
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 1',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
          {
            link: (props) => <a {...props}>{props.children}</a>,
            title: 'Sub menu link 2',
            linkAttribute: { href: 'http://google.com', target: '_blank' },
          },
        ],
      },
    ],
  },
];

const Template: ComponentStory<typeof Nav> = ({ logoName, theme }) => {
  return (
    <Nav logoName={logoName} theme={theme} navigationTree={navigationTree} />
  );
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
