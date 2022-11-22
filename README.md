# react-ult-navbar

react-ult-navbar is navigation component for your React project that is highly customizable and mobile responsive. Before using please consider that this component relies on the use of **React Router** version 6 in your project. Additionally, this component uses **Framer Motion** that may conflict with other animation libraries.

# Getting Started

## Installation

The easiest way to start using react-ult-navbar is to install it from npm.

```sh
npm install react-ult-navbar --save
```

Install React Router version 6.

```sh
npm install react-router-dom@6
```

Import and wrap your 'App' in React Router's BrowserRouter component.

```sh
import { render } from "react-dom";
import {
  BrowserRouter
} from "react-router-dom";

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById("root")
);
```

Then add components: Navbar and Pages from react-ult-navbar inside your 'App' project.
Both will accept an array of objects as props called "links" that will create links within the Navbar component and routes within Pages.

```sh
import { Navbar, Pages } from 'react-ult-navbar';
import Page from './components/Page';

const PAGES = [
  {
    path: '/',
    text: 'Home',
    component: <Page title='Home' />,
  },
  {
    path: 'about',
    text: 'About',
    component: <Page title='About' />,
  },
  {
    path: 'contact',
    text: 'Contact',
    component: <Page title='Contact' />,
  },
  {
    path: 'profile',
    text: 'Profile',
    component: <Page title='Profile' />,
    children: [
        {
            path: 'profile1',
            text: 'Profile 1',
            component: <Page title='Profile #1' />
        }
    ]
  }
];

function App() {
  return (
      <div className='App'>
        <Navbar
          bgColor='grey'
          fontColor='white'
          fontSize='1rem'
          links={PAGES}
          logoText='Brand Name'
        />
        <Pages pages={PAGES} />
      </div>
  );
}

export default App;

```

If you followed the steps above then you should be set for navigation!

## Props

### Navbar Mandatory Prop

Both Navbar and Pages component requires a prop of "links" that accepts an Array of Objects to render yours links and routes.
| Key | Type | value |
| --- | ----- | ---- |
| path | string | url segment - value of "about" will provide a link of _/about_ |
| text | string | name of link listed in the UI element |
| component | Component | components rendered as pages in your project |
| children | links | optional. Renders any nested links if applicable - _/users/profiles/profiles123_ |

### Navbar Utility Props

| Props         | Type                     | Default     | Description                                                 |
| ------------- | ------------------------ | ----------- | ----------------------------------------------------------- |
| fontColor     | string                   | inherit     | adjust font color - 'black'                                 |
| fontSize      | string                   | inherit     | adjust font size - '1rem'                                   |
| bgColor       | string                   | transparent | adjust background-color - 'lightblue'                       |
| position      | "start", "center", "end" | "end"       | adjust position of links inside navbar when in desktop view |
| logoIcon      | string                   | null        | accepts an imported image or path as a logo                 |
| logoText      | string                   | null        | name of brand as text - "Microsoft"                         |
| logoTextSize  | string                   | null        | adjust font size of logoText - '24px'                       |
| logoTextClass | string                   | null        | add className for seperate css styling                      |
| addClass      | string                   | null        | add className for additional styling of navbar              |

## License

MIT
