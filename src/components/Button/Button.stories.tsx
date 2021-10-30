import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './index';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  children: 'Кнопка',
  isPending: false,
};
