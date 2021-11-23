import useAttributeList from "../../hooks/useAttributeList";

const useController = () => {
  const items = useAttributeList();

  const state = {
    items,
  }

  return {
    state
  }
}

export default useController;
