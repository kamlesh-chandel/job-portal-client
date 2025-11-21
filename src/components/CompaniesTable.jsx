import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table.jsx';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    store => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany = companies.filter(company =>
      company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
    setFilterCompany(filteredCompany);
  }, [searchCompanyByText, companies]);

  return (
    <div className="min-h-[450px]">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="h-14">
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companies.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground py-10"
              >
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          )}

          {companies.length > 0 && filterCompany.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground py-10"
              >
                0 Search Results
              </TableCell>
            </TableRow>
          )}

          {filterCompany?.map(company => (
            <TableRow key={company.id} className="h-16">
              <TableCell>
                <Avatar className="cursor-pointer size-12">
                  {company.logoUrl ? (
                    <AvatarImage
                      className="size-12 object-cover"
                      src={company.logoUrl}
                    />
                  ) : (
                    <AvatarFallback className="size-12 rounded-lg bg-primary/80 text-white flex items-center justify-center font-semibold text-base">
                      {company?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </TableCell>

              <TableCell className="font-medium">{company.name}</TableCell>

              <TableCell>
                {new Date(company.createdAt).toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
