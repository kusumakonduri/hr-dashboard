
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Bookmark, TrendingUp, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { toast } from '@/hooks/use-toast';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  image: string;
  address: {
    city: string;
    state: string;
  };
  department: string;
  rating: number;
}

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(employee.id.toString());

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(employee.id.toString());
      toast({
        title: "Bookmark removed",
        description: `${employee.firstName} ${employee.lastName} removed from bookmarks`,
      });
    } else {
      addBookmark(employee.id.toString());
      toast({
        title: "Bookmark added",
        description: `${employee.firstName} ${employee.lastName} added to bookmarks`,
      });
    }
  };

  const handlePromote = () => {
    toast({
      title: "Promotion initiated",
      description: `Promotion process started for ${employee.firstName} ${employee.lastName}`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const getDepartmentColor = (dept: string) => {
    const colors = {
      Engineering: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      Marketing: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      Sales: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      HR: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      Finance: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[dept as keyof typeof colors] || colors.default;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200 dark:ring-purple-800"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </h3>
              <Badge className={`text-xs ${getDepartmentColor(employee.department)}`}>
                {employee.department}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={`transition-colors ${
              bookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Mail className="h-4 w-4" />
          <span className="truncate">{employee.email}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4" />
          <span>{employee.address.city}, {employee.address.state}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(employee.rating)}
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
              {employee.rating}/5
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Age {employee.age}
          </span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Link to={`/employee/${employee.id}`} className="flex-1">
            <Button variant="outline" className="w-full text-sm">
              View Details
            </Button>
          </Link>
          <Button
            onClick={handlePromote}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Promote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
