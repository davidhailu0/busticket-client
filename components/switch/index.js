import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function CustomSwitch({label,value,setValue,disabled}) {
  const handleChange = (e)=>{
    setValue(e.target.checked)
  }
  return (
      <FormControlLabel control={<Switch checked={value} disabled={disabled} onChange={handleChange}/>} label={label} />
  );
}