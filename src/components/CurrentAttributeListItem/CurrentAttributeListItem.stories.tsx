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
  return <CurrentAttributeListItem label="data-tnav" highlightingСolor="#0670EF" onClose={() => { }} onToggleVisibility={() => { }} isHighlighted />;
};

export const Default = Template.bind({});
Default.args = {
};
