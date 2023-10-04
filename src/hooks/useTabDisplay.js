import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useLayoutEffect, useMemo } from "react";

export const useTabDisplay = ({navigation, route, screens}) => {
  visibleRoutes = useMemo(() => screens, [])

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({
      tabBarActiveTintColor: '#fff',
      tabBarActiveBackgroundColor: '#F54F59',
      tabBarShowLabel: false,
      tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#ff8c90',
          borderTopWidth: 0,
          elevation: 0,
          borderRadius: 4,
          height: 80,
          display:
            routeName === undefined || visibleRoutes.includes(routeName) ? 'flex' : 'none',
      }
    })
  }, [navigation, route])
}