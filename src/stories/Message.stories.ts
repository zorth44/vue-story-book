import type { Meta, StoryObj } from '@storybook/vue3';
import Message from './Message.vue';

const meta = {
  title: 'Example/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    time: { control: 'text' },
    isUser: { control: 'boolean' },
  },
  args: {
    text: 'Hello, how are you?',
    time: '10:30 AM',
    isUser: false,
  },
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello, how are you?',
    time: '10:30 AM',
    isUser: false,
  },
};

export const UserMessage: Story = {
  args: {
    text: 'I\'m doing great, thanks!',
    time: '10:31 AM',
    isUser: true,
  },
};

export const LongMessage: Story = {
  args: {
    text: 'This is a longer message that might wrap to multiple lines. It demonstrates how the component handles longer content while maintaining its layout and styling.',
    time: '10:32 AM',
    isUser: false,
  },
}; 