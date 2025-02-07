import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  
  {
    displayName: 'Transactions',
    iconName: 'rosette',
    route: '/ui-components/transactions',
  },
  {
    displayName: 'Income',
    iconName: 'poker-chip',
    route: '/ui-components/income',
  },
  {
    displayName: 'Upcoming Income',
    iconName: 'list',
    route: '/ui-components/upcomingincome',
  },
  {
    displayName: 'Expense',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/expense',
  },
  {
    displayName: 'Upcoming Expense',
    iconName: 'tooltip',
    route: '/ui-components/upcomingexp',
  },
  // {
  //   navCap: 'Auth',
  // },
  {
    displayName: 'Accounts',
    iconName: 'lock',
    route: '/extra/account',
  },
  {
    displayName: 'Track Budgets',
    iconName: 'user-plus',
    route: '/ui-components/trackbudgets',
  },
  {
    displayName: 'Calendar',
    iconName: 'mood-smile',
    route: '/extra/calendar',
  },
  {
    displayName: 'Set Goals',
    iconName: 'aperture',
    route: '/extra/set-goals',
  },
  // {
  //   displayName: 'Reports',
  //   iconName: 'user-plus',
  //   route: '/extra/sample-page',
  // },
  // {
  //   displayName: 'Category',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
  // {
  //   displayName: 'Settings',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
