import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input, { InputStatus } from './index';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
    status: {
      options: { ...InputStatus, unset: undefined },
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({
  value,
  onChange,
  ...args
}) => {
  const [inputValue, setValue] = useState('');

  return <Input onChange={setValue} value={inputValue} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  value: 'Input',
  statusText: '',
  placeholder: 'Placeholder',
};
