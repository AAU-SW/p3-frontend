import type { Meta, StoryObj } from '@storybook/react';

import { [FTName] } from './[FTName]';
import { <FTName | camelcase>Data } from './[FTName].data';

const meta: Meta<typeof [FTName]> = {
  component: [FTName],
};

export default meta;
type Story = StoryObj<typeof [FTName]>;

export const Default: Story = {
  args: <FTName | camelcase>Data,
};
