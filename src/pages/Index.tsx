
import React, { useState, useMemo } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import Layout from '@/components/Layout';
import EmployeeCard from '@/components/EmployeeCard';
import SearchFilter from '@/components/SearchFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, TrendingUp, Star, Bookmark } from 'lucide-react';

const Index = () => {
  const { data: employees, isLoading, error } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee) => {
      const matchesSearch = 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = selectedDepartments.length === 0 || 
        selectedDepartments.includes(employee.department);

      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.includes(employee.rating);

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [employees, searchTerm, selectedDepartments, selectedRatings]);

  const stats = useMemo(() => {
    if (!employees) return { total: 0, avgRating: 0, topPerformers: 0, departments: 0 };

    const avgRating = employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length;
    const topPerformers = employees.filter(emp => emp.rating >= 4).length;
    const uniqueDepartments = new Set(employees.map(emp => emp.department)).size;

    return {
      total: employees.length,
      avgRating: avgRating.toFixed(1),
      topPerformers,
      departments: uniqueDepartments,
    };
  }, [employees]);

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
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Employee Performance Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your team, track performance, and drive organizational success with comprehensive employee insights.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))
          ) : (
            <>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-purple-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-purple-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-purple-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Top Performers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.topPerformers}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-purple-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Departments</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.departments}</p>
                  </div>
                  <Bookmark className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartments={selectedDepartments}
          onDepartmentChange={setSelectedDepartments}
          selectedRatings={selectedRatings}
          onRatingChange={setSelectedRatings}
        />

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))
          ) : (
            filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))
          )}
        </div>

        {!isLoading && filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No employees found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
