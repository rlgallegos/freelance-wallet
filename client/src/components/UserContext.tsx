import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: number;
    username: string;
    initialized: boolean;
    average_weekly_income: number;
    average_monthly_expenses: number;
    income: Income;
}
interface Income {
    id: number;
    week1: number;
    week2: number;
    week3: number;
    week4: number;
    total_balance: number;
}

interface UserContextType {
    user: User;
    updateUser: (newUser: User) => void;

}

const UserContext = createContext<UserContextType>({
    user: { id: 0, username: '', initialized: false, average_monthly_expenses: 0, average_weekly_income: 0, 
    income: {id: 0, week1: 0, week2: 0, week3: 0, week4: 0, total_balance: 0}
},
    updateUser: () => {},
  });

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({id: 0, username: '', initialized: false, average_weekly_income: 0, average_monthly_expenses: 0, 
    income: {id: 0, week1: 0, week2: 0, week3: 0, week4: 0, total_balance: 0}
});

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};