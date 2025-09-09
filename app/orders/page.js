import { getOrders } from '@/lib/order.action';
import { columns} from "./columns"
import { DataTable } from "./data-table"

const OrderPage = async () => {
    const orders = await getOrders();

    return (
        <div className='min-h-[calc(100vh-160px)]'>
            <h1 className='text-2xl font-bold'>Orders</h1>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={orders} />
            </div>
        </div>
    )
}

export default OrderPage