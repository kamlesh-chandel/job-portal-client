import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table.jsx';
import { Edit2, MoreHorizontal, Newspaper } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const CompaniesTable = () => {
  const navigate = useNavigate();

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
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        {companies.length <= 0 ? (
          <span>You haven't Registered any company yet.</span>
        ) : (
          <>
            {filterCompany.length <= 0 ? (
              <span>0 Search Result</span>
            ) : (
              <>
                {filterCompany.map(company => {
                  return (
                    <TableBody>
                      <TableCell>
                        <Avatar className="cursor-pointer">
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
                      <TableCell>{company.name}</TableCell>
                      <TableCell>
                        {new Date(company.createdAt).toDateString()}
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger>
                            <MoreHorizontal />
                          </PopoverTrigger>
                          <PopoverContent className="w-32 ">
                            <div
                              onClick={() => {
                                navigate(`/admin/company/${company.id}`);
                              }}
                              className="flex items-center w-fit gap-2 cursor-pointer "
                            >
                              <Edit2 className="w-4" />
                              <span>Edit</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableBody>
                  );
                })}
              </>
            )}
          </>
        )}
      </Table>
    </div>
  );
};
