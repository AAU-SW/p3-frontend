import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FC } from 'react';


interface InformationBoxProps {
  informationData: {
    name: string;
    adress: string;
    caseID: string;
    Customer: string;
    information: string;
  };
}

export const InformationBox: FC<InformationBoxProps> = ({ informationData }) => {

return (
<Card>
  <CardHeader>
    <CardTitle>Basic Information</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
    <p>Name: </p>
    <p className="border px-2 py-1 rounded">
      {informationData.name}
    </p>
    <p>Adress: </p>
    <p className="border px-2 py-1 rounded">
      {informationData.adress}
    </p>
    <p>Case ID: </p>
    <p className="border px-2 py-1 rounded">
      {informationData.caseID}
    </p>
    <p>Customer: </p>
    <p className="border px-2 py-1 rounded">
      {informationData.Customer}
    </p>
    <p>Information: </p>
    <p className="border px-2 py-1 rounded">
      {informationData.information}
    </p>
  </CardContent>
</Card>
)
}