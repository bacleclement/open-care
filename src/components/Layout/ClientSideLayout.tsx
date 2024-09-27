"use client";

import {AppProvider, DashboardLayout} from '@toolpad/core';
import DashboardIcon from '@mui/icons-material/Dashboard';

const NAVIGATION = [
  {
    segment: 'agenda',
    title: 'Agenda',
    icon: <DashboardIcon/>,
  },
  {
    segment: 'patients',
    title: 'Patients',
    icon: <DashboardIcon/>,
  },
];

export default function ClientSideLayout({children}: Readonly<{ children: React.ReactNode }>) {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  //
  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`
  // }, [pathname, searchParams])

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo"/>,
        title: 'MUI',
      }}
    >
      <DashboardLayout>
        {/*<Home pathname={pathname}></Home>*/}
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}
