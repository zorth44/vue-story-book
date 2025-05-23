import type { Meta, StoryObj } from '@storybook/vue3';
import NotificationCenter from './NotificationCenter.vue';

const meta = {
  title: 'Example/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NotificationCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Empty: Story = {
  args: {},
  render: () => ({
    components: { NotificationCenter },
    template: '<NotificationCenter />',
    setup() {
      // The component will show empty state by default when there are no notifications
      return {};
    },
  }),
};

export const WithSearch: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Use the search box to filter notifications by title or message content.',
      },
    },
  },
};

export const WithTypeFilter: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Use the type filter to show notifications of a specific type (message, system, task, or alert).',
      },
    },
  },
}; 