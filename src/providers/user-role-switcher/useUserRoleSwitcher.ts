import { useContext, useLayoutEffect, useState, useRef, useMemo } from 'react';
import UserRoleSwitcher from './UserRoleSwitcher';
import UserRoleSwitcherContext from './UserRoleSwitcherContext';


export default function useUserRoleSwitcher() : UserRoleSwitcher {


    const userRoleSwitcher = useContext(UserRoleSwitcherContext);
    if (!userRoleSwitcher) {
      throw new Error('Missing <UserRoleSwitcherProvider>');
    }
  
    return userRoleSwitcher;
  }
