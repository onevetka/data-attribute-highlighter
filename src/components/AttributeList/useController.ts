import useAttributeList from "../../hooks/useAttributeList";

const useController = () => {
  const items = useAttributeList();

  const state = {
    items,
    hasItems: items.length > 0
  }

  return {
    state
  }
}

export default useController;
