import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ShowCard from "./Card";
import { updateNotesOrder, setNotesOrderOptimistic } from "../main/_redux/MainSlice";
import { CardsGrid } from "../main/notesPageStyles";
import { DragOverlayCard } from "./noteCardStyles";
import { useTheme } from "../../theme/ThemeProvider";
import { getCardSurfaceStyles } from "../utils/cardColors";

const SortableNoteWrapper = ({ id, children, disabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)",
    opacity: isDragging ? 0.4 : 1,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ listeners, attributes, isDragging })}
    </div>
  );
};

const SortableNotesList = ({
  data,
  userUid,
  enteringIds,
  disabled = false,
  searchQuery = "",
}) => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [items, setItems] = useState(() => data.map((note) => note.id));
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setItems(data.map((note) => note.id));
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeNote = activeId ? data.find((note) => note.id === activeId) : null;

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over || active.id === over.id || disabled) return;

      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      const reordered = newItems
        .map((noteId) => data.find((note) => note.id === noteId))
        .filter(Boolean);

      dispatch(setNotesOrderOptimistic(reordered));
      dispatch(updateNotesOrder({ orderedNotes: reordered, userUid }));
    },
    [data, disabled, dispatch, items, userUid]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <CardsGrid aria-live="polite">
          {items.map((id) => {
            const note = data.find((item) => item.id === id);
            if (!note) return null;
            return (
              <SortableNoteWrapper key={id} id={id} disabled={disabled}>
                {(dragProps) => (
                  <ShowCard
                    data={note}
                    userUid={userUid}
                    isEntering={enteringIds.has(note.id)}
                    dragProps={disabled ? null : dragProps}
                    searchQuery={searchQuery}
                  />
                )}
              </SortableNoteWrapper>
            );
          })}
        </CardsGrid>
      </SortableContext>

      <DragOverlay
        dropAnimation={{
          duration: 280,
          easing: "cubic-bezier(0.34, 1.2, 0.64, 1)",
        }}
      >
        {activeNote ? (
          <DragOverlayCard
            $surfaceBg={
              getCardSurfaceStyles(activeNote.cardColor, isDark)?.bg
            }
            $surfaceBorder={
              getCardSurfaceStyles(activeNote.cardColor, isDark)?.border
            }
          >
            <strong>{activeNote.name}</strong>
            <p>{activeNote.description}</p>
          </DragOverlayCard>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableNotesList;
