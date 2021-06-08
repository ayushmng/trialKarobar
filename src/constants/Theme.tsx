import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import Colors from './Colors';

export const DefaultThemeConfig = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.Background,
    text: Colors.Text,
    bottomNavBackground: Colors.bottomNavBackground,
  },
};

export const DarkThemeConfig = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.DarkBackground,
    text: Colors.DarkText,
    bottomNavBackground: Colors.DarkBottomNavBackground,
    card: Colors.DarkBottomNavBackground,
  },
};
