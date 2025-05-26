
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartments: string[];
  onDepartmentChange: (departments: string[]) => void;
  selectedRatings: number[];
  onRatingChange: (ratings: number[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedDepartments,
  onDepartmentChange,
  selectedRatings,
  onRatingChange,
}) => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const ratings = [1, 2, 3, 4, 5];

  const handleDepartmentToggle = (dept: string) => {
    if (selectedDepartments.includes(dept)) {
      onDepartmentChange(selectedDepartments.filter(d => d !== dept));
    } else {
      onDepartmentChange([...selectedDepartments, dept]);
    }
  };

  const handleRatingToggle = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      onRatingChange(selectedRatings.filter(r => r !== rating));
    } else {
      onRatingChange([...selectedRatings, rating]);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-purple-200 dark:border-gray-600"
        />
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              Departments
              {selectedDepartments.length > 0 && (
                <span className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                  {selectedDepartments.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border-purple-200 dark:border-gray-600">
            {departments.map((dept) => (
              <DropdownMenuCheckboxItem
                key={dept}
                checked={selectedDepartments.includes(dept)}
                onCheckedChange={() => handleDepartmentToggle(dept)}
              >
                {dept}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <Filter className="h-4 w-4 mr-2" />
              Ratings
              {selectedRatings.length > 0 && (
                <span className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                  {selectedRatings.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border-purple-200 dark:border-gray-600">
            {ratings.map((rating) => (
              <DropdownMenuCheckboxItem
                key={rating}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              >
                {rating} Star{rating !== 1 ? 's' : ''}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SearchFilter;
