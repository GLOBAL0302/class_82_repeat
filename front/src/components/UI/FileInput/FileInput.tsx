import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ name, label, onGetFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
    onGetFile(e);
  };
  return (
    <>
      <input type="file" name={name} ref={inputRef} onChange={onFileChange} style={{ display: 'none' }} />
      <Grid container alignItems="center" gap={2}>
        <Grid>
          <TextField disabled label={label} value={fileName} onChange={activateInput} />
        </Grid>
        <Grid>
          <Button variant="contained" color="success" onClick={activateInput}>
            Select Image
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
