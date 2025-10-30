import {createFileRoute} from '@tanstack/react-router'
import {OrdersTable} from "@/components/orders/orders-table/orders-table.tsx";

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="w-full p-4 container mx-auto">
          <div className="flex flex-row justify-between items-center mb-4">
              <h1 className="text-4xl"> Orders </h1>
          </div>
          <OrdersTable data={[]} />
      </div>
  )
}
