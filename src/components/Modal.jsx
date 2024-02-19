
export default function Modal({children, buttonAction, buttonText}){

    const BACKGROUND_STYLE = {
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        backgroundColor: "rgb(0,0,0, 0.7 )",
        zIndex: "1000"
    }
    
    const MODAL_STYLE = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "60%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        color: "black"
    }

    const BUTTON_STYLE = {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "gray"
    }

    return(
        <div style={BACKGROUND_STYLE}>
            <div style={MODAL_STYLE}>
                <div>
                    {children}
                </div>
                <button style={BUTTON_STYLE} onClick={buttonAction}> {buttonText} </button>
            </div>
            
        </div>
    )
}