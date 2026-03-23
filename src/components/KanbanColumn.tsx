import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  id: 'todo' | 'inProgress' | 'complete'
  title: string
  count: number
  children: React.ReactNode
}

export const KanbanColumn = ({ id, title, count, children }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`p-3 rounded-2xl flex-1 transition-colors ${isOver ? 'bg-purple-dark' : 'bg-bg-secondary'}`}
    >
      <h2 className="text-text-primary">{title}</h2>
      <h4 className="text-text-secondary">{count}</h4>
      {children}

    </div>
  )
}