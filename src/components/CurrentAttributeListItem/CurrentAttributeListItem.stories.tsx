import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CurrentAttributeListItem from './index';

export default {
  title: 'CurrentAttributeListItem',
  component: CurrentAttributeListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CurrentAttributeListItem>;

const Template: ComponentStory<typeof CurrentAttributeListItem> = () => {
  const [color, setColor] = useState('#0670EF');
  return <CurrentAttributeListItem label="data-tnav" highlightingColor={color} onClose={() => { }} onToggleVisibility={() => { }} onChangeColor={setColor} isHighlighted={false} />;
};

export const Default = Template.bind({});
Default.args = {
};
