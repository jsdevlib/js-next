import { Drawer, MenuItem } from "@mui/material";

export interface IToggleThemeProps {
  open: boolean;
  handleClose: () => void;
}

const ToggleDrawer = (props: IToggleThemeProps) => {
  const { open, handleClose } = props;

  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={handleClose}>
        <MenuItem>Menu Item</MenuItem>
      </Drawer>
    </>
  );
};

export default ToggleDrawer;
