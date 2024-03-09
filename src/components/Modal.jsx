
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
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "25%",
        left: "25%",
        transform: "translate(-50%, -50%)",
        width: "50vw",
        height: "60vh",
        backgroundColor: "#7abf66",
        borderRadius: "10px",
        color: "black",
        animation: "modalAnimation 1.5s ease-in-out forwards"
    }

    const BUTTON_STYLE = {
        width: "max-content",
        background: "linear-gradient(45deg, #bd1550,#e97f02, #f8ca00, #8a9b0f) no-repeat",
        border: "2px solid black",
        padding: "0.5rem",
        fontSize: "1.5rem",
        borderRadius: "10px", 


    }

    const CHILDREN_STYLE = { 
        marginBottom: "2rem",
        margin: "2rem"
    }

    const CENTER_STYLE = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    }

    return(
        <div style={BACKGROUND_STYLE}>
            <div style={MODAL_STYLE}>
                <div style={CENTER_STYLE}>
                    <div style={CHILDREN_STYLE}> {children} </div>
                    <button style={BUTTON_STYLE} onClick={buttonAction}> {buttonText} </button>
                </div>    
            </div>
            
        </div>
    )
}