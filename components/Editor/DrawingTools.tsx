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
}

const DrawingTools = ({ setTool, handleExport }: DrawingToolsProps) => {
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
