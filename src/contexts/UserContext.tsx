import React from 'react';

export const UserContext = React.createContext({
  user: null,
  setUser: (user: any) => {}
});

const UserWrapper = (props: any) => {
  const [user, setUser] = React.useState(null);

  function _setUser(user: any) {
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