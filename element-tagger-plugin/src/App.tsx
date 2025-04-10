// import RetroCanvas from "./components/retro-canvas";
// export default function App() {
//   return <RetroCanvas />;
// }


import { useState, useEffect } from 'react';
import * as babel from '@babel/standalone';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Code } from 'lucide-react';

const ASTViewer = () => {
  const [code, setCode] = useState('// Paste your React code here\nfunction Example() {\n  return <div>Hello world!</div>;\n}');
  const [ast, setAst] = useState('');
  const [error, setError] = useState('');

  const generateAST = (sourceCode:string) => {
    try {
      setError('');
      const result = babel.transform(sourceCode, {
        presets: ['react'],
        plugins: ['syntax-jsx'],
        ast: true,
        code: false
      });
      
      return JSON.stringify(result.ast, null, 2);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error parsing code: ${err.message}`);
      } else {
        setError('An unknown error occurred');
      }
      return '';
    }
  };

  useEffect(() => {
    const astResult = generateAST(code);
    setAst(astResult);
  }, [code]);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="shadow-lg border-t-4 border-t-blue-600">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Code size={24} />
            <CardTitle>React AST Viewer</CardTitle>
          </div>
          <CardDescription className="text-blue-100">
            Paste React code on the left to see its Abstract Syntax Tree on the right
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">React Code</h2>
              <Textarea 
                className="font-mono h-96 resize-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Abstract Syntax Tree</h2>
              <div className="border rounded-md h-96 p-4 font-mono text-sm overflow-auto bg-slate-50">
                {error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <pre>{ast}</pre>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-slate-100 text-center text-slate-600 text-sm rounded-b-lg py-3">
          Tip: Try modifying the React code to see how the AST changes
        </CardFooter>
      </Card>
    </div>
  );
};

export default ASTViewer;