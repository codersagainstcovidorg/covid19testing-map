import React from 'react';
import Snackbar  from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    // close: {
    //   padding: theme.spacing(0.5),
    // },
  }),
);

const DataUpdateSnackbar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  return (
    <div className={classes.root}>
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        disableWindowBlurListener={false}
        
        >
        <MuiAlert 
        onClose={handleClose} 
        severity="warning" 
        variant="filled"
        icon={<InfoIcon/>}
        >
          Data updated: 03/28/2020 10:38AM PDT
        </MuiAlert> 
      </Snackbar>
    </div>
  );
}

export default DataUpdateSnackbar;



// import React from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert, { AlertProps } from '@material-ui/lab/Alert';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       padding: theme.spacing(0.5),
//       marginBottom: theme.spacing(2),
//     },
//     close: {
//       padding: theme.spacing(0.5),
//     },
//   }),
// );

// export interface SnackbarMessage {
//   message: string;
//   key: number;
// }

// export interface State {
//   open: boolean;
//   messageInfo?: SnackbarMessage;
// }

// const messages = [
//   "Data updated: 03/28/2020 10:38AM PDT. Next update will add new sites for 10+ states.",
//   "Thanks to student volunteers at Georgetown School of Medicine, 150+ locations were added across: NJ, NY, MD, WI, MN, MI, IL, AZ, OH, PA, CT.",
// ]

// const DataUpdateSnackbar = () => {
//   const queueRef = React.useRef<SnackbarMessage[]>([]);
//   const [open, setOpen] = React.useState(false);
//   const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined);

//   const processQueue = () => {
//     if (queueRef.current.length > 0) {
//       setMessageInfo(queueRef.current.shift());
//       setOpen(true);
//     }
//   };

//   const handleClick = (message: string) => () => {
//     queueRef.current.push({
//       message,
//       key: new Date().getTime(),
//     });

//     if (open) {
//       // immediately begin dismissing current message
//       // to start showing new one
//       setOpen(false);
//     } else {
//       processQueue();
//     }
//   };

//   const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleExited = () => {
//     processQueue();
//   };

//   const classes = useStyles();
//   return (
//     handleClick(messages[0]),
//     handleClick(messages[1]),
    
//     <div>
//       {/* <Button onClick={handleClick('Message A')}>Show message A</Button>
//       <Button onClick={handleClick('Message B')}>Show message B</Button> */}
//       <Snackbar
//         key={messageInfo ? messageInfo.key : undefined}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         onExited={handleExited}
//         // message={messageInfo ? messageInfo.message : undefined}
//         action={
//           <React.Fragment>
//             <IconButton
//               aria-label="close"
//               color="inherit"
//               className={classes.close}
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           </React.Fragment>
//         }
//       >
//         <Alert onClose={handleClose} severity="info" variant="filled">
//           {messageInfo ? messageInfo.message : undefined}
//           {/* This is a success message! */}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default DataUpdateSnackbar;

