import { addNewQuestion } from '@store/slices/questionSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/useAppDispatch';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';

function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddNewQuestion = () => {
    dispatch(addNewQuestion());
  };

  const handlePreview = () => {
    navigate('/viewform');
  };

  return (
    <Card
      sx={{
        position: 'absolute',
        right: '-56px',
        top: '38px',
        display: 'flex',
        flexDirection: 'column',
        py: '8px',
      }}
    >
      <Tooltip title="질문 추가" placement="right">
        <IconButton onClick={handleAddNewQuestion}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="미리보기" placement="right">
        <IconButton onClick={handlePreview}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    </Card>
  );
}

export default Sidebar;
