import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";

const Home = () => {
  const { mutate } = useLogout();
  return (
    <div>
      Home
      <Button onClick={() => mutate()}>logout</Button>
    </div>
  );
};

export default Home;
