import {useEffect, useRef,useState} from "react";

export default function DrawingCanvas(){

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const[isDrawing, setIsDrawing] = useState(false);

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

    }, []);

    const startDrawing = (event : React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetY, offsetX } = event.nativeEvent;
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
    const endDrawing = (event : React.MouseEvent<HTMLCanvasElement>) => {
        if(!contextRef.current){
            return;
        }
        setIsDrawing(false);
        contextRef.current.closePath();
    }

    console.log("Rendering canvas");

    return (
        <div>
            <canvas
                className="w-screen h-screen"
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                onMouseMove={draw}
                style={{
                    cursor: 'crosshair',
                }}
            />
        </div>
    )
}