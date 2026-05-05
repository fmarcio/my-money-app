import { createContext, useReducer, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

type ThemeAction = { type: 'CHANGE_THEME'; payload: Theme };

interface ThemeContextType extends ThemeState {
  changeTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: (localStorage.getItem('theme') as Theme) || 'light',
  });

  const changeTheme = (theme: Theme) => {
    dispatch({ type: 'CHANGE_THEME', payload: theme });
  };

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    
    // Apply theme class to body for global CSS variables to work
    if (state.theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ ...state, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
