import { useTesting } from "./hooks/useAuth";

const App = () => {
  const { data } = useTesting();
  console.log(data);
  return <div>App</div>;
};

export default App;
