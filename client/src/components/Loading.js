import { useEvent } from '@/context';
import { CircularProgress } from '@mui/material';

const Loading = () => {
  const { loading } = useEvent();
  if (loading) {
    return (
      <div className="absolute flex justify-center items-center h-full w-full bg-light-bg dark:bg-dark-bg top-0 left-0 right-0 bottom-0 m-auto z-10">
        <CircularProgress
          size={100}
          className="text-light-txt dark:text-dark-txt"
        />
      </div>
    );
  } else return;
};
export default Loading;
