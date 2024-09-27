import Calendar from '@/components/UI/Calendar';
import {NextPage} from 'next';
// import {useRouter} from 'next/router';

const Page: NextPage = () => {
  // const router = useRouter();
  // const { userId } = router.query;
  return (
    <div>
      <h1>Agenda</h1>
      <Calendar></Calendar>
    </div>
  );
};

export default Page;
