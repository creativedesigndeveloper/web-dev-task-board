import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

interface KanbanColumnProps {
  id: 'todo' | 'inProgress' | 'complete'
  title: string
  count: number
  children: React.ReactNode
}

export const KanbanColumn = ({ id, title, count, children }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.3 }}
      ref={setNodeRef}
      className={`p-3 rounded-2xl flex-1 transition-colors ${isOver ? 'bg-purple-dark' : 'bg-bg-secondary'}`}
    >
      <h2 className="text-text-primary">{title}</h2>
      <h4 className="text-text-secondary">{count}</h4>
      {children}

    </motion.div>
  )
}