import type { Meta, StoryObj } from '@storybook/vue3';
import Notification from './Notification.vue';

const meta = {
  title: 'Example/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    message: { control: 'text' },
    title: { control: 'text' },
    icon: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    type: 'info',
    message: 'This is a notification message',
    title: 'Notification Title',
    dismissible: true,
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    icon: '✓',
    dismissible: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    icon: '!',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Your session will expire in 5 minutes.',
    icon: '⚠',
    dismissible: true,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'New features are available. Check them out!',
    icon: 'ℹ',
    dismissible: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'info',
    message: 'This is a simple notification without a title.',
    dismissible: true,
  },
};

export const NonDismissible: Story = {
  args: {
    type: 'info',
    title: 'Important',
    message: 'This notification cannot be dismissed.',
    dismissible: false,
  },
}; 