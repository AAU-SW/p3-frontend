import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SquarePen } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/status-badge';

export const Route = createFileRoute('/cases/$id/')({
  component: RouteComponent,
});

// Test case object caseData and informationData
const caseData = [
  {
    user: 'JA',
    status: 'ACTIVE',
    case: 'install tracker',
    asset: 'Pillar Truck',
  },
];


const informationData = [
  {
    name: 'Pillar A/S',
    adress: 'Knuds kirkevej, 3700 Rønne',
    caseID: '12345678',
    Customer: 'Pillar Construction',
    information: 'Install tracker on truck',
  },
];

function RouteComponent() {
  return (
    <div className="w-full bg-[#F8FAFC] p-5">
      <h1 className="text-4xl mb-4"> Tracking device installation </h1>

      <div className="flex justify-between gap-4">
      {/* case tabel*/}
      <div className="bg-[#FFFFFF] w-2/3">
        <div className="bg-[#01204B] text-white p-4 text-xl"> Task</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Case</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarFallback>{caseData[0].user}</AvatarFallback>
                </Avatar>
                </TableCell>
              <TableCell><StatusBadge status={caseData[0].status}></StatusBadge></TableCell>
              <TableCell>{caseData[0].case}</TableCell>
              <TableCell>{caseData[0].asset}</TableCell>
              <TableCell><SquarePen size={16} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* basic information box */}

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: </p>
            <p className="border px-2 py-1 rounded">{informationData[0].name}</p>
            <p>Adress: </p>
            <p className="border px-2 py-1 rounded">{informationData[0].adress}</p>
            <p>Case ID: </p>
            <p className="border px-2 py-1 rounded">{informationData[0].caseID}</p>
            <p>Customer: </p>
            <p className="border px-2 py-1 rounded">{informationData[0].Customer}</p>
            <p>Information: </p>
            <p className="border px-2 py-1 rounded">{informationData[0].information}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
