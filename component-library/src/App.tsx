import { Button } from "./components";
import { ScrollArea } from "./components/ui/scroll-area";

const App = () => {
  const document = window.document;
  console.log("document", document);
  return (
    <div>
      <ScrollArea></ScrollArea>
      <Button>Hello World</Button>
    </div>
  );
};

export default App;
