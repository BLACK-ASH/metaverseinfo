import { getAllOrders } from '@/lib/order.action';
import { columns } from "./columns"
import { DataTable } from "./data-table"
import OrderRefresh from '@/components/OrderRefresh';

const OrderPage = async () => {
    const orders = await getAllOrders();

    return (
        <div className='min-h-[calc(100vh-110px)]'>
            <h1 className='text-2xl font-bold'>Orders</h1>
            <OrderRefresh />
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={orders} />
            </div>
        </div>
    )
}

export default OrderPage