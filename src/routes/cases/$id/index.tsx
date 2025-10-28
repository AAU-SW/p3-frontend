import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@/components/ui/input.tsx';
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

export const Route = createFileRoute('/cases/$id/')({
  component: RouteComponent,
});

// Test case object caseData and informationData
const caseData = [
  {
    user: 'JA',
    status: 'Active',
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
    <div className="w-full bg-[#EEF2FF]">
      <h1 className="text-4xl mb-4"> Sporingsenheds opsætning </h1>

      {/* case tabel*/}
      <div className="bg-[#FFFFFF] fixed left-10 w-[900px] h-[200px]">
        <div className="bg-[#01204B] text-white p-4 text-xl"> Arbejdsopgaver</div>
        <Table>
          <TableHeader className="text-3xl mb-4">Tasks</TableHeader>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Case</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>JA</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Install Tracker</TableCell>
              <TableCell>Pillar Truck</TableCell>
              <TableCell> <SquarePen size={16} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* basic information box */}
      <div className="fixed right-10 top-10 w-100">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: </p>
            <Input value={informationData[0].name} readOnly />
            <p>Adress: </p>
            <Input value={informationData[0].adress} readOnly />
            <p>Case ID: </p>
            <Input value={informationData[0].caseID} readOnly />
            <p>Customer: </p>
            <Input value={informationData[0].Customer} readOnly />
            <p>Information: </p>
            <Input value={informationData[0].information} readOnly />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
