import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ children, title ="", open = true, onClose = () => {} }) {
  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="lg"
        open={open}
      >
        <div className="p-4">
          <h2 className="text-title text-xl">{title}</h2>
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
}
