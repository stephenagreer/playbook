import React, { createContext, useReducer, useContext, useEffect, useMemo } from "react";
import { InitialStateType, ActionType, DraggableProviderType } from "./types";

const initialState: InitialStateType = {
  items: [],
  dragData: { id: "", initialGroup: "" },
  isDragging: "",
  activeContainer: ""
};

const reducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_DRAG_DATA':
      return { ...state, dragData: action.payload };
    case 'SET_IS_DRAGGING':
      return { ...state, isDragging: action.payload };
    case 'SET_ACTIVE_CONTAINER':
      return { ...state, activeContainer: action.payload };
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.itemId
            ? { ...item, container: action.payload.container }
            : item
        )
      };
    case 'REORDER_ITEMS': {
      const { dragId, targetId } = action.payload;
      const newItems = [...state.items];
      const draggedItem = newItems.find(item => item.id === dragId);
      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.findIndex(item => item.id === targetId);

      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);

      return { ...state, items: newItems };
    }
    default:
      return state;
  }
};

// Context and Provider
const DragContext = createContext<any>({});

export const DraggableContext = () => {
  return useContext(DragContext);
};

export const DraggableProvider = ({ 
  children, 
  initialItems, 
  onReorder,
  onDragStart, 
  onDragEnter, 
  onDragEnd, 
  onDrop, 
  onDragOver 
}: DraggableProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_ITEMS', payload: initialItems });
  }, [initialItems]);

  useEffect(() => {
    onReorder(state.items);
  }, [state.items]);

  const handleDragStart = (id: string, container: string) => {
    dispatch({ type: 'SET_DRAG_DATA', payload: { id: id, initialGroup: container } });
    dispatch({ type: 'SET_IS_DRAGGING', payload: id });
    if (onDragStart) onDragStart(id, container);
  };

  const handleDragEnter = (id: string, container: string) => {
    if (state.dragData.id !== id) {
      dispatch({ type: 'REORDER_ITEMS', payload: { dragId: state.dragData.id, targetId: id } });
      dispatch({ type: 'SET_DRAG_DATA', payload: { id: state.dragData.id, initialGroup: container } });
    }
    if (onDragEnter) onDragEnter(id, container);
  };

  const handleDragEnd = () => {
    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
    if (onDragEnd) onDragEnd();
  };

  const changeCategory = (itemId: string, container: string) => {
    dispatch({ type: 'CHANGE_CATEGORY', payload: { itemId, container } });
  };

  const handleDrop = (container: string) => {
    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
    changeCategory(state.dragData.id, container);
    if (onDrop) onDrop(container);
  };

  const handleDragOver = (e: Event, container: string) => {
    e.preventDefault();
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: container });
    if (onDragOver) onDragOver(e, container);
  };

  const contextValue = useMemo(() => ({
    items: state.items,
    dragData: state.dragData,
    isDragging: state.isDragging,
    activeContainer: state.activeContainer,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDrop,
    handleDragOver
  }), [state]);

  return (
    <DragContext.Provider value={contextValue}>{children}</DragContext.Provider>
  );
};
