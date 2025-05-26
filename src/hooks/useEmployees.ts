
import { useQuery } from '@tanstack/react-query';

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

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

const indianFirstNames = [
  'Aarav', 'Ananya', 'Arjun', 'Diya', 'Ishaan', 'Kavya', 'Rohan', 'Priya', 
  'Vikram', 'Meera', 'Aditya', 'Riya', 'Karthik', 'Shreya', 'Rahul', 'Pooja',
  'Siddharth', 'Neha', 'Amit', 'Deepika', 'Raj', 'Anita', 'Varun', 'Sanjana',
  'Nikhil', 'Aditi', 'Suresh', 'Divya', 'Ashwin', 'Nisha'
];

const indianLastNames = [
  'Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Agarwal', 'Verma', 'Shah',
  'Jain', 'Reddy', 'Nair', 'Iyer', 'Rao', 'Chopra', 'Malhotra', 'Bansal',
  'Tiwari', 'Saxena', 'Mishra', 'Kapoor', 'Mehta', 'Desai', 'Sinha', 'Pandey',
  'Bhatia', 'Khanna', 'Arora', 'Joshi', 'Sethi', 'Chandra'
];

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch('https://dummyjson.com/users?limit=20');
  const data = await response.json();
  
  return data.users.map((user: any, index: number) => ({
    id: user.id,
    firstName: indianFirstNames[index % indianFirstNames.length],
    lastName: indianLastNames[index % indianLastNames.length],
    email: user.email,
    age: user.age,
    image: user.image,
    address: {
      city: user.address.city,
      state: user.address.state,
    },
    department: departments[Math.floor(Math.random() * departments.length)],
    rating: Math.floor(Math.random() * 5) + 1,
  }));
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      const user = await response.json();
      
      const userIndex = parseInt(id) - 1;
      
      return {
        ...user,
        firstName: indianFirstNames[userIndex % indianFirstNames.length],
        lastName: indianLastNames[userIndex % indianLastNames.length],
        department: departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
        bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 1} years in the industry. Known for excellent teamwork and innovative problem-solving skills.`,
        projects: [
          'Project Alpha - Q4 2023',
          'Digital Transformation Initiative',
          'Customer Experience Enhancement',
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        feedback: [
          { date: '2023-Q4', rating: Math.floor(Math.random() * 5) + 1, comment: 'Excellent performance this quarter!' },
          { date: '2023-Q3', rating: Math.floor(Math.random() * 5) + 1, comment: 'Strong team collaboration.' },
          { date: '2023-Q2', rating: Math.floor(Math.random() * 5) + 1, comment: 'Met all project deadlines.' },
        ],
      };
    },
  });
};
