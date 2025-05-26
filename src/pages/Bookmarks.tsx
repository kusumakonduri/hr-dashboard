
import React from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useBookmarks } from '@/contexts/BookmarkContext';
import Layout from '@/components/Layout';
import EmployeeCard from '@/components/EmployeeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bookmark, Users } from 'lucide-react';

const Bookmarks = () => {
  const { data: employees, isLoading, error } = useEmployees();
  const { bookmarks } = useBookmarks();

  const bookmarkedEmployees = employees?.filter(emp => 
    bookmarks.includes(emp.id.toString())
  ) || [];

  if (error) {
    return (
      <Layout>
        <Alert className="max-w-md mx-auto">
          <AlertDescription>
            Failed to load employee data. Please try again later.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Bookmark className="h-8 w-8 text-purple-600" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Bookmarked Employees
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your saved employees for quick access and management.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-purple-200 dark:border-gray-700 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Total Bookmarks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isLoading ? '...' : bookmarks.length}
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))
          ) : (
            bookmarkedEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))
          )}
        </div>

        {!isLoading && bookmarkedEmployees.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">No bookmarked employees yet.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Start bookmarking employees from the dashboard to see them here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;
