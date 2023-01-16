import {
    makeStyles,
    createStyles,
    Theme,
    Grid,
} from "@material-ui/core";
import { PaymentProps } from "../../../utils/types";
import PaymentOptions from "../../payment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paymentRoot: {
            // padding: theme.spacing(0, 2),
            [theme.breakpoints.down('xs')]: {
                // padding: theme.spacing(0, 0),
                margin: theme.spacing(-4, 0)
            }
        },
        maxWidthDiv: {
            maxWidth: "var(--max-width)",
            margin: theme.spacing(0, "auto"),
        },
        gridContainer: {
            margin: theme.spacing(2.5, 0),
        },
    })
);


const Payment: React.FC<any> = ({
    setProceedToPay,
    paymentMode,
    setPaymentMode,
    setBank,
    setVpa,
    setSelectedCard,
    vpa,
    flag,
    onSubmit,
    
    disablePaymentOptions,
    selectedCard,
    setPaymentMethodId,
    setBtnText,
    section,
}: PaymentProps) => {
    const classes = useStyles();
    return (
        <div className={classes.paymentRoot}>
            <div className={classes.maxWidthDiv}>
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} sm={12} md={12}>
                        <PaymentOptions
                            setPaymentMethodId={setPaymentMethodId}
                            selectedCard={selectedCard}
                            setBank={setBank}
                            setSelectedCard={setSelectedCard}
                            setVpa={setVpa}
                            vpa={vpa}
                            flag={flag}
                            disablePaymentOptions={disablePaymentOptions}
                            paymentMode={paymentMode}
                            setPaymentMode={setPaymentMode}
                            section={section}
                            setProceedToPay={setProceedToPay}
                            onSubmit={onSubmit}
                            setBtnText={setBtnText}
                        />
                    </Grid >
                </Grid >
            </div >
        </div >
    );
}

export default Payment;


