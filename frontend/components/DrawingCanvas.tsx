import {useEffect, useRef} from "react";

export default function DrawingCanvas(){

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);

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
    return (
        <div>
            <canvas
                ref={canvasRef}

            />
        </div>
    )
}