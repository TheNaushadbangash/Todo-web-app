import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TodoItem from "./TodoItem";

function TodoList({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
  handleDragEnd,
  onFocus,
}) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-5 mt-6">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              onFocus={onFocus}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default TodoList;
