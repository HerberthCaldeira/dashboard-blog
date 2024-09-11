import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Index({ data }) {
  return (
    <Table>
      <TableCaption>Categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((i) => {
          return (
            <TableRow key={i.id}>
              <TableCell>{i.id}</TableCell>
              <TableCell>{i.name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
