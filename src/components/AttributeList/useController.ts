import { useEffect, useState } from "react";

const useController = () => {
  const [items, setItems] = useState<any>([]);

  const handleDeleteItem = (id: number) => {

  };

  const handleToggleAttributeVisibility = (id: number) => {

  };

  useEffect(() => {
    setItems([
      {
        id: '0',
        label: 'data-tnav',
        highlightingСolor: '#FFFFFF',
        isHighlighted: true,
        onClose: () => { handleDeleteItem(0) },
        onToggleVisibility: () => { handleToggleAttributeVisibility(0) },
      },
      {
        id: '1',
        label: 'data-qa',
        highlightingСolor: '#EDEDED',
        isHighlighted: false,
        onClose: () => { handleDeleteItem(1) },
        onToggleVisibility: () => { handleToggleAttributeVisibility(1) },
      }
    ]);
  }, [])

  const state = {
    items,
  }

  return {
    state
  }
}

export default useController;
