import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ColorPicker from './index';

export default {
  title: 'ColorPicker',
  component: ColorPicker,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = ({ ...args }) => {
  const [inputValue, setValue] = useState('#ffffff');
  return <ColorPicker value={inputValue} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {};
