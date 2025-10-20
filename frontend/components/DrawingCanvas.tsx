import {useEffect, useRef,useState} from "react";




export default function DrawingCanvas(){

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const[isDrawing, setIsDrawing] = useState(false);
    const[undoState, setUndoState] = useState<ImageData[]>([]);

    console.log(undoState);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if(!canvas || !context){
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context.lineCap = 'round';
        context.strokeStyle = 'white';
        context.lineWidth = 5;
        contextRef.current = context;

        saveState()

    }, []);

    const saveState = () => {
        if (!canvasRef.current || !contextRef.current) return;

        const imageData = contextRef.current.getImageData(
            0,0,
            canvasRef.current.width,
            canvasRef.current.height,
        )
        setUndoState(prev => [...prev, imageData]);


    }

    const startDrawing = (event : React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetY, offsetX } = event.nativeEvent;

        saveState();


        setIsDrawing(true);

        if(!contextRef.current){
            return;
        }

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    }

    const draw = (event : React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = event.nativeEvent;

        if(!contextRef.current){
            return;
        }

        if(!isDrawing){
            return;
        }



        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }
    const endDrawing = () => {
        if(!contextRef.current){
            return;
        }


        setIsDrawing(false);
        contextRef.current.closePath();
    }

   const undo = () => {
       if (!contextRef.current || !canvasRef.current) {
           return;
       }


        if(undoState.length <= 2 ){
            return;
        }

        const newStack = undoState.slice(0,-1);

       const previousState = newStack[newStack.length - 1];


        contextRef.current.putImageData(previousState,0,0)

       setUndoState(newStack);
   }


    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={() => undo()}
            >
                Undo
            </button>

            <canvas
                className="w-screen h-screen"
                    ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                onMouseMove={draw}

                style={{
                    cursor: 'crosshair',
                    background: "black",
                }}
            />
        </div>
    )
}