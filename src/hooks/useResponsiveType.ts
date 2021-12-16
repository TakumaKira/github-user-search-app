import React from 'react';
import { responsiveBreakPointWidth } from '../config.json';

export enum ResponsiveType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

function getResponsiveType(width: number): ResponsiveType {
  if (width < responsiveBreakPointWidth.mobileTablet)
    return ResponsiveType.Mobile;
  if (width < responsiveBreakPointWidth.tabletDesktop)
    return ResponsiveType.Tablet;
  return ResponsiveType.Desktop;
}

export default function useResponsiveType() {
  const [ responsiveType, setResponsiveType ] = React.useState(getResponsiveType(window.innerWidth));

  React.useEffect(() => {
    function handleResize() {
      const newResponsiveType = getResponsiveType(window.innerWidth);
      setResponsiveType(newResponsiveType);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return responsiveType;
}
