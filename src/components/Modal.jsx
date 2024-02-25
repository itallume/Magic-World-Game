
export default function Modal({children, buttonAction, buttonText}){

    const BACKGROUND_STYLE = {
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        backgroundColor: "rgb(0,0,0, 0.7 )",
        zIndex: "1000",
        animation: "emerge 1.5s ease-in-out forwards"
    }
    
    const MODAL_STYLE = {
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: "25%",
        left: "25%",
        transform: "translate(-50%, -50%)",
        width: "50vw",
        height: "60vh",
        backgroundColor: "#fff",
        borderRadius: "10px",
        color: "black",
        animation: "modalAnimation 1.5s ease-in-out forwards"
    }

    const BUTTON_STYLE = {
        marginRight: "auto",
        marginLeft: "auto",
        backgroundColor: "gray",

    }

    return(
        <div style={BACKGROUND_STYLE}>
            <div style={MODAL_STYLE}>
                <div>{children}</div>
                <button style={BUTTON_STYLE} onClick={buttonAction}> {buttonText} </button>
            </div>
            
        </div>
    )
}