import type {FC} from 'react';
import {DataTable} from '@/components/ui/data-table/data-table.tsx';
import {useNavigate} from '@tanstack/react-router';
import type {Order} from "@/types/order.ts";
import {useColumns} from "@/components/orders/orders-table/hooks/use-columns.tsx";

interface OrdersTableProps {
    data: Order[];
}

export const OrdersTable: FC<OrdersTableProps> = ({ data }) => {
    const columns = useColumns();
    const navigate = useNavigate({ from: '/orders/$id' });

    return (
        <DataTable
            columns={columns}
            data={data}
            withSearchBar={true}
            onRowClick={(rowData) => navigate({ to: `/orders/${rowData.id}` })}
        />
    );
};
