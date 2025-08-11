import ShadCnTable from '@/shared/components/ui/table/ShadCnTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <ShadCnTable />
    </div>
  )   
}

