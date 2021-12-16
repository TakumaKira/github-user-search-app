import React from 'react';
import User, { nullUser } from '../types/user';

export const UserContext = React.createContext({
  user: nullUser,
  setUser: (user: User) => {}
});

const UserWrapper = (props: any) => {
  const [user, setUser] = React.useState(nullUser);

  function _setUser(user: User) {
    if (!user) return;
    setUser(user);
  }

  return (
    <UserContext.Provider
      value={{ user: user, setUser: _setUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserWrapper;