export interface ToggleHighlightingAction {
  type: 'toggleHighlighting'
  payload: {
    id: number,
  }
}

export interface ChangeHighlightColorAction {
  type: 'changeHighlightColor'
  payload: {
    id: number,
    color: string;
  }
}

export type AttributeListAction = ToggleHighlightingAction | ChangeHighlightColorAction;