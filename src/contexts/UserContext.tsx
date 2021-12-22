import React from 'react';
import User, { nullUser } from '../interfaces/user';

export const UserContext = React.createContext({
  user: nullUser,
  setUser: (user: User) => {}
});

const UserWrapper = (props: any) => {
  const [user, setUser] = React.useState(nullUser);

  return (
    <UserContext.Provider
      value={{ user: user, setUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserWrapper;