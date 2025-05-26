
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEmployee } from '@/hooks/useEmployees';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Star, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: employee, isLoading, error } = useEmployee(id!);

  if (error) {
    return (
      <Layout>
        <Alert className="max-w-md mx-auto">
          <AlertDescription>
            Failed to load employee details. Please try again later.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96" />
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return (
      <Layout>
        <Alert className="max-w-md mx-auto">
          <AlertDescription>
            Employee not found.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
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
    <Layout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Employee Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-purple-200 dark:ring-purple-800"
              />
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {employee.firstName} {employee.lastName}
                </h1>
                <Badge className={getDepartmentColor(employee.department)}>
                  {employee.department}
                </Badge>
                <div className="flex items-center justify-center space-x-1">
                  {renderStars(employee.rating)}
                  <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                    {employee.rating}/5
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {employee.address.city}, {employee.address.state}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Age {employee.age}</span>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {employee.bio}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Overall Rating</span>
                        <div className="flex items-center space-x-2">
                          {renderStars(employee.rating)}
                          <span className="font-semibold">{employee.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Department</span>
                        <Badge className={getDepartmentColor(employee.department)}>
                          {employee.department}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Years of Experience</span>
                        <span className="font-semibold">{Math.floor(Math.random() * 10) + 1} years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Current Projects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employee.projects?.map((project: string, index: number) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white">{project}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Status: In Progress
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-4">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Performance Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employee.feedback?.map((feedback: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{feedback.date}</span>
                            <div className="flex items-center space-x-1">
                              {renderStars(feedback.rating)}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{feedback.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetails;
