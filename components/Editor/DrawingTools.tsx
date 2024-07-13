'use client';
import {
  CircleOutlined,
  Download,
  DrawRounded,
  HorizontalRule,
  RectangleOutlined,
} from '@mui/icons-material';
import { Box, Button, ButtonGroup, Tooltip } from '@mui/material';

interface DrawingToolsProps {
  setTool: (tool: string) => void;
  handleExport: () => void;
  color: string;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stroke: number;
  handleStrokeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DrawingTools = ({
  setTool,
  handleExport,
  color,
  handleColorChange,
  stroke,
  handleStrokeChange,
}: DrawingToolsProps) => {
  return (
    <Box display='flex' justifyContent='center' my={2} gap={1}>
      <ButtonGroup>
        <Button variant='contained' onClick={() => setTool('rectangle')}>
          <Tooltip title='Rectangle' placement='bottom'>
            <RectangleOutlined />
          </Tooltip>
        </Button>
        <Button variant='contained' onClick={() => setTool('circle')}>
          <Tooltip title='Circle' placement='bottom'>
            <CircleOutlined />
          </Tooltip>
        </Button>
        <Button variant='contained' onClick={() => setTool('line')}>
          <Tooltip title='Line' placement='bottom'>
            <HorizontalRule />
          </Tooltip>
        </Button>
        <Button variant='contained' onClick={() => setTool('freehand')}>
          <Tooltip title='Free Hand' placement='bottom'>
            <DrawRounded />
          </Tooltip>
        </Button>
        <Button variant='contained'>
          <Tooltip title='Pick Color' placement='bottom'>
            <input
              type='color'
              value={color}
              onChange={handleColorChange}
              style={{
                border: 'none',
                width: '24px',
                height: '24px',
                padding: '0',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            />
          </Tooltip>
        </Button>
        <Button variant='contained'>
          <Tooltip title='Stroke Width' placement='bottom'>
            <input
              type='number'
              value={stroke}
              defaultValue={4}
              onChange={handleStrokeChange}
              style={{
                border: 'none',
                width: '40px',
                height: '24px',
                padding: '0 0 0 10px',
                cursor: 'pointer',
                backgroundColor: 'white',
                color: 'darkgray',
              }}
            />
          </Tooltip>
        </Button>
        <Button variant='contained' onClick={() => setTool('eraser')}>
          <Tooltip title='Eraser' placement='bottom'>
            <span className='material-symbols-outlined'>ink_eraser</span>
          </Tooltip>
        </Button>
        <Button variant='contained' onClick={handleExport}>
          <Tooltip title='Export' placement='bottom'>
            <Download />
          </Tooltip>
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default DrawingTools;
