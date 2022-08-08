import React from "react";
/*
function FancyButton(props) {
    return (
        <div>
            {props.children}
            <button className="FancyButton">
                {props.children}
            </button>
        </div>
    );
} */

 const FancyButton = React.forwardRef((props, ref) => (
      <button ref={ref} className="FancyButton">
          {props.children}
      </button>
));

const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>

export default FancyButton;