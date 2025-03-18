import type { Meta, StoryObj } from '@storybook/vue3';
import Login from './Login.vue';

const meta = {
  title: 'Components/Login',
  component: Login,
  tags: ['autodocs'],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: '',
    password: '',
    rememberMe: false,
  },
};

export const FilledForm: Story = {
  args: {
    email: 'user@example.com',
    password: 'password123',
    rememberMe: true,
  },
};

export const Loading: Story = {
  args: {
    email: 'user@example.com',
    password: 'password123',
    rememberMe: false,
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    email: 'invalid@email',
    password: '123',
    rememberMe: false,
    error: 'Invalid email or password',
  },
};

export const WithCarouselAnnouncements: Story = {
  args: {
    email: '',
    password: '',
    rememberMe: false,
    announcements: [
      {
        title: '系统升级完成',
        content: '新版本已于今日凌晨完成升级，新增数据可视化功能，欢迎体验！',
      },
      {
        title: '数据安全提醒',
        content: '请注意：近期发现部分钓鱼网站仿冒本平台界面，请认准官方域名登录。',
      },
      {
        title: '春节放假通知',
        content: '春节期间（2024年2月10日-2月17日）系统将保持服务，如遇问题请联系值班人员。',
      },
      {
        title: '接口维护通知',
        content: '部分数据接口正在维护中，预计耗时2小时，给您带来的不便敬请谅解。',
      }
    ]
  },
};


export const WithoutCarouselAnnouncements: Story = {
    args: {
      email: '',
      password: '',
      rememberMe: false,
      announcements: []
    },
  };