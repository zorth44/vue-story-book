import type { Meta, StoryObj } from '@storybook/vue3';
import Header from './Header.vue';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: '/vite.svg',
    menus: [
      {
        id: 'dashboard',
        title: '仪表盘',
        children: [
          { id: 'overview', title: '总览', path: '/dashboard/overview' },
          { id: 'analytics', title: '数据分析', path: '/dashboard/analytics' },
        ],
      },
      {
        id: 'products',
        title: '产品管理',
        children: [
          { id: 'list', title: '产品列表', path: '/products/list' },
          { id: 'categories', title: '产品分类', path: '/products/categories' },
          { id: 'inventory', title: '库存管理', path: '/products/inventory' },
        ],
      },
      {
        id: 'orders',
        title: '订单管理',
        children: [
          { id: 'all', title: '所有订单', path: '/orders/all' },
          { id: 'pending', title: '待处理', path: '/orders/pending' },
          { id: 'completed', title: '已完成', path: '/orders/completed' },
        ],
      },
      {
        id: 'settings',
        title: '系统设置',
        children: [
          { id: 'profile', title: '个人信息', path: '/settings/profile' },
          { id: 'security', title: '安全设置', path: '/settings/security' },
          { id: 'notifications', title: '通知设置', path: '/settings/notifications' },
        ],
      },
    ],
  },
};

export const NoLogo: Story = {
  args: {
    menus: Default.args.menus,
  },
};

export const SimpleMenu: Story = {
  args: {
    logo: '/vite.svg',
    menus: [
      {
        id: 'home',
        title: '首页',
      },
      {
        id: 'about',
        title: '关于我们',
      },
      {
        id: 'contact',
        title: '联系我们',
      },
    ],
  },
};