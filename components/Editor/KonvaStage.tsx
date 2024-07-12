'use client';
import { Box } from '@mui/material';
import Konva from 'konva';
import React from 'react';
import { Circle, Image, Layer, Line, Rect, Stage } from 'react-konva';
import DrawingTools from './DrawingTools';

const KonvaStage = ({
  imageUrl,
  fileName,
}: {
  imageUrl?: string;
  fileName: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<Konva.Stage>(null);
  const shapeRef = React.useRef<any>(null); // Ref for the active shape
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [tool, setTool] = React.useState<string>('');
  const [shapes, setShapes] = React.useState<any[]>([]);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [shapeBeingDragged, setShapeBeingDragged] = React.useState(false);
  const [bgImage, setBgImage] = React.useState<HTMLImageElement | null>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(window.innerHeight - 150);
    }
  }, []);

  React.useEffect(() => {
    const img = new window.Image();
    if (imageUrl) {
      img.src = imageUrl!;
      img.crossOrigin = 'anonymous';
      img.onload = () => setBgImage(img);
    }
  }, [imageUrl]);

  const handleMouseDown = (e: any) => {
    const clickedOnEmptyStage = e.target === e.target.getStage();
    const shapeUnderPointer = e.target;

    if (tool === 'eraser') {
      // Remove the shape under the pointer
      const shapeId = shapeUnderPointer.attrs.id;
      setShapes(shapes.filter((shape) => shape.id !== shapeId));
    } else if (tool) {
      setIsDrawing(true);
      const position = e.target.getStage().getPointerPosition();
      const newShape = {
        tool,
        points: [position.x, position.y, position.x, position.y],
        id: `tool_shape_${shapes.length}`,
      };
      shapeRef.current = newShape; // Assign the new shape to the ref
      setShapes([...shapes, newShape]);
    } else {
      setShapeBeingDragged(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastShape = shapeRef.current; // Use the ref to get the active shape
    const newPoints =
      lastShape.tool === 'freehand'
        ? [...lastShape.points, point.x, point.y]
        : [lastShape.points[0], lastShape.points[1], point.x, point.y];
    const updatedShape = { ...lastShape, points: newPoints };
    const updatedShapes = shapes.slice(0, shapes.length - 1);
    shapeRef.current = updatedShape; // Update the ref with the new points
    setShapes([...updatedShapes, updatedShape]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setShapeBeingDragged(false);
    shapeRef.current = null; // Clear the ref when drawing ends
  };

  const renderShape = (shape: any) => {
    const handleShapeMouseDown = () => {
      setShapeBeingDragged(true);
    };
    const shapeProps = {
      id: shape.id, // Ensure each shape has a unique ID
      draggable: true,
      onMouseDown: handleShapeMouseDown,
    };
    switch (shape.tool) {
      case 'rectangle':
        const width = shape.points[2] - shape.points[0];
        const height = shape.points[3] - shape.points[1];
        return (
          <Rect
            key={shape.id}
            x={shape.points[0]}
            y={shape.points[1]}
            width={width}
            height={height}
            fill='red'
            stroke='black'
            strokeWidth={4}
            {...shapeProps}
          />
        );
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(shape.points[2] - shape.points[0], 2) +
            Math.pow(shape.points[3] - shape.points[1], 2),
        );
        return (
          <Circle
            key={shape.id}
            x={shape.points[0]}
            y={shape.points[1]}
            radius={radius}
            fill='blue'
            stroke='black'
            strokeWidth={4}
            {...shapeProps}
          />
        );
      case 'line':
      case 'freehand':
        return (
          <Line
            key={shape.id}
            points={shape.points}
            stroke={shape.tool === 'line' ? 'black' : 'green'}
            strokeWidth={4}
            tension={shape.tool === 'freehand' ? 0.5 : 0}
            lineCap='round'
            {...shapeProps}
          />
        );
      default:
        return null;
    }
  };

  const handleExport = () => {
    if (stageRef.current && bgImage) {
      const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
      console.log('🚀 ~ handleExport ~ dataURL:', dataURL);

      if (dataURL) {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${fileName}.png`; // Ensure filename has an extension
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up: remove the link from the DOM
        document.body.removeChild(link);
      } else {
        console.error('Failed to generate data URL for export.');
      }
    } else {
      console.error('Stage or background image not loaded.');
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{ width: '720px' }}
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <DrawingTools setTool={setTool} handleExport={handleExport} />
      <Stage
        ref={stageRef}
        width={containerWidth}
        height={containerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          if (!shapeBeingDragged) {
            handleMouseMove(e);
          }
        }}
        onMouseUp={handleMouseUp}
        className='bg-white'
      >
        <Layer>
          {bgImage && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              image={bgImage}
              width={containerWidth}
              height={containerHeight}
              offsetX={0}
              offsetY={0}
              crop={{
                x: 0,
                y: 0,
                width: bgImage.width,
                height: bgImage.height,
              }}
            />
          )}
          {shapes.map((shape) => renderShape(shape))}
        </Layer>
      </Stage>
    </Box>
  );
};

export default KonvaStage;
