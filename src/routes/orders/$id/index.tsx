import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { Order } from '@/types/order';
import { getOneOrder } from '@/api/order';
import { Notes } from '@/components/orders/order-details/notes';

const dummydata = [
  {
    id: 1,
    name: 'Power Supply Replacement',
    description:
      'Replaced faulty 750W power supply unit that caused intermittent shutdowns.',
    date: '2025-11-01',
    status: 'Completed',

    priority: 'High',
    hardware_id: 'HW-PSU-2025-001',
    attachments: ['psu_report.pdf', 'before_after_photos.zip'],
    notes: 'System stable after 24-hour stress test.',
  },
  {
    id: 2,
    name: 'RAM Upgrade',
    description: 'Upgraded system memory from 8GB to 32GB DDR5.',
    date: '2025-11-03',
    status: 'In Progress',
    priority: 'Medium',
    hardware_id: 'HW-RAM-2025-014',
    attachments: [],
    notes: 'New modules passed POST but need further benchmarking.',
  },
  {
    id: 3,
    name: 'GPU Driver Issue',
    description: 'Investigating display flickering after recent driver update.',
    date: '2025-11-05',
    status: 'Open',
    priority: 'High',
    hardware_id: 'HW-GPU-2025-042',
    attachments: ['driver_log.txt'],
    notes: 'Possible compatibility issue with BIOS version.',
  },
  {
    id: 4,
    name: 'Cooling System Maintenance',
    description:
      'Cleaned CPU and GPU cooling fans and reapplied thermal paste.',
    date: '2025-11-09',
    status: 'Completed',
    priority: 'Low',
    hardware_id: 'HW-COOL-2025-009',
    attachments: ['thermal_images_before_after.png'],
    notes: 'Temperatures dropped by 15°C under load.',
  },
  {
    id: 5,
    name: 'Motherboard Diagnostics',
    description:
      'Ran full diagnostic after intermittent USB disconnections reported.',
    date: '2025-11-11',
    status: 'Pending Review',
    priority: 'High',
    hardware_id: 'HW-MB-2025-021',
    notes: 'Suspect faulty southbridge controller; replacement part ordered.',
  },
];

export const Route = createFileRoute('/orders/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const orderId = Route.useParams();
  const [orderData, setOrderData] = useState<Order>();
  const [noteLoading] = useState(false);

  useEffect(() => {
    const fetchOneOrder = async () => {
      try {
        const response = await getOneOrder(String(orderId.id));
        setOrderData(response);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };
    fetchOneOrder();
  }, [orderId]);
  console.log(orderData);

  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 p-4 gap-4">
          <img
            src="https://flex1one.dk/media/w4ikrsr0/flexline-hd3.jpg?center=0.5%2C0.5&mode=crop&width=1280&height=853"
            alt="værktøj"
            className=" h-auto rounded-lg object-cover"
          />

          <div className=" border-2 rounded-lg p-4"></div>
          <div className=" border-2 rounded-lg p-4"></div>
        </div>
        <div className="p-4">
          <Notes data={dummydata} isLoading={noteLoading} />
        </div>
      </div>
    </div>
  );
}
